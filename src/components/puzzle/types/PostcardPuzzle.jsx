import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, ZoomIn } from 'lucide-react';
import { asset } from '../../../assets.js';
import { areAllScrapsAssembled, shouldSnapToTarget } from '../../../logic/jigsawEngine.js';
import { playMechanicalClick, playSuccessChime } from '../../../logic/audioEngine.js';

const SCRAPS = [
  { id: 1, src: 'inspect_scrap_1', label: 'Left postcard scrap', width: 18.74, target: { x: 23.45, y: 50 }, start: { x: 20, y: 30 }, rotate: 12 },
  { id: 2, src: 'inspect_scrap_2', label: 'Middle postcard scrap', width: 34.83, target: { x: 50.23, y: 50 }, start: { x: 78, y: 48 }, rotate: -9 },
  { id: 3, src: 'inspect_scrap_3', label: 'Right postcard scrap', width: 18.26, target: { x: 76.78, y: 50 }, start: { x: 46, y: 72 }, rotate: -15 },
];

const LOOSE_SCALE = 0.6;
const KEY_STEP = 3;

function scatteredState() {
  return SCRAPS.map((scrap) => ({ ...scrap.start, snapped: false }));
}

function assembledState() {
  return SCRAPS.map((scrap) => ({ ...scrap.target, snapped: true }));
}

export default function PostcardPuzzle({ puzzle, isSolved, isMuted }) {
  const [pieces, setPieces] = useState(() => (isSolved ? assembledState() : scatteredState()));
  const [dragging, setDragging] = useState(null);
  const [showStampZoom, setShowStampZoom] = useState(false);
  const boardRef = useRef(null);
  const dragRef = useRef(null);

  const isAssembled = areAllScrapsAssembled(pieces.map((piece) => piece.snapped));

  useEffect(() => {
    if (isAssembled && !isSolved) playSuccessChime(isMuted);
  }, [isAssembled]);

  const placePiece = (index, x, y) => {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const { target } = SCRAPS[index];
    const toPx = (point) => ({ x: (point.x / 100) * rect.width, y: (point.y / 100) * rect.height });
    const snaps = shouldSnapToTarget(toPx({ x, y }), toPx(target), rect.width * 0.07);

    if (snaps) playMechanicalClick(isMuted);
    setPieces((prev) =>
      prev.map((piece, i) =>
        i === index ? (snaps ? { ...target, snapped: true } : { x, y, snapped: false }) : piece,
      ),
    );
  };

  const handlePointerDown = (index) => (e) => {
    if (pieces[index].snapped) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { index, startX: e.clientX, startY: e.clientY, origin: pieces[index] };
    setDragging(index);
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    const rect = boardRef.current?.getBoundingClientRect();
    if (!drag || !rect) return;
    const x = Math.max(0, Math.min(100, drag.origin.x + ((e.clientX - drag.startX) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, drag.origin.y + ((e.clientY - drag.startY) / rect.height) * 100));
    setPieces((prev) => prev.map((piece, i) => (i === drag.index ? { ...piece, x, y } : piece)));
  };

  const handlePointerUp = () => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    setDragging(null);
    const piece = pieces[drag.index];
    placePiece(drag.index, piece.x, piece.y);
  };

  const handleKeyDown = (index) => (e) => {
    const moves = {
      ArrowLeft: [-KEY_STEP, 0],
      ArrowRight: [KEY_STEP, 0],
      ArrowUp: [0, -KEY_STEP],
      ArrowDown: [0, KEY_STEP],
    };
    const move = moves[e.key];
    if (!move || pieces[index].snapped) return;
    e.preventDefault();
    const piece = pieces[index];
    placePiece(
      index,
      Math.max(0, Math.min(100, piece.x + move[0])),
      Math.max(0, Math.min(100, piece.y + move[1])),
    );
  };

  const handleScatter = () => {
    playMechanicalClick(isMuted);
    setShowStampZoom(false);
    setPieces(scatteredState());
  };

  const placedCount = pieces.filter((piece) => piece.snapped).length;

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-lg">
      <div
        ref={boardRef}
        className="relative aspect-[3/2] w-full rounded-xl overflow-hidden border-2 border-[#543D2D] bg-[#2E3B2E] shadow-inner touch-none"
      >
        {!isAssembled && (
          <div
            aria-hidden="true"
            className="absolute border-2 border-dashed border-[#C59B4B]/25 rounded-lg pointer-events-none"
            style={{ left: '14%', right: '14%', top: '10%', bottom: '10%' }}
          />
        )}

        {isAssembled ? (
          <>
            <img
              src={asset('inspect_postcard_assembled')}
              alt="Restored constellation postcard"
              className="absolute inset-0 w-full h-full object-contain drop-shadow-lg animate-fade-in"
            />
            <button
              type="button"
              onClick={() => setShowStampZoom(true)}
              className="absolute border-2 border-dashed border-[#C59B4B] hover:bg-[#C59B4B]/20 rounded transition flex items-center justify-center group"
              style={{ left: '68%', top: '35%', width: '13%', height: '25%' }}
              title="Examine the stamp's cancellation mark"
              aria-label="Examine stamp"
            >
              <ZoomIn className="w-5 h-5 text-[#8B3A22] group-hover:scale-110 transition" />
            </button>
          </>
        ) : (
          SCRAPS.map((scrap, index) => {
            const piece = pieces[index];
            const isDragging = dragging === index;
            const scale = piece.snapped || isDragging ? 1 : LOOSE_SCALE;
            const rotate = piece.snapped || isDragging ? 0 : scrap.rotate;
            return (
              <button
                key={scrap.id}
                type="button"
                aria-label={`${scrap.label}${piece.snapped ? ' (in place)' : ''}. Drag or use the arrow keys to move it.`}
                onPointerDown={handlePointerDown(index)}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                onKeyDown={handleKeyDown(index)}
                className={`absolute p-0 bg-transparent border-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFE57F] ${
                  piece.snapped ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'
                }`}
                style={{
                  left: `${piece.x}%`,
                  top: `${piece.y}%`,
                  width: `${scrap.width}%`,
                  zIndex: isDragging ? 30 : piece.snapped ? 1 : 10 + index,
                  transform: `translate(-50%, -50%) rotate(${rotate}deg) scale(${scale})`,
                  transition: isDragging ? 'transform 120ms ease-out' : 'left 150ms, top 150ms, transform 200ms ease-out',
                }}
              >
                <img
                  src={asset(scrap.src)}
                  alt=""
                  draggable={false}
                  className="w-full h-auto pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
                />
              </button>
            );
          })
        )}

        {showStampZoom && (
          <div
            onClick={() => setShowStampZoom(false)}
            className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 cursor-pointer z-40"
          >
            <div className="bg-[#FAF3E3] border-2 border-[#543D2D] p-4 rounded-xl text-center shadow-2xl max-w-xs">
              <span className="font-serif text-xs text-[#8C6F56] uppercase tracking-wider block mb-1">
                Postal Cancellation Stamp
              </span>
              <p className="font-mono text-sm font-bold text-[#8B3A22] tracking-widest bg-[#EDE2CE] p-2 rounded border border-[#D5C29D]">
                DESTINATION: {puzzle.clue.payloadText}
              </p>
              <p className="font-serif text-[11px] text-[#2D1F17] mt-2 italic">
                (Click anywhere to return to the workspace)
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {isAssembled ? (
          <>
            <button
              type="button"
              onClick={() => setShowStampZoom(true)}
              className="flex items-center gap-1 font-serif text-xs text-[#2D1F17] hover:text-[#8B3A22] uppercase tracking-wider font-bold underline"
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Examine Stamp</span>
            </button>
            <button
              type="button"
              onClick={handleScatter}
              className="flex items-center gap-1 font-serif text-xs text-[#8B3A22] hover:text-[#A34327] uppercase tracking-wider font-bold underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Scatter Scraps</span>
            </button>
          </>
        ) : (
          <p className="font-serif text-xs text-[#8C6F56] italic text-center" aria-live="polite">
            Drag the scraps together on the mat ({placedCount}/{SCRAPS.length} in place).
          </p>
        )}
      </div>
    </div>
  );
}

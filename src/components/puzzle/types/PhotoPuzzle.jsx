import React, { useEffect, useRef, useState } from 'react';
import { asset } from '../../../assets.js';

const LOUPE_SIZE = 128;
const LOUPE_BORDER = 4;
const ZOOM = 2.6;
const KEY_STEP = 3;

const SPINE_LABEL = { x: 0.404, y: 0.452, size: 0.016 };

function PhotoScene({ width, text }) {
  return (
    <div className="relative w-full h-full">
      <img
        src={asset('inspect_photo_hires')}
        alt=""
        draggable={false}
        className="w-full h-full object-cover"
      />
      <span
        aria-hidden="true"
        className="absolute font-serif font-bold whitespace-nowrap"
        style={{
          left: `${SPINE_LABEL.x * 100}%`,
          top: `${SPINE_LABEL.y * 100}%`,
          transform: 'translate(-50%, -50%)',
          fontSize: `${width * SPINE_LABEL.size}px`,
          letterSpacing: '0.18em',
          color: '#D9B66A',
          opacity: 0.8,
          textShadow: '0 1px 0 rgba(0,0,0,0.45)',
        }}
      >
        {text}
      </span>
    </div>
  );
}

export default function PhotoPuzzle({ puzzle }) {
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return undefined;
    const measure = () => setSize({ width: node.clientWidth, height: node.clientHeight });
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const updateCoordinates = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });
  };

  const handleKeyDown = (e) => {
    const moves = {
      ArrowLeft: [-KEY_STEP, 0],
      ArrowRight: [KEY_STEP, 0],
      ArrowUp: [0, -KEY_STEP],
      ArrowDown: [0, KEY_STEP],
    };
    const move = moves[e.key];
    if (!move) return;
    e.preventDefault();
    setLoupePos((prev) => ({
      x: Math.max(0, Math.min(100, prev.x + move[0])),
      y: Math.max(0, Math.min(100, prev.y + move[1])),
    }));
  };

  const zoomedWidth = size.width * ZOOM;
  const zoomedHeight = size.height * ZOOM;
  const lensRadius = LOUPE_SIZE / 2 - LOUPE_BORDER;
  const offsetX = (loupePos.x / 100) * zoomedWidth - lensRadius;
  const offsetY = (loupePos.y / 100) * zoomedHeight - lensRadius;

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-xl">
      <div
        ref={containerRef}
        role="img"
        aria-label="Photograph of Arthur's study desk. Use the arrow keys to move the loupe."
        tabIndex={0}
        onMouseMove={(e) => updateCoordinates(e.clientX, e.clientY)}
        onTouchStart={(e) => updateCoordinates(e.touches[0].clientX, e.touches[0].clientY)}
        onTouchMove={(e) => updateCoordinates(e.touches[0].clientX, e.touches[0].clientY)}
        onKeyDown={handleKeyDown}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#543D2D] shadow-md cursor-crosshair touch-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C59B4B]"
      >
        <PhotoScene width={size.width} text={puzzle.clue.targetText} />

        <div
          style={{
            left: `${loupePos.x}%`,
            top: `${loupePos.y}%`,
            width: LOUPE_SIZE,
            height: LOUPE_SIZE,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#C59B4B] shadow-[0_0_20px_rgba(0,0,0,0.7)] overflow-hidden pointer-events-none bg-[#2D1F17]"
        >
          <div
            className="absolute"
            style={{
              width: zoomedWidth,
              height: zoomedHeight,
              left: -offsetX,
              top: -offsetY,
            }}
          >
            <PhotoScene width={zoomedWidth} text={puzzle.clue.targetText} />
          </div>
        </div>
      </div>
      <p className="font-serif text-xs text-[#8C6F56] italic text-center">
        Hover, drag or use the arrow keys to slide the brass loupe across the photograph.
      </p>
    </div>
  );
}

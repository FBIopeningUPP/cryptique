import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function RoomStage({
  puzzles,
  solvedPuzzles,
  onSelectPuzzle,
  onBarnabyClick,
  onSanctumClick,
}) {
  const [hoveredLabel, setHoveredLabel] = useState(null);

  const isUnlocked = (puzzle) => {
    if (puzzle.prerequisites.length === 0) return true;
    return puzzle.prerequisites.every((id) => solvedPuzzles.includes(id));
  };

  const isSolved = (puzzleId) => solvedPuzzles.includes(puzzleId);

  return (
    <div className="relative flex-1 w-full overflow-hidden">
      <img
        src="/assets/room_attic_empty.png"
        alt="Attic Study"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <img
        src="/assets/furniture_telescope.png"
        alt="Telescope"
        className="absolute pointer-events-none"
        style={{ left: '8%', top: '38%', width: '18%', zIndex: 4 }}
      />

      <img
        src="/assets/furniture_chair.png"
        alt="Chair"
        className="absolute pointer-events-none"
        style={{ left: '42%', top: '40%', width: '16%', zIndex: 3 }}
      />

      <img
        src="/assets/furniture_desk.png"
        alt="Desk"
        className="absolute pointer-events-none"
        style={{ left: '30%', top: '48%', width: '40%', zIndex: 5 }}
      />

      <img
        src="/assets/furniture_clock.png"
        alt="Clock"
        className="absolute pointer-events-none"
        style={{ left: '80%', top: '18%', width: '15%', zIndex: 4 }}
      />

      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        className="absolute cursor-pointer group"
        style={{ left: '82%', top: '7%', width: '11%', zIndex: 6 }}
        onClick={onBarnabyClick}
      >
        <img
          src="/assets/character_barnaby_room.png"
          alt="Barnaby"
          className="w-full h-auto filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transition-transform group-hover:scale-105"
        />
      </motion.div>

      <img
        src="/assets/furniture_wall_shelf.png"
        alt="Shelf"
        className="absolute pointer-events-none"
        style={{ left: '45%', top: '18%', width: '20%', zIndex: 2 }}
      />

      <img
        src="/assets/furniture_credenza.png"
        alt="Credenza"
        className="absolute pointer-events-none"
        style={{ left: '14%', top: '64%', width: '20%', zIndex: 3 }}
      />

      <div
        className="absolute cursor-pointer group"
        style={{ left: '48%', top: '8%', width: '14%', zIndex: 8 }}
        onClick={onSanctumClick}
      >
        <img
          src={solvedPuzzles.length === 6 ? '/assets/prop_sanctum_open.png' : '/assets/prop_sanctum_closed_base.png'}
          alt="Sanctum Chest"
          className="w-full h-auto drop-shadow-md group-hover:scale-105 transition"
        />
        {solvedPuzzles.length < 6 && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-80">
              {[0, 1, 2, 3, 4, 5].map((chainIdx) => {
                if (solvedPuzzles.length > chainIdx) return null;
                const yPos = 25 + chainIdx * 10;
                return (
                  <line
                    key={chainIdx}
                    x1="10"
                    y1={yPos}
                    x2="90"
                    y2={yPos}
                    stroke="#C59B4B"
                    strokeWidth="3.5"
                    strokeDasharray="4 2"
                  />
                );
              })}
            </svg>
          </div>
        )}
      </div>

      {puzzles.map((puzzle) => {
        const unlocked = isUnlocked(puzzle);
        const solved = isSolved(puzzle.id);
        const isTarget = puzzle.id === 'puzzle-1' && !solved;

        return (
          <div
            key={puzzle.id}
            onClick={() => onSelectPuzzle(puzzle)}
            onMouseEnter={() => setHoveredLabel(puzzle.placement.label)}
            onMouseLeave={() => setHoveredLabel(null)}
            style={{
              left: puzzle.placement.left,
              top: puzzle.placement.top,
              width: puzzle.placement.width,
              zIndex: puzzle.placement.zIndex,
            }}
            className={`absolute cursor-pointer transition-transform group ${
              unlocked ? 'hover:scale-110' : 'opacity-60 cursor-not-allowed'
            }`}
          >
            <img
              src={solved ? puzzle.placement.solvedSrc : puzzle.placement.sealedSrc}
              alt={puzzle.placement.label}
              className={`w-full h-auto drop-shadow-md ${
                isTarget ? 'filter drop-shadow-[0_0_12px_rgba(197,155,75,0.9)] animate-pulse' : ''
              }`}
            />

            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#231B15] text-parchment-100 text-[10px] font-sans px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50 border border-[#543D2D]">
              {puzzle.placement.label} {solved ? '✓' : unlocked ? '(!)' : '🔒'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
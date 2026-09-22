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
    <div className="relative w-full h-full overflow-hidden select-none">
      <img
        src="/assets/room_attic_empty.png"
        alt="Attic Study"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none"
      />

      <img
        src="/assets/furniture_wall_shelf.png"
        alt="Shelf"
        className="absolute pointer-events-none"
        style={{ left: '41.15%', top: '17.13%', width: '17.71%', zIndex: 2 }}
      />

      <div
        className="absolute cursor-pointer group"
        style={{ left: '44.53%', top: '6.67%', width: '10.94%', zIndex: 3 }}
        onClick={onSanctumClick}
        title="Master Sanctum"
      >
        <img
          src={solvedPuzzles.length === 6 ? '/assets/prop_sanctum_open.png' : '/assets/prop_sanctum_locked.png'}
          alt="Sanctum Chest"
          className="w-full h-auto drop-shadow-md group-hover:scale-105 transition-transform duration-200"
        />
      </div>

      <img
        src="/assets/furniture_chair.png"
        alt="Chair"
        className="absolute pointer-events-none"
        style={{ left: '41.41%', top: '31.94%', width: '17.19%', zIndex: 4 }}
      />

      <img
        src="/assets/furniture_credenza.png"
        alt="Credenza"
        className="absolute pointer-events-none"
        style={{ left: '6.77%', top: '41.20%', width: '18.75%', zIndex: 4 }}
      />

      <img
        src="/assets/furniture_telescope.png"
        alt="Telescope"
        className="absolute pointer-events-none"
        style={{ left: '3.39%', top: '38.89%', width: '16.67%', zIndex: 5 }}
      />

      <img
        src="/assets/furniture_desk.png"
        alt="Desk"
        className="absolute pointer-events-none"
        style={{ left: '31.25%', top: '41.20%', width: '37.50%', zIndex: 8 }}
      />

      <img
        src="/assets/furniture_clock.png"
        alt="Clock"
        className="absolute pointer-events-none"
        style={{ left: '79.69%', top: '23.15%', width: '13.54%', zIndex: 5 }}
      />

      <div
        className="absolute cursor-pointer group"
        style={{ left: '82.19%', top: '7.22%', width: '8.59%', zIndex: 7 }}
        onClick={onBarnabyClick}
        title="Click Barnaby for advice"
      >
        <img
          src="/assets/character_barnaby_room.png"
          alt="Barnaby Pendelton"
          className="w-full h-auto filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transition-transform duration-200 group-hover:scale-105"
        />
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
            className={`absolute cursor-pointer transition-transform duration-200 group ${
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

            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#231B15] text-parchment-100 text-[10px] font-serif px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50 border border-[#543D2D] shadow-md">
              {puzzle.placement.label} {solved ? '✓' : unlocked ? '(!)' : '🔒'}
            </div>
          </div>
        );
      })}
    </div>
  );
}
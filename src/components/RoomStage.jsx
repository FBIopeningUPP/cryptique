import React from 'react';
import { asset } from '../assets.js';

export default function RoomStage({
  puzzles,
  solvedPuzzles,
  onSelectPuzzle,
  onBarnabyClick,
  onSanctumClick,
}) {
  const isUnlocked = (puzzle) => {
    if (puzzle.prerequisites.length === 0) return true;
    return puzzle.prerequisites.every((id) => solvedPuzzles.includes(id));
  };

  const isSolved = (puzzleId) => solvedPuzzles.includes(puzzleId);

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-[#1E1712] flex items-center justify-center">
      <p className="hidden portrait:max-sm:block absolute top-20 inset-x-4 text-center font-serif text-xs text-[#D5C29D] bg-[#2D1F17]/90 border border-[#543D2D] rounded-lg px-3 py-2 pointer-events-none">
        Turn your phone sideways for a bigger attic.
      </p>
      <div className="relative w-[min(100%,177.777vh)] aspect-video max-h-full">
      <img
        src={asset('room_attic_empty')}
        alt="Attic Study"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      <img
        src={asset('furniture_wall_shelf')}
        alt="Shelf"
        className="absolute pointer-events-none"
        style={{ left: '41.15%', top: '17.13%', width: '17.71%', zIndex: 2 }}
      />

      <button
        type="button"
        className="absolute cursor-help group bg-transparent border-0 p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFE57F]"
        style={{ left: '44.53%', top: '6.67%', width: '10.94%', zIndex: 3 }}
        onClick={onSanctumClick}
        title="Master Sanctum"
      >
        <img
          src={solvedPuzzles.length >= puzzles.length ? asset('prop_sanctum_open') : asset('prop_sanctum_locked')}
          alt="Sanctum Chest"
          className="w-full h-auto drop-shadow-md group-hover:scale-105 transition-transform duration-200"
        />
      </button>

      <img
        src={asset('furniture_chair')}
        alt="Chair"
        className="absolute pointer-events-none"
        style={{ left: '41.41%', top: '31.94%', width: '17.19%', zIndex: 4 }}
      />

      <img
        src={asset('furniture_credenza')}
        alt="Credenza"
        className="absolute pointer-events-none"
        style={{ left: '6.77%', top: '41.20%', width: '18.75%', zIndex: 4 }}
      />

      <img
        src={asset('furniture_telescope')}
        alt="Telescope"
        className="absolute pointer-events-none"
        style={{ left: '3.39%', top: '38.89%', width: '16.67%', zIndex: 5 }}
      />

      <img
        src={asset('furniture_desk')}
        alt="Desk"
        className="absolute pointer-events-none"
        style={{ left: '31.25%', top: '41.20%', width: '37.50%', zIndex: 8 }}
      />

      <button
        type="button"
        className="absolute cursor-help group bg-transparent border-0 p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFE57F]"
        style={{ left: '82.19%', top: '7.22%', width: '8.59%', zIndex: 7 }}
        onClick={onBarnabyClick}
        title="Click Barnaby for advice"
      >
        <img
          src={asset('character_barnaby_room')}
          alt="Barnaby Pendelton"
          className="w-full h-auto filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] transition-transform duration-200 group-hover:scale-105"
        />
      </button>

      {puzzles.map((puzzle) => {
        const unlocked = isUnlocked(puzzle);
        const solved = isSolved(puzzle.id);
        const isTarget = puzzle.id === 'puzzle-1' && !solved;

        return (
          <button
            type="button"
            key={puzzle.id}
            onClick={() => onSelectPuzzle(puzzle)}
            style={{
              left: puzzle.placement.left,
              top: puzzle.placement.top,
              width: puzzle.placement.width,
              zIndex: puzzle.placement.zIndex,
            }}
            aria-label={`${puzzle.placement.label}: ${solved ? 'solved' : unlocked ? 'available' : 'locked'}`}
            className={`absolute cursor-zoom-in transition-transform duration-200 group bg-transparent border-0 p-0 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFE57F] focus-visible:outline-offset-2 ${
              unlocked ? 'hover:scale-110' : 'cursor-not-allowed'
            }`}
          >
            <img
              src={solved ? puzzle.placement.solvedSrc : puzzle.placement.sealedSrc}
              alt={puzzle.placement.label}
              className={`w-full h-auto drop-shadow-md ${
                isTarget
                  ? 'filter drop-shadow-[0_0_12px_rgba(197,155,75,0.9)] animate-pulse'
                  : unlocked
                    ? ''
                    : 'brightness-75 saturate-50'
              }`}
            />

            {!unlocked && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#C59B4B] bg-[#231B15]/95 text-[10px] shadow-md" aria-hidden="true">
                🔒
              </span>
            )}

            <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#231B15] text-parchment-100 text-[10px] font-serif px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-50 border border-[#543D2D] shadow-md">
              {puzzle.placement.label} {solved ? '✓' : unlocked ? '(!)' : '🔒'}
            </div>
          </button>
        );
      })}
      </div>
    </div>
  );
}

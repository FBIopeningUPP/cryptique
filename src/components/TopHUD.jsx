import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function TopHUD({ solvedCount, isMuted, onToggleMute, rank = 'Apprentice Archivist' }) {
  return (
    <div className="absolute top-0 left-0 right-0 h-12 bg-[#2D1F17]/90 backdrop-blur-sm border-b-2 border-[#543D2D] z-30 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-xl">🦉</span>
        <span className="font-serif text-xs sm:text-sm text-parchment-200 tracking-wider uppercase font-semibold">
          Rank: <span className="text-gold">{rank}</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <span className="text-[10px] sm:text-xs font-serif text-parchment-400 uppercase tracking-widest hidden md:inline">
          Seals:
        </span>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const solved = solvedCount > index;
          return (
            <div key={index} className="relative group">
              <img
                src={solved ? '/assets/ui_seal_broken.png' : '/assets/ui_seal_unbroken.png'}
                alt={`Seal ${index + 1}`}
                className={`w-6 h-6 sm:w-7 sm:h-7 object-contain transition-transform ${
                  solved ? 'scale-110 drop-shadow-[0_0_8px_rgba(197,155,75,0.7)]' : 'opacity-85'
                }`}
              />
              <div className="absolute bottom-[-22px] left-1/2 -translate-x-1/2 bg-[#231B15] text-parchment-100 text-[9px] font-sans px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-40 border border-[#543D2D]">
                {solved ? `Seal #${index + 1} Broken` : `Seal #${index + 1} Locked`}
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={onToggleMute}
        className="p-1.5 rounded text-parchment-300 hover:text-gold hover:bg-[#3D2C20] transition"
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
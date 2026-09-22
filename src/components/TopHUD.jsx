import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';

export default function TopHUD({ solvedCount, isMuted, onToggleMute, rank = 'Apprentice Archivist' }) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-12 bg-[#2D1F17]/95 backdrop-blur-sm border-b-2 border-[#543D2D] z-40 px-4 sm:px-6 flex items-center justify-between shadow-md select-none">
      <div className="flex items-center gap-2.5">
        <img
          src="/assets/portrait_barnaby_neutral.png"
          alt="Archivist Barnaby"
          className="w-7 h-7 rounded-full border border-[#C59B4B]/80 object-cover shadow-sm flex-shrink-0"
        />
        <span className="font-serif text-xs sm:text-sm text-[#F4EBD9] tracking-wider uppercase font-semibold flex items-center gap-1.5">
          <span>Rank:</span>
          <span className="text-[#C59B4B] font-bold">{rank}</span>
        </span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-3">
        <span className="text-[11px] sm:text-xs font-serif text-[#C59B4B] uppercase tracking-widest font-semibold mr-0.5">
          Seals:
        </span>
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const solved = solvedCount > index;
          return (
            <div key={index} className="relative group">
              <img
                src={solved ? '/assets/ui_seal_broken.png' : '/assets/ui_seal_unbroken.png'}
                alt={`Seal ${index + 1}`}
                className={`w-6 h-6 sm:w-7 sm:h-7 object-contain transition-transform duration-200 ${
                  solved ? 'scale-110 drop-shadow-[0_0_8px_rgba(197,155,75,0.7)]' : 'opacity-85'
                }`}
              />
              <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#231B15] text-[#F4EBD9] text-[9px] font-serif px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-[#543D2D] shadow-md">
                {solved ? `Seal #${index + 1} Broken` : `Seal #${index + 1} Locked`}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onToggleMute}
          className="p-1.5 rounded text-[#D5C29D] hover:text-[#C59B4B] hover:bg-[#3D2C20] transition-colors"
          title={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-1.5 rounded text-[#D5C29D] hover:text-[#C59B4B] hover:bg-[#3D2C20] transition-colors hidden sm:inline-flex"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}
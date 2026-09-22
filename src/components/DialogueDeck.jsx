import React from 'react';

export default function DialogueDeck({ dialogue, mood = 'neutral', onBarnabyClick }) {
  const getPortraitSrc = () => {
    if (mood === 'happy') return '/assets/portrait_barnaby_happy.png';
    if (mood === 'thinking') return '/assets/portrait_barnaby_thinking.png';
    return '/assets/portrait_barnaby_neutral.png';
  };

  const cleanText = dialogue
    ? dialogue.replace(/^Barnaby:\s*["']?|["']$/g, '').trim()
    : '';

  return (
    <div className="fixed bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center w-[92%] sm:w-[86%] md:w-[76%] max-w-3xl pointer-events-none select-none">
      <div className="relative flex items-center w-full pointer-events-auto filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]">
        
        <div
          onClick={onBarnabyClick}
          className="relative z-20 -mr-5 sm:-mr-6 md:-mr-8 flex-shrink-0 cursor-pointer group"
          title="Click Barnaby for advice"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-[3px] sm:border-4 border-[#543D2D] bg-[#F4EBD9] shadow-[0_4px_14px_rgba(0,0,0,0.45)] overflow-hidden transition-transform duration-200 group-hover:scale-105 ring-2 ring-[#C59B4B]/70">
            <img
              src={getPortraitSrc()}
              alt="Barnaby Pendelton"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 flex-1 min-h-[82px] sm:min-h-[94px] md:min-h-[104px] bg-[#FAF3E3] border-2 sm:border-[3px] border-[#543D2D] rounded-xl sm:rounded-2xl pl-8 sm:pl-10 md:pl-12 pr-4 sm:pr-6 py-2.5 sm:py-3 flex flex-col justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.7),inset_0_-2px_4px_rgba(84,61,45,0.12)]">
          <div className="absolute inset-1 sm:inset-1.5 rounded-[10px] sm:rounded-[14px] border border-[#D5C29D]/50 pointer-events-none" />

          <div className="font-serif text-[11px] sm:text-xs md:text-sm text-[#8B3A22] uppercase tracking-wider font-bold mb-0.5 sm:mb-1 flex items-center justify-between">
            <span>Barnaby Pendelton</span>
            <span className="text-[10px] text-[#8C6F56] font-sans font-normal lowercase tracking-normal italic hidden sm:inline">Archivist Guide</span>
          </div>

          <p className="font-serif text-xs sm:text-sm md:text-[15px] text-[#2D1F17] font-medium leading-snug sm:leading-relaxed select-text line-clamp-3">
            {cleanText}
          </p>
        </div>

      </div>
    </div>
  );
}
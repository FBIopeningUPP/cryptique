import React from 'react';

export default function DialogueDeck({ dialogue, mood = 'neutral', onBarnabyClick }) {
  const getPortraitSrc = () => {
    if (mood === 'happy') return '/assets/portrait_barnaby_happy.png';
    if (mood === 'thinking') return '/assets/portrait_barnaby_thinking.png';
    return '/assets/portrait_barnaby_neutral.png';
  };

  return (
    <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 w-[94%] sm:w-[88%] md:w-[78%] max-w-4xl z-30 select-none">
      <div className="relative w-full aspect-[4.4/1] min-h-[110px] sm:min-h-[130px] flex items-center px-4 sm:px-8 py-2">
        
        <img
          src="/assets/ui_dialogue_frame.png"
          alt="Dialogue Frame"
          className="absolute inset-0 w-full h-full object-contain filter drop-shadow-[0_8px_20px_rgba(0,0,0,0.5)] pointer-events-none"
        />

        <div
          onClick={onBarnabyClick}
          className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 -ml-1 sm:ml-2 mr-3 sm:mr-6 flex-shrink-0 cursor-pointer group"
          title="Click Barnaby for advice"
        >
          <div className="w-full h-full rounded-full border-2 sm:border-3 border-[#8B3A22] bg-[#F4EBD9] shadow-md overflow-hidden transition-transform group-hover:scale-105">
            <img
              src={getPortraitSrc()}
              alt="Barnaby"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col justify-center pr-3 sm:pr-8 py-1">
          <div className="font-serif text-[11px] sm:text-xs md:text-sm text-[#8B3A22] uppercase tracking-wider font-bold mb-0.5 sm:mb-1">
            Barnaby Pendelton
          </div>
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#231B15] font-medium leading-snug sm:leading-relaxed line-clamp-3">
            {dialogue}
          </p>
        </div>

      </div>
    </div>
  );
}
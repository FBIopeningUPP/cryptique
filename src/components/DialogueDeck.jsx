import React from 'react';

export default function DialogueDeck({ dialogue, mood = 'neutral', onBarnabyClick }) {
  const getPortraitSrc = () => {
    if (mood === 'happy') return '/assets/portrait_barnaby_happy.png';
    if (mood === 'thinking') return '/assets/portrait_barnaby_thinking.png';
    return '/assets/portrait_barnaby_neutral.png';
  };

  return (
    <div className="h-[28%] w-full relative z-20 bg-[#241A14] border-t-2 border-[#543D2D] flex items-center px-4 sm:px-8 py-2">
      <img
        src="/assets/ui_dialogue_frame.png"
        alt="Dialogue Frame"
        className="absolute inset-0 w-full h-full object-fill pointer-events-none opacity-90"
      />

      <div
        onClick={onBarnabyClick}
        className="relative z-10 w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-parchment-200 rounded-lg border-2 border-[#8B5E3C] shadow-md overflow-hidden mr-4 cursor-pointer hover:scale-105 transition"
        title="Barnaby"
      >
        <img
          src={getPortraitSrc()}
          alt="Barnaby"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>

      <div className="relative z-10 flex-1 flex flex-col justify-center pr-2 sm:pr-6">
        <div className="font-serif text-[11px] sm:text-xs text-gold uppercase tracking-wider font-bold mb-1">
          Barnaby Pendelton
        </div>
        <p className="font-sans text-xs sm:text-sm text-parchment-100 leading-relaxed max-w-3xl line-clamp-3">
          {dialogue}
        </p>
      </div>
    </div>
  );
}
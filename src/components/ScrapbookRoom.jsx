import React from 'react';

export default function ScrapbookRoom({ onReturn }) {
    return (
        <div className="relative w-full h-full overflow-hidden select-none bg-[#1E1712]">
            {/*bg*/}
            <img 
            src="/assets/ending_scrapbook_bg.png"
            alt="Arthur's Scrapbook"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-80"
            />
            {/* placeholder*/}
            <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-[#2D1F17]/90 text-[#F4EBD9] border-2 border-[#C59B4B] px-8 py-4 rounded-xl text-center shadow-lg z-10">
            <h1 className="font-serif text-3xl font-bold mb-2">Memory Archive</h1>
            <p className="font-serif text-sm italic text-[#D5C29D]">
                (Expansion content goes here! You can map out new clickable puzzles just like RoomStage.)
            </p>
            </div>
            {/*teleport back wala button */}
            <button 
            onClick={onReturn}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-3 bg-[#8B3A22] hover:bg-[#F4EBD9] font-serif font-bold uppercase tracking-widest rounded-lg border-2 border-[#543D2D] transition shadow-lg z-50 cursor-pointer">
                Return to Attic
            </button>
        </div>
    );
}
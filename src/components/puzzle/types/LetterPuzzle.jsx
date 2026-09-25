import React, { useState } from 'react';
import { applyCaesarShift } from '../../../logic/cipherEngine.js';
import { playMechanicalClick } from '../../../logic/audioEngine.js';

export default function LetterPuzzle({puzzle, isMuted}) {
    const [shift, setShift] = useState(0);

    const handleShiftChange = (newShift) => {
        setShift(newShift);
        playMechanicalClick(isMuted);
    };

    const decodedLive = applyCaesarShift(puzzle.clue.cipherText, -shift);

    return (
        <div className="relative w-full max-w-lg bg-[#FAF3E3] border-2 border-[#543D2D] rounded-xl p-5 shadow-inner flex flex-col gap-4">                                                          
          <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden border border-[#D5C29D] shadow-sm">
            <img
              src="/assets/inspect_letter_bg.png"
              alt="Arthur's Letter"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-between text-[#231B15] font-serif">
              <div>
                <p className="text-xs text-[#8C6F56] uppercase tracking-widest font-bold mb-1">
                  Dear Sister,
                </p>
                <p className="text-xs sm:text-sm leading-relaxed">
                  If you are reading this, our childhood secrets are still resting where we left them.
                  Beware of prying eyes—decrypt the postscript using the shift wheel below.
                </p>
              </div>
              <div className="bg-[#EFE2CE]/95 border border-[#C59B4B] p-2.5 rounded font-mono text-xs sm:text-sm font-bold tracking-widest text-[#8B3A22]">
                {decodedLive}
              </div>                                                                                                                                                                               
            </div>                                                                                                                                                                                 
          </div>                                                                                                                                                                                   

          <div className="bg-[#EDE2CE] border border-[#D5C29D] rounded-lg p-3 flex flex-col gap-2">                                                                                                
            <div className="flex justify-between items-center text-xs font-serif font-bold text-[#2D1F17]">                                                                                        
              <span>Caesar Shift Wheel:</span>                                                                                                                                                     
              <span className="text-[#8B3A22] text-sm">Shift: -{shift}</span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={shift}
              onChange={(e) => handleShiftChange(parseInt(e.target.value, 10))}
              className="w-full accent-[#8B3A22] cursor-pointer"
            />
          </div>
        </div>
    );
}
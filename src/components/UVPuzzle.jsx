import React, {useEffect, useRef, useState} from 'react';
import { playSuccessChime, playMechanicalClick } from '../logic/audioEngine.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

export default function UVPuzzle({isMuted=false}) {
  const [mousePos, setMousePos] = useState({x: -1000, y: -1000});
  const [enteredCode, setEnteredCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useLocalStorage('cryptique_uv_unlocked', false);
  const [errorShake, setErrorShake] = useState(false);
  const containerRef = useRef(null);
  const resetTimeoutRef = useRef(null);

  const SECRET_CODE = '8241';

  useEffect(() => () => clearTimeout(resetTimeoutRef.current), []);

  const updateCoordinates = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleDigitPress = (digit) => {
    if (isUnlocked || enteredCode.length >= 4) return;
    playMechanicalClick(isMuted);
    const next = enteredCode + digit;
    setEnteredCode(next);

    if (next.length === 4) {
      if (next === SECRET_CODE) {
        setIsUnlocked(true);
        playSuccessChime(isMuted);
      } else {
        setErrorShake(true);
        resetTimeoutRef.current = setTimeout(() => {
          setEnteredCode('');
          setErrorShake(false);
        }, 700);
      }
    }
  };

  const handleClear = () => {
    playMechanicalClick(isMuted);
    setEnteredCode('');
  };

  return (
        <div className="flex flex-col items-center gap-4">                                                                                                                                                                                                                 
          {/* UV Flashlight Examination Slate */}                                                                                                                                                                                                                          
          <div                                                                                                                                                                                                                                                             
            className="relative w-80 h-72 sm:w-96 sm:h-80 bg-[#EFE5D3] border-4 border-[#543D2D] rounded-xl shadow-2xl cursor-crosshair overflow-hidden select-none"                                                                                                       
            onMouseMove={handleMouseMove}                                                                                                                                                                                                                                  
            onTouchMove={handleTouchMove}                                                                                                                                                                                                                                  
            ref={containerRef}                                                                                                                                                                                                                                             
          >                                                                                                                                                                                                                                                                
            {/* Ambient UV light glow cursor */}                                                                                                                                                                                                                           
            <div                                                                                                                                                                                                                                                           
              className="pointer-events-none absolute w-32 h-32 rounded-full -translate-x-1/2 -translate-y-1/2 transition-opacity duration-150"                                                                                                                            
              style={{                                                                                                                                                                                                                                                     
                left: `${mousePos.x}px`,                                                                                                                                                                                                                                   
                top: `${mousePos.y}px`,                                                                                                                                                                                                                                    
                background: 'radial-gradient(circle, rgba(168, 85, 247, 0.45) 0%, rgba(91, 33, 182, 0.15) 50%, transparent 75%)',                                                                                                                                          
              }}                                                                                                                                                                                                                                                           
            />                                                                                                                                                                                                                                                             
                                                                                                                                                                                                                                                                           
            {/* Base Layer: Weathered Paper Page */}                                                                                                                                                                                                                       
            <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center font-serif pointer-events-none">                                                                                                                                    
              <div className="text-xs uppercase tracking-widest text-[#8C6F56] border-b border-[#D8C7B0] pb-1 mb-2 font-mono">                                                                                                                                             
                Arthur's Field Specimen — 1968                                                                                                                                                                                                                             
              </div>                                                                                                                                                                                                                                                       
              <h2 className="text-xl font-bold text-[#543D2D] mb-1">Margaret's Secret Note</h2>                                                                                                                                                                            
              <p className="text-xs text-[#8C6F56] italic max-w-xs leading-relaxed">                                                                                                                                                                                       
                "Only under the light of our starlit night can the hidden numbers be seen..."                                                                                                                                                                              
              </p>                                                                                                                                                                                                                                                         
              <div className="mt-3 text-[11px] font-mono text-[#A89481]">                                                                                                                                                                                                  
                [ Move flashlight beam across the page ]                                                                                                                                                                                                                   
              </div>                                                                                                                                                                                                                                                       
            </div>                                                                                                                                                                                                                                                         
                                                                                                                                                                                                                                                                           
            {/* Hidden Layer revealed by UV mask */}                                                                                                                                                                                                                       
            <div                                                                                                                                                                                                                                                           
              className="absolute inset-0 bg-[#0F0B18] p-6 flex flex-col items-center justify-center pointer-events-none transition-all"                                                                                                                                   
              style={{                                                                                                                                                                                                                                                     
                WebkitMaskImage: `radial-gradient(circle 65px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,                                                                                                                                            
                maskImage: `radial-gradient(circle 65px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,                                                                                                                                                  
              }}                                                                                                                                                                                                                                                           
            >                                                                                                                                                                                                                                                              
              <div className="text-center">                                                                                                                                                                                                                                
                <div className="text-xs text-purple-300 font-mono tracking-widest mb-1 opacity-80">                                                                                                                                                                        
                  FLUORESCENT CIPHER                                                                                                                                                                                                                                       
                </div>                                                                                                                                                                                                                                                     
                <div className="font-mono text-3xl font-black text-[#4ade80] tracking-[0.25em] drop-shadow-[0_0_12px_rgba(74,222,128,0.9)]">                                                                                                                               
                  CODE: 8241                                                                                                                                                                                                                                               
                </div>                                                                                                                                                                                                                                                     
                <div className="text-[11px] text-purple-200 mt-2 italic">                                                                                                                                                                                                  
                  "Turn the tumblers to release the latch."                                                                                                                                                                                                                
                </div>                                                                                                                                                                                                                                                     
              </div>                                                                                                                                                                                                                                                       
            </div>                                                                                                                                                                                                                                                         
          </div>                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                           
          {/* 4-Digit Combination Lock or Unlocked Reward */}                                                                                                                                                                                                              
          {!isUnlocked ? (                                                                                                                                                                                                                                                 
            <div className="bg-[#2D2119]/90 border-2 border-[#8B7355] rounded-xl p-4 shadow-xl flex flex-col items-center gap-3 backdrop-blur-sm">                                                                                                                         
              <div className="text-xs text-[#E6D7C3] uppercase tracking-wider font-serif">                                                                                                                                                                                 
                Enter 4-Digit Cipher                                                                                                                                                                                                                                       
              </div>                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                           
              {/* 4 Slots */}                                                                                                                                                                                                                                              
              <div className={`flex gap-3 ${errorShake ? 'animate-bounce text-red-400' : ''}`}>                                                                                                                                                                            
                {[0, 1, 2, 3].map((slot) => (                                                                                                                                                                                                                              
                  <div                                                                                                                                                                                                                                                     
                    key={slot}                                                                                                                                                                                                                                             
                    className="w-10 h-12 bg-[#1A120B] border-2 border-[#A27B5C] rounded flex items-center justify-center font-mono text-2xl font-bold text-[#F4EBD9] shadow-inner"                                                                                         
                  >                                                                                                                                                                                                                                                        
                    {enteredCode[slot] || '•'}                                                                                                                                                                                                                             
                  </div>                                                                                                                                                                                                                                                   
                ))}                                                                                                                                                                                                                                                        
              </div>
  
              {/* Keypad */}
              <div className="grid grid-cols-3 gap-2 mt-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleDigitPress(String(num))}
                    className="w-12 h-10 bg-[#3F2E22] hover:bg-[#5A4232] active:scale-95 text-[#F4EBD9] font-mono font-bold rounded border border-[#7A5C43] transition shadow cursor-pointer text-sm"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handleClear}
                  className="w-12 h-10 bg-[#5A2D22] hover:bg-[#743A2C] active:scale-95 text-xs text-red-200 uppercase font-mono rounded border border-[#8C4A3A] transition shadow cursor-pointer"
                >
                  Clr
                </button>
                <button
                  onClick={() => handleDigitPress('0')}
                  className="w-12 h-10 bg-[#3F2E22] hover:bg-[#5A4232] active:scale-95 text-[#F4EBD9] font-mono font-bold rounded border border-[#7A5C43] transition shadow cursor-pointer text-sm"
                >
                  0
                </button>
                <div className="w-12 h-10" />
              </div>
            </div>
          ) : (
            /* Reward Card when Unlocked */
            <div className="bg-[#1A120B]/95 border-2 border-[#D4AF37] rounded-xl p-5 shadow-2xl max-w-sm text-center animate-fade-in backdrop-blur-sm">
              <div className="text-2xl mb-1">🗝️ ✨</div>
              <h3 className="font-serif font-bold text-lg text-[#D4AF37]">
                Margaret's Keepsake Locket
              </h3>
              <p className="font-serif italic text-xs text-[#C5A880] mt-2 leading-relaxed">
                "To Arthur — my partner across every sky and star. Our journey never truly ends as long as someone remembers the wonder."
              </p>
              <div className="mt-3 text-[11px] font-mono text-[#7ED957] uppercase tracking-wider">
                ✦ All Secrets of the Archive Discovered ✦
              </div>
            </div>
          )}
        </div>
      );
}

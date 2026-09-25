import React, {useState} from 'react';
import { ChevronUp, ChevronDown, Lock, Unlock} from 'lucide-react';
import { rotateTumbler, isCombinationCorrect } from '../../../logic/safeLockEngine.js';
import { playMechanicalClick, playSucessChime, playSealStamp } from '../../../logic/audioEngine.js';

export default function SafePuzzle({puzzle, isSolved, onSolve, isMuted}) {
    const [dials, setDials] = useState([0, 0, 0, 0]);
    const [errorShake, setErrorShake] = useState(false);

    const handleDialStep = (idx, delta) => {
        if (isSolved) return;
        setDials((prev) => rotateTumbler(prev, idx, delta));
        playMechanicalClick(isMuted);
    };
    const handlePullLever = () => {
        if (isSolved) return;
        if (isCombinationCorrect(dials)) {
            playSucessChime(isMuted);
            onSolve('3437');
        } else {
            playSealStamp(isMuted);
            setErrorShake(true);
            setTimeout(() => setErrorShake(false), 500);
        }
    };
    return (                                                                                                                                                                                     
        <div className="flex flex-col items-center gap-4 w-full max-w-md bg-[#FAF3E3] border-2 border-[#543D2D] rounded-xl p-5 shadow-inner">                                                      
          <div className={`relative aspect-square w-64 sm:w-72 rounded-xl overflow-hidden border border-[#D5C29D] shadow-md ${errorShake ? 'animate-bounce' : ''}`}>                               
            <img                                                                                                                                                                                   
              src="/assets/inspect_safe_faceplate.png"                                                                                                                                             
              alt="Clockwork Safe Faceplate"                                                                                                                                                       
              className="w-full h-full object-cover"                                                                                                                                               
            />                                                                                                                                                                                     
                                                                                                                                                                                                   
            <div className="absolute inset-0 flex items-center justify-center gap-2.5 sm:gap-3 px-4">                                                                                              
              {dials.map((digit, idx) => (                                                                                                                                                         
                <div key={idx} className="flex flex-col items-center">                                                                                                                             
                  <button                                                                                                                                                                          
                    type="button"                                                                                                                                                                  
                    onClick={() => handleDialStep(idx, 1)}                                                                                                                                         
                    disabled={isSolved}                                                                                                                                                            
                    className="p-1 text-[#8B3A22] hover:scale-125 transition active:scale-95 disabled:opacity-50"                                                                                  
                    title="Increment Dial"                                                                                                                                                         
                  >                                                                                                                                                                                
                    <ChevronUp className="w-5 h-5" />                                                                                                                                              
                  </button>                                                                                                                                                                        
                                                                                                                                                                                                   
                  <div className="w-9 h-12 sm:w-10 sm:h-14 bg-[#231A13] border-2 border-[#C59B4B] rounded flex items-center justify-center font-mono text-xl sm:text-2xl font-bold text-[#FFE57F] shadow-inner">                                                                                                                                                                                   
                    {digit}                                                                                                                                                                        
                  </div>                                                                                                                                                                           
                                                                                                                                                                                                   
                  <button                                                                                                                                                                          
                    type="button"                                                                                                                                                                  
                    onClick={() => handleDialStep(idx, -1)}                                                                                                                                        
                    disabled={isSolved}                                                                                                                                                            
                    className="p-1 text-[#8B3A22] hover:scale-125 transition active:scale-95 disabled:opacity-50"                                                                                  
                    title="Decrement Dial"                                                                                                                                                         
                  >                                                                                                                                                                                
                    <ChevronDown className="w-5 h-5" />                                                                                                                                            
                  </button>                                                                                                                                                                        
                </div>                                                                                                                                                                             
              ))}                                                                                                                                                                                  
            </div>                                                                                                                                                                                 
          </div>                                                                                                                                                                                   
                                                                                                                                                                                                   
          <div className="w-full bg-[#EDE2CE] border border-[#D5C29D] p-3 rounded-lg text-xs font-serif text-[#4A3525] space-y-1">                                                                 
            <div className="font-bold text-[#8B3A22] uppercase tracking-wider mb-1">                                                                                                               
              Lockbox Tumbler Clues:                                                                                                                                                               
            </div>                                                                                                                                                                                 
            <p>I: The Caesar shift from Arthur's letter</p>                                                                                                                                        
            <p>II: Final digit of the blackout photo year</p>                                                                                                                                      
            <p>III: Dots in telegraph transmission's first letter</p>                                                                                                                              
            <p>IV: Number of letters in secret fiber word</p>                                                                                                                                      
          </div>                                                                                                                                                                                   
                                                                                                                                                                                                   
          <button                                                                                                                                                                                  
            onClick={handlePullLever}                                                                                                                                                              
            disabled={isSolved}                                                                                                                                                                    
            className={`w-full py-3 flex items-center justify-center gap-2 rounded-lg font-serif text-xs uppercase tracking-wider font-bold transition shadow ${                                   
              isSolved                                                                                                                                                                             
                ? 'bg-[#2E3B2E] text-[#88C088] cursor-default'                                                                                                                                     
                : 'bg-[#8B3A22] hover:bg-[#A34327] text-white active:scale-95'                                                                                                                     
            }`}                                                                                                                                                                                    
        >                                                                                                                                                                                        
        {isSolved ? (                                                                                                                                                                          
            <>                                                                                                                                                                                   
            <Unlock className="w-4 h-4" />
            <span>Vault Tumblers Released ✓</span>
            </>
        ) : (
            <>
            <Lock className="w-4 h-4" />
            <span>Pull Release Lever</span>
            </>
            )}
          </button>
        </div>
    );  
}
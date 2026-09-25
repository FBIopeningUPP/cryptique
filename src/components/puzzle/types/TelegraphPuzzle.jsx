import React, {useState, useRef, useEffect} from 'react';
import {Volume2, FileText} from 'lucide-react';
import { playMorseTone } from '../../../logic/audioEngine.js';
import { compileMorseSchedule } from '../../../logic/morseEngine.js';

export default function TelegraphPuzzle({puzzle, isMuted}) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isBulbLit, setIsBulbLit] = useState(false);
    const [showChart, setShowChart] = useState(false);
    const timeoutsRef = useRef([]);

    const stopPlayback = () => {
        timeoutsRef.current.forEach((t) => clearTimeout(t));
        timeoutsRef.current = [];
        setIsBulbLit(false);
        setIsPlaying(false);
    };

    useEffect(() => {
        return () => {
            timeoutsRef.current.forEach((t) => clearTimeout(t));
        };
    }, []);

    const handlePlayTransmission = () => {
        if (isPlaying) {
            stopPlayback();
            return;
        }

        setIsPlaying(true);
        const schedule = compileMorseSchedule(puzzle.clue.morseSequence, 130);
        let cumulativeDelay = 0;

        schedule.forEach((step, idx) => {
            const timeoutId = setTimeout(() => {
                if (step.type === 'ON') {
                    setIsBulbLit(true);
                    playMorseTone(step.durationMs, 720, isMuted);
                } else {
                    setIsBulbLit(false);
                }
                if (idx === schedule.length - 1) {
                    const finishId = setTimeout(() => {
                        setIsBulbLit(false);
                        setIsPlaying(false);
                    }, step.durationMs);
                    timeoutsRef.current.push(finishId);
                }
            }, cumulativeDelay);

            timeoutsRef.current.push(timeoutId);
            cumulativeDelay += step.durationMs;
        });
    };
    return (                                                                                                                                                                                     
        <div className="flex flex-col items-center gap-4 w-full max-w-md bg-[#FAF3E3] border-2 border-[#543D2D] rounded-xl p-4 shadow-inner">                                                      
          <div className="relative aspect-square w-64 rounded-lg overflow-hidden border border-[#D5C29D] bg-[#2A1D15]">                                                                            
            <img                                                                                                                                                                                   
              src="/assets/inspect_telegraph.png"                                                                                                                                                  
              alt="Brass Telegraph Key"                                                                                                                                                            
              className="w-full h-full object-cover"                                                                                                                                               
            />                                                                                                                                                                                     
                                                                                                                                                                                                   
            {isBulbLit && (                                                                                                                                                                        
              <div className="absolute top-[22%] right-[18%] w-12 h-12 rounded-full bg-[#FFE57F]/80 filter blur-md pointer-events-none animate-pulse" />                                           
            )}                                                                                                                                                                                     
          </div>                                                                                                                                                                                   
                                                                                                                                                                                                   
          <div className="flex gap-2 w-full">                                                                                                                                                      
            <button                                                                                                                                                                                
              onClick={handlePlayTransmission}                                                                                                                                                     
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-serif text-xs uppercase tracking-wider font-bold transition shadow ${                          
                isPlaying                                                                                                                                                                          
                  ? 'bg-[#C59B4B] text-[#2D1F17]'                                                                                                                                                  
                  : 'bg-[#8B3A22] hover:bg-[#A34327] text-white active:scale-95'                                                                                                                   
              }`}                                                                                                                                                                                  
            >                                                                                                                                                                                      
              <Volume2 className="w-4 h-4" />                                                                                                                                                      
              <span>{isPlaying ? 'Transmitting (Click to Stop)...' : 'Play Transmission'}</span>                                                                                                   
            </button>                                                                                                                                                                              
                                                                                                                                                                                                   
            <button                                                                                                                                                                                
              onClick={() => setShowChart(!showChart)}                                                                                                                                             
              className="flex items-center gap-1 py-2.5 px-3 bg-[#EDE2CE] border border-[#543D2D] rounded-lg font-serif text-xs text-[#2D1F17] hover:bg-[#DFD3BE] transition"                      
            >                                                                                                                                                                                      
              <FileText className="w-3.5 h-3.5" />                                                                                                                                                 
              <span>{showChart ? 'Hide Chart' : 'Morse Chart'}</span>                                                                                                                              
            </button>
          </div>
  
          {showChart && (
            <div className="w-full bg-[#EDE2CE] border border-[#D5C29D] p-3 rounded-lg text-[11px] font-mono grid grid-cols-4 gap-1 text-[#2D1F17] shadow-inner">
              <span>A: .-</span><span>B: -...</span><span>C: -.-.</span><span>D: -..</span>
              <span>E: .</span><span>F: ..-.</span><span>G: --.</span><span>H: ....</span>
              <span>I: ..</span><span>L: .-..</span><span>M: --</span><span>N: -.</span>
              <span>O: ---</span><span>R: .-.</span><span>S: ...</span><span>T: -</span>
            </div>
          )}
        </div>
    );
}
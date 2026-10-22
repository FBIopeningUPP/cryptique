import React, {useEffect, useRef, useState} from 'react';
import { Clock, RotateCcw, RotateCw } from 'lucide-react';
import { playMechanicalClick, playSealStamp, playSuccessChime } from '../../../logic/audioEngine.js';

export default function ClockPuzzle({puzzle, isSolved, onSolve, isMuted}) {
    const [hours, setHours] = useState(12);
    const [minutes, setMinutes] = useState(0);
    const [hasError, setHasError] = useState(false);
    const errorTimeoutRef = useRef(null);

    useEffect(() => () => clearTimeout(errorTimeoutRef.current), []);

    const handleRotate = (type, direction) => {
        if (isSolved) return;
        playMechanicalClick(isMuted);

        if (type === 'hours') {
            setHours(prev => {
                let next = prev + direction;
                if (next > 12) return 1;
                if (next < 1) return 12;
                return next;
            });
        } else {
            setMinutes(prev => {
                let next = prev + (direction * 5);
                if (next >= 60) return 0;
                if (next < 0) return 55;
                return next;
            });
        }
    };

    const checkSolution = () => {
        if (isSolved) return;
        if (hours === 11 && minutes === 45) {
            clearTimeout(errorTimeoutRef.current);
            setHasError(false);
            playSuccessChime(isMuted);
            onSolve('1145');
        } else {
            playSealStamp(isMuted);
            setHasError(true);
            clearTimeout(errorTimeoutRef.current);
            errorTimeoutRef.current = setTimeout(() => setHasError(false), 600);
        }
    };

    return (
        <div className={`flex flex-col items-center gap-4 w-full max-w-md bg-[#FAF3E3] border-2 border-[#543D2D] rounded-xl p-5 shadow-inner ${hasError ? 'animate-shake' : ''}`}>
            <div className="relative aspect-square w-64 rounded-xl overflow-hidden border border-[#D5C29D] shadow-md bg-[#231A13] flex items-center justify-center">

                <div className="relative w-48 h-48 rounded-full border-4 border-[#C59B4B] bg-[#EFE5D3] shadow-inner flex items-center justify-center">

                    {Array.from({ length: 12 }, (_, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        return (
                            <span
                                key={i}
                                aria-hidden="true"
                                className="absolute font-serif text-sm font-bold text-[#2D1F17] -translate-x-1/2 -translate-y-1/2"
                                style={{
                                    left: `${50 + 40 * Math.sin(angle)}%`,
                                    top: `${50 - 40 * Math.cos(angle)}%`,
                                }}
                            >
                                {i === 0 ? 12 : i}
                            </span>
                        );
                    })}

                    <div className="absolute w-3 h-3 bg-[#2D1F17] rounded-full z-20 shadow-sm border border-[#C59B4B]"></div>

                    <div
                        className="absolute left-1/2 bottom-1/2 w-1.5 h-12 bg-[#2D1F17] rounded-full origin-bottom z-10 transition-transform duration-200"
                        style={{ transform: `translateX(-50%) rotate(${(hours % 12) * 30 + minutes / 2}deg)` }}
                    ></div>
                    <div
                        className="absolute left-1/2 bottom-1/2 w-1 h-[4.25rem] bg-[#543D2D] rounded-full origin-bottom z-10 transition-transform duration-200"
                        style={{ transform: `translateX(-50%) rotate(${minutes * 6}deg)` }}
                    ></div>
                </div>
            </div>

            <div className="w-full flex gap-4 justify-between bg-[#EDE2CE] border border-[#D5C29D] p-3 rounded-lg text-[#4A3525]">
                <div className="flex flex-col items-center gap-1">
                    <span className="font-serif text-[10px] uppercase font-bold text-[#8B3A22]">Hours</span>
                    <div className="flex gap-2">
                        <button onClick={() => handleRotate('hours', -1)} aria-label="Hour hand back" disabled={isSolved} className="p-1.5 bg-[#FAF3E3] border border-[#C59B4B] rounded hover:bg-[#EFE5D3] active:scale-95 disabled:opacity-50 text-[#2D1F17]">
                            <RotateCcw className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button onClick={() => handleRotate('hours', 1)} aria-label="Hour hand forward" disabled={isSolved} className="p-1.5 bg-[#FAF3E3] border border-[#C59B4B] rounded hover:bg-[#EFE5D3] active:scale-95 disabled:opacity-50 text-[#2D1F17]">
                            <RotateCw className="w-4 h-4" aria-hidden="true" />
                        </button>
                    </div>
                </div>

                <div className="self-center font-mono text-lg font-bold text-[#2D1F17]" aria-live="polite">
                    {hours}:{String(minutes).padStart(2, '0')}
                </div>

                <div className="flex flex-col items-center gap-1">
                    <span className="font-serif text-[10px] uppercase font-bold text-[#8B3A22]">Minutes</span>
                    <div className="flex gap-2">
                        <button onClick={() => handleRotate('minutes', -1)} aria-label="Minute hand back" disabled={isSolved} className="p-1.5 bg-[#FAF3E3] border border-[#C59B4B] rounded hover:bg-[#EFE5D3] active:scale-95 disabled:opacity-50 text-[#2D1F17]">
                            <RotateCcw className="w-4 h-4" aria-hidden="true" />
                        </button>
                        <button onClick={() => handleRotate('minutes', 1)} aria-label="Minute hand forward" disabled={isSolved} className="p-1.5 bg-[#FAF3E3] border border-[#C59B4B] rounded hover:bg-[#EFE5D3] active:scale-95 disabled:opacity-50 text-[#2D1F17]">
                            <RotateCw className="w-4 h-4" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={checkSolution}
                disabled={isSolved}
                className={`w-full py-3 flex items-center justify-center gap-2 rounded-lg font-serif text-xs uppercase tracking-wider font-bold transition shadow ${
                isSolved
                    ? 'bg-[#2E3B2E] text-[#88C088] cursor-default'
                    : 'bg-[#8B3A22] hover:bg-[#A34327] text-white active:scale-95'
                }`}
            >
                <Clock className="w-4 h-4" />
                <span>{isSolved ? 'Time Aligned ✓' : 'Test Alignment'}</span>
            </button>
            {hasError && (
                <p className="text-[#8B3A22] text-xs font-serif italic font-semibold" role="alert">
                    The mechanism rejects that alignment. Check Arthur's frozen moment again.
                </p>
            )}
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playMechanicalClick, playSuccessChime } from '../logic/audioEngine.js';
import { asset } from '../assets.js';

const STARS = [
  { id: 1, x: 22, y: 28, name: 'Schedar' },
  { id: 2, x: 74, y: 26, name: 'Caph' },
  { id: 3, x: 50, y: 48, name: 'Navi' },
  { id: 4, x: 32, y: 68, name: 'Ruchbah' },
  { id: 5, x: 70, y: 82, name: 'Segin' },
  { id: 6, x: 86, y: 44, name: 'Achird' },
  { id: 7, x: 16, y: 54, name: 'Marfak' },
];

const CORRECT_SEQUENCE = [7, 4, 3, 2, 6];

export default function StarMapPuzzle({ isOpen, onClose, isMuted = false }) {
  const [sequence, setSequence] = useState([]);
  const [isSolved, setIsSolved] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (sequence.length === CORRECT_SEQUENCE.length) {
      const isCorrect = sequence.every((star, index) => star === CORRECT_SEQUENCE[index]);
      if (isCorrect) {
        setIsSolved(true);
        playSuccessChime(isMuted);
        confetti({
          particleCount: 110,
          spread: 85,
          origin: { y: 0.5 },
          colors: ['#FFE57F', '#C59B4B', '#FFFFFF', '#93C5FD'],
        });
      } else {
        setHasError(true);
        setTimeout(() => {
          setSequence([]);
          setHasError(false);
        }, 600);
      }
    }
  }, [sequence, isMuted]);

  if (!isOpen) return null;

  const handleStarClick = (id) => {
    if (isSolved || sequence.includes(id)) return;
    playMechanicalClick(isMuted);
    setSequence((prev) => [...prev, id]);
  };

  const handleReset = () => {
    playMechanicalClick(isMuted);
    setSequence([]);
    setIsSolved(false);
    setHasError(false);
  };

  const getStarCoords = (id) => STARS.find((s) => s.id === id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 select-none animate-fade-in">
      <div className="relative w-full max-w-3xl aspect-[4/3] bg-[#0A0D14] border-4 border-[#C59B4B] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(197,155,75,0.35)] flex flex-col justify-between">
        
        <img
          src={asset('astromap')}
          alt="Celestial Chart"
          className="absolute inset-0 w-full h-full object-cover opacity-75 pointer-events-none"
        />

        <div className="relative z-20 flex items-center justify-between p-4 bg-[#140E0A]/90 border-b border-[#543D2D]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FFE57F]" />
            <h2 className="font-serif text-xs sm:text-sm text-[#F4EBD9] uppercase tracking-widest font-bold">
              Arthur's Celestial Chart — Trace Cassiopeia
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="p-1.5 text-[#C59B4B] hover:text-[#FFE57F] hover:bg-[#2A1D15] rounded-lg transition"
              title="Reset Star Links"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#D5C29D] hover:text-white hover:bg-[#2A1D15] rounded-lg transition"
              title="Close Map"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          {sequence.map((starId, index) => {
            if (index === 0) return null;
            const prevStar = getStarCoords(sequence[index - 1]);
            const currStar = getStarCoords(starId);
            if (!prevStar || !currStar) return null;

            return (
              <line
                key={`line-${index}`}
                x1={`${prevStar.x}%`}
                y1={`${prevStar.y}%`}
                x2={`${currStar.x}%`}
                y2={`${currStar.y}%`}
                stroke={hasError ? '#EF4444' : isSolved ? '#4ADE80' : '#FFE57F'}
                strokeWidth={isSolved ? '3.5' : '2.5'}
                strokeDasharray={isSolved ? 'none' : '4 2'}
                className="transition-all duration-300 drop-shadow-[0_0_8px_rgba(255,229,127,0.8)]"
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 z-15 pointer-events-none">
          {STARS.map((star) => {
            const isSelected = sequence.includes(star.id);
            const orderIndex = sequence.indexOf(star.id);

            return (
              <div
                key={star.id}
                onClick={() => handleStarClick(star.id)}
                className={`pointer-events-auto absolute w-10 h-10 -ml-5 -mt-5 rounded-full cursor-pointer transition-all duration-300 flex flex-col items-center justify-center group ${
                  isSelected
                    ? isSolved
                      ? 'bg-emerald-500/30 scale-125'
                      : 'bg-amber-400/30 scale-110'
                    : 'hover:bg-white/20 hover:scale-110'
                }`}
                style={{ left: `${star.x}%`, top: `${star.y}%` }}
                title={star.name}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-transform ${
                    isSelected
                      ? isSolved
                        ? 'bg-emerald-300 shadow-[0_0_12px_#34D399]'
                        : 'bg-[#FFE57F] shadow-[0_0_12px_#FFE57F]'
                      : 'bg-[#D5C29D] shadow-[0_0_6px_#C59B4B] group-hover:bg-white'
                  }`}
                />
                {orderIndex !== -1 && (
                  <span className="text-[10px] font-mono font-bold text-[#FFE57F] mt-0.5 drop-shadow">
                    {orderIndex + 1}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="relative z-20 p-3 bg-[#140E0A]/95 border-t border-[#543D2D] text-center">
          {isSolved ? (
            <div className="text-xs sm:text-sm font-serif font-bold text-emerald-300 tracking-wider animate-pulse">
              ✦ CASSIOPEIA ALIGNED ✦ Lat 44°18'22" N, Lon 71°16'48" W — Darkroom Key: 8241
            </div>
          ) : (
            <p className="font-serif italic text-xs text-[#D5C29D]">
              {hasError
                ? 'The star alignment flickered... That constellation path is incorrect.'
                : 'Click 5 stars in order to trace the Queen Cassiopeia constellation across the northern sky.'}
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { X, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

const STARTS = [
   { id: 1, x: 20, y: 30 },
   { id: 2, x: 75, y: 25 },
   { id: 3, x: 50, y: 50 },
   { id: 4, x: 30, y: 70 },
   { id: 5, x: 70, y: 80 },
   { id: 6, x: 85, y: 45 },
   { id: 7, x: 15, y: 55 },
];
const CORRECT_SEQUENCE = [7, 4, 3, 2, 6];

export default function StarMapPuzzle({ isOpen, onClose }) {
    const [sequence, setSequence] = useState([]);
    const [isSolved, setIsSolved] = useState(false);

    useEffect(() => {
        if (sequence.length === CORRECT_SEQUENCE.length) {
            const isCorrect = sequence.every((star, index) => star === CORRECT_SEQUENCE[index]);
            if (isCorrect) {
                setIsSolved(true);
                confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 }, colors: ['#C59B4B', '#FFFFFF'] });
            } else {
                setTimeout(() => setSequence([]), 500);
            }
        }
    }, [sequence]);
    if (!isOpen) return null;

    const handleStarClick = (id) => {
        if (isSolved || sequence.includes(id)) return;
        setSequence([...sequence,id]);
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6 select-none">
            <div className="relative w-full max-w-3xl aspect-[4/3] bg-[#0A0D14] border-4 border-[#C59B4B] rounded-xl overflow-hidden shadow-[0_0_50px_rgba(197,155,75,0.2)]">
            <img 
               src="/assets/astromap.png"
               alt="Star Map"
               className="absolute inset-0 w-full h-full object-cover opacity-80"
               />
            {STARTS.map((star) => {
                const isSelected = sequence.includes(star.id);
                return (
                    <div 
                       key={star.id}
                       onClick={() => handleStarClick(star.id)}
                       className={`absolute w-8 h-8 -ml-4 -mt-4 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${isSelected ? 'bg-white/30 shadow-[0_0_15px_rgba(255,255,255,0.8)]' : 'hover:bg-white/10'}`}
                       style={{ left: `${star.x}%`, top: `${star.y}%` }}
                    >
                        <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-white shadow-[0_0_10px_white]' : 'bg-[#D5C29D] shadow-[0_0_5px_#C59B4B]'}`} />
                    </div>
                );
            })}   
            </div>
        </div>
    )
}
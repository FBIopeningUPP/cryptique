 import React, { useState, useRef } from 'react';
 import confetti from 'canvas-confetti'

    export default function UVPuzzle() {
      const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
      const [guess, setGuess] = useState('');
      const [isSolved, setIsSolved] = useState(false);
      const containerRef = useRef(null);

      const handleMouseMove = (e) => {
        if (!containerRef.current || isSolved) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        if(guess === '8241') {
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#4ade80', '#C59D4B', '#F4EBD9'],
            disableForReducedMotion: true
          });
        }
      };

      return (
        <div className="flex flex-col items-center gap-6 mt-10">

          {/* uv lightbox */}
          <div
            className={`relative w-96 h-96 bg-[#EFE5D3] border-2 border-[#543D2D] rounded-lg shadow-md overflow-hidden ${isSolved ? 'opacity-60' : 'cursor-crosshair'}`}
            onMouseMove={handleMouseMove}
            ref={containerRef}
          >
            {/* L1: Dusty Paper */}
            <div
              className="absolute inset-0 p-6 flex flex-col items-center justify-center text-[#2D1F17] text-center font-serif bg-cover bg-center"
              style={{ backgroundImage: "url('/assets/blankpage,sp.png')" }}
            >
              <h2 className="text-xl font-bold mb-2">{isSolved ? "Secret Found" : "A Blank Page"}</h2>
              <p className="text-sm italic text-[#8B3A22] font-bold">
                {isSolved ? "The UV ink has faded forever." : "Nothing but old dust here... sweep your light across it."}
              </p>
            </div>

            {/* L2: hidden nos */}
            {!isSolved && (
              <div
                className="absolute inset-0 pointer-events-none bg-cover bg-center"
                style={{
                  backgroundImage: "url('/assets/hiddenUV.png')",
                  WebkitMaskImage: `radial-gradient(circle 60px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                  maskImage: `radial-gradient(circle 60px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                }}
              >
                <span className="absolute text-4xl font-bold text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" style={{ top: '30%', left: '20%' }}>8</span>
                <span className="absolute text-4xl font-bold text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" style={{ top: '75%', left: '40%' }}>2</span>
                <span className="absolute text-4xl font-bold text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" style={{ top: '20%', left: '60%' }}>4</span>
                <span className="absolute text-4xl font-bold text-[#4ade80] drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]" style={{ top: '65%', left: '80%' }}>1</span>
              </div>
            )}
          </div>

          //form
          <form onSubmit={handleSubmit} className="flex gap-3 items-center z-10">
            <input
              type="text"
              maxLength={4}
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={isSolved}
              placeholder="4 Digits"
              className="bg-[#EFE5D3] border-2 border-[#543D2D] rounded px-4 py-2 text-[#2D1F17] font-bold font-serif text-center outline-none focus:border-[#C59B4B] disabled:opacity-50 w-32 shadow-sm"
            />
            <button
              type="submit"
              disabled={isSolved || guess.length !== 4}
              className="px-6 py-2 bg-[#8B3A22] text-[#F4EBD9] font-serif font-bold uppercase tracking-widest rounded border-2 border-[#543D2D] hover:bg-[#A34327] disabled:opacity-50 transition cursor-pointer shadow-sm"
            >
              {isSolved ? 'Solved!' : 'Unlock'}
            </button>
          </form>

        </div>
      );
    }
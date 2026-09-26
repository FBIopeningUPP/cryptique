import React, { useState, useRef } from 'react';
import { Lock, Unlock, KeyRound, CheckCircle2 } from 'lucide-react';
import { playMechanicalClick, playSuccessChime, playSealStamp } from '../logic/audioEngine.js';

export default function UVPuzzle({ isMuted = false }) {
  const [mousePos, setMousePos] = useState({ x: 190, y: 190 });
  const [isHovered, setIsHovered] = useState(false);
  const [codeVal, setCodeVal] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef(null);

  const updateCoordinates = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    setIsHovered(true);
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length > 0) {
      setIsHovered(true);
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (isUnlocked) return;

    if (codeVal.trim() === '8241') {
      playSuccessChime(isMuted);
      setIsUnlocked(true);
    } else {
      playSealStamp(isMuted);
      setHasError(true);
      setTimeout(() => setHasError(false), 600);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md mx-auto">
      
      {/* UV Parchment Surface */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-80 sm:w-96 h-72 sm:h-80 bg-[#FAF3E3] border-4 border-[#543D2D] rounded-2xl shadow-2xl cursor-crosshair overflow-hidden touch-none select-none"
      >
        {/* Natural Daylight Paper Layer */}
        <div className="absolute inset-0 p-5 flex flex-col justify-between text-[#3C2A1E] font-serif">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8C6F56] uppercase tracking-wider font-bold mb-1 border-b border-[#D5C29D] pb-1">
              <span>Artifact Ledger #07</span>
              <span>UV Sensitive</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed italic mt-2">
              "Arthur soaked this final parchment in willow bark and quinine. In ordinary daylight, only dust and faded ruled lines remain. Sweep the ultraviolet glass to expose what is hidden in the dark."
            </p>
          </div>

          <div className="text-[11px] text-[#A0856C] font-mono text-center">
            {isHovered ? "— UV Beam Active —" : "— Hover or Drag to Ignite UV Lamp —"}
          </div>
        </div>

        {/* Ultraviolet Blacklight Revealing Layer */}
        <div
          className="absolute inset-0 bg-[#0E0A14] p-5 flex flex-col justify-between pointer-events-none transition-opacity duration-150"
          style={{
            opacity: isHovered ? 1 : 0,
            WebkitMaskImage: `radial-gradient(circle 85px at ${mousePos.x}px ${mousePos.y}px, black 35%, transparent 100%)`,
            maskImage: `radial-gradient(circle 85px at ${mousePos.x}px ${mousePos.y}px, black 35%, transparent 100%)`,
          }}
        >
          <div className="text-xs font-mono text-[#A78BFA] tracking-widest font-bold">
            // FLUORESCENT RESONANCE DETECTED
          </div>

          <div className="flex flex-col items-center justify-center my-auto">
            <span className="font-mono text-3xl font-extrabold text-[#4ADE80] tracking-widest drop-shadow-[0_0_12px_rgba(74,222,128,0.9)] animate-pulse">
              8241
            </span>
            <span className="font-serif text-[11px] text-[#C4B5FD] italic mt-1">
              (Margaret's Birth Code)
            </span>
          </div>

          <div className="text-[10px] font-mono text-[#A78BFA] text-center">
            // ENTER COMBINATION TO UNLOCK RELIQUARY
          </div>
        </div>

        {/* UV Lamp Lens Ring */}
        {isHovered && (
          <div
            style={{ left: mousePos.x, top: mousePos.y }}
            className="absolute w-20 h-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#A78BFA] pointer-events-none shadow-[0_0_20px_rgba(167,139,250,0.5)] bg-[#8B5CF6]/10"
          />
        )}
      </div>

      {/* Reliquary Lock / Keypad Section */}
      {!isUnlocked ? (
        <form onSubmit={handleVerify} className="w-full flex flex-col gap-2">
          <div className={`flex items-center gap-2 bg-[#FAF3E3] border-2 border-[#543D2D] rounded-xl p-1.5 shadow-md ${
            hasError ? 'animate-bounce border-[#8B3A22]' : ''
          }`}>
            <div className="pl-2 text-[#8C6F56]">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={codeVal}
              onChange={(e) => setCodeVal(e.target.value.replace(/\D/g, ''))}
              maxLength={4}
              placeholder="ENTER 4-DIGIT CODE..."
              className="flex-1 bg-transparent px-2 py-1 font-mono text-base tracking-widest text-[#2D1F17] placeholder-[#A0856C] outline-none font-bold text-center"
            />
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[#8B3A22] hover:bg-[#A34327] active:scale-95 text-[#FAF3E3] font-serif text-xs uppercase tracking-wider px-4 py-2.5 rounded-lg transition shadow font-bold"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Unlock</span>
            </button>
          </div>

          {hasError && (
            <p className="text-[#8B3A22] text-xs font-serif italic text-center font-semibold">
              The reliquary remains shut. Check the glowing code carefully.
            </p>
          )}
        </form>
      ) : (
        /* Secret Reliquary Revealed */
        <div className="w-full bg-[#FAF3E3] border-4 border-[#C59B4B] p-5 rounded-2xl shadow-xl flex flex-col items-center gap-3 text-center animate-fade-in">
          <div className="w-14 h-14 rounded-full bg-[#EDE2CE] border-2 border-[#C59B4B] flex items-center justify-center shadow-inner">
            <Unlock className="w-7 h-7 text-[#C59B4B]" />
          </div>

          <div>
            <span className="font-serif text-[11px] text-[#8B3A22] uppercase tracking-widest font-bold block">
              Secret Reliquary Opened
            </span>
            <h4 className="font-serif text-lg font-bold text-[#2D1F17] mt-0.5">
              Margaret's Enamelled Silver Locket
            </h4>
          </div>

          <p className="font-serif text-xs text-[#4A3525] bg-[#EDE2CE] p-3 rounded-xl border border-[#D5C29D] italic leading-relaxed">
            "Inside the velvet cavity rests a miniature portrait of young Arthur and Margaret, inscribed on the back: 'Always looking up, no matter how dark the woods.' You have uncovered every single secret of the archive."
          </p>

          <div className="flex items-center gap-1.5 text-xs text-[#2E3B2E] font-serif font-bold bg-[#D4E4D4] px-3.5 py-1 rounded-full border border-[#5A7A5A]">
            <CheckCircle2 className="w-4 h-4 text-[#4A7C4A]" />
            <span>Bonus Expansion Completed (100% Mastered)</span>
          </div>
        </div>
      )}

    </div>
  );
}
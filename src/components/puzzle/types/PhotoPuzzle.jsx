import React, { useState, useRef } from 'react';

export default function PhotoPuzzle() {
  const [loupePos, setLoupePos] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const updateCoordinates = (clientX, clientY) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((clientY - rect.top) / rect.height) * 100));
    setLoupePos({ x, y });
  };

  const handleMouseMove = (e) => {
    updateCoordinates(e.clientX, e.clientY);
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches.length > 0) {
      updateCoordinates(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-xl">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#543D2D] shadow-md cursor-crosshair touch-none"
      >
        <img
          src="/assets/inspect_photo_hires.png"
          alt="Arthur's Study Desk"
          className="w-full h-full object-cover"
        />

        <div
          style={{ left: `${loupePos.x}%`, top: `${loupePos.y}%` }}
          className="absolute w-28 h-28 sm:w-32 sm:h-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#C59B4B] shadow-[0_0_20px_rgba(0,0,0,0.7)] overflow-hidden pointer-events-none bg-no-repeat bg-[#2D1F17]"
        >
          <div
            style={{
              backgroundImage: 'url(/assets/inspect_photo_hires.png)',
              backgroundSize: '350%',
              backgroundPosition: `${loupePos.x}% ${loupePos.y}%`,
            }}
            className="w-full h-full"
          />
        </div>
      </div>
      <p className="font-serif text-xs text-[#8C6F56] italic text-center">
        Hover or drag the brass loupe across the photograph to inspect book spines and shadows.
      </p>
    </div>
  );
}
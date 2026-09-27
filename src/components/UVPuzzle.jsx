 import React, { useState, useRef } from 'react';

    export default function UVPuzzle() {
      const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
      const containerRef = useRef(null);

      const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      };

      return (
        <div
          className="relative w-96 h-96 bg-[#EFE5D3] border-2 border-[#543D2D] rounded-lg shadow-md cursor-crosshair overflow-hidden mx-auto mt-10"
          onMouseMove={handleMouseMove}
          ref={containerRef}
        >
          {/* top layer: dusty paper here*/}
          <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-[#8C6F56] text-center font-serif">
            <h2 className="text-xl font-bold mb-2">A Blank Page</h2>
            <p className="text-sm italic">Nothing but old dust here... or is there?</p>
          </div>

          {/*LAYER 2: The "Hidden Secret" Layer.
            This layer is invisible UNTIL the flashlight mask reveals it! */}
          <div
            className="absolute inset-0 bg-[#1E1712] p-6 flex items-center justify-center pointer-events-none"
            style={{
              WebkitMaskImage: `radial-gradient(circle 60px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
              maskImage: `radial-gradient(circle 60px at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
            }}
          >
            <span className="font-serif text-3xl font-bold text-[#4ade80] tracking-widest drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">
              CODE: 8241
            </span>
          </div>
        </div>
      );
    }
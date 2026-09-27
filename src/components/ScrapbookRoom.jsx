import React, { useState } from 'react';
import UVPuzzle from './UVPuzzle.jsx';
import ScrapbookViewer from './reveal/ScrapbookViewer.jsx'


export default function ScrapbookRoom({ onReturn }) {
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    return (
        <div className="relative w-full h-full overflow-hidden select-none bg-[#1E1712]">
            {/* bg*/}
            <img
                src="/assets/ending_scrapbook_bg.png"
                alt="Arthur's Scrapbook"
                className="absolute inset-0 w-full h-full object-contain pointer-events-none opacity-80"
            />

            {/*for polaroid*/}
            <img
                src="/assets/treehouse.png"
                alt="Forest Observatory"
                onClick={() => setIsViewerOpen(true)}
                className="absolute w-48 shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300"
                style={{ top: '15%', left: '12%', zIndex: 5 }}
            />

            {/* tickt*/}
            <img
                src="/assets/traint.png"
                alt="Train Ticket"
                className="absolute w-40 shadow-md cursor-zoom-in transform rotate-3 hover:scale-110 transition-transform duration-300"
                style={{ top: '65%', left: '15%', zIndex: 6 }}
            />

            {/* anti stars */}
            <img
                src="/assets/astromap.png"
                alt="Star Map"
                className="absolute w-64 shadow-xl cursor-zoom-in transform rotate-2 hover:scale-105 transition-transform duration-300"
                style={{ top: '10%', right: '12%', zIndex: 4 }}
            />

            {/* uvpuzl */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <UVPuzzle />
            </div>

            <button
                onClick={onReturn}
                className="absolute bottom-8 right-8 px-6 py-3 bg-[#8B3A22] hover:bg-[#F4EBD9] text-white hover:text-[#8B3A22] font-serif font-bold uppercase tracking-widest rounded-lg border-2 border-[#543D2D] transition shadow-lg z-50 cursor-pointer"
            >
                Return to Attic
            </button>
            {isViewerOpen && (
                <div className="absolute inset-0 z-50 bg-black/85 flex items-center justify-center p-6 backdrop-blur-sm">
                    <div className="relative w-full max-w-4xl">
                        <button
                        onClick={() => setIsViewerOpen(false)}
                        className="absolute -top-10 right-0 text-[#F4EBD9] font-serif font-bold hover:text-white uppercase tracking-wideset cursor-pointer"
                        >
                         ✕
                      </button>
                      <ScrapbookViewer onShowCertificate={() => setIsViewerOpen(false)} />
                    </div>
                  </div>
                )}
        </div>
    )
}
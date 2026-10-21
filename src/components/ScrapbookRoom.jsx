import React, { useState } from 'react';
import UVPuzzle from './UVPuzzle.jsx';
import StarMapPuzzle from './StarMapPuzzle.jsx';
import { playMechanicalClick } from '../logic/audioEngine.js';
import ScrapbookViewer from './reveal/ScrapbookViewer.jsx';
import { asset } from '../assets.js';
import { useDialogAccessibility } from '../hooks/useDialogAccessibility.js';

const SOUVENIRS = {
  treehouse: {
    title: 'The Mountain Observatory (1954)',
    img: asset('treehouse'),
    date: 'Autumn, 1954',
    note: 'Where Margaret and I spent seven crisp nights cataloging the Perseids meteor shower. The brass telescope we carried up that mountain still points steadily toward Cassiopeia.',
  },
  train: {
    title: 'Continental Sleeper Ticket (1948)',
<<<<<<< HEAD
    img: '/assets/traint.png',
=======
    img: asset('traint'),
>>>>>>> 1728b5c3a478fb1f14a9ae760c048fd11fa9bf01
    date: 'October 12, 1948',
    note: 'St. Moritz to Vienna. We spent the thirty-hour journey decoding encrypted telegraph dispatches in the dining car over cups of bitter espresso.',
  },
  astromap: {
    title: 'Hand-Penned Celestial Chart',
<<<<<<< HEAD
    img: '/assets/astromap.png',
=======
    img: asset('astromap'),
>>>>>>> 1728b5c3a478fb1f14a9ae760c048fd11fa9bf01
    date: 'Undated Draft',
    note: 'Drawn in sepia ink. Arthur left a tiny penciled annotation near the southern horizon: "The true combination was written in fluorescent salt under the blacklight lamp."',
  },
};

export default function ScrapbookRoom({ onReturn, isMuted = false }) {
  const [activeSouvenir, setActiveSouvenir] = useState(null);
  const [isAlbumOpen, setIsAlbumOpen] = useState(false);
  const [isStarMapOpen, setIsStarMapOpen] = useState(false);

  const handleOpenSouvenir = (key) => {
    playMechanicalClick(isMuted);
    setActiveSouvenir(SOUVENIRS[key]);
  };

  const handleCloseSouvenir = () => {
    playMechanicalClick(isMuted);
    setActiveSouvenir(null);
  };

  const handleAlbumToggle = (isOpen) => {
    playMechanicalClick(isMuted);
    setIsAlbumOpen(isOpen);
  };

  const albumRef = useDialogAccessibility(isAlbumOpen, () => handleAlbumToggle(false));
  const souvenirRef = useDialogAccessibility(Boolean(activeSouvenir), handleCloseSouvenir);

  return (
<<<<<<< HEAD
    <div className="relative w-full h-full overflow-hidden select-none bg-[#140E0A] flex flex-col items-center justify-between p-6">
          {/* Background Vintage Texture */}
          <img
            src="/assets/ending_scrapbook_bg.png"
            alt="Arthur's Scrapbook"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 mix-blend-luminosity"
          />

          {/* Room Header Plaque */}
          <div className="relative z-20 text-center mt-12 sm:mt-14 bg-[#231812]/90 border border-[#8C6F56]/60 px-6 py-2 rounded-full shadow-lg backdrop-blur-sm">
            <h1 className="font-serif text-base sm:text-lg text-[#F4EBD9] tracking-wider uppercase">
              ✦ The Archivist's Epilogue: Scrapbook & Darkroom ✦
=======
    <div className="relative w-full h-full overflow-hidden select-none bg-[#140E0A]">
      <img
        src={asset('ending_scrapbook_bg')}
        alt=""
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 mix-blend-luminosity"
      />

      <div className="relative z-10 h-full overflow-y-auto">
        <div className="min-h-full flex flex-col items-center gap-6 px-4 pt-16 pb-8">
          <div className="text-center bg-[#231812]/90 border border-[#8C6F56]/60 px-6 py-2 rounded-3xl sm:rounded-full shadow-lg backdrop-blur-sm">
            <h1 className="font-serif text-sm sm:text-lg text-[#F4EBD9] tracking-wider uppercase">
              ✦ The Archivist's Epilogue ✦
>>>>>>> 1728b5c3a478fb1f14a9ae760c048fd11fa9bf01
            </h1>
            <p className="text-[11px] font-serif text-[#C5A880] italic">
              Click the pinned keepsakes to view Arthur & Margaret's memories
            </p>
            <button
              type="button"
              onClick={() => handleAlbumToggle(true)}
              className="mt-1 text-[10px] font-serif font-bold uppercase tracking-widest text-[#D4AF37] hover:text-[#FFE57F] underline"
            >
              Read Arthur's Story Album
            </button>
          </div>

<<<<<<< HEAD
          {/* Main Interactive Tabletop Stage */}
          <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center">
            {/* Souvenir 1: Polaroid (Top Left) */}
            <div
              onClick={() => handleOpenSouvenir('treehouse')}
              className="absolute left-4 top-4 sm:left-12 sm:top-8 z-10 cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-30"
              title="Inspect Observatory Polaroid"
            >
              <div className="bg-[#FAF6EE] p-2 pb-4 rounded shadow-2xl border border-[#D5C2A5] transform -rotate-6 group-hover:rotate-0 transition-transform">
                <img
                  src="/assets/treehouse.png"
                  alt="Forest Observatory"
                  className="w-32 sm:w-44 h-auto rounded-sm object-cover"
                />
                <div className="text-[10px] font-mono text-center text-[#705843] mt-2 font-bold uppercase tracking-wider">
                  Observatory '54 🔍
                </div>
              </div>
            </div>

            {/* Souvenir 2: Train Ticket (Bottom Left) */}
            <div
              onClick={() => handleOpenSouvenir('train')}
              className="absolute left-6 bottom-8 sm:left-16 sm:bottom-12 z-10 cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-30"
              title="Inspect Train Ticket"
            >
              <div className="transform rotate-3 group-hover:rotate-0 transition-transform">
                <img
                  src="/assets/traint.png"
                  alt="Train Ticket"
                  className="w-28 sm:w-40 h-auto drop-shadow-xl"
                />
              </div>
            </div>

            {/* Souvenir 3: Astro Star Map (Top Right) */}
            <div
              onClick={() => {
                playMechanicalClick(isMuted);
                setIsStarMapOpen(true);
              }}
              className="absolute right-4 top-4 sm:right-12 sm:top-8 z-10 cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-30"
              title="Inspect Star Map"
            >
              <div className="transform rotate-2 group-hover:rotate-0 transition-transform bg-[#1C161E]/80 p-2 rounded-lg border border-[#6E5773] shadow-2xl">
                <img
                  src="/assets/astromap.png"
                  alt="Star Map"
                  className="w-36 sm:w-52 h-auto rounded opacity-90 group-hover:opacity-100"
                />
                <div className="text-[10px] font-mono text-center text-[#E2D4F0] mt-1 tracking-widest">
                  CELESTIAL CHART 🔍
                </div>
              </div>
            </div>

            {/* Center: The Interactive UV Secret Puzzle */}
            <div className="relative z-20 my-auto">
              <UVPuzzle isMuted={isMuted} />
            </div>
          </div>

          {/* Return to Attic Button */}
          <button
            onClick={onReturn}
            className="relative z-30 mb-2 px-6 py-2.5 bg-[#4A3222] hover:bg-[#F4EBD9] text-[#F4EBD9] hover:text-[#231812] font-serif font-bold uppercase text-xs tracking-widest rounded-lg border-2 border-[#8C6F56] transition shadow-xl cursor-pointer active:scale-95"
          >
            ← Return to Study Attic
          </button>

          {isAlbumOpen && (
            <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm animate-fade-in">
              <div className="relative w-full max-w-4xl">
                <button
                  type="button"
                  onClick={() => handleAlbumToggle(false)}
                  className="absolute -top-9 right-0 text-[#F4EBD9] hover:text-[#FFE57F] font-serif font-bold uppercase tracking-widest"
                  aria-label="Close story album"
                >
                  ✕ Close
                </button>
                <ScrapbookViewer
                  isMuted={isMuted}
                  onShowCertificate={() => handleAlbumToggle(false)}
                />
              </div>
            </div>
          )}

          <StarMapPuzzle
            isOpen={isStarMapOpen}
            onClose={() => setIsStarMapOpen(false)}
            isMuted={isMuted}
          />

          {/* Souvenir Inspection Modal */}
          {activeSouvenir && (
            <div
              className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
              onClick={handleCloseSouvenir}
            >
              <div
                className="bg-[#2A1D15] border-2 border-[#C5A880] p-6 rounded-2xl max-w-md w-full shadow-2xl flex flex-col items-center gap-4 text-center relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCloseSouvenir}
                  className="absolute top-3 right-4 text-[#C5A880] hover:text-white font-mono text-lg font-bold cursor-pointer"
                >
                  ✕
                </button>

                <img
                  src={activeSouvenir.img}
                  alt={activeSouvenir.title}
                  className="max-h-60 w-auto rounded-lg shadow-lg border border-[#543D2D] object-contain bg-[#1A120B]"
                />

                <div>
                  <div className="text-[11px] font-mono text-[#D4AF37] tracking-widest uppercase mb-1">
                    {activeSouvenir.date}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#F4EBD9]">
                    {activeSouvenir.title}
                  </h3>
                  <p className="font-serif italic text-xs sm:text-sm text-[#D7C7B2] mt-3 leading-relaxed bg-[#1A120B]/60 p-3 rounded-lg border border-[#4A3222]">
                    "{activeSouvenir.note}"
                  </p>
                </div>

                <button
                  onClick={handleCloseSouvenir}
                  className="px-5 py-1.5 bg-[#543D2D] hover:bg-[#72533D] text-[#F4EBD9] font-serif text-xs rounded border border-[#8C6F56] cursor-pointer"
                >
                  Close Keepsake
                </button>
              </div>
            </div>
          )}
=======
          <div className="w-full max-w-5xl flex-1 grid gap-8 lg:grid-cols-[1fr_auto_1fr] items-center justify-items-center">
            <div className="flex lg:flex-col items-center gap-6 order-2 lg:order-1">
              <button
                type="button"
                onClick={() => handleOpenSouvenir('treehouse')}
                className="group transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFE57F] rounded"
                title="Inspect Observatory Polaroid"
              >
                <div className="bg-[#FAF6EE] p-2 pb-4 rounded shadow-2xl border border-[#D5C2A5] -rotate-6 group-hover:rotate-0 transition-transform">
                  <img
                    src={asset('treehouse')}
                    alt="Forest observatory polaroid"
                    className="w-32 sm:w-40 h-auto rounded-sm object-cover"
                  />
                  <div className="text-[10px] font-mono text-center text-[#705843] mt-2 font-bold uppercase tracking-wider">
                    Observatory '54
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleOpenSouvenir('train')}
                className="group transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFE57F] rounded"
                title="Inspect Train Ticket"
              >
                <img
                  src={asset('traint')}
                  alt="Continental sleeper train ticket"
                  className="w-40 sm:w-56 h-auto drop-shadow-xl rotate-3 group-hover:rotate-0 transition-transform"
                />
              </button>
            </div>

            <div className="order-1 lg:order-2">
              <UVPuzzle isMuted={isMuted} />
            </div>

            <div className="order-3">
              <button
                type="button"
                onClick={() => handleOpenSouvenir('astromap')}
                className="group transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FFE57F] rounded-lg"
                title="Inspect Star Map"
              >
                <div className="rotate-2 group-hover:rotate-0 transition-transform bg-[#1C161E]/80 p-2 rounded-lg border border-[#6E5773] shadow-2xl">
                  <img
                    src={asset('astromap')}
                    alt="Hand-drawn celestial chart"
                    className="w-40 sm:w-52 h-auto rounded opacity-90 group-hover:opacity-100"
                  />
                  <div className="text-[10px] font-mono text-center text-[#E2D4F0] mt-1 tracking-widest">
                    CELESTIAL CHART
                  </div>
                </div>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={onReturn}
            className="px-6 py-2.5 bg-[#4A3222] hover:bg-[#F4EBD9] text-[#F4EBD9] hover:text-[#231812] font-serif font-bold uppercase text-xs tracking-widest rounded-lg border-2 border-[#8C6F56] transition shadow-xl active:scale-95"
          >
            ← Return to Study Attic
          </button>
>>>>>>> 1728b5c3a478fb1f14a9ae760c048fd11fa9bf01
        </div>
      </div>

      {isAlbumOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4 sm:p-6 backdrop-blur-sm animate-fade-in">
          <div
            ref={albumRef}
            role="dialog"
            aria-modal="true"
            aria-label="Arthur's story album"
            tabIndex={-1}
            className="relative w-full max-w-4xl"
          >
            <button
              type="button"
              onClick={() => handleAlbumToggle(false)}
              className="absolute -top-9 right-0 text-[#F4EBD9] hover:text-[#FFE57F] font-serif font-bold uppercase tracking-widest"
              aria-label="Close story album"
            >
              ✕ Close
            </button>
            <ScrapbookViewer
              isMuted={isMuted}
              finishLabel="Close Album"
              onShowCertificate={() => handleAlbumToggle(false)}
            />
          </div>
        </div>
      )}

      {activeSouvenir && (
        <div
          className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseSouvenir}
        >
          <div
            ref={souvenirRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="souvenir-title"
            tabIndex={-1}
            className="bg-[#2A1D15] border-2 border-[#C5A880] p-6 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col items-center gap-4 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleCloseSouvenir}
              aria-label="Close keepsake"
              className="absolute top-3 right-4 text-[#C5A880] hover:text-white font-mono text-lg font-bold"
            >
              ✕
            </button>

            <img
              src={activeSouvenir.img}
              alt={activeSouvenir.title}
              className="max-h-60 w-auto rounded-lg shadow-lg border border-[#543D2D] object-contain bg-[#1A120B]"
            />

            <div>
              <div className="text-[11px] font-mono text-[#D4AF37] tracking-widest uppercase mb-1">
                {activeSouvenir.date}
              </div>
              <h3 id="souvenir-title" className="font-serif font-bold text-lg text-[#F4EBD9]">
                {activeSouvenir.title}
              </h3>
              <p className="font-serif italic text-xs sm:text-sm text-[#D7C7B2] mt-3 leading-relaxed bg-[#1A120B]/60 p-3 rounded-lg border border-[#4A3222]">
                "{activeSouvenir.note}"
              </p>
            </div>

            <button
              type="button"
              onClick={handleCloseSouvenir}
              className="px-5 py-1.5 bg-[#543D2D] hover:bg-[#72533D] text-[#F4EBD9] font-serif text-xs rounded border border-[#8C6F56]"
            >
              Close Keepsake
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Compass, Award } from 'lucide-react';
import { playMechanicalClick } from '../../logic/audioEngine.js';

const SCRAPBOOK_PAGES = [
  {
    title: "Chapter I: The Attic & The Pine Ridge",
    date: "Summer, 1942",
    image: "/assets/inspect_photo_hires.png",
    text: "Before the ciphers and the locks, there was only a boy, a sister, and a small wooden platform bolted into the tallest hemlock tree on the northern ridge. We called it 'The High Celestial Observatory'. We built it with salvage timber from grandfather's barn, swearing never to speak of it to the town.",
  },
  {
    title: "Chapter II: The Great Winter Blackout",
    date: "December, 1944",
    image: "/assets/inspect_letter_bg.png",
    text: "When the county grid collapsed under four feet of wet blizzard ice, the attic became our fortress. With three beeswax candles burning low, Margaret taught me that codes aren't meant to keep people out—they are meant to keep precious memories safe from the erosion of time.",
  },
  {
    title: "Chapter III: Thirty Yards of Copper",
    date: "October, 1951",
    image: "/assets/inspect_telegraph.png",
    text: "Even as we grew older, the telegraph key never fell silent. Through high school exams, college letters, and foreign travels, a three-dot burst ('S') through the wire meant 'Look up at the stars tonight'. I have kept that spring oiled every month since.",
  },
  {
    title: "Chapter IV: The Time Capsule Coordinates",
    date: "Autumn, 1968",
    image: "/assets/inspect_postcard_assembled.png",
    text: "If you are reading this ledger, our memories did not fade into dust. Beneath the twin roots of the old pine at coordinates 44°18'22\" N, 71°16'48\" W, a waterproof brass casket still rests beneath two feet of loam. The key around my neck is yours now.",
  },
];

export default function ScrapbookViewer({ isMuted = false, onShowCertificate }) {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    if (currentPage < SCRAPBOOK_PAGES.length - 1) {
      playMechanicalClick(isMuted);
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      playMechanicalClick(isMuted);
      setCurrentPage((prev) => prev - 1);
    }
  };

  const page = SCRAPBOOK_PAGES[currentPage];

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Scrapbook Frame */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-[#FAF3E3] border-4 border-[#543D2D] rounded-2xl shadow-2xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
        
        {/* Book Spine Shadow Effect */}
        <div className="absolute top-0 bottom-0 left-0 w-4 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />

        {/* Page Content with Slide Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex-1 flex flex-col sm:flex-row gap-4 sm:gap-6 items-center overflow-hidden"
          >
            {/* Left: Vintage Photo */}
            <div className="w-full sm:w-1/2 aspect-video sm:aspect-square bg-[#231A13] border-2 border-[#C59B4B] rounded-xl overflow-hidden shadow-md flex-shrink-0">
              <img
                src={page.image}
                alt={page.title}
                className="w-full h-full object-cover filter sepia-[0.3]"
              />
            </div>

            {/* Right: Handwritten Journal Entry */}
            <div className="w-full sm:w-1/2 flex flex-col justify-center text-left space-y-2">
              <div className="flex items-center justify-between border-b border-[#D5C29D] pb-1">
                <span className="font-serif text-[11px] text-[#8B3A22] uppercase tracking-widest font-bold flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-[#C59B4B]" />
                  {page.date}
                </span>
                <span className="font-mono text-xs text-[#8C6F56] font-bold">
                  {currentPage + 1} / {SCRAPBOOK_PAGES.length}
                </span>
              </div>

              <h4 className="font-serif text-base sm:text-lg font-bold text-[#2D1F17]">
                {page.title}
              </h4>

              <p className="font-serif text-xs sm:text-sm text-[#3C2A1E] leading-relaxed italic">
                "{page.text}"
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Scrapbook Footer Navigation */}
        <div className="flex items-center justify-between pt-3 border-t border-[#D5C29D] mt-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="flex items-center gap-1 font-serif text-xs uppercase tracking-wider text-[#8B3A22] font-bold disabled:opacity-30 transition hover:text-[#A34327]"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Page</span>
          </button>

          {currentPage === SCRAPBOOK_PAGES.length - 1 ? (
            <button
              onClick={onShowCertificate}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#8B3A22] hover:bg-[#A34327] text-white rounded-lg font-serif text-xs uppercase tracking-wider font-bold shadow transition active:scale-95 animate-pulse"
            >
              <Award className="w-4 h-4 text-[#FFE57F]" />
              <span>Claim Certificate</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center gap-1 font-serif text-xs uppercase tracking-wider text-[#8B3A22] font-bold transition hover:text-[#A34327]"
            >
              <span>Turn Page</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

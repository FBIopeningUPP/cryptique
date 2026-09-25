import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, BookOpen, Lock, ArrowLeft } from 'lucide-react';
import { playMechanicalClick } from '../../logic/audioEngine.js';

const CURIO_LORE = {
  curio_magnifier: {
    year: '1962',
    heading: "The Garden Loupe",
    entry:
      "Margaret and I spent three whole afternoons tracing the veins of wild hemlock leaves with this brass loupe. She swore she could see tiny clockwork gears inside the stems. I never told her I knew it was just sunlight through the dew.",
  },
  curio_photo_scrap: {
    year: '1944',
    heading: "The Candlelit Blackout",
    entry:
      "The entire county lost power for four days during the December gale. We dragged our blankets into the attic study, lit three tallow candles, and read astronomical charts until our eyes grew heavy. This snapshot was taken the morning the sun finally broke through.",
  },
  curio_brass_key: {
    year: '1951',
    heading: "The Midnight Wire",
    entry:
      "Thirty yards of insulated copper wire ran from my second-story windowsill directly down to the old tool shed. We practiced our Morse code every night at 9:15 sharp after our parents thought we were asleep. She always tapped faster than me.",
  },
  curio_pressed_fern: {
    year: '1955',
    heading: "The Hemlock Glade",
    entry:
      "Found in the damp hollow just east of the stone wall where the deer gather at dawn. Margaret pressed it inside my copy of 'Elements of Horology'. Even after seventy years, the scent of crushed woodland dampness still clings to the fibers.",
  },
  curio_clock_gear: {
    year: '1965',
    heading: "The Master Escapement",
    entry:
      "My first successfully hand-turned brass gear with true cycloidal teeth. It took nineteen attempts on the jeweler's lathe to get the tooth pitch smooth enough not to jam. It represents patience—the one virtue an archivist must never abandon.",
  },
  curio_star_postcard: {
    year: '1958',
    heading: "The Treehouse Coordinates",
    entry:
      "Sent from the coast on Margaret's twentieth birthday. The pinpricks through the ink correspond directly to the summer constellations overhead. If you line Cygnus with the old chimney at twilight, you will find our secret haven.",
  },
};

export default function CurioShelfModal({ isOpen, onClose, solvedPuzzles = [], puzzles = [], isMuted = false }) {
  const [selectedCurio, setSelectedCurio] = useState(null);

  if (!isOpen) return null;

  const handleSelectCurio = (curio, isUnlocked) => {
    if (!isUnlocked) return;
    playMechanicalClick(isMuted);
    setSelectedCurio(curio);
  };

  const unlockedCount = puzzles.filter((p) => solvedPuzzles.includes(p.id) && p.reward).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 select-none">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-[#241A13] border-4 border-[#543D2D] rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.9)] overflow-hidden">
        
        <div className="flex items-center justify-between px-6 py-4 bg-[#1C140E] border-b-2 border-[#543D2D]">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#C59B4B]" />
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-[#F4EBD9] tracking-wide">
                Arthur's Curio Cabinet
              </h2>
              <span className="font-serif text-xs text-[#C59B4B] tracking-wider uppercase">
                Keepsakes Cataloged: {unlockedCount} / {puzzles.length}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#D5C29D] hover:text-[#FAF3E3] hover:bg-[#3D2C20] transition"
            title="Close Cabinet"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 bg-[#1F1711] text-[#EFE5D3]">
          <AnimatePresence mode="wait">
            {!selectedCurio ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
              >
                {puzzles.map((puzzle, index) => {
                  const isUnlocked = solvedPuzzles.includes(puzzle.id);
                  const reward = puzzle.reward;
                  if (!reward) return null;

                  return (
                    <div
                      key={reward.id}
                      onClick={() => handleSelectCurio(reward, isUnlocked)}
                      className={`relative aspect-square rounded-xl p-4 flex flex-col items-center justify-between border-2 transition-all duration-200 ${
                        isUnlocked
                          ? 'bg-[#2E1F16] border-[#C59B4B]/80 hover:border-[#FFE57F] hover:scale-105 cursor-pointer shadow-[0_4px_16px_rgba(197,155,75,0.2)]'
                          : 'bg-[#18110B] border-[#3D2C20] opacity-55 cursor-not-allowed'
                      }`}
                    >
                      <span className="self-start text-[10px] font-mono tracking-widest text-[#8C6F56] uppercase">
                        Slot {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className="relative flex items-center justify-center my-auto w-20 h-20">
                        {isUnlocked ? (
                          <>
                            <div className="absolute inset-0 rounded-full bg-[#C59B4B]/15 filter blur-lg animate-pulse" />
                            <img
                              src={reward.icon}
                              alt={reward.name}
                              className="w-16 h-16 object-contain filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
                            />
                          </>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-[#5A4535] gap-1">
                            <Lock className="w-8 h-8 opacity-60" />
                            <span className="text-[10px] font-serif uppercase tracking-wider">Locked</span>
                          </div>
                        )}
                      </div>

                      <div className="text-center w-full">
                        <p className={`font-serif text-xs font-semibold truncate ${
                          isUnlocked ? 'text-[#FAF3E3]' : 'text-[#6A5240]'
                        }`}>
                          {isUnlocked ? reward.name : 'Undiscovered Curio'}
                        </p>
                        {isUnlocked && (
                          <span className="text-[10px] font-serif text-[#C59B4B] underline tracking-wider uppercase">
                            Inspect Memory →
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div
                key="detail"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-5 max-w-xl mx-auto"
              >
                <button
                  onClick={() => setSelectedCurio(null)}
                  className="self-start flex items-center gap-1.5 font-serif text-xs text-[#C59B4B] hover:text-[#FFE57F] uppercase tracking-wider font-bold transition"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Cabinet</span>
                </button>

                <div className="bg-[#FAF3E3] border-4 border-[#543D2D] rounded-2xl p-6 text-[#2D1F17] shadow-2xl flex flex-col items-center text-center gap-4">
                  <div className="w-24 h-24 rounded-2xl bg-[#EDE2CE] border-2 border-[#C59B4B] p-2 flex items-center justify-center shadow-inner">
                    <img
                      src={selectedCurio.icon}
                      alt={selectedCurio.name}
                      className="w-20 h-20 object-contain filter drop-shadow-md"
                    />
                  </div>

                  <div>
                    <span className="font-serif text-[11px] text-[#8B3A22] uppercase tracking-widest font-bold block">
                      Cataloged Keepsake #{selectedCurio.id}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-[#2D1F17] mt-0.5">
                      {selectedCurio.name}
                    </h3>
                  </div>

                  <p className="font-serif text-xs sm:text-sm text-[#4A3525] bg-[#EDE2CE] p-3 rounded-xl border border-[#D5C29D] italic leading-relaxed">
                    "{selectedCurio.desc}"
                  </p>

                  {CURIO_LORE[selectedCurio.id] && (
                    <div className="w-full text-left bg-[#F4EBD9] border-2 border-[#C59B4B] p-4 sm:p-5 rounded-xl shadow-inner space-y-2">
                      <div className="flex items-center justify-between border-b border-[#D5C29D] pb-1.5">
                        <span className="font-serif text-xs font-bold text-[#8B3A22] uppercase tracking-wider flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#C59B4B]" />
                          {CURIO_LORE[selectedCurio.id].heading}
                        </span>
                        <span className="font-mono text-xs text-[#8C6F56] font-semibold">
                          Circa {CURIO_LORE[selectedCurio.id].year}
                        </span>
                      </div>
                      <p className="font-serif text-xs sm:text-sm text-[#2D1F17] leading-relaxed italic">
                        "{CURIO_LORE[selectedCurio.id].entry}"
                      </p>
                      <div className="text-right text-[10px] font-serif text-[#8C6F56] pt-1">
                        — Arthur Pendelton, Private Ledger
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="px-6 py-3 bg-[#18110B] border-t-2 border-[#543D2D] flex items-center justify-between text-xs font-serif text-[#8C6F56]">
          <span>Each solved seal returns one of Arthur's personal keepsakes.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#8B3A22] hover:bg-[#A34327] text-white rounded-lg uppercase tracking-wider font-bold transition active:scale-95"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
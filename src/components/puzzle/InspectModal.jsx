import React, { useState, useEffect } from 'react';
import { X, HelpCircle, ChevronRight, Award, PlugZap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnswerInput from './AnswerInput.jsx';
import LetterPuzzle from './types/LetterPuzzle.jsx';
import PhotoPuzzle from './types/PhotoPuzzle.jsx';
import TelegraphPuzzle from './types/TelegraphPuzzle.jsx';
import JournalPuzzle from './types/JournalPuzzle.jsx';
import SafePuzzle from './types/SafePuzzle.jsx';
import PostcardPuzzle from './types/PostcardPuzzle.jsx';

export default function InspectModal({
  puzzle,
  isOpen,
  onClose,
  isSolved,
  onSolve,
  isMuted,
}) {
  const [hintLevel, setHintLevel] = useState(0);

  useEffect(() => {
    setHintLevel(0);
  }, [puzzle]);

  const renderPuzzleType = () => {
    switch (puzzle.id) {
      case 'puzzle-1':
        return <LetterPuzzle puzzle={puzzle} isMuted={isMuted} />
      case 'puzzle-2':
        return <PhotoPuzzle puzzle={puzzle} isMuted={isMuted} />
      case 'puzzle-3':
        return <TelegraphPuzzle puzzle={puzzle} isMuted={isMuted} />
      case 'puzzle-4':
        return <JournalPuzzle puzzle={puzzle} isMuted={isMuted} />
      case 'puzzle-5':
        return (
          <SafePuzzle
            puzzle={puzzle}
            isSolved={isSolved}
            onSolve={onSolve}
            isMuted={isMuted}
          />
        );
      case 'puzzle-6':
        return <PostcardPuzzle puzzle={puzzle} isMuted={isMuted} />;
      default:
        return null;
    }
  };
  return (
    <AnimatePresence>
      {isOpen && puzzle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-6 select-none"
        >
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 15, opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#F7EFE1] border-4 border-[#543D2D] rounded-2xl shadow- [0_12px_40px_rgba(0,0,0,0.8)] overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 bg-[#2D1F17] border-b-2 border-[#543D2D] text-[#F4EBD9]">
              <div className="flex items-center gap-3">
                <span className="font-serif text-xs text-[#C59B4B] uppercase tracking-widest border border-[#C59B4B]/50 px-2 py-0.5 rounded">
                  {puzzle.clue.date}
                </span>
                <h2 className="font-serif text-base sm:text-lg font-bold tracking-wide">
                  {puzzle.title}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded text-[#D5C29D] hover:text-[#FAF3E3] hover:bg-[#3D2C20] transition"
                title="Close Examination"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4">
              <p className="font-serif text-sm sm:text-base text-[#3C2A1E] italic bg-[#EDE2CE] border border-[#D5C29D] p-3 rounded-xl leading- relaxed">
                "{puzzle.clue.prompt}"
              </p>

              <div className="w-full flex items-center justify-center py-2">
                {renderPuzzleType()}
              </div>

              <div className="bg-[#EFE5D3] border border-[#D5C29D] rounded-xl p-3.5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-xs uppercase tracking-wider text-[#8B3A22] font-bold flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    Barnaby's Field Notes
                  </span>
                  {hintLevel < puzzle.hints.length && (
                    <button
                      type="button"
                      onClick={() => setHintLevel((prev) => Math.min(prev + 1, puzzle.hints.length))}
                      className="font-serif text-[11px] text-[#2D1F17] hover:text-[#8B3A22] uppercase tracking-wider underline flex items- center gap-1 cursor-pointer"
                    >
                      <span>Reveal Hint ({hintLevel + 1}/{puzzle.hints.length})</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {hintLevel === 0 ? (
                  <p className="font-serif text-xs text-[#8C6F56] italic">
                    Need guidance? Click above to have Barnaby reveal progressive hints.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {puzzle.hints.slice(0, hintLevel).map((hint, idx) => (
                      <div key={idx} className="bg-[#FAF3E3] border border-[#D5C29D] p-2.5 rounded text-xs font-serif text-[#2D1F17] leading-relaxed">
                        <span className="font-bold text-[#8B3A22] mr-1.5">Clue {idx + 1}:</span>
                        {hint}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {isSolved && puzzle.reward && (
                <div className="flex items-center gap-3 bg-[#E4D8C0] border-2 border-[#C59B4B] p-3 rounded-xl shadow-inner">
                  <img
                    src={puzzle.reward.icon}
                    alt={puzzle.reward.name}
                    className="w-12 h-12 object-contain filter drop-shadow"
                  />
                  <div className="flex-1">
                    <div className="font-serif text-xs font-bold text-[#8B3A22] uppercase flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#C59B4B]" />
                      Curio Acquired: {puzzle.reward.name}
                    </div>
                    <p className="font-serif text-xs text-[#4A3525] mt-0.5">
                      {puzzle.reward.desc}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {puzzle.id !== 'puzzle-5' && (
              <div className="p-4 bg-[#EDE2CE] border-t-2 border-[#D5C29D]">
                <AnswerInput
                  acceptedAnswers={puzzle.acceptedAnswers}
                  onSolve={onSolve}
                  isSolved={isSolved}
                  isMuted={isMuted}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Award, Sparkles, CheckCircle2, Printer, ArrowRight, BookOpen } from 'lucide-react';
import ScrapbookViewer from './reveal/ScrapbookViewer.jsx';

export default function SanctumModal({
  isOpen,
  onClose,
  rank = 'Master Archivist',
  onEnterExpansion,
  elapsedSeconds = 0,
  isMuted = false,
  totalSealCount = 6,
}) {
  const [viewMode, setViewMode] = useState('album');
  const [playerName, setPlayerName] = useState('Archivist');

  useEffect(() => {
    if (isOpen) {
      setViewMode('album');
      confetti({
        particleCount: 110,
        spread: 85,
        origin: { y: 0.55 },
        colors: ['#C59B4B', '#8B3A22', '#F4EBD9', '#2E3B2E'],
        disableForReducedMotion: true,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 select-none">
      <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#F7EFE1] border-4 border-[#C59B4B] rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.9)] p-5 sm:p-7 flex flex-col items-center gap-4 text-center">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg text-[#8C6F56] hover:text-[#2D1F17] hover:bg-[#EFE2CE] transition"
          title="Close Sanctum"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FAF3E3] border-2 border-[#C59B4B] flex items-center justify-center shadow-lg p-1">
          <img
            src="/assets/portrait_barnaby_happy.png"
            alt="Barnaby Celebrating"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        {/* Header*/}
        <div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-serif uppercase tracking-widest text-[#8B3A22] font-bold">
            <Sparkles className="w-4 h-4 text-[#C59B4B]" />
            <span>Master Sanctum Unsealed</span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#2D1F17] mt-0.5 tracking-wide">
            {viewMode === 'album' ? "Uncle Arthur's Scrapbook" : "The Archivist's Final Ledger"}
          </h1>
        </div>

        {viewMode === 'album' && (
          <div className="w-full flex flex-col items-center gap-3">
            <ScrapbookViewer
              isMuted={isMuted}
              onShowCertificate={() => setViewMode('certificate')}
            />

            <button
              onClick={() => setViewMode('certificate')}
              className="text-xs font-serif uppercase tracking-wider text-[#8B3A22] hover:text-[#A34327] underline font-bold mt-1"
            >
              Skip Directly to Official Certificate →
            </button>
          </div>
        )}

        {viewMode === 'certificate' && (
          <div className="w-full flex flex-col items-center gap-4">
            
            {/* The Certificate Plaque */}
            <div className="w-full bg-[#FAF3E3] border-4 border-[#543D2D] rounded-2xl p-5 sm:p-6 shadow-md flex flex-col items-center gap-3 text-center">
              <Award className="w-12 h-12 text-[#C59B4B]" />

              <span className="font-serif text-xs uppercase tracking-widest text-[#8C6F56] font-semibold">
                Official Certification of Excellence
              </span>

              <div className="flex items-center gap-2">
                <span className="font-serif text-sm text-[#4A3525]">Presented to:</span>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  maxLength={25}
                  className="font-serif font-bold text-lg text-[#8B3A22] bg-transparent border-b-2 border-[#C59B4B] text-center outline-none focus:border-[#8B3A22] px-2 py-0.5"
                  title="Click to customize your name"
                />
              </div>

              <div className="font-serif text-xl sm:text-2xl font-bold text-[#2D1F17]">
                Title Conferred: <span className="text-[#C59B4B]">{rank}</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                <div className="flex items-center gap-1 text-xs text-[#2E3B2E] font-serif font-bold bg-[#D4E4D4] px-3 py-1 rounded-full border border-[#5A7A5A]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4A7C4A]" />
                  <span>All {totalSealCount} Master Seals Restored</span>
                </div>

                <div className="text-xs font-mono text-[#8C6F56] bg-[#EDE2CE] px-3 py-1 rounded-full border border-[#D5C29D]">
                  Time: {formatTime(elapsedSeconds)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 w-full">
              <button
                onClick={() => setViewMode('album')}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#EDE2CE] border border-[#543D2D] text-[#2D1F17] hover:bg-[#DFD3BE] rounded-lg font-serif text-xs uppercase tracking-wider font-bold transition"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Re-read Scrapbook</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#FAF3E3] border border-[#C59B4B] text-[#8B3A22] hover:bg-[#EDE2CE] rounded-lg font-serif text-xs uppercase tracking-wider font-bold transition shadow"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>

              <button
                onClick={onEnterExpansion}
                className="flex items-center gap-1.5 px-5 py-2 bg-[#8B3A22] hover:bg-[#A34327] text-white rounded-lg font-serif text-xs uppercase tracking-wider font-bold shadow transition active:scale-95 animate-pulse"
              >
                <span>Enter Expansion Room</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FFE57F]" />
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

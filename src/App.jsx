import React from 'react';
import { Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const triggerCelebration = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#C59B4B', '#B2533E', '#6B8772', '#E8DBBF']
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-parchment-200 border border-parchment-300 rounded-xl p-8 shadow-parchment relative overflow-hidden">
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
          <div className="absolute transform rotate-45 bg-rust text-white text-[10px] font-serif uppercase tracking-widest py-0.5 right-[-35px] top-[18px] w-[120px] text-center shadow-sm">
            Phase 1
          </div>
        </div>

        <div className="w-16 h-16 bg-parchment-100 rounded-full border border-parchment-300 mx-auto flex items-center justify-center text-3xl mb-4 shadow-sm">
          🦉
        </div>

        <h1 className="font-serif text-2xl font-bold text-ink-900 tracking-wide mb-1">
          Cryptique
        </h1>
        <p className="font-sans text-xs tracking-widest uppercase text-ink-500 mb-4">
          The Archivist's Ledger
        </p>

        <p className="font-sans text-sm text-ink-700 leading-relaxed mb-6">
          Phase 1 is live! The parchment palette, typography, and libraries are ready for Uncle Arthur's vault.
        </p>

        <div className="font-hand text-xl text-ink-800 bg-parchment-100/70 p-3 rounded-lg border border-dashed border-parchment-400 mb-6">
          "Every locked ledger carries a secret worth remembering."
        </div>

        <button
          onClick={triggerCelebration}
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-rust text-white rounded-lg font-serif text-sm tracking-wide shadow-seal hover:bg-rust-hover transition active:scale-[0.99]"
        >
          <Sparkles className="w-4 h-4" />
          Test Gold Confetti Seal
        </button>
      </div>

    </div>
  );
}

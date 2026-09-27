import React from 'react';
import { X, Disc3, CloudRain, Wind, Volume2, CircleOff } from 'lucide-react';
import { useDialogAccessibility } from '../../hooks/useDialogAccessibility.js';
import { playMechanicalClick } from '../../logic/audioEngine.js';

const TRACKS = [
  {
    id: 'none',
    label: 'Silence',
    detail: 'Lift the needle from the platter.',
    Icon: CircleOff,
  },
  {
    id: 'vinyl',
    label: 'Cracked Shellac',
    detail: 'A worn record turning in the horn.',
    Icon: Disc3,
  },
  {
    id: 'rain',
    label: 'Attic Rain',
    detail: 'Rain against the slate above the study.',
    Icon: CloudRain,
  },
  {
    id: 'wind',
    label: 'Night Wind',
    detail: 'A draft moving through the eaves.',
    Icon: Wind,
  },
];

export default function GramophoneModal({
  isOpen,
  onClose,
  isMuted = false,
  track = 'none',
  volume = 0.55,
  onTrackChange,
  onVolumeChange,
}) {
  const dialogRef = useDialogAccessibility(isOpen, onClose);

  if (!isOpen) return null;

  const active = TRACKS.find((item) => item.id === track) ?? TRACKS[0];
  const playing = track !== 'none' && !isMuted;

  const handleSelect = (trackId) => {
    playMechanicalClick(isMuted);
    onTrackChange(trackId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-6 select-none">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gramophone-modal-title"
        tabIndex={-1}
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto bg-[#241A13] border-4 border-[#543D2D] rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.9)]"
      >
        <div className="flex items-center justify-between px-6 py-4 bg-[#1C140E] border-b-2 border-[#543D2D]">
          <div>
            <h2 id="gramophone-modal-title" className="font-serif text-lg sm:text-xl font-bold text-[#F4EBD9] tracking-wide">
              Arthur's Gramophone
            </h2>
            <span className="font-serif text-xs text-[#C59B4B] tracking-wider uppercase">
              {playing ? `Now turning: ${active.label}` : isMuted ? 'Horn muffled' : 'Needle lifted'}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close gramophone"
            className="p-1.5 rounded-lg text-[#D5C29D] hover:text-[#FAF3E3] hover:bg-[#3D2C20] transition"
            title="Close Gramophone"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 flex flex-col gap-5 bg-[#1F1711] text-[#EFE5D3]">
          <div className="flex items-center gap-4">
            <div
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-[#C59B4B] bg-[#120E0A] shadow-[inset_0_0_18px_rgba(0,0,0,0.8)] ${
                playing ? 'animate-spin' : ''
              }`}
              style={playing ? { animationDuration: '4.5s' } : undefined}
              aria-hidden="true"
            >
              <div className="absolute inset-2 rounded-full border border-[#543D2D]" />
              <div className="absolute inset-5 rounded-full border border-[#3D2C20]" />
              <div className="absolute inset-8 rounded-full bg-[#C59B4B]" />
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#543D2D]/80" />
            </div>
            <p className="font-serif text-sm leading-relaxed text-[#D5C29D]">
              {active.detail}
              {isMuted && track !== 'none' ? ' Unmute the study to hear it.' : ''}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup" aria-label="Gramophone records">
            {TRACKS.map(({ id, label, detail, Icon }) => {
              const selected = track === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => handleSelect(id)}
                  className={`flex items-start gap-2.5 text-left rounded-xl border px-3 py-2.5 transition active:scale-[0.98] ${
                    selected
                      ? 'bg-[#3D2C20] border-[#C59B4B] text-[#F4EBD9]'
                      : 'bg-[#1C140E] border-[#543D2D] text-[#D5C29D] hover:border-[#C59B4B]/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${selected ? 'text-[#C59B4B]' : 'text-[#8C6F56]'}`} />
                  <span>
                    <span className="block font-serif text-sm font-semibold">{label}</span>
                    <span className="block font-serif text-[11px] leading-snug opacity-80">{detail}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <label className="flex flex-col gap-2">
            <span className="flex items-center justify-between font-serif text-xs uppercase tracking-widest text-[#C59B4B]">
              <span className="inline-flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                Horn volume
              </span>
              <span>{Math.round(volume * 100)}</span>
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={Math.round(volume * 100)}
              onChange={(event) => onVolumeChange(Number(event.target.value) / 100)}
              aria-label="Gramophone volume"
              className="w-full accent-[#C59B4B]"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

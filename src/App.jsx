import React, { useState } from 'react';
import { PUZZLES } from './data/puzzles.js';
import TopHUD from './components/TopHUD.jsx';
import RoomStage from './components/RoomStage.jsx';
import DialogueDeck from './components/DialogueDeck.jsx';

export default function App() {
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [dialogueMood, setDialogueMood] = useState('neutral');
  const [activeDialogue, setActiveDialogue] = useState(
    "Hoo! You must be Arthur's kin. The ledger is sealed tight, but that envelope on the desk carries his very first clue. Click on it to begin!"
  );

  const handleSelectPuzzle = (puzzle) => {
    const isUnlocked = puzzle.prerequisites.length === 0 || 
      puzzle.prerequisites.every((id) => solvedPuzzles.includes(id));
    const isSolved = solvedPuzzles.includes(puzzle.id);

    if (!isUnlocked) {
      setActiveDialogue(`Barnaby: "That item is still sealed! Arthur's notes indicate we must solve earlier clues first."`);
      setDialogueMood('thinking');
      return;
    }

    if (isSolved) {
      setActiveDialogue(`Barnaby: "You already cracked ${puzzle.title}! The seal is broken."`);
      setDialogueMood('happy');
      return;
    }

    setActiveDialogue(`Barnaby: "You examine ${puzzle.title}. ${puzzle.clue.prompt}"`);
    setDialogueMood('neutral');
  };

  const handleBarnabyClick = () => {
    setActiveDialogue("Barnaby: 'Hoo! Need some guidance? Take a close look at the clues scattered around the study!'");
    setDialogueMood('thinking');
  };

  const handleSanctumClick = () => {
    setActiveDialogue("Barnaby: 'The Master Sanctum is bound by six heavy chains. Solve all six archive entries to break them!'");
    setDialogueMood('thinking');
  };

  return (
    <div className="min-h-screen bg-[#1E1712] text-ink-900 flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      <div className="w-full max-w-6xl aspect-[16/9] relative bg-parchment-100 rounded-xl overflow-hidden shadow-2xl border-4 border-[#3D2C20] flex flex-col">
        <TopHUD
          solvedCount={solvedPuzzles.length}
          isMuted={isMuted}
          onToggleMute={() => setIsMuted(!isMuted)}
          rank={solvedPuzzles.length >= 3 ? 'Senior Archivist' : 'Apprentice Archivist'}
        />

        <RoomStage
          puzzles={PUZZLES}
          solvedPuzzles={solvedPuzzles}
          onSelectPuzzle={handleSelectPuzzle}
          onBarnabyClick={handleBarnabyClick}
          onSanctumClick={handleSanctumClick}
        />

        <DialogueDeck
          dialogue={activeDialogue}
          mood={dialogueMood}
          onBarnabyClick={handleBarnabyClick}
        />
      </div>

      <div className="mt-3 text-[11px] text-parchment-400 font-sans tracking-wide">
        Cryptique — The Archivist's Ledger
      </div>
    </div>
  );
}
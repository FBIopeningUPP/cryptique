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
      setActiveDialogue("That item is still sealed! Arthur's notes indicate we must solve earlier clues first.");
      setDialogueMood('thinking');
      return;
    }

    if (isSolved) {
      setActiveDialogue(`You already cracked ${puzzle.title}! The seal is broken.`);
      setDialogueMood('happy');
      return;
    }

    setActiveDialogue(`You examine ${puzzle.title}. ${puzzle.clue.prompt}`);
    setDialogueMood('neutral');
  };

  const handleBarnabyClick = () => {
    setActiveDialogue("Hoo! Need some guidance? Take a close look at the clues scattered around the study!");
    setDialogueMood('thinking');
  };

  const handleSanctumClick = () => {
    setActiveDialogue("The Master Sanctum is bound by six heavy chains. Solve all six archive entries to break them!");
    setDialogueMood('thinking');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-[#1E1712] text-ink-900 select-none relative">
      <TopHUD
        solvedCount={solvedPuzzles.length}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        rank={solvedPuzzles.length >= 3 ? 'Senior Archivist' : 'Apprentice Archivist'}
      />

      <div className="w-full h-full relative">
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
    </div>
  );
}
import React, { useState } from 'react';                                                                                                                                                       
import { PUZZLES } from './data/puzzles.js';                                                                                                                                                   
import TopHUD from './components/TopHUD.jsx';                                                                                                                                                  
import RoomStage from './components/RoomStage.jsx';                                                                                                                                            
import DialogueDeck from './components/DialogueDeck.jsx';                                                                                                                                      
import InspectModal from './components/puzzle/InspectModal.jsx';                                                                                                                               
import SanctumModal from './components/SanctumModal.jsx';                                                                                                                                      
import CurioShelfModal from './components/curios/CurioShelfModal.jsx';

export default function App() {
  const [solvedPuzzles, setSolvedPuzzles] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [dialogueMood, setDialogueMood] = useState('neutral');
  const [activeDialogue, setActiveDialogue] = useState(
    "Hoo! You must be Arthur's kin. The ledger is sealed tight, but that envelope on the desk carries his very first clue. Click on it to begin!"
  );
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [isSanctumOpen, setIsSanctumOpen] = useState(false);

  const handleSelectPuzzle = (puzzle) => {
    const isUnlocked = 
      puzzle.prerequisites.length === 0 ||
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
    } else {
      setActiveDialogue(`You examine ${puzzle.title}. ${puzzle.clue.prompt}`);
      setDialogueMood('neutral');
    }
    setSelectedPuzzle(puzzle);
  };

  const handleSolvePuzzle = () => {                                                                                                                                                            
    if (!selectedPuzzle || solvedPuzzles.includes(selectedPuzzle.id)) return;                                                                                                                  

    setSolvedPuzzles((prev) => [...prev, selectedPuzzle.id]);
    setActiveDialogue(`Splendid work! The seal on ${selectedPuzzle.title} has shattered!`);                                                                                                    
    setDialogueMood('happy');
  };

  const handleBarnabyClick = () => {
    setActiveDialogue("Hoo! Need some guidance? Take a close look at the clues scattered around the study!");                                                                                  
    setDialogueMood('thinking');
  };

  const handleSanctumClick = () => {                                                                                                                                                           
    if (solvedPuzzles.length === 6) {                                                                                                                                                          
     setIsSanctumOpen(true);                                                                                                                                                                  
      setActiveDialogue("The six chains have fallen! Step into Arthur's Master Sanctum!");                                                                                                     
      setDialogueMood('happy');                                                                                                                                                                
    } else {                                                                                                                                                                                   
      setActiveDialogue(                                                                                                                                                                       
        `The Master Sanctum is bound by six heavy chains (${solvedPuzzles.length}/6 broken). Solve all clues first!`                                                                           
    );                                                                                                                                                                                       
      setDialogueMood('thinking');                                                                                                                                                             
    }                                                                                                                                                                                          
  };                                                                                                                                                                                           
                                                                                                                                                                                               
    const getRank = () => {                                                                                                                                                                      
    if (solvedPuzzles.length === 6) return 'Master Archivist';                                                                                                                                 
    if (solvedPuzzles.length >= 3) return 'Senior Archivist';                                                                                                                                  
    return 'Apprentice Archivist';                                                                                                                                                             
  };  
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#1E1712] text-ink-900 select-none">
      <TopHUD
        solvedCount={solvedPuzzles.length}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        rank={getRank()}
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

      <InspectModal
        puzzle={selectedPuzzle}
        isOpen={Boolean(selectedPuzzle)}
        onClose={() => setSelectedPuzzle(null)}
        isSolved={selectedPuzzle ? solvedPuzzles.includes(selectedPuzzle.id) : false}
        onSolve={handleSolvePuzzle}
        isMuted={isMuted}
      />
      <SanctumModal
        isOpen={isSanctumOpen}
        onClose={() => setIsSanctumOpen(false)}
        rank={getRank()}
      />
      <CurioShelfModal
        isOpen={isCurioOpen}
        onClose={() => setIsCurioOpen(false)}
        solvedPuzzles={solvedPuzzles}
        puzzles={PUZZLES}
        isMuted={isMuted}
      />
    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';                                                                                                                                                       
import { PUZZLES } from './data/puzzles.js';                                                                                                                                                   
import TopHUD from './components/TopHUD.jsx';                                                                                                                                                  
import RoomStage from './components/RoomStage.jsx';                                                                                                                                            
import DialogueDeck from './components/DialogueDeck.jsx';                                                                                                                                      
import InspectModal from './components/puzzle/InspectModal.jsx';                                                                                                                               
import SanctumModal from './components/SanctumModal.jsx';                                                                                                                                      
import CurioShelfModal from './components/curios/CurioShelfModal.jsx';
import confetti from 'canvas-confetti';
import ScrapbookRoom from './components/ScrapbookRoom.jsx';
import ScratchpadDrawer from './tools/ScratchpadDrawer.jsx';
import GramophoneModal from './components/audio/GramophoneModal.jsx';
import { playAmbient, resumeAmbientContext, stopAmbient, setAmbientVolume, AMBIENT_TRACK_IDS } from './logic/ambientAudio.js';

const PUZZLE_COUNT = PUZZLES.length;
const INITIAL_DIALOGUE = "Hoo! You must be Arthur's kin. The ledger is sealed tight, but that envelope on the desk carries his very first clue. Click on it to begin!";

function getWelcomeDialogue(solvedPuzzles) {
  if (solvedPuzzles.length >= PUZZLE_COUNT) {
    return "Hoo! All the seals are shattered. Arthur's epilogue and every archived memory are yours to explore!";
  }

  if (solvedPuzzles.length > 0) {
    const nextPuzzle = PUZZLES.find(({ id }) => !solvedPuzzles.includes(id));
    return `Welcome back, Archivist. Your next lead is ${nextPuzzle?.title ?? 'waiting in the attic'}.`;
  }

  return INITIAL_DIALOGUE;
}

function readStoredJson(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? fallback : JSON.parse(storedValue);
  } catch {
    return fallback;
  }
}

function readStoredText(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStoredValue(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Progress remains available for the current session if storage is unavailable.
  }
}

export default function App() {
  const [solvedPuzzles, setSolvedPuzzles] = useState(() => {
    const saved = readStoredJson('cryptique_save', []);
    if (!Array.isArray(saved)) return [];

    const validPuzzleIds = new Set(PUZZLES.map(({ id }) => id));
    return [...new Set(saved)].filter((id) => validPuzzleIds.has(id));
  });
  useEffect(() => {
    writeStoredValue('cryptique_save', JSON.stringify(solvedPuzzles));
  }, [solvedPuzzles]);
  const [isMuted, setIsMuted] = useState(false);
  const [dialogueMood, setDialogueMood] = useState('neutral');
  const [activeDialogue, setActiveDialogue] = useState(() => getWelcomeDialogue(solvedPuzzles));
  
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [isSanctumOpen, setIsSanctumOpen] = useState(false);
  const [isCurioOpen, setIsCurioOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isGramophoneOpen, setIsGramophoneOpen] = useState(false);
  const [ambientTrack, setAmbientTrack] = useState(() => {
    const saved = readStoredText('cryptique_ambient_track', 'none');
    return AMBIENT_TRACK_IDS.includes(saved) ? saved : 'none';
  });
  const [ambientVolume, setAmbientVolumeState] = useState(() => {
    const saved = readStoredJson('cryptique_ambient_volume', 0.55);
    return Number.isFinite(saved) ? Math.min(1, Math.max(0, saved)) : 0.55;
  });
  const ambientVolumeRef = useRef(ambientVolume);
  ambientVolumeRef.current = ambientVolume;
  const [elapsedSeconds, setElapsedSeconds] = useState(() => {
    const saved = readStoredJson('cryptique_elapsed_seconds', 0);
    return Number.isFinite(saved) && saved >= 0 ? Math.floor(saved) : 0;
  });
  useEffect(() => {
    writeStoredValue('cryptique_elapsed_seconds', JSON.stringify(elapsedSeconds));
  }, [elapsedSeconds]);

  const [currentRoom, setCurrentRoom] = useState(() => {
    const savedRoom = readStoredText('cryptique_room', 'attic');
    return savedRoom === 'scrapbook' && solvedPuzzles.length >= PUZZLE_COUNT
      ? 'scrapbook'
      : 'attic';
  });

  useEffect(() => {
    writeStoredValue('cryptique_room', currentRoom);
  }, [currentRoom]);

  useEffect(() => {
    writeStoredValue('cryptique_ambient_track', ambientTrack);
  }, [ambientTrack]);

  useEffect(() => {
    writeStoredValue('cryptique_ambient_volume', JSON.stringify(ambientVolume));
  }, [ambientVolume]);

  useEffect(() => {
    if (isMuted || ambientTrack === 'none') {
      stopAmbient();
      return undefined;
    }
    playAmbient(ambientTrack, ambientVolumeRef.current);
    return () => stopAmbient();
  }, [isMuted, ambientTrack]);

  useEffect(() => {
    setAmbientVolume(ambientVolume);
  }, [ambientVolume]);

  useEffect(() => {
    const resume = () => resumeAmbientContext();
    window.addEventListener('pointerdown', resume, { once: true });
    return () => window.removeEventListener('pointerdown', resume);
  }, []);

  useEffect(() => {
    if (solvedPuzzles.length >= PUZZLE_COUNT) return;
    const interval = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [solvedPuzzles.length]);

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

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C59B4B', '#F4EBD9', '#8B3A22'],
      disableForReducedMotion: true
    });
  };

  const handleBarnabyClick = () => {
    const nextUnsolved = PUZZLES.find((p) => !solvedPuzzles.includes(p.id));
    if (!nextUnsolved) {
      setActiveDialogue("Hoo! All the seals are shattered! Head straight to the Master Sanctum chest atop the shelf!");
      setDialogueMood('happy');
    } else {
      const hint = nextUnsolved.hints?.[0] ?? nextUnsolved.clue.prompt;
      setActiveDialogue(`Hoo! for ${nextUnsolved.title}: "${hint}"`);
      setDialogueMood('thinking');
    }
  };

  const handleSanctumClick = () => {                                                                                                                                                           
    if (solvedPuzzles.length >= PUZZLE_COUNT) {
     setIsSanctumOpen(true);                                                                                                                                                                  
      setActiveDialogue("The final lock has fallen! Step into Arthur's Master Sanctum!");                                                                                                     
      setDialogueMood('happy');                                                                                                                                                                
    } else {                                                                                                                                                                                   
      setActiveDialogue(                                                                                                                                                                       
        `The Master Sanctum is bound by heavy chains (${solvedPuzzles.length}/${PUZZLE_COUNT} broken). Solve all clues first!`
    );                                                                                                                                                                                       
      setDialogueMood('thinking');                                                                                                                                                             
    }                                                                                                                                                                                          
  };                                                                                                                                                                                           
                                                                                                                                                                                               
  const getRank = () => {                                                                                                                                                                      
    if (solvedPuzzles.length >= PUZZLE_COUNT) return 'Master Archivist';
    if (solvedPuzzles.length >= 3) return 'Senior Archivist';                                                                                                                                  
    return 'Apprentice Archivist';                                                                                                                                                             
  };  
  
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-[#1E1712] text-ink-900 select-none">
      <TopHUD
        solvedCount={solvedPuzzles.length}
        totalCount={PUZZLE_COUNT}
        isMuted={isMuted}
        onToggleMute={() => setIsMuted(!isMuted)}
        rank={getRank()}
        onOpenCurios={() => setIsCurioOpen(true)}
        onOpenNotes={() => setIsNotesOpen(true)}
        onOpenGramophone={() => setIsGramophoneOpen(true)}
        ambientPlaying={ambientTrack !== 'none' && !isMuted}
        onResetArchive={() => {
          if (window.confirm("Reset all archive progress?")) {
            setSolvedPuzzles([]);
            setElapsedSeconds(0);
            setCurrentRoom('attic');
            writeStoredValue('cryptique_uv_unlocked', JSON.stringify(false));
            setSelectedPuzzle(null);
            setIsSanctumOpen(false);
            setIsCurioOpen(false);
            setIsNotesOpen(false);
            setIsGramophoneOpen(false);
            setAmbientTrack('none');
            setActiveDialogue(INITIAL_DIALOGUE);
            setDialogueMood('neutral');
          }
        }}
        elapsedSeconds={elapsedSeconds}
      />
      <div className="w-full h-full relative">
        {currentRoom === 'attic' ? (
        <RoomStage
          puzzles={PUZZLES}
          solvedPuzzles={solvedPuzzles}
          onSelectPuzzle={handleSelectPuzzle}
          onBarnabyClick={handleBarnabyClick}
          onSanctumClick={handleSanctumClick}
        />
        ) : (
          <ScrapbookRoom onReturn={() => setCurrentRoom('attic')} isMuted={isMuted} />
        )}
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
        elapsedSeconds={elapsedSeconds}
        isMuted={isMuted}
        totalSealCount={PUZZLE_COUNT}
        onEnterExpansion={() => {
          setIsSanctumOpen(false);
          setCurrentRoom('scrapbook');
        }}
      />
      <CurioShelfModal
        isOpen={isCurioOpen}
        onClose={() => setIsCurioOpen(false)}
        solvedPuzzles={solvedPuzzles}
        puzzles={PUZZLES}
        isMuted={isMuted}
      />
      <ScratchpadDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        isMuted={isMuted}
      />
      <GramophoneModal
        isOpen={isGramophoneOpen}
        onClose={() => setIsGramophoneOpen(false)}
        isMuted={isMuted}
        track={ambientTrack}
        volume={ambientVolume}
        onTrackChange={setAmbientTrack}
        onVolumeChange={setAmbientVolumeState}
      />
    </div>
  );
}

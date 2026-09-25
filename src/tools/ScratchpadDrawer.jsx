import React, {useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, KeyRound, Radio, Trash2, Volume2 } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { applyCaesarShift } from '../logic/cipherEngine.js';
import { textToMorse, compileMorseSchedule } from '../logic/morseEngine.js';
import { playMorseTone, playMechanicalClick } from '../logic/audioEngine.js'; 
import { del } from 'framer-motion/client';

export default function ScratchpadDrawer({isOpen, onClose, isMuted = false}) {
    const [activeTab, setActiveTab] = useState('notes');
    const [notes, setNotes] = useLocalStorage('cryptique_scratchpad_notes', '');

    const [cipherInput, setCipherInput] = useState('');
    const [shiftVal, setShiftVal] = useState(0);

    const [morseInput, setMorseInput] = useState('');
    const [isTransmitting, setIsTransmitting] = useState(false);

    const handleClearNotes = () => {
        if (window.confirm("Clear all field notes in the scartchpad?")) {
            setNotes('');
        }
    };

    const handlePlayMorse = () => {
        if (!morseInput.trim() || isTransmitting) return;
        setIsTransmitting(true);

        const morseCode = textToMorse(morseInput);
        const schedule = compileMorseSchedule(morseCode, 110);
        let delay = 0;

        schedule.forEach((step, idx) => {
            setTimeout(() => {
                if (step.type === 'ON') {
                    playMorseTone(step.durationMs, 750, isMuted);
                }
                if (idx === schedule.length - 1) {
                    setTimeout(() => setIsTransmitting(false), step.durationMs);
                }
            }, delay);
            delay += step.durationMs;
        });
    };
    return (
        <AnimatePresence>                                                                                                                                                                                                                                                  
          {isOpen && (                                                                                                                                                                                                                                                     
            <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none select-none">                                                                                                                                                                           
              <motion.div                                                                                                                                                                                                                                                  
                initial={{ opacity: 0 }}                                                                                                                                                                                                                                   
                animate={{ opacity: 1 }}                                                                                                                                                                                                                                   
                exit={{ opacity: 0 }}                                                                                                                                                                                                                                      
                onClick={onClose}                                                                                                                                                                                                                                          
                className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-auto"                                                                                                                                                                              
              />                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                           
              <motion.div                                                                                                                                                                                                                                                  
                initial={{ x: '100%' }}                                                                                                                                                                                                                                    
                animate={{ x: 0 }}                                                                                                                                                                                                                                         
                exit={{ x: '100%' }}                                                                                                                                                                                                                                       
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}                                                                                                                                                                                               
                className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-[#241A13] border-l-4 border-[#543D2D] shadow-[-12px_0_40px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto"                                                                               
              >                                                                                                                                                                                                                                                            
                <div className="flex items-center justify-between px-5 py-3.5 bg-[#1C140E] border-b-2 border-[#543D2D]">                                                                                                                                                   
                  <div className="flex items-center gap-2 text-[#F4EBD9]">                                                                                                                                                                                                 
                    <BookOpen className="w-5 h-5 text-[#C59B4B]" />                                                                                                                                                                                                        
                    <h3 className="font-serif text-base sm:text-lg font-bold tracking-wide">                                                                                                                                                                               
                      Archivist's Field Notebook                                                                                                                                                                                                                           
                    </h3>                                                                                                                                                                                                                                                  
                  </div>                                                                                                                                                                                                                                                   
                  <button                                                                                                                                                                                                                                                  
                    onClick={onClose}                                                                                                                                                                                                                                      
                    className="p-1 rounded-lg text-[#D5C29D] hover:text-[#FAF3E3] hover:bg-[#3D2C20] transition"                                                                                                                                                           
                    title="Close Notebook"                                                                                                                                                                                                                                 
                  >                                                                                                                                                                                                                                                        
                    <X className="w-5 h-5" />                                                                                                                                                                                                                              
                  </button>                                                                                                                                                                                                                                                
                </div>                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                           
                <div className="flex bg-[#18110B] border-b border-[#543D2D] text-xs font-serif">                                                                                                                                                                           
                  <button                                                                                                                                                                                                                                                  
                    onClick={() => { playMechanicalClick(isMuted); setActiveTab('notes'); }}                                                                                                                                                                               
                    className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider transition ${                                                                                                                                    
                      activeTab === 'notes'                                                                                                                                                                                                                                
                        ? 'bg-[#2E1F16] text-[#FFE57F] border-b-2 border-[#C59B4B]'                                                                                                                                                                                        
                        : 'text-[#8C6F56] hover:text-[#D5C29D]'                                                                                                                                                                                                            
                    }`}                                                                                                                                                                                                                                                    
                  >                                                                                                                                                                                                                                                        
                    <BookOpen className="w-3.5 h-3.5" />                                                                                                                                                                                                                   
                    <span>Field Notes</span>                                                                                                                                                                                                                               
                  </button>                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                           
                  <button                                                                                                                                                                                                                                                  
                    onClick={() => { playMechanicalClick(isMuted); setActiveTab('cipher'); }}                                                                                                                                                                              
                    className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider transition ${                                                                                                                                    
                      activeTab === 'cipher'                                                                                                                                                                                                                               
                        ? 'bg-[#2E1F16] text-[#FFE57F] border-b-2 border-[#C59B4B]'                                                                                                                                                                                        
                        : 'text-[#8C6F56] hover:text-[#D5C29D]'                                                                                                                                                                                                            
                    }`}                                                                                                                                                                                                                                                    
                  >                                                                                                                                                                                                                                                        
                    <KeyRound className="w-3.5 h-3.5" />                                                                                                                                                                                                                   
                    <span>Cipher Wheel</span>                                                                                                                                                                                                                              
                  </button>                                                                                                                                                                                                                                                
                                                                                                                                                                                                                                                                           
                  <button                                                                                                                                                                                                                                                  
                    onClick={() => { playMechanicalClick(isMuted); setActiveTab('morse'); }}                                                                                                                                                                               
                    className={`flex-1 py-2.5 flex items-center justify-center gap-1.5 font-bold uppercase tracking-wider transition ${                                                                                                                                    
                      activeTab === 'morse'                                                                                                                                                                                                                                
                        ? 'bg-[#2E1F16] text-[#FFE57F] border-b-2 border-[#C59B4B]'                                                                                                                                                                                        
                        : 'text-[#8C6F56] hover:text-[#D5C29D]'                                                                                                                                                                                                            
                    }`}                                                                                                                                                                                                                                                    
                  >                                                                                                                                                                                                                                                        
                    <Radio className="w-3.5 h-3.5" />                                                                                                                                                                                                                      
                    <span>Morse Lab</span>                                                                                                                                                                                                                                 
                  </button>                                                                                                                                                                                                                                                
                </div>                                                                                                                                                                                                                                                     
                                                                                                                                                                                                                                                                           
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 flex flex-col bg-[#1F1711] text-[#EFE5D3]">                                                                                                                                                              
                  {activeTab === 'notes' && (                                                                                                                                                                                                                              
                    <div className="flex-1 flex flex-col gap-3">                                                                                                                                                                                                           
                      <div className="flex items-center justify-between text-xs font-serif text-[#C59B4B]">                                                                                                                                                                
                        <span>Auto-saved to your local archive.</span>                                                                                                                                                                                                     
                        <button                                                                                                                                                                                                                                            
                          onClick={handleClearNotes}                                                                                                                                                                                                                       
                          className="flex items-center gap-1 text-[#8B3A22] hover:text-[#D45D3B] transition"                                                                                                                                                               
                          title="Clear Notes"                                                                                                                                                                                                                              
                        >                                                                                                                                                                                                                                                  
                          <Trash2 className="w-3.5 h-3.5" />                                                                                                                                                                                                               
                          <span>Erase</span>                                                                                                                                                                                                                               
                        </button>                                                                                                                                                                                                                                          
                      </div>                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                           
                      <textarea                                                                                                                                                                                                                                            
                        value={notes}                                                                                                                                                                                                                                      
                        onChange={(e) => setNotes(e.target.value)}                                                                                                                                                                                                         
                        placeholder="Scribble clues, tumbler combinations, shift offsets, or theories here..."                                                                                                                                                             
                        className="flex-1 w-full bg-[#FAF3E3] text-[#2D1F17] p-4 rounded-xl border-2 border-[#543D2D] font-serif text-sm leading-relaxed outline-none focus:border-[#C59B4B] resize-none shadow-inner select-text placeholder-[#A0856C]"                   
                        style={{                                                                                                                                                                                                                                           
                          backgroundImage: 'repeating-linear-gradient(transparent, transparent 27px, #E5D5BC 28px)',                                                                                                                                                       
                          lineHeight: '28px',                                                                                                                                                                                                                              
                        }}                                                                                                                                                                                                                                                 
                      />                                                                                                                                                                                                                                                   
                    </div>                                                                                                                                                                                                                                                 
                  )}                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                           
                  {activeTab === 'cipher' && (                                                                                                                                                                                                                             
                    <div className="flex flex-col gap-4 bg-[#FAF3E3] text-[#2D1F17] p-4 rounded-xl border-2 border-[#543D2D] shadow-inner">                                                                                                                                
                      <div className="text-xs font-serif font-bold text-[#8B3A22] uppercase tracking-wider">                                                                                                                                                               
                        Caesar Shift Decrypter                                                                                                                                                                                                                             
                      </div>                                                                                                                                                                                                                                               
                      <p className="text-xs font-serif text-[#4A3525] italic">                                                                                                                                                                                             
                        Type any encrypted or test phrase to shift the alphabet in real time:                                                                                                                                                                              
                      </p>                                                                                                                                                                                                                                                 
                                                                                                                                                                                                                                                                           
                      <input                                                                                                                                                                                                                                               
                        type="text"                                                                                                                                                                                                                                        
                        value={cipherInput}                                                                                                                                                                                                                                
                        onChange={(e) => setCipherInput(e.target.value.toUpperCase())}                                                                                                                                                                                     
                        placeholder="ENTER CIPHERTEXT..."                                                                                                                                                                                                                  
                        className="bg-[#EDE2CE] p-2.5 rounded-lg border border-[#D5C29D] font-mono text-sm tracking-widest text-[#2D1F17] uppercase outline-none font-bold select-text"                                                                                    
                      />                                                                                                                                                                                                                                                   
                                                                                                                                                                                                                                                                           
                      <div className="space-y-1">                                                                                                                                                                                                                          
                        <div className="flex justify-between text-xs font-serif font-bold text-[#2D1F17]">                                                                                                                                                                 
                          <span>Alphabet Offset:</span>                                                                                                                                                                                                                    
                          <span className="text-[#8B3A22] font-mono font-bold">{shiftVal > 0 ? `+${shiftVal}` : shiftVal}</span>                                                                                                                                           
                        </div>                                                                                                                                                                                                                                             
                        <input                                                                                                                                                                                                                                             
                          type="range"                                                                                                                                                                                                                                     
                          min="-25"                                                                                                                                                                                                                                        
                          max="25"                                                                                                                                                                                                                                         
                          value={shiftVal}                                                                                                                                                                                                                                 
                          onChange={(e) => setShiftVal(parseInt(e.target.value, 10))}                                                                                                                                                                                      
                          className="w-full accent-[#8B3A22] cursor-pointer"                                                                                                                                                                                               
                        />                                                                                                                                                                                                                                                 
                      </div>                                                                                                                                                                                                                                               
                                                                                                                                                                                                                                                                           
                      <div className="bg-[#EAE0CD] p-3 rounded-lg border border-[#C59B4B] space-y-1">                                                                                                                                                                      
                        <span className="text-[10px] font-serif text-[#8C6F56] uppercase tracking-wider font-bold block">                                                                                                                                                  
                          Decrypted Output:                                                                                                                                                                                                                                
                        </span>                                                                                                                                                                                                                                            
                        <p className="font-mono text-base font-bold text-[#8B3A22] tracking-widest break-words select-text">                                                                                                                                               
                          {cipherInput ? applyCaesarShift(cipherInput, shiftVal) : '---'}                                                                                                                                                                                  
                        </p>                                                                                                                                                                                                                                               
                      </div>                                                                                                                                                                                                                                               
                    </div>                                                                                                                                                                                                                                                 
                  )}                                                                                                                                                                                                                                                       
                                                                                                                                                                                                                                                                           
                  {activeTab === 'morse' && (                                                                                                                                                                                                                              
                    <div className="flex flex-col gap-4 bg-[#FAF3E3] text-[#2D1F17] p-4 rounded-xl border-2 border-[#543D2D] shadow-inner">                                                                                                                                
                      <div className="text-xs font-serif font-bold text-[#8B3A22] uppercase tracking-wider">
                        Morse Code Sound Laboratory
                      </div>
                      <p className="text-xs font-serif text-[#4A3525] italic">
                        Translate plain English into telegraph signals and hear the tone:
                      </p>
  
                      <input
                        type="text"
                        value={morseInput}
                        onChange={(e) => setMorseInput(e.target.value.toUpperCase())}
                        placeholder="TYPE A WORD (E.G. SECRET)..."
                        maxLength={15}
                        className="bg-[#EDE2CE] p-2.5 rounded-lg border border-[#D5C29D] font-mono text-sm tracking-widest text-[#2D1F17] uppercase outline-none font-bold select-text"
                      />
  
                      <div className="bg-[#EAE0CD] p-3 rounded-lg border border-[#C59B4B] space-y-1">
                        <span className="text-[10px] font-serif text-[#8C6F56] uppercase tracking-wider font-bold block">
                          Morse Sequence:
                        </span>
                        <p className="font-mono text-sm font-bold text-[#8B3A22] tracking-wider break-words select-text">
                          {morseInput ? textToMorse(morseInput) : '---'}
                        </p>
                      </div>
  
                      <button
                        onClick={handlePlayMorse}
                        disabled={!morseInput.trim() || isTransmitting}
                        className={`w-full py-2.5 flex items-center justify-center gap-2 rounded-lg font-serif text-xs uppercase tracking-wider font-bold transition shadow ${
                          isTransmitting
                            ? 'bg-[#C59B4B] text-[#2D1F17]'
                            : 'bg-[#8B3A22] hover:bg-[#A34327] text-white active:scale-95 disabled:opacity-50'
                        }`}
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>{isTransmitting ? 'Transmitting Audio...' : 'Transmit Audio Tones'}</span>
                      </button>
                    </div>
                  )}
                </div>

                <div className="px-5 py-2.5 bg-[#18110B] border-t-2 border-[#543D2D] text-[11px] font-serif text-[#8C6F56] text-center">
                  Field notebook persists across browser reloads.
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
    );
}
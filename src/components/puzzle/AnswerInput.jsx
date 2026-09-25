import React, { useState } from 'react';                                                                                                                                                       
import { motion } from 'framer-motion';                                                                                                                                                        
import { KeyRound, Check } from 'lucide-react';                                                                                                                                                
import { verifyAnswer } from '../../logic/cipherEngine.js';                                                                                                                                    
import { playSealStamp, playSuccessChime, playSucessChime } from '../../logic/audioEngine.js';       

export default function AnswerInput({
    acceptedAnswers,
    onSolve,
    isSolved,
    placeholder = 'Enter ledger keyword...',
    isMuted = false,
}) {
    const [inputVal, setInputVal] = useState('');
    const [hasError, setHasError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSolved || !inputVal.trim()) return;

        if (verifyAnswer(inputVal, acceptedAnswers)) {
            playSucessChime(isMuted);
            onSolve(inputVal.trim().toUpperCase());
        } else {
            playSealStamp(isMuted);
            setHasError(true);
            setTimeout(() => setHasError(false), 600);
        }
    };

    if (isSolved) {
        return (
            <div className="flex items-center justify-center gap-2 bg-[#2E3B2E] border-2 border-[#5A7A5A] text-[#D8E6D8] px-4 py-3 rounded-xl font-serif text-sm shadow-md">
                <Check className="w-5 h-5 text-[#88C088]"/>
                <span>Seal Broken & Deciphered</span>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">                                                                                                                                          
          <motion.div
            animate={hasError ? { x: [-8, 8, -6, 6, -3, 3, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-2 bg-[#F3E7D3] border-2 border-[#543D2D] rounded-xl p-1.5 shadow-md focus-within:border-[#C59B4B]"
          >
            <div className="pl-2 text-[#8C6F56]">
              <KeyRound className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value.toUpperCase())}
              placeholder={placeholder}
              maxLength={20}
              className="flex-1 bg-transparent px-2 py-1.5 font-serif text-sm tracking-wider text-[#2D1F17] placeholder-[#A0856C] outline-none uppercase font-bold"
            />                                                                                                                                                                                     
            <button                                                                                                                                                                                
              type="submit"
              className="flex items-center gap-1.5 bg-[#8B3A22] hover:bg-[#A34327] active:scale-95 text-[#FAF3E3] font-serif text-xs uppercase tracking-wider px-3.5 py-2 rounded-lg transition-transform shadow"                                                                                                                                                                                
            >                                                                                                                                                                                      
              <img                                                                                                                                                                                 
                src="/assets/ui_seal_unbroken.png"                                                                                                                                                 
                alt="Break Seal"
                className="w-4 h-4 object-contain"
              />
              <span>Break Seal</span>
            </button>
          </motion.div>
          {hasError && (
            <p className="text-[#8B3A22] text-xs font-serif italic text-center mt-1.5 font-semibold">
              The lock resists... That answer is incorrect.
            </p>
          )}
        </form>
    );
};
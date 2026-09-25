import React, { useState } from 'react';                                                                                                                                                       
import { motion } from 'framer-motion';                                                                                                                                                        
import { KeyRound, Check } from 'lucide-react';                                                                                                                                                
import { verifyAnswer } from '../../logic/cipherEngine.js';                                                                                                                                    
import { playSealStamp, playSuccessChime } from '../../logic/audioEngine.js';       

export default function AnswerInput({
    acceptedAnswers,
    onSolve,
    isSolved,
    placeholder = 'Enter ledger keyword...',
    isMuted = false,
}) {
    const [inputVal, setInputVal] = useState('');   
};
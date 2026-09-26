import React, {useEffect} from 'react';
import confetti from 'canvas-confetti';
import { X, Award, Sparkles, ScrollText, CheckCircle2 } from 'lucide-react';

export default function SanctumModal({ isOpen, onClose, rank = 'Master Archivist', onEnterExpansion}) {
    useEffect(() => {
        if (isOpen) {
            confetti({
                particleCount: 100,
                spread: 80,
                origin: { y: 0.55 },
                colors: ['#C59B4B', '#8B3A22', '#F4EBD9', '#2E3B2E'],
            });
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (                                                                                                                                                                                     
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-6 select-none">                                                                  
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#F7EFE1] border-4 border-[#C59B4B] rounded-2xl shadow-[0_16px_50px_rgba(0,0,0,0.9)] p-6 sm:p-8 flex flex-col items-center gap-5 text-center">                                                                                                                                                                                                                                                                                                                                         
            <button                                                                                                                                                                                
              onClick={onClose}                                                                                                                                                                    
              className="absolute top-3 right-3 p-1.5 rounded-lg text-[#8C6F56] hover:text-[#2D1F17] hover:bg-[#EFE2CE] transition"                                                                
              title="Close Sanctum"                                                                                                                                                                
            >                                                                                                                                                                                      
              <X className="w-5 h-5" />                                                                                                                                                            
            </button>                                                                                                                                                                                                                                                                                                                                                                                
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#FAF3E3] border-3 border-[#C59B4B] flex items-center justify-center shadow-lg p-1">                                         
              <img                                                                                                                                                                                 
                src="/assets/portrait_barnaby_happy.png"                                                                                                                                           
                alt="Barnaby Celebrating"                                                                                                                                                          
                className="w-full h-full object-cover rounded-full"                                                                                                                                
              />                                                                                                                                                                                   
            </div>                                                                                                                                                                                 
                                                                                                                                                                                                   
            <div>                                                                                                                                                                                  
              <div className="flex items-center justify-center gap-1.5 text-xs font-serif uppercase tracking-widest text-[#8B3A22] font-bold">                                                     
                <Sparkles className="w-4 h-4 text-[#C59B4B]" />                                                                                                                                    
                <span>Master Sanctum Unsealed</span>                                                                                                                                               
              </div>                                                                                                                                                                               
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1F17] mt-1 tracking-wide">                                                                                         
                The Archivist's Final Ledger                                                                                                                                                       
              </h1>                                                                                                                                                                                
            </div>                                                                                                                                                                                 
                                                                                                                                                                                                   
            <div className="bg-[#FAF3E3] border border-[#D5C29D] p-4 sm:p-5 rounded-xl shadow-inner text-left space-y-2.5">                                                                        
              <div className="flex items-center gap-2 text-xs font-serif text-[#8B3A22] uppercase tracking-wider font-bold">                                                                       
                <ScrollText className="w-4 h-4 text-[#C59B4B]" />                                                                                                                                  
                <span>Arthur Pendelton's Last Entry:</span>                                                                                                                                        
              </div>                                                                                                                                                                               
              <p className="font-serif text-xs sm:text-sm text-[#3C2A1E] leading-relaxed italic">                                                                                                  
                "To whoever holds this ledger: our childhood observatory in the hemlock woods still stands beneath the northern stars.                                                             
                These puzzles were never about hoarding secrets—they were built to keep our memories alive until someone curious enough came along to remember.                                    
                You have proven yourself worthy of this archive."                                                                                                                                  
              </p>                                                                                                                                                                                 
            </div>                                                                                                                                                                                 
                                                                                                                                                                                                   
            <div className="w-full bg-[#EDE2CE] border-2 border-[#543D2D] rounded-xl p-5 shadow-md flex flex-col items-center gap-2.5">                                                            
              <Award className="w-10 h-10 text-[#C59B4B]" />                                                                                                                                       
              <span className="font-serif text-xs uppercase tracking-widest text-[#8C6F56] font-semibold">                                                                                         
                Official Certification of Excellence                                                                                                                                               
              </span>                                                                                                                                                                              
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#2D1F17]">                                                                                                           
                Title Conferred: {rank}                                                                                                                                                            
              </span>                                                                                                                                                                              
              <div className="flex items-center gap-1.5 text-xs text-[#2E3B2E] font-serif font-bold bg-[#D4E4D4] px-3 py-1 rounded-full border border-[#5A7A5A]">                                  
                <CheckCircle2 className="w-4 h-4 text-[#4A7C4A]" />                                                                                                                                
                <span>All 6 Master Seals Restored & Cataloged</span>
              </div>
            </div>
  
            <button
              onClick={onEnterExpansion}
              className="px-6 py-2.5 bg-[#8B3A22] hover:bg-[#A34327] text-white rounded-lg font-serif text-xs uppercase tracking-wider font-bold shadow transition active:scale-95"
            >
              Enter the Scrapbook
            </button>
          </div>
        </div>
      );
}
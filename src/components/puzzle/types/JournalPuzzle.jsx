import React, {useState} from 'react';
import { Code, Eye} from 'lucide-react';

export default function JournalPuzzle({puzzle}) {
    const [isPeeled, setIsPeeled] = useState(false);

    return (
        <div className="flex flex-col items-center gap-3 w-full max-w-lg">                                                                                                                         
          <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden border-2 border-[#543D2D] shadow-md bg-[#FAF3E3]">                                                               
            <img                                                                                                                                                                                   
              src="/assets/inspect_journal_spread.png"                                                                                                                                             
              alt="Leather Journal Spread"                                                                                                                                                         
              className="w-full h-full object-cover"                                                                                                                                               
            />                                                                                                                                                                                     
                                                                                                                                                                                                   
            <div                                                                                                                                                                                   
              style={{ display: 'none' }}                                                                                                                                                          
              dangerouslySetInnerHTML={{ __html: '<!-- ARCHIVIST NOTE: The fiber keyword is CHRONOS -->' }}                                                                                        
            />                                                                                                                                                                                     
                                                                                                                                                                                                   
            {isPeeled && (                                                                                                                                                                         
              <div className="absolute inset-0 bg-[#1A130E]/95 p-5 text-[#88C088] font-mono text-xs flex flex-col justify-center overflow-auto select-text">                                       
                <span className="text-[#C59B4B] mb-2 font-bold flex items-center gap-1.5">                                                                                                         
                  <span>// Digital Parchment Fiber Inspection:</span>                                                                                                                              
                </span>                                                                                                                                                                            
                <div className="bg-[#241B14] p-3 rounded-lg border border-[#543D2D] leading-relaxed text-[#A8D5A8] shadow-inner">                                                                  
                  <span className="text-[#8C6F56]">&lt;!--</span>{' '}                                                                                                                             
                  <span className="text-[#FFE57F] font-bold">{puzzle.clue.hiddenComment}</span>{' '}                                                                                               
                  <span className="text-[#8C6F56]">--&gt;</span>                                                                                                                                   
                </div>                                                                                                                                                                             
                <p className="text-[11px] text-[#A0856C] mt-3 font-sans italic">                                                                                                                   
                  Arthur hid the keyword directly within the source comments of this page.                                                                                                         
                </p>                                                                                                                                                                               
              </div>                                                                                                                                                                               
            )}
          </div>
  
          <button
            onClick={() => setIsPeeled(!isPeeled)}
            className="flex items-center gap-1.5 font-serif text-xs text-[#8B3A22] hover:text-[#A34327] uppercase tracking-wider font-bold underline"
          >
            {isPeeled ? <Eye className="w-3.5 h-3.5" /> : <Code className="w-3.5 h-3.5" />}
            <span>{isPeeled ? 'Restore Parchment' : 'Peel Back Parchment (Inspect Source)'}</span>
          </button>
        </div>
    );
}
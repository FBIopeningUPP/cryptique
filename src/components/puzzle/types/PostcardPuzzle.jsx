import React, {useState} from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ZoomIn } from 'lucide-react';

export default function PostcardPuzzle() {
    const [isAssembled, setIsAssembled] = useState(false);
    const [showStampZoom, setShowStampZoom] = useState(false);

    return (                                                                                                                                                                                     
        <div className="flex flex-col items-center gap-3 w-full max-w-lg">                                                                                                                         
          <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden border-2 border-[#543D2D] bg-[#2E3B2E] p-4 flex items-center justify-center shadow-inner">                       
            {isAssembled ? (                                                                                                                                                                       
              <div className="relative w-full h-full flex items-center justify-center">                                                                                                            
                <img                                                                                                                                                                               
                  src="/assets/inspect_postcard_assembled.png"                                                                                                                                     
                  alt="Restored Constellation Postcard"                                                                                                                                            
                  className="max-h-full max-w-full object-contain filter drop-shadow-lg"                                                                                                           
                />                                                                                                                                                                                 
                                                                                                                                                                                                   
                <button                                                                                                                                                                            
                  onClick={() => setShowStampZoom(true)}                                                                                                                                           
                  className="absolute top-4 right-5 w-12 h-14 border-2 border-dashed border-[#C59B4B] hover:bg-[#C59B4B]/20 rounded transition flex items-center justify-center group"             
                  title="Click to examine stamp cancellation mark"                                                                                                                                 
                >                                                                                                                                                                                  
                  <ZoomIn className="w-5 h-5 text-[#FFE57F] group-hover:scale-110 transition" />                                                                                                   
                </button>                                                                                                                                                                          
              </div>                                                                                                                                                                               
            ) : (                                                                                                                                                                                  
              <div className="relative w-full h-full flex items-center justify-around overflow-hidden select-none">                                                                                
                <motion.img                                                                                                                                                                        
                  drag                                                                                                                                                                             
                  dragConstraints={{ left: -50, right: 50, top: -30, bottom: 30 }}                                                                                                                 
                  src="/assets/inspect_scrap_1.png"                                                                                                                                                
                  alt="Left Postcard Fragment"                                                                                                                                                     
                  className="w-24 sm:w-28 h-auto cursor-grab active:cursor-grabbing filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"                                                                
                />                                                                                                                                                                                 
                <motion.img                                                                                                                                                                        
                  drag                                                                                                                                                                             
                  dragConstraints={{ left: -50, right: 50, top: -30, bottom: 30 }}                                                                                                                 
                  src="/assets/inspect_scrap_2.png"                                                                                                                                                
                  alt="Center Postcard Fragment"                                                                                                                                                   
                  className="w-28 sm:w-32 h-auto cursor-grab active:cursor-grabbing filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"                                                                
                />                                                                                                                                                                                 
                <motion.img                                                                                                                                                                        
                  drag                                                                                                                                                                             
                  dragConstraints={{ left: -50, right: 50, top: -30, bottom: 30 }}                                                                                                                 
                  src="/assets/inspect_scrap_3.png"                                                                                                                                                
                  alt="Right Postcard Fragment"                                                                                                                                                    
                  className="w-24 sm:w-28 h-auto cursor-grab active:cursor-grabbing filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"                                                                
                />                                                                                                                                                                                 
              </div>                                                                                                                                                                               
            )}                                                                                                                                                                                     
                                                                                                                                                                                                   
            {showStampZoom && (                                                                                                                                                                    
              <div                                                                                                                                                                                 
                onClick={() => setShowStampZoom(false)}                                                                                                                                            
                className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 cursor-pointer z-20"                                                                         
              >                                                                                                                                                                                    
                <div className="bg-[#FAF3E3] border-2 border-[#543D2D] p-4 rounded-xl text-center shadow-2xl max-w-xs">                                                                            
                  <span className="font-serif text-xs text-[#8C6F56] uppercase tracking-wider block mb-1">                                                                                         
                    Postal Cancellation Stamp                                                                                                                                                      
                  </span>                                                                                                                                                                          
                  <p className="font-mono text-sm font-bold text-[#8B3A22] tracking-widest bg-[#EDE2CE] p-2 rounded border border-[#D5C29D]">                                                      
                    DESTINATION: STARLIGHT                                                                                                                                                         
                  </p>                                                                                                                                                                             
                  <p className="font-serif text-[11px] text-[#2D1F17] mt-2 italic">                                                                                                                
                    (Click anywhere to return to the workspace)                                                                                                                                    
                  </p>                                                                                                                                                                             
                </div>                                                                                                                                                                             
              </div>                                                                                                                                                                               
            )}                                                                                                                                                                                     
          </div>                                                                                                                                                                                   
                                                                                                                                                                                                   
          <div className="flex gap-4">                                                                                                                                                             
            <button                                                                                                                                                                                
              onClick={() => setIsAssembled(!isAssembled)}                                                                                                                                         
              className="flex items-center gap-1.5 font-serif text-xs text-[#8B3A22] hover:text-[#A34327] uppercase tracking-wider font-bold underline"                                            
            >                                                                                                                                                                                      
              <Sparkles className="w-3.5 h-3.5" />                                                                                                                                                 
              <span>{isAssembled ? 'Separate Scraps' : 'Align Fragments (Snap Together)'}</span>                                                                                                   
            </button>                                                                                                                                                                              
                                                                                                                                                                                                   
            {isAssembled && (
              <button
                onClick={() => setShowStampZoom(true)}
                className="flex items-center gap-1 font-serif text-xs text-[#2D1F17] hover:text-[#8B3A22] uppercase tracking-wider font-bold underline"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Examine Stamp</span>
              </button>
            )}
          </div>
        </div>
      );
}
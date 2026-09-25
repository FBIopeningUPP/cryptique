import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Sparkles } from 'lucide-react';

export default function TopHUD({
  solvedCount, 
  isMuted,
  onToggleMute,
  rank = 'Apprentice Archivist',
  onOpenCurios,
}) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const
}
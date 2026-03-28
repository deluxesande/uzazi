'use client';

import { useEffect, useState } from 'react';

interface BreathingExerciseProps {
  onComplete: () => void;
}

export default function BreathingExercise({ onComplete }: BreathingExerciseProps) {
  const [phase, setPhase] = useState('Breathe in...');
  const [scale, setScale] = useState(1);

  useEffect(() => {
    // 10 second total exercise
    // 0-4s: Inhale (scale up)
    // 4-6s: Hold
    // 6-10s: Exhale (scale down)
    
    // Start inhale
    setScale(1.5);
    
    const holdTimer = setTimeout(() => {
      setPhase('Hold...');
    }, 4000);

    const exhaleTimer = setTimeout(() => {
      setPhase('Breathe out...');
      setScale(1);
    }, 6000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 10000);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exhaleTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-nightBlue/95 backdrop-blur-md">
      <h2 className="text-2xl font-bold text-warmWhite mb-16 text-center px-8 leading-relaxed">
        I hear you. Let's take a slow breath together.
      </h2>
      
      <div 
        className="w-40 h-40 rounded-full bg-mintGreen/10 border-2 border-mintGreen/30 flex items-center justify-center transition-transform duration-[4000ms] ease-in-out"
        style={{ transform: `scale(${scale})` }}
      >
        <div className="w-32 h-32 rounded-full bg-mintGreen/20 flex items-center justify-center transition-transform duration-[4000ms] ease-in-out">
           <span className="text-warmWhite font-bold tracking-widest text-sm uppercase">
             {phase}
           </span>
        </div>
      </div>
    </div>
  );
}

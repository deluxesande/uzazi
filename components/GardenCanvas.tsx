import React from 'react';

interface GardenCanvasProps {
  petalCount: number;
}

export default function GardenCanvas({ petalCount }: GardenCanvasProps) {
  // Constrain petals between 0 and 30
  const displayCount = Math.min(Math.max(petalCount, 0), 30);
  const petals = Array.from({ length: displayCount });

  return (
    <div className="relative w-72 h-72 mx-auto flex items-center justify-center">
      {/* Empty state guide (subtle dashed ring) */}
      <div className="absolute w-56 h-56 border-2 border-dashed border-deepPlum/10 rounded-full"></div>

      {/* Center of the flower */}
      <div className="absolute w-16 h-16 bg-warmAmber rounded-full z-10 shadow-sm border-4 border-warmWhite"></div>
      
      {/* Petals */}
      {petals.map((_, index) => {
        // 30 petals max = 12 degrees each
        const angle = index * 12; 
        return (
          <div
            key={index}
            className="absolute w-8 h-24 bg-rosePink origin-bottom opacity-90 transition-all duration-1000 ease-out"
            style={{
              transform: `rotate(${angle}deg) translateY(-48px)`,
              borderRadius: '50% 50% 20% 20%',
              boxShadow: '0 2px 4px rgba(114, 36, 62, 0.1)'
            }}
          />
        );
      })}
    </div>
  );
}

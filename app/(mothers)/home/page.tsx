'use client';

import GardenCanvas from '@/components/GardenCanvas';
import { useRouter } from 'next/navigation';

export default function MotherHome() {
  const router = useRouter();
  // Hardcoded for demonstration of the Uzazi African context
  const petalCount = 12;
  const motherName = "Wanjiku";
  const postpartumDay = 14;

  return (
    <div className="min-h-screen bg-warmWhite flex flex-col">
      <header className="p-8 pb-4">
        <h1 className="text-4xl font-bold text-deepPlum tracking-tight">Jambo, {motherName}</h1>
        <p className="text-deepPlum/70 text-xl mt-2 font-medium">Day {postpartumDay} of your journey</p>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="mb-12">
          <GardenCanvas petalCount={petalCount} />
        </div>
        
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-deepPlum mb-3">Your Bloom Garden</h2>
          <p className="text-deepPlum/70 text-lg">You have earned <span className="font-bold text-rosePink">{petalCount} petals</span> so far.</p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={() => router.push('/check-in')}
            className="w-full bg-mintGreen text-warmWhite font-bold py-5 text-xl shadow-md hover:opacity-90 transition-opacity"
          >
            Start Daily Check-in
          </button>
          
          <button
            onClick={() => router.push('/night-companion')}
            className="w-full bg-nightBlue text-warmWhite font-bold py-5 text-xl border border-nightSurface shadow-sm hover:bg-nightSurface transition-colors"
          >
            3AM Night Companion
          </button>
        </div>
      </main>
    </div>
  );
}

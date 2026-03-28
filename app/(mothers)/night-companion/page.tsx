import ChatInterface from '@/components/ChatInterface';
import Link from 'next/link';

export default function NightCompanionPage() {
  return (
    <div className="min-h-screen bg-nightBlue flex flex-col">
      <header className="p-6 flex justify-between items-center border-b border-white/5 bg-nightSurface/30">
        <div>
          <h1 className="text-2xl font-bold text-warmWhite tracking-tight">3AM Companion</h1>
          <p className="text-warmWhite/50 text-sm mt-1">A safe, quiet space for the night hours.</p>
        </div>
        <Link 
          href="/home" 
          className="text-mintGreen font-bold text-sm hover:text-mintGreen/80 transition-colors uppercase tracking-wider px-4 py-2 border border-mintGreen/20 rounded-full"
        >
          Return
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 md:p-6">
        <ChatInterface />
      </main>
    </div>
  );
}

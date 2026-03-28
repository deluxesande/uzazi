'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white border-b border-green-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10">
          <div className="text-xl font-bold text-green-800">
            MamaBloom
          </div>
          <button
            onClick={handleSignOut}
            className="text-sm font-medium text-green-700 hover:text-green-900 px-4 py-2 rounded-md hover:bg-green-50 transition-colors"
          >
            Sign Out
          </button>
        </header>
        <main className="flex-1">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}

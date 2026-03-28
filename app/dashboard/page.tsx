'use client';

import { useAuth } from '@/context/AuthContext';
import { useMothers, Mother } from '@/hooks/useMothers';
import { useMemo, useState } from 'react';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: mothers, isLoading, error } = useMothers(user?.uid);
  const [isSeeding, setIsSeeding] = useState(false);

  const sortedMothers = useMemo(() => {
    if (!mothers) return [];
    const riskWeight = { high: 3, medium: 2, low: 1 };
    
    return [...mothers].sort((a, b) => {
      // Sort by risk level first (high -> low)
      const riskDiff = riskWeight[b.riskLevel] - riskWeight[a.riskLevel];
      if (riskDiff !== 0) return riskDiff;
      
      // Then by missed check-ins (high -> low)
      return b.missedCheckIns - a.missedCheckIns;
    });
  }, [mothers]);

  const handleSeedData = async () => {
    if (!user) return;
    setIsSeeding(true);
    try {
      const demoMothers = [
        {
          name: 'Amina Yusuf',
          riskLevel: 'high',
          lastCheckIn: Timestamp.fromDate(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)), // 3 days ago
          missedCheckIns: 3,
          chwId: user.uid,
        },
        {
          name: 'Fatima Ndiaye',
          riskLevel: 'medium',
          lastCheckIn: Timestamp.fromDate(new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)), // 1 day ago
          missedCheckIns: 1,
          chwId: user.uid,
        },
        {
          name: 'Grace Omondi',
          riskLevel: 'low',
          lastCheckIn: Timestamp.now(),
          missedCheckIns: 0,
          chwId: user.uid,
        },
        {
          name: 'Zainab Ali',
          riskLevel: 'high',
          lastCheckIn: null,
          missedCheckIns: 5,
          chwId: user.uid,
        },
        {
          name: 'Nneka Okafor',
          riskLevel: 'medium',
          lastCheckIn: Timestamp.fromDate(new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)), // 2 days ago
          missedCheckIns: 2,
          chwId: user.uid,
        }
      ];

      const mothersRef = collection(db, 'mothers');
      for (const mother of demoMothers) {
        await addDoc(mothersRef, mother);
      }
    } catch (err) {
      console.error('Error seeding data:', err);
    } finally {
      setIsSeeding(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="h-8 w-48 bg-deepPlum/10 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-24 bg-deepPlum/10 animate-pulse rounded"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 w-full bg-white animate-pulse rounded-lg border border-deepPlum/10"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 text-center text-rosePink bg-rosePink/10 rounded-lg border border-rosePink/20 mt-8">
        Failed to load data. Please check your permissions or try again later.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="flex justify-between items-end mb-8 border-b border-deepPlum/10 pb-4">
        <div>
          <h2 className="text-2xl font-semibold text-deepPlum">Triage Dashboard</h2>
          <p className="text-sm text-deepPlum/60 mt-1">Prioritized list of assigned mothers</p>
        </div>
        <span className="text-sm font-medium text-mintGreen bg-mintGreen/10 px-4 py-1.5 rounded-full">
          {mothers.length} Total
        </span>
      </div>

      {sortedMothers.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center text-deepPlum/60 bg-white rounded-lg border border-dashed border-deepPlum/20">
          <p className="mb-4">No mothers assigned to you currently.</p>
          <button
            onClick={handleSeedData}
            disabled={isSeeding}
            className="bg-mintGreen hover:opacity-90 text-white font-semibold py-2 px-6 rounded-md transition-opacity disabled:opacity-70"
          >
            {isSeeding ? 'Adding Demo Data...' : 'Add Demo Mothers'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedMothers.map((mother) => (
            <MotherCard key={mother.id} mother={mother} />
          ))}
        </div>
      )}
    </div>
  );
}

function MotherCard({ mother }: { mother: Mother }) {
  const isHigh = mother.riskLevel === 'high';
  const isMedium = mother.riskLevel === 'medium';
  const isLow = mother.riskLevel === 'low';

  return (
    <div className={`bg-white rounded-lg border p-5 shadow-sm transition-shadow hover:shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
      isHigh ? 'border-rosePink/30 border-l-4 border-l-rosePink' :
      isMedium ? 'border-orange-200 border-l-4 border-l-orange-400' :
      'border-mintGreen/30 border-l-4 border-l-mintGreen'
    }`}>
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="font-semibold text-lg text-deepPlum">{mother.name}</h3>
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
            isHigh ? 'bg-rosePink/10 text-rosePink' :
            isMedium ? 'bg-orange-100 text-orange-700' :
            'bg-mintGreen/10 text-mintGreen'
          }`}>
            {mother.riskLevel} RISK
          </span>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-deepPlum/70 mt-2">
          <div>
            <span className="text-deepPlum/40 uppercase text-xs font-semibold tracking-wider mr-2">Last Check-in:</span>
            <span className="font-medium text-deepPlum">
              {mother.lastCheckIn ? new Date(mother.lastCheckIn.toDate()).toLocaleDateString() : 'Never'}
            </span>
          </div>
          <div>
            <span className="text-deepPlum/40 uppercase text-xs font-semibold tracking-wider mr-2">Missed:</span>
            <span className={`font-medium ${mother.missedCheckIns > 0 ? 'text-rosePink' : 'text-mintGreen'}`}>
              {mother.missedCheckIns}
            </span>
          </div>
        </div>
      </div>
      
      <div className="sm:text-right mt-2 sm:mt-0">
        <button className="w-full sm:w-auto text-sm font-medium text-mintGreen hover:text-mintGreen/80 border border-mintGreen/30 hover:bg-mintGreen/5 py-2 px-6 rounded-md transition-colors">
          Review Case
        </button>
      </div>
    </div>
  );
}

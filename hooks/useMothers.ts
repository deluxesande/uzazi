import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export interface Mother {
  id: string;
  name: string;
  riskLevel: 'low' | 'medium' | 'high';
  lastCheckIn: Timestamp | null;
  missedCheckIns: number;
  chwId: string;
}

export function useMothers(chwId: string | null | undefined) {
  const [data, setData] = useState<Mother[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!chwId) {
      setData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const mothersRef = collection(db, 'mothers');
    const q = query(mothersRef, where('chwId', '==', chwId));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const mothersList: Mother[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Mother[];
        
        setData(mothersList);
        setIsLoading(false);
      },
      (err) => {
        console.error('Error fetching mothers:', err);
        setError(err as Error);
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, [chwId]);

  return { data, isLoading, error };
}

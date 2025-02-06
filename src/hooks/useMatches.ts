import { useState, useEffect } from 'react';

interface Match {
  id: string;
  childName: string;
  age: number;
  interests: string[];
  status: 'pending' | 'accepted' | 'rejected';
}

export function useMatches() {
  const [pendingMatches, setPendingMatches] = useState<Match[]>([
    {
      id: '1',
      childName: 'Emma',
      age: 7,
      interests: ['art', 'music'],
      status: 'pending'
    },
    {
      id: '2',
      childName: 'Lucas',
      age: 8,
      interests: ['sports', 'gaming'],
      status: 'pending'
    }
  ]);

  return { pendingMatches };
}
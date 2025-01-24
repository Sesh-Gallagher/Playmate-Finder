import { useState } from 'react';

interface ChildProfile {
  id: string;
  name: string;
  age: number;
  interests: string[];
  avatar: string;
}

export function useChildProfiles() {
  const [profiles] = useState<ChildProfile[]>([
    {
      id: '1',
      name: 'Alex',
      age: 8,
      interests: ['gaming', 'science'],
      avatar: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=150&q=80'
    }
  ]);

  return { profiles };
}
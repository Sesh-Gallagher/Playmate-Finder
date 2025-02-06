import { useState } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: Date;
}

export function useBadges() {
  const [badges] = useState<Badge[]>([
    {
      id: '1',
      name: 'Social Butterfly',
      description: 'Made friends with 5 different playmates',
      icon: '🦋',
      dateEarned: new Date()
    },
    {
      id: '2',
      name: 'Creative Genius',
      description: 'Completed 10 art activities',
      icon: '🎨',
      dateEarned: new Date()
    }
  ]);

  return { badges };
}
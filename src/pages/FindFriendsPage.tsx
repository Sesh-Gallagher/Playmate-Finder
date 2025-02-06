import React from 'react';
import { MatchGrid } from '../components/matching/MatchGrid';

const SAMPLE_MATCHES = [
  {
    profile: {
      id: '1',
      parentId: '1',
      name: 'Sarah',
      age: 7,
      interests: ['art', 'music'],
      avatar: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=150&q=80',
      badges: []
    },
    matchScore: 85
  },
  {
    profile: {
      id: '2',
      parentId: '2',
      name: 'Mike',
      age: 8,
      interests: ['gaming', 'science'],
      avatar: 'https://images.unsplash.com/photo-1618641662184-bafefb91a542?w=150&q=80',
      badges: []
    },
    matchScore: 75
  }
];

export function FindFriendsPage() {
  return (
    <div className="py-8">
      <MatchGrid matches={SAMPLE_MATCHES} />
    </div>
  );
}
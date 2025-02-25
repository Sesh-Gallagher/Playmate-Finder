import React from 'react';
import { MatchCard } from './MatchCard';
import { ChildProfile } from '../../types';

interface MatchGridProps {
  matches: Array<{
    profile: ChildProfile;
    matchScore: number;
  }>;
}

export function MatchGrid({ matches }: MatchGridProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold mb-6">Suggested Playmates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map(({ profile, matchScore }) => (
          <MatchCard
            key={profile.id}
            profile={profile}
            matchScore={matchScore}
            onConnect={() => {
              // Handle connection request
            }}
          />
        ))}
      </div>
    </div>
  );
}
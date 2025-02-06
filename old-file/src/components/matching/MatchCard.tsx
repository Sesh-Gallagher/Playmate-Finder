import React from 'react';
import { Star, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChildProfile } from '../../types';
import { Button } from '../common/Button';
import { ResponsiveImage } from '../common/ResponsiveImage';

interface MatchCardProps {
  profile: ChildProfile;
  matchScore: number;
}

export function MatchCard({ profile, matchScore }: MatchCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ResponsiveImage
        src={profile.avatar}
        alt={`${profile.name}'s avatar`}
        className="w-full h-48 object-cover"
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{profile.name}</h3>
          <span className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 mr-1" />
            {matchScore}%
          </span>
        </div>
        <p className="text-sm text-gray-600">Age: {profile.age}</p>
        <div className="mt-2">
          <h4 className="text-sm font-medium text-gray-700">Interests:</h4>
          <div className="flex flex-wrap gap-2 mt-1">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
        <Button
          fullWidth
          className="mt-4"
          onClick={() => navigate(`/messages/${profile.id}`)}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </div>
    </div>
  );
}
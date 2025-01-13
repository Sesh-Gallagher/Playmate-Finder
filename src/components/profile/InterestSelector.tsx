import React from 'react';
import { Music, Palette, Book, Gamepad, Dumbbell, Telescope } from 'lucide-react';

interface InterestSelectorProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
}

const interests = [
  { id: 'music', name: 'Music', icon: Music },
  { id: 'art', name: 'Art', icon: Palette },
  { id: 'reading', name: 'Reading', icon: Book },
  { id: 'gaming', name: 'Gaming', icon: Gamepad },
  { id: 'sports', name: 'Sports', icon: Dumbbell },
  { id: 'science', name: 'Science', icon: Telescope },
];

export function InterestSelector({ selectedInterests, onInterestsChange }: InterestSelectorProps) {
  const toggleInterest = (interestId: string) => {
    const newInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter(id => id !== interestId)
      : [...selectedInterests, interestId];
    onInterestsChange(newInterests);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Select Interests</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {interests.map(({ id, name, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => toggleInterest(id)}
            className={`flex items-center p-4 rounded-lg border ${
              selectedInterests.includes(id)
                ? 'bg-purple-100 border-purple-500'
                : 'border-gray-200 hover:border-purple-500'
            }`}
          >
            <Icon className="h-5 w-5 mr-2" />
            <span>{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
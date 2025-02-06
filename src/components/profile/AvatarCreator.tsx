import React from 'react';
import { Camera } from 'lucide-react';

interface AvatarCreatorProps {
  onSelect: (avatarUrl: string) => void;
}

const avatarOptions = [
  'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=150&q=80',
  'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=150&q=80',
  'https://images.unsplash.com/photo-1618641662184-bafefb91a542?w=150&q=80',
];

export function AvatarCreator({ onSelect }: AvatarCreatorProps) {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">Choose Avatar</label>
      <div className="grid grid-cols-3 gap-4">
        {avatarOptions.map((avatar, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onSelect(avatar)}
            className="relative rounded-lg overflow-hidden hover:ring-2 hover:ring-purple-500 focus:outline-none"
          >
            <img src={avatar} alt={`Avatar option ${index + 1}`} className="w-full h-24 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
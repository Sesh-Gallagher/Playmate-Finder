import React from 'react';
import { Check } from 'lucide-react';
import { getOptimizedImageUrl } from '../../utils/imageLoader';

interface AvatarSelectorProps {
  selectedAvatar?: string;
  onSelect: (avatarUrl: string) => void;
}

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1566004100631-35d015d6a491',
  'https://images.unsplash.com/photo-1618641986557-1ecd230959aa',
  'https://images.unsplash.com/photo-1618641662184-bafefb91a542',
  'https://images.unsplash.com/photo-1617791160505-6f00504e3519',
  'https://images.unsplash.com/photo-1618641662184-bafefb91a542',
  'https://images.unsplash.com/photo-1566004100631-35d015d6a491'
];

export function AvatarSelector({ selectedAvatar, onSelect }: AvatarSelectorProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {PRESET_AVATARS.map((avatar, index) => (
        <button
          key={index}
          onClick={() => onSelect(avatar)}
          className="relative aspect-square rounded-lg overflow-hidden group hover:ring-2 hover:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <img
            src={getOptimizedImageUrl(avatar, 200)}
            alt={`Avatar option ${index + 1}`}
            className="w-full h-full object-cover"
          />
          {selectedAvatar === avatar && (
            <div className="absolute inset-0 bg-purple-500/50 flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
import React from 'react';
import { Check } from 'lucide-react';

const AVATAR_OPTIONS = [
  {
    id: 'avatar1',
    url: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=150&q=80',
    alt: 'Playful child avatar'
  },
  {
    id: 'avatar2',
    url: 'https://images.unsplash.com/photo-1618641986557-1ecd230959aa?w=150&q=80',
    alt: 'Creative child avatar'
  },
  {
    id: 'avatar3',
    url: 'https://images.unsplash.com/photo-1618641662184-bafefb91a542?w=150&q=80',
    alt: 'Adventurous child avatar'
  },
  {
    id: 'avatar4',
    url: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=150&q=80',
    alt: 'Curious child avatar'
  },
  {
    id: 'avatar5',
    url: 'https://images.unsplash.com/photo-1595156264200-10e8ba270dfa?w=150&q=80',
    alt: 'Artistic child avatar'
  },
  {
    id: 'avatar6',
    url: 'https://images.unsplash.com/photo-1595967783875-c371f35d8049?w=150&q=80',
    alt: 'Sporty child avatar'
  },
  {
    id: 'avatar7',
    url: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=150&q=80',
    alt: 'Musical child avatar'
  },
  {
    id: 'avatar8',
    url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=150&q=80',
    alt: 'Science-loving child avatar'
  },
  {
    id: 'avatar9',
    url: 'https://images.unsplash.com/photo-1595967783875-c371f35d8049?w=150&q=80',
    alt: 'Nature-loving child avatar'
  },
  {
    id: 'avatar10',
    url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=150&q=80',
    alt: 'Reading child avatar'
  },
  {
    id: 'avatar11',
    url: 'https://images.unsplash.com/photo-1597524678053-5e6fe00bc6bf?w=150&q=80',
    alt: 'Explorer child avatar'
  },
  {
    id: 'avatar12',
    url: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=150&q=80',
    alt: 'Friendly child avatar'
  }
];

interface AvatarGridProps {
  selectedAvatarId: string | null;
  onSelectAvatar: (avatarId: string, url: string) => void;
}

export function AvatarGrid({ selectedAvatarId, onSelectAvatar }: AvatarGridProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
      {AVATAR_OPTIONS.map((avatar) => (
        <button
          key={avatar.id}
          onClick={() => onSelectAvatar(avatar.id, avatar.url)}
          className="relative aspect-square rounded-lg overflow-hidden group hover:ring-2 hover:ring-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
        >
          <img
            src={avatar.url}
            alt={avatar.alt}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-200"
          />
          {selectedAvatarId === avatar.id && (
            <div className="absolute inset-0 bg-purple-500/50 flex items-center justify-center">
              <Check className="w-6 h-6 text-white" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </button>
      ))}
    </div>
  );
}
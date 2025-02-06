import React, { useState } from 'react';
import { MatchGrid } from '../components/matching/MatchGrid';

const SAMPLE_MATCHES = [
  {
    profile: {
      id: '1',
      parentId: '1',
      name: 'Tom',
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
  },
  {
    profile: {
      id: '2',
      parentId: '2',
      name: 'Aron',
      age: 8,
      interests: ['gaming', 'science'],
      avatar: 'https://images.unsplash.com/photo-1618641662184-bafefb91a542?w=150&q=80',
      badges: []
    },
    matchScore: 75
  }
  
];

export function FindFriendsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMatches, setFilteredMatches] = useState(SAMPLE_MATCHES);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    
    const filtered = SAMPLE_MATCHES.filter(match => 
      match.profile.name.toLowerCase().includes(term) ||
      match.profile.interests.some(interest => 
        interest.toLowerCase().includes(term)
      )
    );
    
    setFilteredMatches(filtered);
  };

  return (
    <div className="py-8">
      <div className="mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name or interests..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>
      <MatchGrid matches={filteredMatches} />
    </div>
  );
}
/**
 * Sample data for development and testing 
 */
export const SAMPLE_PROFILES = [
  {
    id: '1',
    parentId: 'user1',
    name: 'Emma',
    age: 7,
    interests: ['art', 'music', 'reading'],
    avatar: 'https://images.unsplash.com/photo-1595967783875-c371f35d8049?w=150&q=80',
    badges: ['creative_genius', 'bookworm', 'music_lover']
  },
  {
    id: '2',
    parentId: 'user1',
    name: 'Lucas',
    age: 9,
    interests: ['sports', 'science', 'gaming'],
    avatar: 'https://images.unsplash.com/photo-1595967783875-c371f35d8049?w=150&q=80',
    badges: ['sports_star', 'science_whiz', 'team_player']
  }
];

export const SAMPLE_EVENTS = [
  {
    id: '1',
    title: 'Virtual Art Workshop',
    type: 'virtual',
    date: '2024-03-25',
    time: '15:00',
    maxParticipants: 15,
    currentParticipants: 8,
    description: 'Learn to paint with watercolors in this fun virtual session!',
    requirements: ['Paint brushes', 'Watercolors', 'Paper', 'Water cup'],
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80'
  },
  {
    id: '2',
    title: 'Science Experiment Day',
    type: 'virtual',
    date: '2024-03-27',
    time: '14:00',
    maxParticipants: 12,
    currentParticipants: 5,
    description: 'Exciting science experiments you can do at home!',
    requirements: ['Baking soda', 'Vinegar', 'Empty plastic bottle', 'Balloon'],
    image: 'https://images.unsplash.com/photo-1595967783875-c371f35d8049?w=400&q=80'
  }
];

export const SAMPLE_BADGES = [
  {
    id: 'creative_genius',
    name: 'Creative Genius',
    description: 'Completed 10 art activities',
    icon: '🎨',
    points: 50
  },
  {
    id: 'bookworm',
    name: 'Bookworm',
    description: 'Read 5 books with friends',
    icon: '📚',
    points: 30
  },
  {
    id: 'science_whiz',
    name: 'Science Whiz',
    description: 'Completed 5 science experiments',
    icon: '🔬',
    points: 40
  },
  {
    id: 'sports_star',
    name: 'Sports Star',
    description: 'Participated in 10 sports activities',
    icon: '⚽',
    points: 45
  },
  {
    id: 'music_lover',
    name: 'Music Lover',
    description: 'Attended 5 music sessions',
    icon: '🎵',
    points: 35
  },
  {
    id: 'team_player',
    name: 'Team Player',
    description: 'Joined 10 group activities',
    icon: '🤝',
    points: 50
  }
];
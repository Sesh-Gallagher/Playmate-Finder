import React from 'react';
import { EventList } from '../components/events/EventList';
import { EVENT_TYPES } from '../utils/constants';

const SAMPLE_EVENTS = [
  {
    id: 1,
    title: 'Virtual Art Workshop',
    type: EVENT_TYPES.VIRTUAL,
    date: '2024-03-20',
    time: '15:00',
    participants: 12,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80'
  },
  {
    id: 2,
    title: 'Picasso Babies outdoor painting',
    type: EVENT_TYPES.IN_PERSON,
    date: '2024-03-22',
    time: '10:00',
    participants: 8,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80'
  },
  {
    id: 3,
    title: 'Bible study',
    type: EVENT_TYPES.IN_PERSON,
    date: '2025-01-22',
    time: '14:00',
    participants: 12,
    image: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=150&q=80'
  }
];

export function EventsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
      <EventList events={SAMPLE_EVENTS} />
    </div>
  );
}
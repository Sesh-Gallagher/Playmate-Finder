import React from 'react';
import { EventCard } from './EventCard';
import { EVENT_TYPES } from '../../utils/constants';

interface Event {
  id: number;
  title: string;
  type: typeof EVENT_TYPES[keyof typeof EVENT_TYPES];
  date: string;
  time: string;
  participants: number;
  image: string;
}

interface EventListProps {
  events: Event[];
}

export function EventList({ events }: EventListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
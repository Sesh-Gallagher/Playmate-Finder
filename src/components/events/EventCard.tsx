import React from 'react';
import { Calendar, Users, Video } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { formatDate, formatTime } from '../../utils/date';
import { EVENT_TYPES } from '../../utils/constants';

interface EventCardProps {
  event: {
    id: number;
    title: string;
    type: typeof EVENT_TYPES[keyof typeof EVENT_TYPES];
    date: string;
    time: string;
    participants: number;
    image: string;
  };
}

export function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();

  return (
    <Card>
      <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <div className="flex items-center mb-2">
          {event.type === EVENT_TYPES.VIRTUAL ? (
            <Video className="h-5 w-5 text-purple-500 mr-2" />
          ) : (
            <Calendar className="h-5 w-5 text-purple-500 mr-2" />
          )}
          <h3 className="text-lg font-semibold">{event.title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          {formatDate(event.date)} at {formatTime(event.time)}
        </p>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="h-4 w-4 mr-1" />
          {event.participants} participants
        </div>
        <Button 
          fullWidth 
          className="mt-4"
          onClick={() => navigate(`/playdate/${event.id}`)}
        >
          Join Event
        </Button>
      </div>
    </Card>
  );
}
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Video } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { useNavigate } from 'react-router-dom';

interface Playdate {
  id: number;
  title: string;
  type: 'virtual' | 'in-person';
  date: string;
  time: string;
  location?: string;
  participants: string[];
  status: 'upcoming' | 'completed' | 'cancelled';
}

const playdates: Playdate[] = [
  {
    id: 1,
    title: 'Art & Craft Session',
    type: 'virtual',
    date: '2024-03-25',
    time: '15:00',
    participants: ['Alex', 'Emma', 'Lucas'],
    status: 'upcoming'
  },
  {
    id: 2,
    title: 'Park Playdate',
    type: 'in-person',
    date: '2024-03-27',
    time: '10:00',
    location: 'Central Park',
    participants: ['Sarah', 'Alex'],
    status: 'upcoming'
  }
];

export function PlaydatesPage() {
  const navigate = useNavigate();
  const [showScheduleForm, setShowScheduleForm] = useState(false);

  const handleSchedulePlaydate = () => {
    navigate('/schedule-playdate');
  };

  const handleJoinPlaydate = (id: number) => {
    navigate(`/playdate/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Playdates</h1>
        <Button onClick={handleSchedulePlaydate}>Schedule Playdate</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {playdates.map((playdate) => (
          <Card key={playdate.id}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-gray-900">{playdate.title}</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  {playdate.status}
                </span>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{new Date(playdate.date).toLocaleDateString()} at {playdate.time}</span>
                </div>

                {playdate.location && (
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{playdate.location}</span>
                  </div>
                )}

                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>{playdate.participants.join(', ')}</span>
                </div>
              </div>

              <div className="mt-6">
                <Button 
                  fullWidth
                  onClick={() => handleJoinPlaydate(playdate.id)}
                >
                  {playdate.type === 'virtual' ? (
                    <>
                      <Video className="h-5 w-5 mr-2" />
                      Join Virtual Playdate
                    </>
                  ) : (
                    'View Details'
                  )}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
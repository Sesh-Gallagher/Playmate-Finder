import React from 'react';
import { useParams } from 'react-router-dom';
import { Video, Calendar, Users, MapPin } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';

export function PlaydatePage() {
  const { id } = useParams();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Virtual Art Workshop</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <Calendar className="h-5 w-5 mr-2" />
              <span>March 20, 2024 at 3:00 PM</span>
            </div>
            <div className="flex items-center text-gray-600 mb-4">
              <Users className="h-5 w-5 mr-2" />
              <span>12 participants (8 spots left)</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Video className="h-5 w-5 mr-2" />
              <span>Virtual Event</span>
            </div>
          </div>
          <Button onClick={() => alert('Joining event...')}>
            Join Event
          </Button>
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">About this Playdate</h2>
          <p className="text-gray-700">
            Join us for an exciting virtual art workshop where kids will learn to create beautiful paintings
            using simple materials found at home. Our experienced instructor will guide children through
            the process step by step.
          </p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">What to Prepare</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>Paper or canvas</li>
            <li>Paint brushes</li>
            <li>Watercolors or acrylic paints</li>
            <li>Water cup</li>
            <li>Paper towels</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}

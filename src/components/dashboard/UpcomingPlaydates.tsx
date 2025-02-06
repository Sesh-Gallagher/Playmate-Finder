import React from 'react';
import { Calendar, Video } from 'lucide-react';

export function UpcomingPlaydates() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4">Upcoming Playdates</h2>
      <div className="space-y-4">
        {[1, 2].map((_, index) => (
          <div key={index} className="flex items-center p-4 border rounded-lg">
            <div className="flex-shrink-0">
              <Calendar className="h-8 w-8 text-purple-500" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium">Virtual Art Session</h3>
              <p className="text-sm text-gray-500">Tomorrow at 3:00 PM</p>
            </div>
            <button className="ml-auto flex items-center px-4 py-2 text-sm text-purple-600 hover:bg-purple-50 rounded-md">
              <Video className="h-4 w-4 mr-2" />
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
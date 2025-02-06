import React from 'react';
import { AdminHeader } from '../../components/admin/layout/AdminHeader';
import { AdminSidebar } from '../../components/admin/layout/AdminSidebar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Calendar, Users, Video, MapPin } from 'lucide-react';

const events = [
  {
    id: '1',
    title: 'Virtual Art Workshop',
    type: 'virtual',
    date: '2024-03-25',
    time: '15:00',
    participants: 12,
    maxParticipants: 20,
    status: 'upcoming'
  },
  {
    id: '2',
    title: 'Park Playdate',
    type: 'in-person',
    date: '2024-03-27',
    time: '10:00',
    location: 'Central Park',
    participants: 8,
    maxParticipants: 15,
    status: 'upcoming'
  }
];

export function AdminEventsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Event Management</h1>
              <Button>Create New Event</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id}>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{event.title}</h3>
                      <span className={`px-2 py-1 text-sm rounded-full ${
                        event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {event.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{event.date} at {event.time}</span>
                      </div>

                      {event.type === 'virtual' ? (
                        <div className="flex items-center text-gray-600">
                          <Video className="h-5 w-5 mr-2" />
                          <span>Virtual Event</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-gray-600">
                          <MapPin className="h-5 w-5 mr-2" />
                          <span>{event.location}</span>
                        </div>
                      )}

                      <div className="flex items-center text-gray-600">
                        <Users className="h-5 w-5 mr-2" />
                        <span>{event.participants}/{event.maxParticipants} participants</span>
                      </div>
                    </div>

                    <div className="mt-6 flex space-x-3">
                      <Button variant="secondary" className="flex-1">
                        Edit
                      </Button>
                      <Button variant="secondary" className="flex-1">
                        Cancel Event
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
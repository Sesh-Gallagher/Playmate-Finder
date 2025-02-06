import React from 'react';
import { AdminHeader } from '../../components/admin/layout/AdminHeader';
import { AdminSidebar } from '../../components/admin/layout/AdminSidebar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { AlertTriangle, Flag, MessageSquare, User, Clock } from 'lucide-react';

const reports = [
  {
    id: '1',
    type: 'inappropriate_content',
    reporter: 'Sarah Wilson',
    reported: 'John Smith',
    description: 'Inappropriate language in chat',
    status: 'pending',
    timestamp: '2024-03-19 14:30'
  },
  {
    id: '2',
    type: 'harassment',
    reporter: 'Mike Johnson',
    reported: 'Emma Davis',
    description: 'Repeated unwanted messages',
    status: 'investigating',
    timestamp: '2024-03-19 12:15'
  }
];

export function AdminReportsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Reports & Moderation</h1>

            <div className="grid grid-cols-1 gap-6">
              {reports.map((report) => (
                <Card key={report.id}>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        <h3 className="text-lg font-semibold">
                          {report.type.replace('_', ' ').charAt(0).toUpperCase() + 
                           report.type.slice(1).replace('_', ' ')}
                        </h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium
                        ${report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          report.status === 'investigating' ? 'bg-blue-100 text-blue-800' :
                          'bg-green-100 text-green-800'}`}>
                        {report.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Flag className="h-5 w-5 mr-2" />
                        <span>Reported by: {report.reporter}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <User className="h-5 w-5 mr-2" />
                        <span>Reported user: {report.reported}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <MessageSquare className="h-5 w-5 mr-2" />
                        <span>{report.description}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>{report.timestamp}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button variant="secondary" className="flex-1">
                        Investigate
                      </Button>
                      <Button className="flex-1 bg-red-600 hover:bg-red-700">
                        Take Action
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
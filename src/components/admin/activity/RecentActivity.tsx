import React from 'react';
import { Card } from '../../common/Card';
import { User, Flag, AlertTriangle } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'profile_update',
    message: 'Profile updated for John D.',
    timestamp: '2 minutes ago',
    icon: User,
    severity: 'info'
  },
  {
    id: 2,
    type: 'flag',
    message: 'Content flagged in Chat Room #123',
    timestamp: '5 minutes ago',
    icon: Flag,
    severity: 'warning'
  },
  {
    id: 3,
    type: 'error',
    message: 'Failed login attempt detected',
    timestamp: '10 minutes ago',
    icon: AlertTriangle,
    severity: 'error'
  }
];

export function RecentActivity() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50"
          >
            <activity.icon className={`h-5 w-5 ${
              activity.severity === 'error' ? 'text-red-500' :
              activity.severity === 'warning' ? 'text-yellow-500' :
              'text-blue-500'
            }`} />
            <div className="flex-1">
              <p className="text-sm text-gray-800">{activity.message}</p>
              <span className="text-xs text-gray-500">{activity.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
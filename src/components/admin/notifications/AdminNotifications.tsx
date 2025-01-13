import React from 'react';
import { Card } from '../../common/Card';
import { Bell, AlertCircle, Flag } from 'lucide-react';
import { Button } from '../../common/Button';

const notifications = [
  {
    id: 1,
    title: 'New Profile Verification Required',
    message: '5 new profiles awaiting verification',
    type: 'verification',
    icon: AlertCircle,
    action: 'Review'
  },
  {
    id: 2,
    title: 'Content Flagged',
    message: '3 items have been flagged for review',
    type: 'flag',
    icon: Flag,
    action: 'Review'
  }
];

export function AdminNotifications() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">System Notifications</h2>
        <Bell className="h-5 w-5 text-gray-500" />
      </div>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <notification.icon className="h-5 w-5 text-yellow-500" />
              <div>
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            </div>
            <Button variant="secondary" size="sm">
              {notification.action}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
import React from 'react';
import { Card } from '../../common/Card';
import { Bell, AlertCircle, Flag } from 'lucide-react';
import { Button } from '../../common/Button';
import { useFlaggedContent } from '../../../hooks/admin/useFlaggedContent';

export function AdminNotifications() {
  const { content: notifications, loading, error, resolveContent } = useFlaggedContent();

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-red-500">Error loading notifications: {error}</div>
      </Card>
    );
  }

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
              <Flag className="h-5 w-5 text-yellow-500" />
              <div>
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
            </div>
            <Button 
              variant="secondary" 
              size="sm"
              onClick={() => resolveContent(notification.id, 'reviewed', '')}
            >
              Review
            </Button>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No new notifications
          </div>
        )}
      </div>
    </Card>
  );
}
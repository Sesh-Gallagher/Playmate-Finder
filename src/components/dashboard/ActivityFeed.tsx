import React from 'react';
import { MessageSquare, Award } from 'lucide-react';

export function ActivityFeed() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="flex items-start border-b pb-4">
            <div className="flex-shrink-0">
              {index % 2 === 0 ? (
                <MessageSquare className="h-6 w-6 text-blue-500" />
              ) : (
                <Award className="h-6 w-6 text-yellow-500" />
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm">
                {index % 2 === 0
                  ? 'New playdate request from Sarah'
                  : 'Alex earned the "Creative Artist" badge'}
              </p>
              <span className="text-xs text-gray-500">2 hours ago</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
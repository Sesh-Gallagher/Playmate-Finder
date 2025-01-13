import React from 'react';
import { Server, Clock, Activity } from 'lucide-react';
import { Card } from '../../common/Card';

export function SystemStatus() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">System Status</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Server className="h-5 w-5 text-green-500 mr-2" />
            <span>Server Status</span>
          </div>
          <span className="text-green-500">Operational</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-green-500 mr-2" />
            <span>Response Time</span>
          </div>
          <span>120ms</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-green-500 mr-2" />
            <span>Active Users</span>
          </div>
          <span>1,234</span>
        </div>
      </div>
    </Card>
  );
}
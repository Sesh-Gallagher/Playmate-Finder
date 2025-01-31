import React from 'react';
import { Server, Clock, Activity, Database, MemoryStick as Memory } from 'lucide-react';
import { Card } from '../../common/Card';

interface SystemStatusProps {
  health: any;
  loading: boolean;
}

export function SystemStatus({ health, loading }: SystemStatusProps) {
  if (loading) {
    return (
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">System Status</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded"></div>
        </div>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">System Status</h2>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Database className={`h-5 w-5 ${getStatusColor(health?.database)} mr-2`} />
            <span>Database Status</span>
          </div>
          <span className={getStatusColor(health?.database)}>
            {health?.database || 'Unknown'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Memory className={`h-5 w-5 ${getStatusColor(health?.cache)} mr-2`} />
            <span>Cache Status</span>
          </div>
          <span className={getStatusColor(health?.cache)}>
            {health?.cache || 'Unknown'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Activity className="h-5 w-5 text-green-500 mr-2" />
            <span>Response Time</span>
          </div>
          <span>120ms</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-green-500 mr-2" />
            <span>Last Updated</span>
          </div>
          <span>{health?.timestamp ? new Date(health.timestamp).toLocaleTimeString() : 'Unknown'}</span>
        </div>
      </div>
    </Card>
  );
}
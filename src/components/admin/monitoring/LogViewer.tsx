import React, { useState, useEffect } from 'react';
import { Card } from '../../common/Card';
import { AlertCircle, Clock, User } from 'lucide-react';

interface Log {
  timestamp: string;
  level: string;
  message: string;
  userId?: string;
  details?: any;
}

export function LogViewer() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await fetch('/api/admin/logs');
        if (response.ok) {
          const data = await response.json();
          setLogs(data);
        }
      } catch (error) {
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLogs();
  }, []);

  if (loading) {
    return <div>Loading logs...</div>;
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">System Logs</h2>
      <div className="space-y-4">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              log.level === 'error' ? 'bg-red-50' :
              log.level === 'warn' ? 'bg-yellow-50' :
              'bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <AlertCircle className={`h-5 w-5 mr-2 ${
                  log.level === 'error' ? 'text-red-500' :
                  log.level === 'warn' ? 'text-yellow-500' :
                  'text-blue-500'
                }`} />
                <span className="font-medium">{log.message}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {new Date(log.timestamp).toLocaleString()}
              </div>
            </div>
            {log.userId && (
              <div className="flex items-center text-sm text-gray-500">
                <User className="h-4 w-4 mr-1" />
                User ID: {log.userId}
              </div>
            )}
            {log.details && (
              <pre className="mt-2 text-sm bg-white p-2 rounded">
                {JSON.stringify(log.details, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
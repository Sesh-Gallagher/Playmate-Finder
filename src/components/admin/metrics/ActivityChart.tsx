import React from 'react';

interface ActivityData {
  date: string;
  profiles: number;
  matches: number;
  events: number;
}

interface ActivityChartProps {
  data: ActivityData[];
}

export function ActivityChart({ data }: ActivityChartProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold mb-4">Activity Overview</h3>
      <div className="h-64 w-full">
        {/* Chart implementation would go here */}
        <p className="text-gray-500">Activity visualization</p>
      </div>
    </div>
  );
}
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend: number;
  urgent?: boolean;
}

export function MetricCard({ title, value, icon: Icon, trend, urgent }: MetricCardProps) {
  const trendColor = trend >= 0 ? 'text-green-500' : 'text-red-500';
  const bgColor = urgent ? 'bg-red-50' : 'bg-white';

  return (
    <div className={`${bgColor} rounded-lg shadow-sm p-6`}>
      <div className="flex items-center justify-between">
        <Icon className={`h-8 w-8 ${urgent ? 'text-red-500' : 'text-purple-500'}`} />
        <span className={`text-sm font-medium ${trendColor}`}>
          {trend >= 0 ? '+' : ''}{trend}%
        </span>
      </div>
      <h3 className="mt-4 text-2xl font-semibold">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  );
}
import React from 'react';
import { Users, Search, Calendar, Gamepad, Award } from 'lucide-react';

interface MenuItem {
  title: string;
  description: string;
  action: () => void;
  count?: number;
  notification?: number;
  highlight?: boolean;
}

interface DashboardMenuProps {
  items: MenuItem[];
}

const iconMap = {
  'Profiles': Users,
  'Find Matches': Search,
  'Playdates': Calendar,
  'Game Center': Gamepad,
  'Achievements': Award,
} as const;

export function DashboardMenu({ items }: DashboardMenuProps) {
  const renderMenuItem = (item: MenuItem) => {
    const Icon = iconMap[item.title as keyof typeof iconMap];
    
    return (
      <button
        key={item.title}
        onClick={item.action}
        className={`p-4 rounded-lg shadow-sm transition-all hover:shadow-md text-left
          ${item.highlight 
            ? 'bg-gradient-to-br from-purple-600 to-pink-500 text-white' 
            : 'bg-white'}`}
      >
        <div className="flex items-start justify-between">
          <Icon className={`h-6 w-6 ${item.highlight ? 'text-white' : 'text-purple-600'}`} />
          {(item.notification || item.count) && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {item.notification || item.count}
            </span>
          )}
        </div>
        <h3 className={`mt-3 text-lg font-semibold ${item.highlight ? 'text-white' : 'text-gray-900'}`}>
          {item.title}
        </h3>
        <p className={`mt-1 text-sm ${item.highlight ? 'text-purple-100' : 'text-gray-500'}`}>
          {item.description}
        </p>
      </button>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      {items.map(renderMenuItem)}
    </div>
  );
}
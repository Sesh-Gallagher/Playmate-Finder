import React from 'react';
import { Calendar, MessageSquare, Award } from 'lucide-react';
import { UpcomingPlaydates } from './UpcomingPlaydates';
import { ActivityFeed } from './ActivityFeed';
import { ChildrenProfiles } from './ChildrenProfiles';
import { DashboardMenu } from './DashboardMenu';

interface MenuItem {
  title: string;
  description: string;
  action: () => void;
  count?: number;
  notification?: number;
  highlight?: boolean;
}

interface ParentDashboardProps {
  menuItems: MenuItem[];
}

export function ParentDashboard({ menuItems }: ParentDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DashboardMenu items={menuItems} />
          <UpcomingPlaydates />
          <ActivityFeed />
        </div>
        <div className="lg:col-span-1">
          <ChildrenProfiles />
        </div>
      </div>
    </div>
  );
}
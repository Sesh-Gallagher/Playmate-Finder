import React from 'react';
import { Users, Calendar, Flag, Bell } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { ActivityChart } from './ActivityChart';
import { useAdminMetrics } from '../../../hooks/admin/useAdminMetrics';

export function AdminMetrics() {
  const { metrics, loading, error } = useAdminMetrics();

  if (loading) return <div>Loading metrics...</div>;
  if (error) return <div>Error loading metrics: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Active Profiles"
          value={metrics.activeProfiles}
          icon={Users}
          trend={metrics.profileTrend}
        />
        <MetricCard
          title="Recent Matches"
          value={metrics.recentMatches}
          icon={Calendar}
          trend={metrics.matchTrend}
        />
        <MetricCard
          title="Pending Verifications"
          value={metrics.pendingVerifications}
          icon={Bell}
          trend={metrics.verificationTrend}
        />
        <MetricCard
          title="Flagged Activities"
          value={metrics.flaggedActivities}
          icon={Flag}
          trend={metrics.flaggedTrend}
          urgent
        />
      </div>
      <ActivityChart data={metrics.activityData} />
    </div>
  );
}
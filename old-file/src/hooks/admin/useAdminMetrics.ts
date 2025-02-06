import { useState, useEffect } from 'react';
import { fetchAdminMetrics } from '../../services/admin/metrics';

interface Metrics {
  activeProfiles: number;
  recentMatches: number;
  pendingVerifications: number;
  flaggedActivities: number;
  profileTrend: number;
  matchTrend: number;
  verificationTrend: number;
  flaggedTrend: number;
  activityData: Array<{
    date: string;
    profiles: number;
    matches: number;
    events: number;
  }>;
}

export function useAdminMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    activeProfiles: 0,
    recentMatches: 0,
    pendingVerifications: 0,
    flaggedActivities: 0,
    profileTrend: 0,
    matchTrend: 0,
    verificationTrend: 0,
    flaggedTrend: 0,
    activityData: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const data = await fetchAdminMetrics();
        setMetrics(data);
        setError(null);
      } catch (err) {
        setError('Failed to load metrics');
        console.error('Error loading admin metrics:', err);
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, []);

  return { metrics, loading, error };
}
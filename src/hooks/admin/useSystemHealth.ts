import { useState, useEffect } from 'react';
import { adminService } from '../../services/admin';

export function useSystemHealth() {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHealth() {
      try {
        const data = await adminService.getSystemHealth();
        setHealth(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch system health');
        console.error('Error fetching system health:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHealth();
    const interval = setInterval(fetchHealth, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return { health, loading, error };
}
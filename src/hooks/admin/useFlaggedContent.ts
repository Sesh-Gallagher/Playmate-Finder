import { useState, useEffect } from 'react';
import { adminService } from '../../services/admin';

export function useFlaggedContent() {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchContent() {
    try {
      const data = await adminService.getFlaggedContent();
      setContent(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch flagged content');
      console.error('Error fetching flagged content:', err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchContent();
  }, []);

  const resolveContent = async (id: string, action: string, notes: string) => {
    try {
      await adminService.resolveFlaggedContent(id, action, notes);
      await fetchContent(); // Refresh the list
    } catch (err) {
      setError('Failed to resolve content');
      throw err;
    }
  };

  return { content, loading, error, resolveContent, refresh: fetchContent };
}
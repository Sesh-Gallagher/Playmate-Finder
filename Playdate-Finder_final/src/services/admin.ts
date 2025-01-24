import { getDb } from '../../server/config/database';
import { ObjectId } from 'mongodb';

export interface AdminMetrics {
  activeProfiles: number;
  pendingVerifications: number;
  flaggedActivities: number;
  systemHealth: {
    database: string;
    cache: string;
    timestamp: Date;
  };
}

export const adminService = {
  async getMetrics(): Promise<AdminMetrics> {
    const response = await fetch('/api/admin/metrics');
    if (!response.ok) {
      throw new Error('Failed to fetch metrics');
    }
    return response.json();
  },

  async getSystemHealth() {
    const response = await fetch('/api/admin/health');
    if (!response.ok) {
      throw new Error('Failed to fetch system health');
    }
    return response.json();
  },

  async getFlaggedContent() {
    const response = await fetch('/api/admin/flagged');
    if (!response.ok) {
      throw new Error('Failed to fetch flagged content');
    }
    return response.json();
  },

  async resolveFlaggedContent(id: string, action: string, notes: string) {
    const response = await fetch(`/api/admin/flagged/${id}/resolve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ action, notes }),
    });
    if (!response.ok) {
      throw new Error('Failed to resolve flagged content');
    }
    return response.json();
  }
};
import React from 'react';
import { AdminMetrics } from '../../components/admin/metrics/AdminMetrics';
import { AdminSidebar } from '../../components/admin/layout/AdminSidebar';
import { AdminHeader } from '../../components/admin/layout/AdminHeader';
import { AdminNotifications } from '../../components/admin/notifications/AdminNotifications';
import { SystemStatus } from '../../components/admin/monitoring/SystemStatus';
import { RecentActivity } from '../../components/admin/activity/RecentActivity';

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
            
            {/* Metrics Overview */}
            <AdminMetrics />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              {/* System Status */}
              <SystemStatus />
              
              {/* Recent Activity */}
              <RecentActivity />
            </div>

            {/* Notifications */}
            <div className="mt-6">
              <AdminNotifications />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
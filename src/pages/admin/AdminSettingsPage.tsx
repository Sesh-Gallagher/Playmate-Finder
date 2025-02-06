import React from 'react';
import { AdminHeader } from '../../components/admin/layout/AdminHeader';
import { AdminSidebar } from '../../components/admin/layout/AdminSidebar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Save } from 'lucide-react';

export function AdminSettingsPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">System Settings</h1>

            <div className="space-y-6">
              <Card>
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Matching Parameters</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Maximum Age Difference (years)
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        defaultValue={2}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Minimum Interest Match (%)
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        defaultValue={50}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Location Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Maximum Distance for In-Person Events (miles)
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        defaultValue={25}
                      />
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Moderation Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Auto-flag threshold (reports)
                      </label>
                      <input
                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        defaultValue={3}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Profile verification required
                      </label>
                      <div className="mt-1">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-purple-600 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                            defaultChecked
                          />
                          <span className="ml-2">Enable</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
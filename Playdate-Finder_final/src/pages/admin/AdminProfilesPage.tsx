import React, { useState } from 'react';
import { AdminHeader } from '../../components/admin/layout/AdminHeader';
import { AdminSidebar } from '../../components/admin/layout/AdminSidebar';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Search, Filter, Edit2, Trash2, Flag } from 'lucide-react';

const profiles = [
  {
    id: '1',
    name: 'Emma Wilson',
    age: 7,
    status: 'active',
    lastActive: '2024-03-19',
    flags: 0
  },
  {
    id: '2',
    name: 'Lucas Smith',
    age: 9,
    status: 'pending',
    lastActive: '2024-03-18',
    flags: 2
  }
];

export function AdminProfilesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Profile Management</h1>
              <Button>Add New Profile</Button>
            </div>

            <Card className="mb-6">
              <div className="p-4 flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search profiles..."
                    className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="border rounded-lg px-4 py-2"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="flagged">Flagged</option>
                </select>
              </div>
            </Card>

            <Card>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Flags
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {profiles.map((profile) => (
                      <tr key={profile.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {profile.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {profile.age}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                            ${profile.status === 'active' ? 'bg-green-100 text-green-800' :
                              profile.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'}`}>
                            {profile.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {profile.lastActive}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {profile.flags > 0 ? (
                            <span className="text-red-600 flex items-center">
                              <Flag className="h-4 w-4 mr-1" />
                              {profile.flags}
                            </span>
                          ) : '0'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="secondary" className="mr-2">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="secondary" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
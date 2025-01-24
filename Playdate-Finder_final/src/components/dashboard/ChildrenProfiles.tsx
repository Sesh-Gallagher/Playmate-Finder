import React from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { useProfiles } from '../../hooks/useProfiles';

export function ChildrenProfiles() {
  const navigate = useNavigate();
  const { profiles, loading, error } = useProfiles();

  const handleAddProfile = () => {
    navigate('/profile');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Children</h2>
        <div className="animate-pulse space-y-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Your Children</h2>
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Your Children</h2>
      <div className="space-y-4">
        {profiles.map((profile) => (
          <div key={profile.id} className="flex items-center p-3 border rounded-lg">
            <img
              src={profile.avatar}
              alt={`${profile.name}'s avatar`}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div className="ml-3">
              <h3 className="font-medium">{profile.name}</h3>
              <p className="text-sm text-gray-500">Age {profile.age}</p>
            </div>
          </div>
        ))}
        <Button
          onClick={handleAddProfile}
          variant="secondary"
          className="w-full flex items-center justify-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Child Profile
        </Button>
      </div>
    </div>
  );
}
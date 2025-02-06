import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '../hooks/useProfiles';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { EditProfileForm } from '../components/profile/EditProfileForm';
import { ChildProfile } from '../types';

export function ProfilesPage() {
  const navigate = useNavigate();
  const { profiles, deleteProfile } = useProfiles();
  const [editingProfile, setEditingProfile] = useState<ChildProfile | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleAddProfile = () => {
    navigate('/profile');
  };

  const handleDeleteProfile = async (id: string) => {
    try {
      await deleteProfile(id);
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete profile:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Child Profiles</h1>
        <Button onClick={handleAddProfile}>
          <Plus className="h-5 w-5 mr-2" />
          Add Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div key={profile.id}>
            {editingProfile?.id === profile.id ? (
              <EditProfileForm
                profile={profile}
                onCancel={() => setEditingProfile(null)}
              />
            ) : (
              <Card>
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={profile.avatar}
                      alt={profile.name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
                      <p className="text-gray-600">Age: {profile.age}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">Interests</h4>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profile.interests.map((interest) => (
                        <span
                          key={interest}
                          className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700"
                        >
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <Button 
                      variant="secondary" 
                      className="flex-1"
                      onClick={() => setEditingProfile(profile)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="secondary" 
                      className="flex-1"
                      onClick={() => setShowDeleteConfirm(profile.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>

                  {showDeleteConfirm === profile.id && (
                    <div className="mt-4 p-4 bg-red-50 rounded-md">
                      <p className="text-sm text-red-600 mb-4">
                        Are you sure you want to delete this profile? This action cannot be undone.
                      </p>
                      <div className="flex space-x-3">
                        <Button
                          variant="secondary"
                          className="flex-1"
                          onClick={() => setShowDeleteConfirm(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          onClick={() => handleDeleteProfile(profile.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
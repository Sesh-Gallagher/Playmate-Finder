import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '../../hooks/useProfiles';
import { ProfileImageSelector } from './ProfileImageSelector';
import { InterestSelector } from './InterestSelector';
import { Button } from '../common/Button';
import { ChildProfile } from '../../types';

interface EditProfileFormProps {
  profile: ChildProfile;
  onCancel: () => void;
}

export function EditProfileForm({ profile, onCancel }: EditProfileFormProps) {
  const navigate = useNavigate();
  const { updateProfile } = useProfiles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: profile.name,
    age: profile.age,
    interests: profile.interests,
    avatar: profile.avatar
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.avatar) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      
      await updateProfile(profile.id, {
        name: formData.name,
        age: formData.age,
        interests: formData.interests,
        avatar: formData.avatar
      });
      
      onCancel(); // Close the edit form //
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Error updating profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <ProfileImageSelector
          onImageSelect={(imageUrl) => setFormData({ ...formData, avatar: imageUrl })}
          currentImage={formData.avatar}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            required
            min="4"
            max="12"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          />
        </div>

        <InterestSelector 
          selectedInterests={formData.interests}
          onInterestsChange={(interests) => setFormData({ ...formData, interests })}
        />

        <div className="flex space-x-4">
          <Button
            type="button"
            variant="secondary"
            fullWidth
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  );
}
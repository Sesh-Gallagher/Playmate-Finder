import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfiles } from '../../hooks/useProfiles';
import { ProfileImageSelector } from './ProfileImageSelector';
import { InterestSelector } from './InterestSelector';
import { Button } from '../common/Button';

export function CreateProfileForm() {
  const navigate = useNavigate();
  const { createProfile } = useProfiles();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    age: 4,
    interests: [] as string[],
    avatar: ''
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
      
      await createProfile({
        name: formData.name,
        age: formData.age,
        interests: formData.interests,
        avatar: formData.avatar,
        parentId: 'current-user' // In a real app, get from auth context
      });
      
      navigate('/profiles');
    } catch (err) {
      setError('Failed to create profile. Please try again.');
      console.error('Error creating profile:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Create Child Profile</h2>
      
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

        <Button
          type="submit"
          fullWidth
          disabled={isSubmitting || !formData.name || !formData.avatar}
        >
          {isSubmitting ? 'Creating Profile...' : 'Create Profile'}
        </Button>
      </form>
    </div>
  );
}
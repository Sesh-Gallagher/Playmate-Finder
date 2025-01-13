import React, { createContext, useContext, useState, useEffect } from 'react';
import { ChildProfile } from '../types';
import * as profileService from '../services/profiles';

interface ProfileContextType {
  profiles: ChildProfile[];
  loading: boolean;
  error: string | null;
  createProfile: (data: Omit<ChildProfile, 'id' | 'badges'>) => Promise<void>;
  updateProfile: (id: string, data: Partial<ChildProfile>) => Promise<void>;
  deleteProfile: (id: string) => Promise<void>;
  refreshProfiles: () => Promise<void>;
}

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshProfiles = async () => {
    try {
      setLoading(true);
      const fetchedProfiles = await profileService.getProfiles();
      setProfiles(fetchedProfiles);
      setError(null);
    } catch (err) {
      setError('Failed to load profiles');
      console.error('Error loading profiles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshProfiles();
  }, []);

  const createProfile = async (data: Omit<ChildProfile, 'id' | 'badges'>) => {
    try {
      await profileService.createProfile(data);
      await refreshProfiles();
    } catch (err) {
      console.error('Error creating profile:', err);
      throw new Error('Failed to create profile');
    }
  };

  const updateProfile = async (id: string, data: Partial<ChildProfile>) => {
    try {
      await profileService.updateProfile(id, data);
      await refreshProfiles();
    } catch (err) {
      console.error('Error updating profile:', err);
      throw new Error('Failed to update profile');
    }
  };

  const deleteProfile = async (id: string) => {
    try {
      await profileService.deleteProfile(id);
      await refreshProfiles();
    } catch (err) {
      console.error('Error deleting profile:', err);
      throw new Error('Failed to delete profile');
    }
  };

  const value = {
    profiles,
    loading,
    error,
    createProfile,
    updateProfile,
    deleteProfile,
    refreshProfiles
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
}
import { ChildProfile } from '../types';
import { SAMPLE_PROFILES } from '../data/sampleData';

// Initialize with sample data
let profiles: ChildProfile[] = [...SAMPLE_PROFILES];

export async function createProfile(profileData: Omit<ChildProfile, 'id' | 'badges'>): Promise<ChildProfile> {
  const newProfile: ChildProfile = {
    id: crypto.randomUUID(),
    parentId: 'current-user',
    badges: [],
    ...profileData
  };

  profiles = [...profiles, newProfile];
  return newProfile;
}

export async function getProfiles(): Promise<ChildProfile[]> {
  return [...profiles];
}

export async function updateProfile(id: string, data: Partial<ChildProfile>): Promise<ChildProfile> {
  const index = profiles.findIndex(p => p.id === id);
  if (index === -1) throw new Error('Profile not found');
  
  const updatedProfile = {
    ...profiles[index],
    ...data
  };
  
  profiles[index] = updatedProfile;
  return updatedProfile;
}

export async function deleteProfile(id: string): Promise<void> {
  profiles = profiles.filter(p => p.id !== id);
}

export async function getProfileById(id: string): Promise<ChildProfile | null> {
  const profile = profiles.find(p => p.id === id);
  return profile || null;
}
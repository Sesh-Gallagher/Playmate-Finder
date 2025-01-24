import { useContext } from 'react';
import { ProfileContext } from '../contexts/ProfileContext';

export function useProfiles() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfiles must be used within a ProfileProvider');
  }
  return context;
}
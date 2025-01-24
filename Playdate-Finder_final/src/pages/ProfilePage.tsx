import React from 'react';
import { CreateProfileForm } from '../components/profile/CreateProfileForm';

export function ProfilePage() {
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <CreateProfileForm />
    </div>
  );
}
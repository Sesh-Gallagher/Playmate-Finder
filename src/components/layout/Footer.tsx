import React from 'react';
import { SocialLinks } from './SocialLinks';
import { Watermark } from './Watermark';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center space-y-4">
          <SocialLinks />
          <Watermark />
        </div>
      </div>
    </footer>
  );
}
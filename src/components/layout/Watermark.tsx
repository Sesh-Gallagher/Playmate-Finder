import React from 'react';

export function Watermark() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="text-center text-sm text-gray-500">
      <p>© {currentYear} PlayMate Finder. All rights reserved.</p>
      <p className="mt-1">
        Created with ❤️ and light for families worldwide and beyond | 
        <a 
          href="/terms" 
          className="ml-1 text-purple-600 hover:text-purple-700"
        >
          Terms
        </a>
        <span className="mx-1">·</span>
        <a 
          href="/privacy" 
          className="text-purple-600 hover:text-purple-700"
        >
          Privacy
        </a>
      </p>
    </div>
  );
}
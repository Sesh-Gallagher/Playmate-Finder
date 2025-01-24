import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const SOCIAL_LINKS = [
  { icon: Facebook, href: 'https://facebook.com/playmatefinder', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/playmatefinder', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com/playmatefinder', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com/company/playmatefinder', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/playmatefinder', label: 'YouTube' },
];

export function SocialLinks() {
  return (
    <div className="flex space-x-6">
      {SOCIAL_LINKS.map(({ icon: Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-purple-600 transition-colors"
          aria-label={label}
        >
          <Icon className="h-6 w-6" />
        </a>
      ))}
    </div>
  );
}
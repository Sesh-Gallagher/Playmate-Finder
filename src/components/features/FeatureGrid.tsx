import React from 'react';
import { Shield, Video, Calendar, Award, Globe, BookOpen } from 'lucide-react';

const features = [
  {
    name: 'Safe & Secure',
    description: 'Advanced security measures including ID verification and AI-powered monitoring.',
    icon: Shield,
  },
  {
    name: 'Virtual Playdates',
    description: 'Interactive video calls with built-in games and activities.',
    icon: Video,
  },
  {
    name: 'Smart Scheduling',
    description: 'Easy scheduling that syncs with parents\' calendars.',
    icon: Calendar,
  },
  {
    name: 'Rewards & Badges',
    description: 'Fun achievement system to encourage participation and growth.',
    icon: Award,
  },
  {
    name: 'Global Community',
    description: 'Connect with families worldwide through our inclusive platform.',
    icon: Globe,
  },
  {
    name: 'Educational Content',
    description: 'Access to curated educational activities and workshops.',
    icon: BookOpen,
  },
];

export function FeatureGrid() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for safe playdates
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
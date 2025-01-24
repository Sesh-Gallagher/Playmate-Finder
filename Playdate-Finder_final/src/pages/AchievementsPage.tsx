import React from 'react';
import { Award, Star, Trophy } from 'lucide-react';
import { useBadges } from '../hooks/useBadges';
import { Card } from '../components/common/Card';

export function AchievementsPage() {
  const { badges } = useBadges();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Achievements</h1>
          <p className="mt-2 text-gray-600">Track your progress and earned rewards</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center px-4 py-2 bg-yellow-100 rounded-lg">
            <Trophy className="h-5 w-5 text-yellow-600 mr-2" />
            <span className="text-yellow-600 font-medium">{badges.length} Badges Earned</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge) => (
          <Card key={badge.id} className="transform hover:scale-105 transition-transform">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl">{badge.icon}</span>
                <Award className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{badge.name}</h3>
              <p className="text-gray-600 mb-4">{badge.description}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>Earned {badge.dateEarned.toLocaleDateString()}</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>+50 points</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
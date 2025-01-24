import React from 'react';
import { useMatches } from '../hooks/useMatches';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Check, X, MessageCircle } from 'lucide-react';

export function MatchesPage() {
  const { pendingMatches } = useMatches();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Pending Matches</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingMatches.map((match) => (
          <Card key={match.id}>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{match.childName}</h3>
              <p className="text-gray-600 mb-4">Age: {match.age}</p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
                <div className="flex flex-wrap gap-2">
                  {match.interests.map((interest) => (
                    <span
                      key={interest}
                      className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-700"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="secondary" className="flex-1">
                  <X className="h-4 w-4 mr-2" />
                  Decline
                </Button>
                <Button className="flex-1">
                  <Check className="h-4 w-4 mr-2" />
                  Accept
                </Button>
              </div>

              <Button variant="secondary" fullWidth className="mt-2">
                <MessageCircle className="h-4 w-4 mr-2" />
                Message Parent
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
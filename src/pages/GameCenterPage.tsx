import React, { useState } from 'react';
import { Gamepad, Trophy, Star } from 'lucide-react';
import { Card } from '../components/common/Card';
import { MemoryGame } from '../components/games/MemoryGame';
import { WordScramble } from '../components/games/WordScramble';

const GAMES = [
  {
    id: 'memory',
    title: 'Memory Match',
    description: 'Test your memory by matching pairs of cards',
    icon: '🎴',
    component: MemoryGame,
    difficulty: 'Easy',
    rewards: ['Memory Master Badge', '50 points']
  },
  {
    id: 'wordscramble',
    title: 'Word Scramble',
    description: 'Unscramble words to improve vocabulary',
    icon: '📝',
    component: WordScramble,
    difficulty: 'Medium',
    rewards: ['Word Wizard Badge', '75 points']
  }
];

export function GameCenterPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [points, setPoints] = useState(1250);

  const GameComponent = selectedGame 
    ? GAMES.find(game => game.id === selectedGame)?.component 
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Game Center</h1>
          <p className="mt-2 text-gray-600">Play games, earn rewards, and have fun!</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center px-4 py-2 bg-purple-100 rounded-lg">
            <Trophy className="h-5 w-5 text-purple-600 mr-2" />
            <span className="text-purple-600 font-medium">{points} points</span>
          </div>
        </div>
      </div>

      {selectedGame ? (
        <div>
          <button
            onClick={() => setSelectedGame(null)}
            className="mb-6 text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to Games
          </button>
          {GameComponent && <GameComponent />}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GAMES.map((game) => (
            <Card key={game.id} className="hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{game.icon}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium
                    ${game.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'}`}>
                    {game.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{game.title}</h3>
                <p className="text-gray-600 mb-4">{game.description}</p>
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    Rewards
                  </h4>
                  <ul className="space-y-1">
                    {game.rewards.map((reward, index) => (
                      <li key={index} className="text-sm text-gray-600">• {reward}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setSelectedGame(game.id)}
                  className="mt-4 w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
                >
                  <Gamepad className="h-5 w-5 mr-2" />
                  Play Now
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
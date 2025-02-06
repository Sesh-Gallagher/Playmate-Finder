import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

const WORDS = [
  { word: 'FRIEND', hint: 'Someone you like to play with' },
  { word: 'SHARE', hint: 'When you let others use your toys' },
  { word: 'SMILE', hint: "What you do when you are happy" },
  { word: 'PLAY', hint: 'Having fun with others' },
  { word: 'KIND', hint: 'Being nice to others' }
];

function scrambleWord(word: string): string {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
}

export function WordScramble() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [scrambledWord, setScrambledWord] = useState('');
  const [userGuess, setUserGuess] = useState('');
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);

  useEffect(() => {
    setNewWord();
  }, [currentWordIndex]);

  const setNewWord = () => {
    const word = WORDS[currentWordIndex].word;
    setScrambledWord(scrambleWord(word));
    setUserGuess('');
    setMessage('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const currentWord = WORDS[currentWordIndex].word;
    
    if (userGuess.toUpperCase() === currentWord) {
      setMessage('Correct! 🎉');
      setScore(score + 10);
      
      setTimeout(() => {
        if (currentWordIndex < WORDS.length - 1) {
          setCurrentWordIndex(currentWordIndex + 1);
        } else {
          setMessage('Congratulations! You completed all words! 🏆');
        }
      }, 1500);
    } else {
      setMessage('Try again!');
    }
  };

  const handleSkip = () => {
    if (currentWordIndex < WORDS.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    }
  };

  const handleReset = () => {
    setCurrentWordIndex(0);
    setScore(0);
    setMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Word Scramble</h2>
          <p className="text-gray-600">Score: {score}</p>
        </div>
        <Button onClick={handleReset}>New Game</Button>
      </div>

      <Card className="p-6">
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-purple-600 mb-4">{scrambledWord}</p>
          <p className="text-gray-600">Hint: {WORDS[currentWordIndex].hint}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Type your answer..."
          />
          
          <div className="flex space-x-3">
            <Button type="submit" fullWidth>
              Check Answer
            </Button>
            <Button type="button" variant="secondary" fullWidth onClick={handleSkip}>
              Skip Word
            </Button>
          </div>
        </form>

        {message && (
          <div className={`mt-4 text-center text-lg font-medium ${
            message.includes('Correct') || message.includes('Congratulations')
              ? 'text-green-600'
              : 'text-red-600'
          }`}>
            {message}
          </div>
        )}

        <div className="mt-6">
          <p className="text-sm text-gray-600">
            Word {currentWordIndex + 1} of {WORDS.length}
          </p>
        </div>
      </Card>
    </div>
  );
}
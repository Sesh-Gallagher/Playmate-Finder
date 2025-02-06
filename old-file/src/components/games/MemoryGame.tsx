import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const EMOJIS = ['🎨', '🎮', '🎵', '📚', '⚽', '🔬', '🎪', '🎭'];

export function MemoryGame() {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffledCards = [...EMOJIS, ...EMOJIS]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setIsComplete(false);
  };

  const handleCardClick = (cardId: number) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.includes(cardId) ||
      cards[cardId].isMatched
    ) {
      return;
    }

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [firstCard, secondCard] = newFlippedCards;
      
      if (cards[firstCard].emoji === cards[secondCard].emoji) {
        setCards(cards.map(card =>
          card.id === firstCard || card.id === secondCard
            ? { ...card, isMatched: true }
            : card
        ));
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }

    // Check if game is complete
    const allMatched = cards.every(card => card.isMatched);
    if (allMatched) {
      setIsComplete(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Memory Match</h2>
          <p className="text-gray-600">Moves: {moves}</p>
        </div>
        <Button onClick={initializeGame}>New Game</Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`aspect-square text-4xl flex items-center justify-center rounded-lg transition-all duration-300 ${
              card.isMatched || flippedCards.includes(card.id)
                ? 'bg-purple-100'
                : 'bg-purple-500'
            }`}
            disabled={card.isMatched}
          >
            {(card.isMatched || flippedCards.includes(card.id)) && card.emoji}
          </button>
        ))}
      </div>

      {isComplete && (
        <div className="mt-6 text-center">
          <h3 className="text-xl font-bold text-purple-600">
            Congratulations! 🎉
          </h3>
          <p className="text-gray-600">
            You completed the game in {moves} moves!
          </p>
          <Button onClick={initializeGame} className="mt-4">
            Play Again
          </Button>
        </div>
      )}
    </div>
  );
}
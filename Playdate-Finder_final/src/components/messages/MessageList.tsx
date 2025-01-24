import React from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
}

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`rounded-lg px-4 py-2 max-w-[70%] ${
              message.sender === 'user'
                ? 'bg-purple-100 text-purple-900'
                : 'bg-gray-100 text-gray-900'
            }`}
          >
            {message.text}
          </div>
        </div>
      ))}
    </div>
  );
}
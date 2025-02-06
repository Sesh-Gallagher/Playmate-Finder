import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { MessageInput } from '../components/messages/MessageInput';
import { MessageList } from '../components/messages/MessageList';

const INITIAL_MESSAGES = [
  {
    id: '1',
    text: "Hi! I saw your profile and think our kids would get along great.",
    sender: 'user',
    timestamp: new Date()
  },
  {
    id: '2',
    text: "Hello! That's wonderful! What activities does your child enjoy?",
    sender: 'other',
    timestamp: new Date()
  }
] as const;

export function MessagePage() {
  const { id } = useParams();
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const handleSendMessage = (text: string) => {
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card className="h-[600px] flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Chat with Sarah's Parent</h2>
        </div>
        <MessageList messages={messages} />
        <div className="p-4 border-t">
          <MessageInput onSendMessage={handleSendMessage} />
        </div>
      </Card>
    </div>
  );
}
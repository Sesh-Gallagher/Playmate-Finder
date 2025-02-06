import React, { useState } from 'react';
import { Send, Smile } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
}

export function MessageInput({ onSendMessage }: MessageInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button className="p-2 hover:bg-gray-100 rounded-full">
        <Smile className="h-6 w-6 text-gray-500" />
      </button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Type a message..."
        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <button 
        onClick={handleSend}
        className="p-2 hover:bg-purple-100 rounded-full text-purple-600"
      >
        <Send className="h-6 w-6" />
      </button>
    </div>
  );
}
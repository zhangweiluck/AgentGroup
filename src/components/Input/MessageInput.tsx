import React, { useState, useRef, useEffect } from 'react';
import { Agent } from '../../types';

interface MessageInputProps {
  onSendMessage: (content: string, mentions: string[]) => void;
  agents: Agent[];
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, agents }) => {
  const [message, setMessage] = useState('');
  const [showMentions, setShowMentions] = useState(false);
  const [mentionSearch, setMentionSearch] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        const mentions = message.match(/@(\w+)/g)?.map(m => m.slice(1)) || [];
        onSendMessage(message, mentions);
        setMessage('');
      }
    } else if (e.key === '@') {
      setShowMentions(true);
      setMentionSearch('');
    }
  };

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(mentionSearch.toLowerCase())
  );

  return (
    <div className="relative p-4 border-t">
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your message..."
        className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        rows={3}
      />
      
      {showMentions && (
        <div className="absolute bottom-full left-0 w-64 max-h-48 overflow-y-auto bg-white border rounded-lg shadow-lg">
          {filteredAgents.map(agent => (
            <button
              key={agent.id}
              className="w-full p-2 text-left hover:bg-gray-100"
              onClick={() => {
                setMessage(prev => prev + agent.name + ' ');
                setShowMentions(false);
                inputRef.current?.focus();
              }}
            >
              {agent.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
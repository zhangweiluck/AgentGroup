import React from 'react';
import { format } from 'date-fns';
import classNames from 'classnames';
import { Message } from '../../types';

interface MessageBubbleProps {
  message: Message;
  isUser: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isUser }) => {
  return (
    <div
      className={classNames(
        'flex w-full mt-2 space-x-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={classNames(
          'relative max-w-xl px-4 py-2 rounded-lg shadow',
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100'
        )}
      >
        <span className="block">{message.content}</span>
        <span className="block text-xs mt-1 text-gray-400">
          {format(message.timestamp, 'HH:mm')}
          {message.status === 'read' && (
            <span className="ml-2">✓✓</span>
          )}
        </span>
      </div>
    </div>
  );
};
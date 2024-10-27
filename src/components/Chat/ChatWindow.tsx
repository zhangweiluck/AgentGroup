import React from 'react';
import { FixedSizeList as List } from 'react-window';
import { MessageBubble } from './MessageBubble';
import { Message } from '../../types';

interface ChatWindowProps {
  messages: Message[];
  currentUserId: string;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, currentUserId }) => {
  const listRef = React.useRef<List>(null);
  
  React.useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(messages.length - 1, 'end');
    }
  }, [messages.length]);

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const message = messages[index];
    return (
      <div style={style}>
        <MessageBubble
          message={message}
          isUser={message.senderId === currentUserId}
        />
      </div>
    );
  };

  return (
    <div className="flex-1">
      <List
        ref={listRef}
        height={window.innerHeight - 160}
        itemCount={messages.length}
        itemSize={80}
        width="100%"
        className="p-4"
      >
        {Row}
      </List>
    </div>
  );
};
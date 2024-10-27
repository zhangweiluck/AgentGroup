import React from 'react';
import { ChatWindow } from './components/Chat/ChatWindow';
import { AgentList } from './components/Sidebar/AgentList';
import { MessageInput } from './components/Input/MessageInput';
import { Agent, Message } from './types';

const App: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [agents] = React.useState<Agent[]>([
    {
      id: '1',
      name: 'Data Analyst',
      role: 'Analytics',
      status: 'online',
      avatar: 'https://via.placeholder.com/40',
      expertise: ['data analysis', 'visualization']
    },
    // Add more agents as needed
  ]);

  const handleSendMessage = (content: string, mentions: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      senderId: 'user',
      timestamp: new Date(),
      status: 'sent',
      mentions
    };
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white border-r">
        <AgentList
          agents={agents}
          onSelectAgent={(agent) => console.log('Selected agent:', agent)}
        />
      </aside>
      
      <main className="flex-1 flex flex-col">
        <ChatWindow messages={messages} currentUserId="user" />
        <MessageInput onSendMessage={handleSendMessage} agents={agents} />
      </main>
    </div>
  );
};

export default App;
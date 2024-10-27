export type AgentStatus = 'online' | 'offline' | 'busy';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  avatar: string;
  expertise: string[];
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  mentions: string[];
}

export interface Group {
  id: string;
  name: string;
  agents: string[];
  goal: string;
  progress: number;
}
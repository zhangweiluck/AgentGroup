import React from 'react';
import { Agent } from '../../types';

interface AgentListProps {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
}

export const AgentList: React.FC<AgentListProps> = ({ agents, onSelectAgent }) => {
  return (
    <div className="flex flex-col space-y-2 p-4">
      {agents.map((agent) => (
        <button
          key={agent.id}
          onClick={() => onSelectAgent(agent)}
          className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="relative">
            <img
              src={agent.avatar}
              alt={agent.name}
              className="w-10 h-10 rounded-full"
            />
            <span
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                agent.status === 'online'
                  ? 'bg-green-500'
                  : agent.status === 'busy'
                  ? 'bg-yellow-500'
                  : 'bg-gray-500'
              }`}
            />
          </div>
          <div className="ml-3 text-left">
            <p className="font-medium">{agent.name}</p>
            <p className="text-sm text-gray-500">{agent.role}</p>
          </div>
        </button>
      ))}
    </div>
  );
};
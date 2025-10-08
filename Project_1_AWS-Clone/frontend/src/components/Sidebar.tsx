import React from 'react';
import { Database, Server, Cloud, Settings, Home } from 'lucide-react';

interface SidebarProps {
  activeService: string;
  onServiceChange: (service: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeService, onServiceChange }) => {
  const services = [
    { id: 'home', name: 'Home', icon: Home },
    { id: 'rds', name: 'RDS', icon: Database },
    { id: 'ec2', name: 'EC2', icon: Server },
    { id: 's3', name: 'S3', icon: Cloud },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Services</h2>
        <nav className="space-y-2">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => onServiceChange(service.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                  activeService === service.id
                    ? 'bg-aws-orange text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{service.name}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

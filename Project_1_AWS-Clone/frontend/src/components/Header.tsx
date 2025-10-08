import React from 'react';
import { Database, Settings, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-aws-blue text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-aws-orange" />
              <h1 className="text-xl font-bold">AWS Clone Console</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-aws-light-blue transition-colors">
              <Settings className="h-5 w-5" />
              <span>Services</span>
            </button>
            <button className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-aws-light-blue transition-colors">
              <User className="h-5 w-5" />
              <span>Account</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

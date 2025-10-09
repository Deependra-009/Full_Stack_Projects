import React, { useState, useEffect } from 'react';
import { useAppDispatch } from './hooks/redux';
import { fetchDatabases } from './store/rdsSlice';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RDSPage from './components/RDS/RDSPage';
import Toast from './components/Toast';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeService, setActiveService] = useState('rds');

  useEffect(() => {
    // Fetch initial data when app loads
    dispatch(fetchDatabases());
  }, [dispatch]);

  const renderContent = () => {
    switch (activeService) {
      case 'rds':
        return <RDSPage />;
      case 'ec2':
        return (
          <div className="aws-card p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">EC2 Instances</h2>
            <p className="text-gray-600">EC2 service coming soon...</p>
          </div>
        );
      case 's3':
        return (
          <div className="aws-card p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">S3 Buckets</h2>
            <p className="text-gray-600">S3 service coming soon...</p>
          </div>
        );
      case 'settings':
        return (
          <div className="aws-card p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Settings</h2>
            <p className="text-gray-600">Settings panel coming soon...</p>
          </div>
        );
      default:
        return (
          <div className="aws-card p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to AWS Clone</h2>
            <p className="text-gray-600">Select a service from the sidebar to get started.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar activeService={activeService} onServiceChange={setActiveService} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
      <Toast />
    </div>
  );
};

export default App;

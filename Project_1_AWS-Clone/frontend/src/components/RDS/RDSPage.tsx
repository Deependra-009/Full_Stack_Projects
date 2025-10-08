import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchDatabases } from '../../store/rdsSlice';
import CreateDatabaseForm from './CreateDatabaseForm';
import DatabaseList from './DatabaseList';
import { Database, Plus } from 'lucide-react';

const RDSPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { instances, loading } = useAppSelector((state) => state.rds);
  const [showCreateForm, setShowCreateForm] = React.useState(false);

  useEffect(() => {
    dispatch(fetchDatabases());
  }, [dispatch]);

  // Poll while any instance is STARTING
  useEffect(() => {
    const hasStarting = instances.some(i => i.status === 'STARTING');
    if (!hasStarting) return;
    const interval = setInterval(() => {
      dispatch(fetchDatabases());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch, instances]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Amazon RDS</h1>
          <p className="text-gray-600 mt-1">Relational Database Service</p>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="aws-button-primary flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Create Database</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="aws-card p-6">
          <div className="flex items-center space-x-3">
            <Database className="h-8 w-8 text-aws-orange" />
            <div>
              <p className="text-sm text-gray-500">Total Instances</p>
              <p className="text-2xl font-bold text-gray-800">{instances.length}</p>
            </div>
          </div>
        </div>
        
        <div className="aws-card p-6">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Running</p>
              <p className="text-2xl font-bold text-gray-800">
                {instances.filter(i => i.status === 'RUNNING').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="aws-card p-6">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
              <div className="h-3 w-3 bg-red-500 rounded-full"></div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Stopped</p>
              <p className="text-2xl font-bold text-gray-800">
                {instances.filter(i => i.status === 'STOPPED').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <CreateDatabaseForm />
      )}

      {/* Database List */}
      <DatabaseList />
    </div>
  );
};

export default RDSPage;

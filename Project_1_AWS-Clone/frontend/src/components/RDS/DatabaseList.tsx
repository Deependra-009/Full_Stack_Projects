import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteDatabase, selectInstance, fetchDatabases } from '../../store/rdsSlice';
import { rdsApi } from '../../services/rdsApi';
import { DatabaseInstance } from '../../types/rds';
import { Database, Trash2, Play, Square, Eye, Copy } from 'lucide-react';
import mysqlLogo from '../../assets/mysql.svg';
import postgresLogo from '../../assets/postgres.svg';

const DatabaseList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { instances, loading, selectedInstance } = useAppSelector((state) => state.rds);

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this database instance?')) {
      await dispatch(deleteDatabase(id));
    }
  };

  const handleStart = async (id: number) => {
    try {
      await rdsApi.startDatabase(id);
      // Refresh the list after starting
      dispatch(fetchDatabases());
    } catch (error) {
      console.error('Failed to start database:', error);
    }
  };

  const handleStop = async (id: number) => {
    try {
      await rdsApi.stopDatabase(id);
      // Refresh the list after stopping
      dispatch(fetchDatabases());
    } catch (error) {
      console.error('Failed to stop database:', error);
    }
  };

  const handleSelect = (instance: DatabaseInstance) => {
    dispatch(selectInstance(instance));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'RUNNING':
        return 'text-green-600 bg-green-100';
      case 'STOPPED':
        return 'text-red-600 bg-red-100';
      case 'STARTING':
        return 'text-yellow-600 bg-yellow-100';
      case 'STOPPING':
        return 'text-orange-600 bg-orange-100';
      case 'ERROR':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading && instances.length === 0) {
    return (
      <div className="aws-card p-6">
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aws-orange"></div>
        </div>
      </div>
    );
  }

  if (instances.length === 0) {
    return (
      <div className="aws-card p-6">
        <div className="text-center py-12">
          <Database className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No Database Instances</h3>
          <p className="text-gray-400">Create your first database instance to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="aws-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Database Instances</h2>
        <span className="text-sm text-gray-500">{instances.length} instance(s)</span>
      </div>

      <div className="space-y-4">
        {instances.map((instance) => (
          <div
            key={instance.id}
            className={`border rounded-lg p-4 transition-colors cursor-pointer ${
              selectedInstance?.id === instance.id
                ? 'border-aws-orange bg-orange-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => handleSelect(instance)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-8 w-8 flex items-center justify-center">
                  {instance.dbType === 'mysql' ? (
                    <img src={mysqlLogo} alt="MySQL" className="h-8 w-8" />
                  ) : instance.dbType === 'postgres' ? (
                    <img src={postgresLogo} alt="PostgreSQL" className="h-8 w-8" />
                  ) : (
                    <Database className="h-8 w-8 text-aws-orange" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{instance.dbName}</h3>
                  <p className="text-sm text-gray-500">
                    {instance.dbType.toUpperCase()} • {instance.host}:{instance.port}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(instance.status)}`}>
                  {instance.status}
                </span>
                
                <div className="flex items-center space-x-2">
                  {instance.status === 'RUNNING' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStop(instance.id);
                      }}
                      className="p-1 text-gray-400 hover:text-red-600"
                      title="Stop database"
                    >
                      <Square className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStart(instance.id);
                      }}
                      className="p-1 text-gray-400 hover:text-green-600"
                      title="Start database"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(instance.connectionUrl);
                    }}
                    className="p-1 text-gray-400 hover:text-gray-600"
                    title="Copy connection URL"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(instance.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600"
                    title="Delete instance"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {selectedInstance?.id === instance.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Username</label>
                    <p className="text-sm text-gray-800">{instance.username}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Connection URL</label>
                    <p className="text-sm text-gray-800 font-mono break-all">{instance.connectionUrl}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Created</label>
                    <p className="text-sm text-gray-800">
                      {new Date(instance.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                    <p className="text-sm text-gray-800">
                      {new Date(instance.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatabaseList;

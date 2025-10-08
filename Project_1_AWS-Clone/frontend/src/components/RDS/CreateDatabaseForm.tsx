import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createDatabase, clearError } from '../../store/rdsSlice';
import { CreateDatabaseRequest } from '../../types/rds';
import { Database, AlertCircle, CheckCircle } from 'lucide-react';

const CreateDatabaseForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.rds);

  console.log(error)
  
  const [formData, setFormData] = useState<CreateDatabaseRequest>({
    dbType: 'postgres',
    dbName: '',
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());
    await dispatch(createDatabase(formData));
  };

  const generateRandomPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData(prev => ({ ...prev, password }));
  };

  return (
    <div className="aws-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Database className="h-8 w-8 text-aws-orange" />
        <h2 className="text-2xl font-bold text-gray-800">Create Database Instance</h2>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span className="text-red-700">{error}</span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Database Type */}
          <div>
            <label htmlFor="dbType" className="block text-sm font-medium text-gray-700 mb-2">
              Database Engine
            </label>
            <select
              id="dbType"
              name="dbType"
              value={formData.dbType}
              onChange={handleInputChange}
              className="aws-input"
              required
            >
              <option value="postgres">PostgreSQL</option>
              <option value="mysql">MySQL</option>
            </select>
          </div>

          {/* Database Name */}
          <div>
            <label htmlFor="dbName" className="block text-sm font-medium text-gray-700 mb-2">
              Database Name
            </label>
            <input
              type="text"
              id="dbName"
              name="dbName"
              value={formData.dbName}
              onChange={handleInputChange}
              placeholder="Enter database name"
              className="aws-input"
              required
            />
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Master Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter username"
              className="aws-input"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Master Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                className="aws-input pr-20"
                required
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                <button
                  type="button"
                  onClick={generateRandomPassword}
                  className="text-aws-orange hover:text-orange-600 font-medium"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="aws-button-secondary"
            onClick={() => setFormData({ dbType: 'postgres', dbName: '', username: '', password: '' })}
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={loading}
            className="aws-button-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Creating...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Create Database</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDatabaseForm;

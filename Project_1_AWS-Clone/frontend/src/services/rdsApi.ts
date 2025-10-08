import axios from 'axios';
import { DatabaseInstance, CreateDatabaseRequest } from '../types/rds';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const rdsApi = {
  // Create a new database instance
  createDatabase: async (request: CreateDatabaseRequest) => {
    const response = await api.post('/api/databases/create', request);
    return response;
  },

  // Get all database instances
  getDatabases: async () => {
    const response = await api.get('/api/databases');
    return response;
  },

  // Get a specific database instance
  getDatabase: async (id: number) => {
    const response = await api.get(`/api/databases/${id}`);
    return response;
  },

  // Delete a database instance
  deleteDatabase: async (id: number) => {
    const response = await api.delete(`/api/databases/${id}`);
    return response;
  },

  // Start a database instance
  startDatabase: async (id: number) => {
    const response = await api.post(`/api/databases/${id}/start`);
    return response;
  },

  // Stop a database instance
  stopDatabase: async (id: number) => {
    const response = await api.post(`/api/databases/${id}/stop`);
    return response;
  },

  // Get database status
  getDatabaseStatus: async (id: number) => {
    const response = await api.get(`/api/databases/${id}/status`);
    return response;
  },
};

// Request interceptor for adding auth token if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

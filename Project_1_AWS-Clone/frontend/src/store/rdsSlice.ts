import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { DatabaseInstance, CreateDatabaseRequest, DatabaseState, Notification } from '../types/rds';
import { rdsApi } from '../services/rdsApi';

const initialState: DatabaseState = {
  instances: [],
  loading: false,
  error: null,
  selectedInstance: null,
  notifications: [],
};

// Async thunks
export const createDatabase = createAsyncThunk(
  'rds/createDatabase',
  async (request: CreateDatabaseRequest, { rejectWithValue }) => {
    try {
      const response = await rdsApi.createDatabase(request);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create database');
    }
  }
);

export const fetchDatabases = createAsyncThunk(
  'rds/fetchDatabases',
  async (_, { rejectWithValue }) => {
    try {
      const response = await rdsApi.getDatabases();
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch databases');
    }
  }
);

export const deleteDatabase = createAsyncThunk(
  'rds/deleteDatabase',
  async (id: number, { rejectWithValue }) => {
    try {
      await rdsApi.deleteDatabase(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete database');
    }
  }
);

const rdsSlice = createSlice({
  name: 'rds',
  initialState,
  reducers: {
    selectInstance: (state, action: PayloadAction<DatabaseInstance | null>) => {
      state.selectedInstance = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateInstanceStatus: (
      state,
      action: PayloadAction<{ id: number; status: DatabaseInstance['status'] }>
    ) => {
      const instance = state.instances.find(i => i.id === action.payload.id);
      if (instance) {
        instance.status = action.payload.status;
        instance.updatedAt = new Date().toISOString();
      }
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Database
      .addCase(createDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.instances.push(action.payload);
        state.error = null;
      })
      .addCase(createDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch Databases
      .addCase(fetchDatabases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDatabases.fulfilled, (state, action) => {
        state.loading = false;
        state.instances = action.payload;
        state.error = null;
      })
      .addCase(fetchDatabases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Database
      .addCase(deleteDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.instances = state.instances.filter(instance => instance.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { selectInstance, clearError, updateInstanceStatus, addNotification, removeNotification, clearNotifications } = rdsSlice.actions;
export default rdsSlice.reducer;

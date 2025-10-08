import { configureStore } from '@reduxjs/toolkit';
import rdsReducer from './rdsSlice';

export const store = configureStore({
  reducer: {
    rds: rdsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

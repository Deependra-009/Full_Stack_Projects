// src/app/store.ts

import { configureStore } from '@reduxjs/toolkit';
import reducer from './app.reducer';

const store = configureStore({
  reducer: {
    app: reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

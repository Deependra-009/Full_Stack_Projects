import { combineReducers, configureStore } from '@reduxjs/toolkit';
import  portfolioServiceReducer  from './portfolioServiceSlice';



const rootReducer = combineReducers({
  portfolioService: portfolioServiceReducer,
});

export const store=configureStore({
  reducer:rootReducer
})
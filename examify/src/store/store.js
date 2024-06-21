import { configureStore } from '@reduxjs/toolkit';
import examReducer from './slices/examSlice';
import resultsReducer from './slices/resultSlice';
import authReducer from './slices/authSlice';

// Configure Redux store
const store = configureStore({
  reducer: {
    exams: examReducer,
    results: resultsReducer,
    auth: authReducer,
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import produtorReducer from './produtorSlice';

export const store = configureStore({
  reducer: {
    produtor: produtorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
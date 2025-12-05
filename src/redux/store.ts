import { configureStore } from '@reduxjs/toolkit';
import alumniReducer from './slices/alumniSlice';
import locationReducer from './slices/locationSlice';

export const store = configureStore({
  reducer: {
    alumni: alumniReducer,
    location: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

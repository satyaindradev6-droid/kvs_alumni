import { configureStore } from '@reduxjs/toolkit';
import alumniReducer from './slices/alumniSlice';
import locationReducer from './slices/locationSlice';
import employeeReducer from './slices/employeeSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    alumni: alumniReducer,
    location: locationReducer,
    employee: employeeReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import alumniReducer from './slices/alumniSlice';
import locationReducer from './slices/locationSlice';
import employeeReducer from './slices/employeeSlice';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import educationReducer from './slices/educationSlice';
import experienceReducer from './slices/experienceSlice';

export const store = configureStore({
  reducer: {
    alumni: alumniReducer,
    location: locationReducer,
    employee: employeeReducer,
    auth: authReducer,
    user: userReducer,
    education: educationReducer,
    experience: experienceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

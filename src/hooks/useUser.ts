'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserProfile, clearUserProfile, UserProfile } from '@/redux/slices/userSlice';

interface UseUserReturn {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
  isLoaded: boolean;
  isLoggedIn: boolean;
  refetch: () => void;
  logout: () => void;
}

export function useUser(): UseUserReturn {
  const dispatch = useAppDispatch();
  const { profile, loading, error, isLoaded } = useAppSelector((state) => state.user);

  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('token');

  useEffect(() => {
    // Fetch user profile if logged in and not already loaded
    if (isLoggedIn && !isLoaded && !loading) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isLoggedIn, isLoaded, loading]);

  const refetch = () => {
    dispatch(fetchUserProfile());
  };

  const logout = () => {
    // Clear Redux state
    dispatch(clearUserProfile());
    
    // Clear localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Redirect to login
    window.location.href = '/login';
  };

  return {
    user: profile,
    loading,
    error,
    isLoaded,
    isLoggedIn,
    refetch,
    logout,
  };
}

export default useUser;

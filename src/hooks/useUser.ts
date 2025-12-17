import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserProfile, refreshUserProfile, clearUserProfile, invalidateProfile } from '@/redux/slices/userSlice';
import type { UserProfile } from '@/redux/slices/userSlice';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error, isLoaded } = useAppSelector((state) => state.user);

  // Fetch user profile on hook initialization (only if not already loaded)
  useEffect(() => {
    if (!isLoaded && !loading) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, isLoaded, loading]);

  // Always fetch fresh data from API
  const refetchUser = () => {
    dispatch(refreshUserProfile());
  };

  // Invalidate cache and force refetch
  const invalidateUser = () => {
    dispatch(invalidateProfile());
  };

  const clearUser = () => {
    dispatch(clearUserProfile());
  };

  return {
    user: profile,
    loading,
    error,
    isLoaded,
    refetchUser,
    invalidateUser,
    clearUser,
  };
};

export type { UserProfile };
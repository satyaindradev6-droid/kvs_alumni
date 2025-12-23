import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserProfile, refreshUserProfile, clearUserProfile, invalidateProfile } from '@/redux/slices/userSlice';
import type { UserProfile } from '@/redux/slices/userSlice';

export const useUser = () => {
  const dispatch = useAppDispatch();
  const { profile, loading, error, isLoaded } = useAppSelector((state) => state.user);

  // Always fetch fresh user profile from API on component mount
  useEffect(() => {
    dispatch(fetchUserProfile(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - fetch once on mount

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
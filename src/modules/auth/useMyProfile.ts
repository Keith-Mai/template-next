import { useMemo } from 'react';
import type { User } from '@/api/auth/types';
import { useGetUserProfile } from '@/api/auth/useGetUserProfile';
import { useAuth } from './AuthProvider';

type UseMyProfile = {
  user?: User;
  isLoading: boolean;
  remove: () => void;
};

export const useMyProfile = (): UseMyProfile => {
  const { isAuthenticated } = useAuth();
  const {
    data: user,
    isLoading,
    remove,
  } = useGetUserProfile({
    enabled: isAuthenticated,
  });

  return useMemo(() => {
    return {
      user,
      isLoading: isLoading && isAuthenticated,
      remove,
    };
  }, [user, isLoading, remove]);
};

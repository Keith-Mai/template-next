import type { UseQueryOptions } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import apiRoutes from '@/lib/apiRoutes';
import httpClient from '@/lib/httpClient';
import type { DefaultQueryError } from '../types';
import type { User } from './types';

export const getUserProfileFn = async () => {
  const response = await httpClient.get<User>(apiRoutes.user.profile);
  return response.data;
};

export const useGetUserProfile = (
  opts?: UseQueryOptions<User, DefaultQueryError>
) =>
  useQuery<User, DefaultQueryError>(
    [apiRoutes.user.profile],
    getUserProfileFn,
    opts
  );

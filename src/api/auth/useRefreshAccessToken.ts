import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import apiRoutes from '@/lib/apiRoutes';
import { publicHttpClient } from '@/lib/httpClient';
import type { DefaultQueryError } from '../types';
import type { User } from './types';

export type RefreshTokenParams = Pick<RefreshTokenResponse, 'refresh_token'> & {
  type: string;
  mobile: User['_id'];
};

export type RefreshTokenResponse = {
  refresh_token: string;
  token: string;
};

export const refreshAccessTokenFn = async (body: RefreshTokenParams) => {
  const response = await publicHttpClient.post<RefreshTokenResponse>(
    apiRoutes.user.refreshToken,
    body
  );
  return response.data;
};

export const useRefreshAccessToken = (
  opts?: UseMutationOptions<
    RefreshTokenResponse,
    DefaultQueryError,
    RefreshTokenParams
  >
) =>
  useMutation<RefreshTokenResponse, DefaultQueryError, RefreshTokenParams>(
    refreshAccessTokenFn,
    opts
  );

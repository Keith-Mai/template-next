import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import type { JwtTokenPayload } from '@/api/auth/types';
import { refreshAccessTokenFn } from '@/api/auth/useRefreshAccessToken';
import type { DefaultQueryError } from '@/api/types';
import { apiUrl, API_FETCH_TIMEOUT, ERROR_CODES } from './constants';
import { getCookie } from './cookies';
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  removeAccessToken,
  removeRefreshToken,
  storeAccessToken,
  storeRefreshToken,
} from './token';

export const publicHttpClient = axios.create({
  baseURL: apiUrl,
  timeout: API_FETCH_TIMEOUT * 1000,
});

const httpClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
  timeout: API_FETCH_TIMEOUT * 1000,
});

httpClient.defaults.headers.common['Content-Type'] = 'application/json';

httpClient.interceptors.request.use(
  async (config) => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);
    if (accessToken) {
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

httpClient.interceptors.response.use(
  (response) => response,
  async (error: DefaultQueryError) => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);
    const refreshToken = getCookie(REFRESH_TOKEN_KEY);

    const originalRequest: AxiosRequestConfig & { _retry?: boolean } =
      error.config;

    console.log(error.response?.data.code);

    if (
      error.response?.data.code === ERROR_CODES.NOT_AUTHORIZED.code &&
      !originalRequest._retry &&
      !!refreshToken &&
      !!accessToken
    ) {
      originalRequest._retry = true;
      try {
        const decoded = jwt_decode<JwtTokenPayload>(accessToken);

        const res = await refreshAccessTokenFn({
          refresh_token: refreshToken,
          type: [decoded.type, decoded.imei].join('-'),
          mobile: decoded.cid,
        });
        storeAccessToken(res.token);
        storeRefreshToken(res.refresh_token);

        return httpClient(originalRequest);
      } catch (error) {
        removeAccessToken();
        removeRefreshToken();

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default httpClient;

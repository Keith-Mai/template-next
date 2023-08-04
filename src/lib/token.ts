import dayjs from 'dayjs';
import { getCookie, removeCookie, setCookie } from './cookies';

export const ACCESS_TOKEN_KEY = 'token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

export const getAccessToken = () => {
  try {
    return getCookie(ACCESS_TOKEN_KEY);
  } catch (err) {
    return null;
  }
};

export const getRefreshToken = () => {
  try {
    return getCookie(REFRESH_TOKEN_KEY);
  } catch (err) {
    return null;
  }
};

export const storeAccessToken = (accessToken: string): void => {
  try {
    setCookie(ACCESS_TOKEN_KEY, accessToken, {
      expires: dayjs().add(3, 'month').toDate(),
      sameSite: 'none',
      secure: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const storeRefreshToken = (refreshToken: string) => {
  try {
    setCookie(REFRESH_TOKEN_KEY, refreshToken);
  } catch (error) {
    console.log(error);
  }
};

export const removeAccessToken = () => {
  try {
    removeCookie(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.log(error);
  }
};

export const removeRefreshToken = () => {
  try {
    removeCookie(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.log(error);
  }
};

import type { CookieGetOptions, CookieSetOptions } from 'universal-cookie';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getCookie = (name: string, options: CookieGetOptions = {}) => {
  return cookies.get(name, options);
};

export const setCookie = (
  name: string,
  value: string,
  options: CookieSetOptions = {}
) => {
  return cookies.set(name, value, {
    path: '/',
    ...options,
  });
};

export const removeCookie = (name: string, options: CookieSetOptions = {}) => {
  return cookies.remove(name, {
    path: '/',
    ...options,
  });
};

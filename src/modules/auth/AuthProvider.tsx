import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { isServer } from '@/lib/isServer';
import {
  ACCESS_TOKEN_KEY,
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  storeAccessToken,
} from '@/lib/token';

export interface AuthContextProps {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (redirectTo: string) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  accessToken: null,
  refreshToken: null,
  signIn: () => {
    //
  },
  logOut: () => {
    //
  },
});

export const useAuth = () => useContext(AuthContext);

export interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const tokenParam = router.query[ACCESS_TOKEN_KEY] as string;
  const [accessToken, setAccessToken] = useState<
    AuthContextProps['accessToken']
  >(getAccessToken());
  const [refreshToken, setRefreshToken] = useState<
    AuthContextProps['refreshToken']
  >(getRefreshToken());
  const isAuthenticated = useMemo(() => !!accessToken, [accessToken]);

  const signIn = useCallback((redirectTo: string) => {
    if (!isServer) {
      const { origin, pathname, search } = window.location;
      let redirectUrl = redirectTo || `${origin}${pathname}${search}`;
      if (window.encodeURIComponent)
        redirectUrl = window.encodeURIComponent(redirectUrl);

      window.open(
        `${process.env.NEXT_PUBLIC_AUTH_URI}?redirect_url=${redirectUrl}`,
        '_self'
      );
    }
  }, []);

  const logOut = useCallback(() => {
    removeAccessToken();
    removeRefreshToken();
    setAccessToken(null);
    setRefreshToken(null);
  }, []);

  useEffect(() => {
    if (tokenParam) {
      removeAccessToken();
      storeAccessToken(tokenParam);
      setAccessToken(tokenParam);

      delete router.query[ACCESS_TOKEN_KEY];
      router.replace(
        { pathname: router.pathname, query: router.query },
        undefined,
        { shallow: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenParam]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        accessToken,
        refreshToken,
        signIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

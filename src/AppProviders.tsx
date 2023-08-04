import "@/lib/dayjsPlugins";
import { type EmotionCache } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { FC, ReactNode } from "react";
import { useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import SplashScreen from "./components/SplashScreen";
import { queryClient } from "./lib/queryClient";
import { AuthProvider } from "./modules/auth/AuthProvider";
import { persistor, store } from "./store";
import { Snackbar } from "@mui/material";

type Props = {
  emotionCache?: EmotionCache;
  children: ReactNode;
};

export const AppProviders: FC<Props> = ({ children }) => {
  // This ensures that data is not shared
  // between different users and requests
  const [queryClientState] = useState(() => queryClient);

  return (
    <Provider store={store}>
      <PersistGate loading={<SplashScreen />} persistor={persistor}>
        {/* Mui CssBaseline disabled in this example as tailwind provides its own */}
        {/* <CssBaseline /> */}
        <QueryClientProvider client={queryClientState}>
          <AuthProvider>{children}</AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

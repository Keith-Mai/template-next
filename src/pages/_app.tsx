import '../styles/global.css';
import { Hydrate } from '@tanstack/react-query';
import { appWithTranslation } from 'next-i18next';
import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import nextI18nextConfig from '../../next-i18next.config';
import { AppProviders } from '../AppProviders';

// Workaround for https://github.com/zeit/next.js/issues/8592
export type AppProps = NextAppProps & {
  /** Will be defined only is there was an error */
  err?: Error;
};

function App({ Component, pageProps, err }: AppProps) {
  return (
    <AppProviders>
      <Head>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
      </Head>
      {/* Hydrate query cache */}
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} err={err} />
      </Hydrate>
    </AppProviders>
  );
}

export default appWithTranslation(App, {
  ...nextI18nextConfig,
});

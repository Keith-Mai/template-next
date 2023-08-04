import type { DocumentProps } from 'next/document';
import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';
import { isMobile } from 'react-device-detect';

function MyDocument(props: DocumentProps) {
  const { locale } = props.__NEXT_DATA__;

  return (
    <Html lang={locale}>
      <Head>
        <link
          rel="preload"
          href="/fonts/svn-gilroy-regular.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/svn-gilroy-medium.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/svn-gilroy-semibold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/svn-gilroy-bold.otf"
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
        <link href="/static/favicons/site.webmanifest" rel="manifest" />
        <link
          href="/static/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/static/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/static/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          color="#ff7500"
          href="/static/favicons/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <meta content="#142246" name="theme-color" />
        <meta content="#142246" name="msapplication-TileColor" />
        <meta
          content="/static/favicons/browserconfig.xml"
          name="msapplication-config"
        />
        {process.env.NEXT_PUBLIC_GTM_KEY ? (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function (w, d, s, l, i) {
                  w[l] = w[l] || [];
                  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                  var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                  j.async = true;
                  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                  f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', 'GTM-${process.env.NEXT_PUBLIC_GTM_KEY}');
              `,
            }}
          />
        ) : null}
        {process.env.NEXT_PUBLIC_ENABLE_ERUDA === 'true' && isMobile ? (
          <>
            <Script src="//cdn.jsdelivr.net/npm/eruda" />
            <Script
              id="eruda-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{ __html: 'eruda.init();' }}
            />
          </>
        ) : null}
      </Head>
      <body className="text-neutral-90 dark:bg-neutral-90 bg-white dark:text-white">
        {process.env.NEXT_PUBLIC_GTM_KEY ? (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-${process.env.NEXT_PUBLIC_GTM_KEY}" height="0" width="0" style="display: none; visibility: hidden" ></iframe>`,
            }}
          />
        ) : null}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// Example to process graceful shutdowns (ie: closing db or other resources)
// https://nextjs.org/docs/deployment#manual-graceful-shutdowns
if (process.env.NEXT_MANUAL_SIG_HANDLE) {
  // this should be added in your custom _document
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM: ', 'cleaning up');
    process.exit(0);
  });

  process.on('SIGINT', () => {
    console.log('Received SIGINT: ', 'cleaning up');
    process.exit(0);
  });
}

export default MyDocument;

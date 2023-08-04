// @ts-check

// https://nextjs.org/docs/api-reference/next.config.js/introduction
const pc = require("picocolors");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const { i18n } = require("./next-i18next.config");

const trueEnv = ["true", "1", "yes"];

const isProd = process.env.NODE_ENV === "production";
const isCI = trueEnv.includes(process.env?.CI ?? "false");

const NEXTJS_IGNORE_ESLINT = trueEnv.includes(
  process.env?.NEXTJS_IGNORE_ESLINT ?? "false"
);
const NEXTJS_IGNORE_TYPECHECK = trueEnv.includes(
  process.env?.NEXTJS_IGNORE_TYPECHECK ?? "false"
);
/**
 * A way to allow CI optimization when the build done there is not used
 * to deliver an image or deploy the files.
 * @link https://nextjs.org/docs/advanced-features/source-maps
 */
const disableSourceMaps = trueEnv.includes(
  process.env?.NEXT_DISABLE_SOURCEMAPS ?? "false"
);

if (disableSourceMaps) {
  console.warn(
    `${pc.yellow(
      "notice"
    )}- Sourcemaps generation have been disabled through NEXT_DISABLE_SOURCEMAPS`
  );
}

function getAppVersion() {
  // const gitRevisionPlugin = new GitRevisionPlugin();
  const now = new Date();

  let yearNow = now.getFullYear(),
    monthNow = now.getMonth() + 1,
    dateNow = now.getDate(),
    hourNow = now.getHours(),
    minuteNow = now.getMinutes();

  const year = yearNow.toString().substring(2, 4);
  const month = monthNow <= 9 ? `0${monthNow}` : monthNow;
  const date = dateNow <= 9 ? `0${dateNow}` : dateNow;
  const hour = hourNow <= 9 ? `0${hourNow}` : hourNow;
  const minute = minuteNow <= 9 ? `0${minuteNow}` : minuteNow;

  // const gitVersion = gitRevisionPlugin.version();
  // const gitBranch = gitRevisionPlugin.branch();
  // const gitKey =
  //   gitBranch === "master" ? `${gitVersion}` : `${gitBranch}.${gitVersion}`;

  // return `${gitKey}-${year}${month}${date}.${hour}${minute}`;
  return `${year}${month}${date}.${hour}${minute}`;
}

// Tell webpack to compile those packages
// @link https://www.npmjs.com/package/next-transpile-modules
const tmModules = [
  // for legacy browsers support (only in prod)
  ...(isProd
    ? [] // ie: ['@react-google-maps/api', ...]
    : []),
  // ESM only packages are not yet supported by NextJs if you're not
  // using experimental experimental esmExternals
  // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
  // @link {https://github.com/vercel/next.js/discussions/27876|Discussion}
  // @link https://github.com/vercel/next.js/issues/23725
  // @link https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
  ...[
    // ie: newer versions of https://github.com/sindresorhus packages
  ],
];

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: !disableSourceMaps,
  i18n,
  optimizeFonts: true,

  httpAgentOptions: {
    // @link https://nextjs.org/blog/next-11-1#builds--data-fetching
    keepAlive: true,
  },

  onDemandEntries: {
    // period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: (isCI ? 3600 : 25) * 1000,
  },

  // @link https://nextjs.org/docs/advanced-features/compiler#minification
  swcMinify: true,

  compiler: {
    // emotion: true, - by default since 12.2.0
  },

  // @link https://nextjs.org/docs/basic-features/image-optimization
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ["avatars.githubusercontent.com"],
    path: "/_next/image",
    loader: "default",
    disableStaticImages: false,
    minimumCacheTTL: 60,
    formats: ["image/webp"],
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Standalone build
  // @link https://nextjs.org/docs/advanced-features/output-file-tracing#automatically-copying-traced-files-experimental
  output: "standalone",

  experimental: {
    browsersListForSwc: true,
    legacyBrowsers: false,
    images: {
      allowFutureImage: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "avatars.githubusercontent.com",
        },
      ],
      unoptimized: false,
    },

    // React 18 server components
    // @link https://nextjs.org/docs/advanced-features/react-18/server-components
    serverComponents: false,
    // @link https://nextjs.org/docs/advanced-features/output-file-tracing#caveats
    outputFileTracingRoot: undefined, // ,path.join(__dirname, '../../'),
    // Prefer loading of ES Modules over CommonJS
    // @link {https://nextjs.org/blog/next-11-1#es-modules-support|Blog 11.1.0}
    // @link {https://github.com/vercel/next.js/discussions/27876|Discussion}
    esmExternals: true,
    // Experimental monorepo support
    // @link {https://github.com/vercel/next.js/pull/22867|Original PR}
    // @link {https://github.com/vercel/next.js/discussions/26420|Discussion}
    externalDir: true,
  },

  typescript: {
    /** Do not run TypeScript during production builds (`next build`). */
    ignoreBuildErrors: NEXTJS_IGNORE_TYPECHECK,
    tsconfigPath: "./tsconfig.json",
  },

  eslint: {
    ignoreDuringBuilds: NEXTJS_IGNORE_ESLINT,
    dirs: ["src"],
  },

  webpack: (config, { webpack, isServer }) => {
    if (!isServer) {
      // Fixes npm packages that depend on `fs` module
      // @link https://github.com/vercel/next.js/issues/36514#issuecomment-1112074589
      config.resolve.fallback = { ...config.resolve.fallback, fs: false };
    }

    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: [
        {
          loader: "@svgr/webpack",
          // https://react-svgr.com/docs/webpack/#passing-options
          options: {
            svgo: true,
            // @link https://github.com/svg/svgo#configuration
            svgoConfig: {
              multipass: false,
              datauri: "base64",
              js2svg: {
                indent: 2,
                pretty: false,
              },
            },
          },
        },
      ],
    });

    return config;
  },
  env: {
    APP_VERSION: getAppVersion(),
  },
  serverRuntimeConfig: {
    // to bypass https://github.com/zeit/next.js/issues/8251
    PROJECT_ROOT: __dirname,
  },
};

let config = nextConfig;

if (tmModules.length > 0) {
  console.info(
    `${pc.green("notice")}- Will transpile [${tmModules.join(",")}]`
  );

  const withNextTranspileModules = require("next-transpile-modules")(
    tmModules,
    {
      resolveSymlinks: true,
      debug: false,
    }
  );
  config = withNextTranspileModules(config);
}

if (process.env.ANALYZE === "true") {
  // @ts-ignore
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  config = withBundleAnalyzer(config);
}

module.exports = config;

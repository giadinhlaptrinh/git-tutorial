/** @type {import('next').NextConfig} */

const productionBaseUrl = "/git-tutorial";
const BASE_URL = productionBaseUrl || "";

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  basePath: BASE_URL,
  env: {
    BASE_URL,
  },
  async redirects() {
    if (BASE_URL) {
      return [
        {
          source: "/",
          destination: BASE_URL,
          basePath: false,
          permanent: false,
        },
      ];
    }
    return [];
  },
};

module.exports = nextConfig;

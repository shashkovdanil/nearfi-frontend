/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  reactStrictMode: true,
  redirects: async () => {
    return [
    ];
  },
  rewrites: async () => [
  ],
  distDir: 'dist',
};

module.exports = nextConfig;

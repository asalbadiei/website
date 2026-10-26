import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // This app lives in a subfolder of a larger repository; keep file tracing local to it.
  outputFileTracingRoot: __dirname,
  async redirects() {
    return [{ source: '/', destination: '/fa', permanent: false }];
  },
};

export default nextConfig;

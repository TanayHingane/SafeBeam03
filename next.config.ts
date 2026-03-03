const nextConfig = {
  /* Ensure output is not set to 'export' if you are using Netlify's Next.js plugin */
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // For demo avatar
      },
      {
        protocol: 'https',
        hostname: 'grainy-gradients.vercel.app', // For noise texture
      },
      // Allow Supabase storage images
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * For Next.js 13 and above, you can use the new image configuration
   * to allow images from the Supabase storage URL
   */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gicnjveypmnnaeotgnbw.supabase.co',
      },
    ],
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "http", hostname: "localhost", port: "3000" },
    ],
  },
  crossOrigin: "anonymous",
  output: "standalone",
};

export default nextConfig;

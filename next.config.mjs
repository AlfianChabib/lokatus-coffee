/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.ctfassets.net", port: "", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "3000" },
    ],
  },
  output: "standalone",
  reactStrictMode: true,
  crossOrigin: "anonymous",
};

export default nextConfig;

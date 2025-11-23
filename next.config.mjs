/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // <--- Dòng quan trọng nhất để Docker chạy được
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bizweb.dktcdn.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

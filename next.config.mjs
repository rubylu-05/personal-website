/** @type {import('next').NextConfig} */
const nextConfig = {
  // Impit loads a platform-specific native HTTP client on the server.
  serverExternalPackages: ['impit']
};

export default nextConfig;

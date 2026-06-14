import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ignora os erros de TypeScript na hora de subir pro Vercel
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
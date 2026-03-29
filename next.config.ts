import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb", // Memperbesar limit data yang dikirim
    },
  },
  // Tambahkan ini jika belum ada untuk menangani API Routes
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

export default nextConfig;
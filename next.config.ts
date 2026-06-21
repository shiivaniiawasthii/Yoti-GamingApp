import type { NextConfig } from "next";
const ngrokHost=process.env.NEXT_PUBLIC_APP_URL?.replace("https://","")

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ngrokHost ? [ngrokHost] : [],


};

export default nextConfig;

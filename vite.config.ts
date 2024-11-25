import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: "./tls/key.pem",
      cert: "./tls/cert.pem",
    },
    proxy: {
      "/api": {
        target: "https://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
});

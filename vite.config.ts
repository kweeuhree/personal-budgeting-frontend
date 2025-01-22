import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    https: {
      key: "./tls/key.pem",
      cert: "./tls/cert.pem",
    },
    proxy: {
      "/api": {
        target: "https://personal-budgeting-backend.onrender.com",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  css: {
    postcss: "./postcss.config.js",
  },
  test: {
    globals: true, // Use global test functions (e.g., `describe`, `it`)
    environment: "jsdom",
    setupFiles: "./tests/setup.ts",
  },
});

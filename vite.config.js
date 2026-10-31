import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  // Wallhaven API proxy
  server: {
    proxy: {
      "/wallhaven-api": {
        target: "https://wallhaven.cc",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/wallhaven-api/, ""),
      },
    },
  },
});

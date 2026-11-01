
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

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

  server: {
    proxy: {
      // Wallhaven API
      "/wallhaven-api": {
        target: "https://wallhaven.cc",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/wallhaven-api/, ""),
      },

      "/wallhaven-image": {
        target: "https://w.wallhaven.cc",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/wallhaven-image/, ""),

        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader(
              "Referer",
              "https://wallhaven.cc/"
            );
          });
        },
      },
    },
  },
});

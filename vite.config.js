import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ mode }) => {
  const root = fileURLToPath(new URL(".", import.meta.url));
  const env = loadEnv(mode, root, "");

  return {
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
        // Wallhaven API - local development
        "/api/wallhaven-api": {
          target: "https://wallhaven.cc",
          changeOrigin: true,
          secure: true,

          rewrite: (path) =>
            path.replace(/^\/api\/wallhaven-api/, ""),

          configure: (proxy) => {
            proxy.on("proxyReq", (proxyReq) => {
              const targetUrl = new URL(
                proxyReq.path,
                "https://wallhaven.cc"
              );

              if (env.WALLHAVEN_API_KEY) {
                targetUrl.searchParams.set(
                  "apikey",
                  env.WALLHAVEN_API_KEY
                );
              }

              proxyReq.path =
                targetUrl.pathname + targetUrl.search;
            });
          },
        },

        // Wallhaven images - local development
        "/api/wallhaven-image": {
          target: "https://w.wallhaven.cc",
          changeOrigin: true,
          secure: true,

          rewrite: (path) =>
            path.replace(/^\/api\/wallhaven-image/, ""),

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
  };
});

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import ssr from "vite-plugin-ssr/plugin";

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  const BACKEND_REWRITE_URL =
    process.env.BACKEND_REWRITE_URL || "http://localhost:8080";
  const BACKEND_WS_REWRITE_URL =
    process.env.BACKEND_WS_REWRITE_URL || "ws://localhost:8080";

  return defineConfig({
    plugins: [
      react(),
      ssr({
        prerender: true,
      }),
    ],
    resolve: {
      alias: {
        "#": "/src",
      },
    },
    server: {
      proxy: {
        "/ws": {
          target: BACKEND_WS_REWRITE_URL,
          ws: true,
        },
        "/api": {
          target: BACKEND_REWRITE_URL,
        },
      },
    },
  });
};

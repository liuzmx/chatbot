import { defineConfig } from "umi";

export default defineConfig({
  routes: [{ path: "/", component: "index", layout: false }],
  proxy: {
    "/api": {
      target: "http://localhost:8000",
      changeOrigin: true,
    },
  },
  npmClient: "yarn",
});

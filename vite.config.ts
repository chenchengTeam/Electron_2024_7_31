import vue from "@vitejs/plugin-vue";
import electron from "vite-plugin-electron";
// 引入resolve
import { resolve } from "path";
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [
    vue(),
    electron({
      entry: "electron/index.ts",
    }),
  ],
  resolve: {
    // 设置路径别名
    alias: {
      "@": resolve(__dirname, "./src"),
      "*": resolve(""),
    },
  },
});

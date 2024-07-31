// 生产环境
import type { Plugin } from "vite";

// vite插件必须导入一个对象必须有name属性
// 包含对象构子
export const ElectronPlugin = (): Plugin => {
  return {
    configureServer(server) {
      server?.httpServer?.on("listening", () => {
        const addressInfo = server.httpServer?.address();
        console.log("地址：", addressInfo);
      });
    },
  };
};

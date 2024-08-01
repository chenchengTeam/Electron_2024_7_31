// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import path from "path";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import AutoImport from "unplugin-auto-import/vite";
var electron_vite_config_default = defineConfig({
  main: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src")
      }
    },
    plugins: [
      vue(),
      Components({
        resolvers: [
          // 自动注册图标组件
          IconsResolver({
            enabledCollections: ["ep"]
          })
        ]
      }),
      AutoImport({
        resolvers: [
          // 自动导入图标组件
          IconsResolver({})
        ]
      }),
      Icons({
        compiler: "vue3",
        // 指定编译器
        autoInstall: true
        // 自动安装
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "./src/renderer/src/assets/svgs")],
        // 指定symbolId格式
        symbolId: "icon-[name]",
        svgoOptions: {
          full: true,
          plugins: [
            { name: "removeAttrs", params: { attrs: ["class", "data-name", "fill", "stroke"] } },
            // 删除样式标
            "removeStyleElement"
          ]
        }
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          // 必须配置 才可全局使用 定义的css
          additionalData: `@use "@renderer/design/var.scss" as *; `
        }
      }
    }
  }
});
export {
  electron_vite_config_default as default
};

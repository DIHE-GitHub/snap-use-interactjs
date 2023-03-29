import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import { ViteAliases } from "vite-aliases";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import WindiCSS from "vite-plugin-windicss";
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ViteAliases(),
    Components({
      dts: "",
      resolvers: [AntDesignVueResolver()],
    }),
    AutoImport({
      dts: "src/auto-imports.d.ts",
      imports: ["vue", "@vueuse/core"],
    }),
    WindiCSS(),
  ],
});

import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: ["@oysterlee/vue-color-picker"],
  },
  resolve: {
    alias: {
      "@oysterlee/vue-color-picker/utils": resolve(
        __dirname,
        "../color-picker/src/utils/index.ts",
      ),
      "@oysterlee/vue-color-picker": resolve(
        __dirname,
        "../color-picker/src/index.ts",
      ),
    },
  },
  build: {
    outDir: resolve(__dirname, "../../demo"),
  },
});

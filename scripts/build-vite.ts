/* eslint-disable @typescript-eslint/no-var-requires */
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    outDir: "dist",
    lib: {
      entry: path.resolve(__dirname, "../packages/color-picker/index.ts"),
      name: "ColorPicker",
      fileName: (format) => `color-picker.${format}.js`,
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  plugins: [
    vue(),
    dts({
      tsConfigFilePath: path.resolve(__dirname, "../tsconfig.json"),
    }),
  ],
});

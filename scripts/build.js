/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const { build } = require("vite");
const vue = require("@vitejs/plugin-vue");
const dts = require("vite-plugin-dts");

(async () => {
  await build({
    build: {
      outDir: "dist",
      lib: {
        entry: path.resolve(__dirname, "../packages/color-picker/src/index.ts"),
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
})();

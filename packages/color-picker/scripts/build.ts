import path from "path";
import { build } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

(async () => {
  await build({
    build: {
      outDir: "dist",
      lib: {
        entry: "src/index.ts",
        name: "ColorPicker",
        fileName: (format) => `color-picker.${format}.js`,
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
          exports: "named",
        },
      },
    },
    plugins: [
      vue(),
      dts({
        tsConfigFilePath: path.resolve(__dirname, "../tsconfig.json"),
        include: [
          "src/components/**/*.vue",
          "src/index.ts",
          "src/types/index.ts",
          "src/utils/convert.ts",
        ],
      }),
    ],
  });
})();

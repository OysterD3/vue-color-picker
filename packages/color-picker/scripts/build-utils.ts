import path from "path";
import { build } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";

(async () => {
  await build({
    build: {
      outDir: "dist",
      emptyOutDir: false,
      lib: {
        entry: "src/utils/index.ts",
        name: "utils",
        fileName: (format) => `utils.${format}.js`,
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
  });
})();

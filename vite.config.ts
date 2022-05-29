import { fileURLToPath, URL } from "url";
import friendlyTypeImports from "rollup-plugin-friendly-type-imports";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default ({ mode }) => {
  const plugins =
    mode === "development"
      ? [vue({ reactivityTransform: true }), friendlyTypeImports()]
      : [vue({ reactivityTransform: true })];

  return defineConfig({
    base: process.env.ASSETS_BASE,
    build: {
      outDir: process.env.OUT_DIR || "./dist",
    },
    envDir: "./env",
    envPrefix: "APP",
    plugins,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~": fileURLToPath(new URL(".", import.meta.url)),
      },
    },
  });
};

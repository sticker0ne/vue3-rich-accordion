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

  const resolve = {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~": fileURLToPath(new URL(".", import.meta.url)),
    },
  };

  const envDir = "./env";
  const envPrefix = "APP";

  if (mode === "gh-pages")
    return defineConfig({
      base: "/vue3-rich-accordion/",
      build: {
        outDir: "docs",
      },
      envDir,
      envPrefix,
      plugins,
      resolve,
    });

  return defineConfig({
    envDir,
    envPrefix,
    plugins,
    resolve,
  });
};

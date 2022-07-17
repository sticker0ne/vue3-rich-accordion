import path from "path";
import { fileURLToPath, URL } from "url";
import vue from "@vitejs/plugin-vue";
import * as fs from "fs";

import { build } from "vite";
import { exec } from "child_process";
import { compile } from "sass";

const envDir = "./env";
const envPrefix = "APP";

function clearDistFolder() {
  fs.rmdirSync("./dist", { recursive: true });
}

async function buildLibrary() {
  await build({
    root: path.resolve(__dirname, "./src"),
    base: "/foo/",
    build: {
      outDir: "../dist",
      lib: {
        entry: path.resolve(__dirname, "src/library/index.ts"),
        name: "MyComponentLib",
        fileName: format => `accordion-library.${format}.js`,
      },
      reportCompressedSize: true,
      rollupOptions: {
        external: ["vue", "./public/*"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
    },
    plugins: [vue({ reactivityTransform: true })],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", "file://" + __dirname)),
        "~": fileURLToPath(new URL(".", "file://" + __dirname)),
      },
    },
    envDir,
    envPrefix,
  });
}

function buildTypesDeclaration() {
  exec("vue-tsc -p tsconfig.build-lib.json --declaration --emitDeclarationOnly");
}

function processStyles() {
  fs.copyFileSync("./src/library/accordion/accordion-styles.scss", "./dist/accordion-library-styles.scss");
  const compileResult = compile("./dist/accordion-library-styles.scss", { sourceMap: false });
  fs.writeFileSync("./dist/accordion-library-styles.css", compileResult.css);
}

async function main() {
  clearDistFolder();
  buildTypesDeclaration();
  await buildLibrary();
  processStyles();
}

main();

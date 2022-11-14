import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import { buildVars } from "openblocks-dev-utils/buildVars.js";
import { getLibNames } from "openblocks-dev-utils/external.js";
import paths from "./paths.js";
import { defineConfig } from "vite";

const define = {};
buildVars.forEach(({ name, defaultValue }) => {
  define[name] = JSON.stringify(process.env[name] || defaultValue);
});

export default defineConfig({
  define,
  root: paths.appRoot,
  assetsInclude: ["**/*.md"],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      "__user-dev-comps__": paths.compsIndexJs,
      "__user-pkg-json__": paths.appPackageJson,
    },
  },
  build: {
    target: "chrome69",
    outDir: paths.appOutPath,
    emptyOutDir: true,
    lib: {
      formats: ["es"],
      entry: paths.compsIndexJs,
      fileName: "index",
    },
    rollupOptions: {
      external: getLibNames(),
      output: {
        chunkFileNames: "[hash].js",
      },
    },
  },
  plugins: [
    react({
      babel: {
        compact: false,
        parserOpts: {
          plugins: ["decorators-legacy"],
        },
      },
    }),
    svgrPlugin({
      svgrOptions: {
        exportType: "named",
        prettier: false,
        svgo: false,
        titleProp: true,
        ref: true,
      },
    }),
  ].filter(Boolean),
});

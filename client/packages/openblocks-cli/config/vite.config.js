import react from "@vitejs/plugin-react";
import svgrPlugin from "vite-plugin-svgr";
import global from "rollup-plugin-external-globals";
import { buildVars } from "openblocks-dev-utils/buildVars.js";
import injectCss from "vite-plugin-css-injected-by-js";
import { getLibNames, getAllLibGlobalVarNames } from "openblocks-dev-utils/external.js";
import paths from "./paths.js";
import { defineConfig } from "vite";
import { readJson } from "openblocks-dev-utils/util.js";

const isProduction = process.env.NODE_ENV === "production";
const packageJson = readJson(paths.appPackageJson);

const define = {};
buildVars.forEach(({ name, defaultValue }) => {
  define[name] = JSON.stringify(process.env[name] || defaultValue);
});

export default defineConfig({
  define: {
    ...define,
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    __OPENBLOCKS_DEV__: JSON.stringify({}),
  },
  assetsInclude: ["**/*.md"],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
  },
  build: {
    target: "es2015",
    cssTarget: "chrome63",
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
    isProduction && global(getAllLibGlobalVarNames(), { exclude: [/\.css$/] }),
    isProduction && injectCss({ styleId: `${packageJson.name}-${packageJson.version}` }),
  ].filter(Boolean),
});

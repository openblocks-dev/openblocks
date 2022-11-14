import dotenv from "dotenv";
import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import checker from "vite-plugin-checker";
import path from "path";
import chalk from "chalk";
import { ViteMinifyPlugin as minifyHtml } from "vite-plugin-minify";
import { libsImportCode } from "openblocks-dev-utils/external";
import { ensureLastSlash } from "openblocks-dev-utils/util";
import { buildVars } from "openblocks-dev-utils/buildVars";

dotenv.config();

const apiProxyTarget = process.env.API_PROXY_TARGET;
const nodeEnv = process.env.NODE_ENV ?? "development";
const edition = process.env.REACT_APP_EDITION;
const isEE = edition === "enterprise";
const isDev = nodeEnv === "development";

if (!apiProxyTarget && isDev) {
  console.log();
  console.log(chalk.red`API_PROXY_TARGET is required.\n`);
  console.log(chalk.cyan`Start with command: API_PROXY_TARGET=\{backend-api-addr\} yarn start`);
  console.log();
  process.exit(1);
}

function openBlocksGlobalsPlugin() {
  const virtualModuleId = "virtual:globals";
  return {
    name: "openblocks-global-plugin",
    resolveId(id: string) {
      if (id === virtualModuleId) {
        return id;
      }
    },
    load(id: string) {
      if (id === virtualModuleId) {
        return libsImportCode();
      }
    },
  };
}

const define = {};
buildVars.forEach(({ name, defaultValue }) => {
  define[name] = JSON.stringify(process.env[name] || defaultValue);
});

// https://vitejs.dev/config/
export const viteConfig: UserConfig = {
  define,
  assetsInclude: ["**/*.md"],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      "openblocks-sdk": path.resolve(__dirname, "src/index.sdk"),
      "@openblocks-ee": path.resolve(
        __dirname,
        isEE ? "../openblocks/src/ee" : "../openblocks/src"
      ),
    },
  },
  base: ensureLastSlash(process.env.PUBLIC_URL),
  build: {
    manifest: true,
    target: "chrome69",
    outDir: "build",
    assetsDir: "static",
    rollupOptions: {
      output: {
        chunkFileNames: "[hash].js",
        manualChunks: {
          browser: ["./src/browser-check.ts"],
        },
      },
    },
    commonjsOptions: {
      defaultIsModuleExports: (id) => {
        if (id.indexOf("antd/lib") !== -1) {
          return false;
        }
        return "auto";
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          "@primary-color": "#3377FF",
          "@link-color": "#3377FF",
          "@border-color-base": "#D7D9E0",
          "@border-radius-base": "4px",
        },
        javascriptEnabled: true,
      },
    },
  },
  server: {
    open: true,
    cors: true,
    port: 3000,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: apiProxyTarget,
        changeOrigin: false,
      },
    },
  },
  plugins: [
    checker({ typescript: true }),
    react({
      babel: {
        parserOpts: {
          plugins: ["decorators-legacy"],
        },
      },
    }),
    viteTsconfigPaths({
      projects: [
        "../openblocks/tsconfig.json",
        "../openblocks-sdk/tsconfig.json",
        "../openblocks-comps/tsconfig.json",
        "../openblocks-design/tsconfig.json",
      ],
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
    openBlocksGlobalsPlugin(),
    minifyHtml(),
  ],
};

export default defineConfig(viteConfig);

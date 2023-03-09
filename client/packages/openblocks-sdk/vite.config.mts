import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";
import svgrPlugin from "vite-plugin-svgr";
import path from "path";
import { ensureLastSlash } from "openblocks-dev-utils/util";
import { buildVars } from "openblocks-dev-utils/buildVars";
import { globalDepPlugin } from "openblocks-dev-utils/globalDepPlguin";

const define = {};
buildVars.forEach(({ name, defaultValue }) => {
  define[name] = JSON.stringify(process.env[name] || defaultValue);
});

const apiBaseUrl = "http://localhost:8000";

export const viteConfig: UserConfig = {
  define: {
    ...define,
    REACT_APP_API_HOST: JSON.stringify(apiBaseUrl),
    REACT_APP_BUNDLE_TYPE: JSON.stringify("sdk"),
  },
  assetsInclude: ["**/*.md"],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: {
      "openblocks-sdk": path.resolve(__dirname, "../openblocks/src/index.sdk"),
      "@openblocks-ee": path.resolve(__dirname, "../openblocks/src"),
    },
  },
  base: ensureLastSlash(process.env.PUBLIC_URL),
  build: {
    lib: {
      formats: ["es"],
      entry: "./src/index.ts",
      name: "Openblocks",
      fileName: "openblocks-sdk",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        chunkFileNames: "[hash].js",
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
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: false,
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
  plugins: [
    globalDepPlugin(["openblocks-sdk"]),
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
  ],
};

export default defineConfig(viteConfig);

import path, { dirname } from "path";
import fs from "fs";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import polyfillNode from "rollup-plugin-polyfill-node";
import json from "@rollup/plugin-json";
import svgr from "@svgr/rollup";
import url from "@rollup/plugin-url";
import cleaner from "rollup-plugin-cleaner";
import { terser } from "rollup-plugin-terser";
import { rollup } from "rollup";
import { fileURLToPath } from "url";
import global from "rollup-plugin-external-globals";
import { getAllLibGlobalVarNames, getLibNames } from "openblocks-dev-utils/external.js";
import { ensureLastSlash, readJson } from "openblocks-dev-utils/util.js";
import { buildVars } from "openblocks-dev-utils/buildVars.js";

const rootDir = dirname(fileURLToPath(import.meta.url));
const packageJson = readJson(path.join(rootDir, "package.json"));
const format = "system";
const { name, version } = packageJson;

const replaceVars = {};
buildVars.forEach(({ name, defaultValue }) => {
  replaceVars[name] = JSON.stringify(process.env[name] || defaultValue);
});

export async function build() {
  const config = {
    input: "src/index.ts",
    external: getLibNames(),
    plugins: [
      cleaner({
        targets: ["lib"],
      }),
      global(getAllLibGlobalVarNames()),
      resolve({
        browser: true,
        preferBuiltins: false,
        modulePaths: [path.resolve(rootDir, "src")],
        extensions: [".mjs", ".js", ".json", ".node", ".svg"],
      }),
      commonjs(),
      polyfillNode({
        include: /node_modules/,
      }),
      typescript(),
      json(),
      url({
        publicPath: ensureLastSlash(process.env.PUBLIC_URL),
      }),
      svgr({
        exportType: "named",
        typescript: true,
        prettier: false,
        svgo: false,
        svgoConfig: {
          plugins: [{ removeViewBox: false }],
        },
        titleProp: true,
        ref: true,
      }),
      replace({
        preventAssignment: true,
        ...replaceVars,
      }),
      terser(),
    ],
  };

  const bundle = await rollup(config);
  const { output } = await bundle.write({
    format,
    entryFileNames: `${name}.[hash].js`,
    dir: `lib/${name}/${version}`,
  });

  const importMap = {};
  for (const out of output) {
    if (out.type === "chunk") {
      importMap[name] = `/${name}/${version}/${out.fileName}`;
      console.info("build complete:", name, "->", out.fileName);
    }
  }
  fs.writeFileSync(
    path.resolve(rootDir, "lib/import-map.json"),
    JSON.stringify(importMap, null, 4)
  );
}

build();

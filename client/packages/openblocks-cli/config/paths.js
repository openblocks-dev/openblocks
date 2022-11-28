import path from "node:path";
import fs from "node:fs";
import { currentDirName } from "openblocks-dev-utils/util.js";

const currentDir = currentDirName(import.meta.url);
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const moduleFileExtensions = [
  "web.mjs",
  "mjs",
  "web.js",
  "js",
  "web.ts",
  "ts",
  "web.tsx",
  "tsx",
  "json",
  "web.jsx",
  "jsx",
];

const resolveModule = (resolveFn, filePath) => {
  const extension = moduleFileExtensions.find((extension) =>
    fs.existsSync(resolveFn(`${filePath}.${extension}`))
  );

  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }

  return resolveFn(`${filePath}.js`);
};

const resolveOwn = (relativePath) => path.resolve(currentDir, "..", relativePath);

const paths = {
  resolveApp,
  appOutPath: resolveOwn(".out"),
  appOutPackageJson: resolveOwn(".out/package.json"),
  appPath: resolveApp("."),
  appHtml: resolveOwn("ide/index.html"),
  appRoot: resolveOwn("ide"),
  appBaseTsConfig: resolveOwn("ide/tsconfig.json"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  appLocales: resolveApp("locales"),
  compsIndexJs: resolveModule(resolveApp, "src/index"),
  appViteConfigJs: resolveModule(resolveApp, "vite.config"),
  appTsConfig: resolveApp("tsconfig.json"),
  yarnLockFile: resolveApp("yarn.lock"),
  appNodeModules: resolveApp("node_modules"),
  appWebpackCache: resolveApp("node_modules/.cache"),
  appTsBuildInfoFile: resolveApp("node_modules/.cache/tsconfig.tsbuildinfo"),
};

export default paths;

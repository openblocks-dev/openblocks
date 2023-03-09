import path from "node:path";
import { buildVars } from "openblocks-dev-utils/buildVars.js";
import { currentDirName } from "openblocks-dev-utils/util.js";

const globals = {};
buildVars.forEach(({ name, defaultValue }) => {
  globals[name] = process.env[name] || defaultValue;
});
const edition = process.env.REACT_APP_EDITION;
const isEEGlobal = edition === "enterprise-global";
const isEE = edition === "enterprise" || isEEGlobal;
const dirname = currentDirName(import.meta.url);

export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "react-markdown": path.resolve(dirname, "./mocks/react-markdown.js"),
    "\\.md\\?url$": path.resolve(dirname, "./mocks/markdown-url-module.js"),
    "^@openblocks-ee(.*)$": path.resolve(
      dirname,
      isEE ? "../../packages/openblocks/src/ee/$1" : "../../packages/openblocks/src/$1"
    ),
    "openblocks-sdk": path.resolve(dirname, "../../packages/openblocks/src/index.sdk"),
  },
  globals,
  // roots: ["<rootDir>/src"],
  modulePaths: [
    "<rootDir>/src",
    path.resolve(dirname, "../../packages/openblocks/src"),
    path.resolve(dirname, "../../packages/openblocks-comps/src"),
    path.resolve(dirname, "../../packages/openblocks-design/src"),
  ],
  setupFiles: [path.resolve(dirname, "./jest.setup.js")],
  setupFilesAfterEnv: [path.resolve(dirname, "./jest.setup-after-env.js")],
  transform: {
    "^.+\\.(js|jsx|mjs|cjs|ts|tsx)$": path.resolve(dirname, "./transform/babelTransform.js"),
    "^.+\\.css$": path.resolve(dirname, "./transform/cssTransform.js"),
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": path.resolve(
      dirname,
      "./transform/fileTransform.js"
    ),
  },
  transformIgnorePatterns: [],
  resetMocks: true,
};

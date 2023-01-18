import path from "path";
import fs from "fs-extra";
import { spawn } from "cross-spawn";
import paths from "../config/paths.js";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

const isUsingYarn = (process.env.npm_config_user_agent || "").indexOf("yarn") === 0;

function install(dependencies, registry) {
  return new Promise((resolve, reject) => {
    let cmd = "npm";
    let args = ["install", "--no-audit", "--save", "--save-exact", "--loglevel", "error"];
    if (isUsingYarn) {
      cmd = "yarn";
      args = ["add"];
    }
    if (registry) {
      args.push("--registry", registry);
    }
    args.push(...dependencies);
    const child = spawn(cmd, args, { stdio: "inherit" });
    child.on("close", (code) => {
      if (code !== 0) {
        reject({
          command: `${cmd} ${args.join(" ")}`,
        });
        return;
      }
      resolve();
    });
  });
}

async function uninstall(dependencies) {
  return new Promise((resolve, reject) => {
    let cmd = "npm";
    let args = ["uninstall"];
    if (isUsingYarn) {
      cmd = "yarn";
      args = ["remove"];
    }
    args.push(...dependencies);
    const child = spawn(cmd, args, { stdio: "inherit" });
    child.on("close", (code) => {
      if (code !== 0) {
        reject({
          command: `${cmd} ${args.join(" ")}`,
        });
        return;
      }
      resolve();
    });
  });
}

/**
 * init dir with specified template name
 * 1. install template package
 * 2. update package.json
 * 3. copy template files
 * 4. install other dependencies
 * 5. uninstall template package
 */
export default async function initAction(options) {
  const { template, registry } = options;
  const templatePackageName = `openblocks-cli-template-${template}`;

  await install([templatePackageName], registry);
  console.log("template package installed");

  const templatePackageJsonFile = require.resolve(`${templatePackageName}/package.json`);
  const templateDir = path.dirname(templatePackageJsonFile);
  const templatePackageJson = fs.readJsonSync(templatePackageJsonFile);
  const appPackageJson = fs.readJsonSync(paths.appPackageJson);

  appPackageJson.openblocks = templatePackageJson.openblocks || {};
  appPackageJson.scripts = {
    start: "vite",
    build: "openblocks-cli build",
  };
  fs.writeFileSync(paths.appPackageJson, JSON.stringify(appPackageJson, null, 2));
  console.log("package.json updated");

  const notCopiedFiles = ["package.json", "README.md", "README-template.md", "node_modules"];
  fs.copySync(templateDir, "./", {
    filter: (src) => notCopiedFiles.every((i) => !src.startsWith(path.join(templateDir, i))),
  });
  fs.copyFile(path.join(templateDir, "README-template.md"), "./README.md");
  console.log("template files copied");

  const dependencies = [];
  if (template === "typescript") {
    dependencies.push("typescript");
  }
  if (dependencies.length > 0) {
    await install(dependencies, registry);
    console.log("dependencies installed");
  }

  await uninstall([templatePackageName]);
  console.log("template package uninstalled");

  console.log();
  console.log("Done! Now, you can run below command to start:");
  console.log(`    ${isUsingYarn ? "yarn" : "npm"} start`);
  console.log();
}

import fs from "fs";
import shell from "shelljs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";
import { stripLastSlash } from "openblocks-dev-utils/util.js";
import { buildVars } from "openblocks-dev-utils/buildVars.js";

shell.set("-e");

const start = Date.now();

const internalPackages = ["openblocks-comps", "openblocks"];

const rootDir = dirname(dirname(fileURLToPath(import.meta.url)));
const moduleBuildDir = path.resolve(rootDir, "packages/openblocks/node_modules/.openblocks");
const finalBuildDir = path.resolve(rootDir, "packages/openblocks/build");
const imports = {};

function processImports(importsData) {
  let publicUrl = shell.env["PUBLIC_URL"];
  if (publicUrl) {
    Object.keys(importsData).forEach((m) => {
      importsData[m] = `${stripLastSlash(publicUrl)}${importsData[m]}`;
    });
  }
  return importsData;
}

function buildPackage(workspace) {
  console.log(chalk.cyan`${workspace} building...`);
  shell.exec(`yarn workspace ${workspace} build`, { fatal: true });

  const workspaceBuildDir = path.resolve(rootDir, "packages", workspace, "lib");
  if (!fs.existsSync(workspaceBuildDir)) {
    return;
  }

  const importMapFile = path.resolve(workspaceBuildDir, "import-map.json");
  if (fs.existsSync(importMapFile)) {
    const importMapFileCnt = fs.readFileSync(importMapFile).toString();
    Object.assign(imports, processImports(JSON.parse(importMapFileCnt)));
    shell.exec(`rm ${importMapFile}`);
  }
  shell.cp(`-R`, `${workspaceBuildDir}/*`, moduleBuildDir);
  shell.env["REACT_APP_IMPORT_MAP"] = JSON.stringify({ imports });
}

shell.mkdir("-p", moduleBuildDir);

//prettier-ignore
shell.env["REACT_APP_COMMIT_ID"] = shell.env["REACT_APP_COMMIT_ID"] || shell.exec("git rev-parse --short HEAD").trim();

// Treating warnings as errors when process.env.CI = true.
shell.env["CI"] = false;
shell.env["NODE_OPTIONS"] = "--max_old_space_size=4096";
shell.env["NODE_ENV"] = "production";
shell.env["REACT_APP_LOG_LEVEL"] = "error";

buildVars.forEach(({ name, defaultValue }) => {
  shell.env[name] = shell.env[name] ?? defaultValue;
});

console.log(shell.env);

console.log();
console.log(chalk.cyan`clear module build dir...`);
shell.rm("-rf", `${moduleBuildDir}/*`);

internalPackages.forEach((pkg) => {
  if (process.argv.includes("--skip-main") && pkg === "openblocks") {
    console.log(chalk.cyan`skip build package:`, pkg);
    return;
  }
  buildPackage(pkg);
});

const importMap = JSON.stringify({ imports: imports }, null, 2);

console.log();
console.log(chalk.cyan`generate import map file:`);
console.log(importMap);
fs.writeFileSync(path.resolve(moduleBuildDir, "import-map.json"), importMap);

if (!process.argv.includes("--skip-main")) {
  console.log();
  console.log(chalk.cyan`merging...`);
  shell.cp("-R", `${moduleBuildDir}/*`, finalBuildDir);
}

if (process.argv.includes("--internal-deploy")) {
  const deployDir = shell.env["DEPLOY_DIR"];
  console.log();
  console.log(chalk.cyan`deploying...`);
  shell.exec("docker cp ./packages/openblocks/build openblocks-fe:/var/www/", { fatal: true });
  shell.exec(
    `docker exec openblocks-fe /bin/sh -c "cd /var/www/ && rm -rf ${deployDir} && mv build ${deployDir}"`,
    { fatal: true }
  );
}

console.log();
console.log(chalk.green`Done! time: ${((Date.now() - start) / 1000).toFixed(2)}s`);

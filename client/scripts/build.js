import shell from "shelljs";
import chalk from "chalk";
import { buildVars } from "openblocks-dev-utils/buildVars.js";

shell.set("-e");

const start = Date.now();

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

shell.exec(`BUILD_TARGET=browserCheck yarn workspace openblocks build`, { fatal: true });
shell.exec(`yarn workspace openblocks build`, { fatal: true });

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

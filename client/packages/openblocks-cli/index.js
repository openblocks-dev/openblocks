#!/usr/bin/env node

import("./util/log.js");
import fs from "node:fs";
import { Command } from "commander";
import initAction from "./actions/init.js";
import buildAction from "./actions/build.js";

const program = new Command();

const pkg = JSON.parse(fs.readFileSync("./package.json").toString());
program.name(pkg.name).description(pkg.description);

program
  .command("init")
  .description("init project")
  .option("-t, --template", "template name", "typescript")
  .option("--registry [addr]", "npm registry")
  .action(initAction);

program
  .command("build")
  .description("build component lib")
  .option("--outDir", "where to place tar ball", "./")
  .option("--publish", "publish to npm", false)
  .action(buildAction);

program.parse();

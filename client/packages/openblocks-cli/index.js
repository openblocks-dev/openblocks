#!/usr/bin/env node

import("./util/log.js");
import fs from "node:fs";
import { Command } from "commander";
import startAction from "./actions/start.js";
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
  .command("start")
  .description("start dev server to preview")
  .option("--port", "server port", "9000")
  .option("--host", "server host", "127.0.0.1")
  .action(startAction);

program
  .command("build")
  .description("build component lib")
  .option("--outDir", "where to place tar ball", "./")
  .action(buildAction);

program.parse();

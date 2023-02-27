import { readYaml } from "../src/common/util";
import fs from "fs";
import _ from "lodash";
import path from "path";
import { authParamsConfig, retrieveSpec } from "../src/plugins/openApi/parse";
import { program } from "commander";

async function gen(name: string, specUrl: string, pluginId?: string) {
  const id = pluginId ?? _.camelCase(name);
  const pluginDir = path.join(path.dirname(__dirname), "src/plugins", id);
  const pluginEntryFile = path.join(pluginDir, "index.ts");
  const pluginSpecYamlFile = path.join(pluginDir, `${id}.spec.yaml`);
  const pluginSpecJsonFile = path.join(pluginDir, `${id}.spec.json`);

  console.info("start generate plugin, id:", id, "name:", name);

  if (!fs.existsSync(pluginDir)) {
    fs.mkdirSync(pluginDir, { recursive: true });
    console.info(`plugin dir ${id} created.`);
  }

  if (fs.existsSync(pluginEntryFile)) {
    console.info(`plugin: ${id} is already existed.`);
    return;
  }

  // 1. fetch spec url
  let spec: any;
  const isYamlSpecExist = fs.existsSync(pluginSpecYamlFile);
  const isJsonSpecExist = fs.existsSync(pluginSpecJsonFile);
  if (!isYamlSpecExist && !isJsonSpecExist) {
    if (!specUrl) {
      console.error("specUrl is required to fetch OpenAPI spec.");
      return;
    }
    console.info(`start fetching:`, specUrl);
    const { spec } = await retrieveSpec(specUrl);
    fs.writeFileSync(pluginSpecJsonFile, JSON.stringify(spec, null, 2));
    console.info(`${name}spec.json saved`);
  } else {
    if (isJsonSpecExist) {
      const specJson = fs.readFileSync(pluginSpecJsonFile).toString();
      spec = JSON.parse(specJson);
      console.info("got spec from json file:", pluginSpecJsonFile);
    }
    if (isYamlSpecExist) {
      spec = readYaml(pluginSpecYamlFile);
      console.info("got spec from yaml file:", pluginSpecYamlFile);
    }
  }

  if (!spec) {
    console.error("can not get spec");
    return;
  }

  // 2. get data source params
  const dataSourceParams = await authParamsConfig(spec);

  // 3. gen code
  const template = fs
    .readFileSync(path.join(__dirname, "./openApiDataSourceTemplate.tpl"))
    .toString();
  const data = {
    id,
    name,
    isJsonSpec: isJsonSpecExist,
    isYamlSpec: isYamlSpecExist,
    dataSourceParams: JSON.stringify(dataSourceParams, null, 2),
  };
  const compiledTemplate = _.template(template);
  const code = compiledTemplate(data);
  fs.writeFileSync(pluginEntryFile, code);
  console.info("success generate plugin:", pluginDir);
}

const plugins = [
  // ["Jira", "https://developer.atlassian.com/cloud/jira/platform/swagger-v3.v3.json"],
  [],
];

program
  .option("--post-man")
  .option("-n, --name <char>")
  .option("-i, --id [plugin id]")
  .option("--url [spec-download-url]");

program.parse();

const { name, url, postMan, pluginId } = program.opts();

console.info();
gen(name, url, pluginId);
console.info();

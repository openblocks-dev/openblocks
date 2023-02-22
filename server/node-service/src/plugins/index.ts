import { DataSourcePlugin, DataSourcePluginFactory } from "openblocks-sdk/dataSource";
import s3Plugin from "./s3";
import n8nPlugin from "./n8n";
import openApiPlugin from "./openApi";
import dynamoDBPlugin from "./dynamodb";
import firebasePlugin from "./firebase";
import couchdbPlugin from "./couchdb";
import wooCommercePlugin from "./woocommerce";
import openAiPlugin from "./openAi";
import athenaPlugin from "./athena";
import lambdaPlugin from "./lambda";
import googleCloudStorage from "./googleCloudStorage";

let plugins: (DataSourcePlugin | DataSourcePluginFactory)[] = [
  s3Plugin,
  openApiPlugin,
  n8nPlugin,
  dynamoDBPlugin,
  firebasePlugin,
  couchdbPlugin,
  wooCommercePlugin,
  openAiPlugin,
  athenaPlugin,
  lambdaPlugin,
  googleCloudStorage,
];

try {
  plugins = require("../ee/plugins").default;
  console.info("using ee plugins");
} catch {}

export default plugins;

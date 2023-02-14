import { DataSourcePlugin, DataSourcePluginFactory } from "openblocks-sdk/dataSource";
import helloWorldPlugin from "./hello-world";
import s3Plugin from "./s3";
import n8nPlugin from "./n8n";
import openApiPlugin from "./openApi";
import dynamoDBPlugin from "./dynamodb";
import firebasePlugin from "./firebase";
import couchdbPlugin from "./couchdb";
import woocommercePlugin from "./woocommerce";
import openAiPlugin from "./openAi";

const plugins: (DataSourcePlugin | DataSourcePluginFactory)[] = [
  // helloWorldPlugin,
  s3Plugin,
  openApiPlugin,
  n8nPlugin,
  dynamoDBPlugin,
  firebasePlugin,
  couchdbPlugin,
  woocommercePlugin,
  openAiPlugin,
];

export default plugins;

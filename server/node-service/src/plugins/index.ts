import { DataSourcePlugin, DataSourcePluginFactory } from "openblocks-sdk/dataSource";
import helloWorldPlugin from "./hello-world";
import s3Plugin from "./s3";
import n8nPlugin from "./n8n";
import openApiPlugin from "./openApi";
import dynamoDBPlugin from "./dynamodb";
import firebasePlugin from "./firebase";

const plugins: (DataSourcePlugin | DataSourcePluginFactory)[] = [
  // helloWorldPlugin,
  s3Plugin,
  openApiPlugin,
  n8nPlugin,
  dynamoDBPlugin,
  firebasePlugin,
];

export default plugins;

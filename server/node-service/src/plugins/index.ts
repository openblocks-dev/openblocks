import { DataSourcePlugin, DataSourcePluginFactory } from "openblocks-sdk/dataSource";
import helloWorldPlugin from "./hello-world";
import s3Plugin from "./s3";

const plugins: (DataSourcePlugin | DataSourcePluginFactory)[] = [
  // helloWorldPlugin,
  s3Plugin,
];

export default plugins;

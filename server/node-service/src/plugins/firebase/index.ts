import { DataSourcePlugin } from "openblocks-sdk/dataSource";
import dataSourceConfig, { DataSourceDataType } from "./dataSourceConfig";
import queryConfig, { ActionDataType } from "./queryConfig";
import { runFirebasePlugin } from "./run";

const firebasePlugin: DataSourcePlugin<ActionDataType, DataSourceDataType> = {
  id: "firebase",
  icon: "firebase.svg",
  name: "Firebase",
  category: "api",
  queryConfig,
  dataSourceConfig,
  run: function (actionData, dataSourceConfig): Promise<any> {
    return runFirebasePlugin(actionData, dataSourceConfig);
  },
};

export default firebasePlugin;

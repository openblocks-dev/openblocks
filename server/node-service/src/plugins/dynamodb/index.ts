import { DataSourcePlugin } from "openblocks-sdk/dataSource";
import dataSourceConfig, { DataSourceDataType } from "./dataSourceConfig";
import queryConfig, { ActionDataType } from "./queryConfig";
import { runDynamoDbQuery } from "./run";

const dynamoDBPlugin: DataSourcePlugin<ActionDataType, DataSourceDataType> = {
  id: "dynamodb",
  name: "DynamoDB",
  category: "database",
  icon: "dynamodb.svg",
  dataSourceConfig,
  queryConfig,
  run: async function (actionData, dataSourceConfig): Promise<any> {
    return runDynamoDbQuery(actionData, dataSourceConfig);
  },
};

export default dynamoDBPlugin;

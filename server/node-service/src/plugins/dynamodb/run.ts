import {
  CreateTableCommand,
  DynamoDBClient,
  ListTablesCommand,
  QueryCommand,
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  GetItemCommand,
} from "@aws-sdk/client-dynamodb";
//@ts-ignore
import { AttributeValue as attr } from "dynamodb-data-types";
import { badRequest } from "../../common/error";
import _ from "lodash";
import { DataSourceDataType } from "./dataSourceConfig";
import queryConfig, { ActionDataType } from "./queryConfig";

type ActionName = typeof queryConfig["actions"][number]["actionName"];

const commandMap: Record<ActionName, { new (params: any): any }> = {
  CreateTable: CreateTableCommand,
  ListTables: ListTablesCommand,
  Query: QueryCommand,
  Scan: ScanCommand,
  PutItem: PutItemCommand,
  GetItem: GetItemCommand,
  UpdateItem: UpdateItemCommand,
  DeleteItem: DeleteItemCommand,
};

interface DataWithTypeWrappedData {
  Item?: any;
  Items?: any[];
  Key?: any;
}

function processItems(res: DataWithTypeWrappedData, processor: (item: any) => any) {
  if (res.Key) {
    return _.update(res, "Key", processor);
  }
  if (res.Item) {
    return _.update(res, "Item", processor);
  }
  if (res.Items) {
    return _.update(res, "Items", (items) => items.map(processor));
  }
  return res;
}

export async function runDynamoDbQuery(
  actionData: ActionDataType,
  dataSourceConfig: DataSourceDataType
) {
  const { actionName, params } = actionData;
  const { region, endpointUrl, accessKey, secretKey } = dataSourceConfig;

  const client = new DynamoDBClient({
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
    region,
    endpoint: endpointUrl,
  });

  const Command = commandMap[actionName];
  if (!Command) {
    throw badRequest(`Unknown operation: ${actionName}`);
  }

  if (!_.isPlainObject(params)) {
    throw badRequest(`Parameters must be a plain object`);
  }

  let tableName = "";
  if ("tableName" in actionData) {
    tableName = actionData.tableName;
  }

  const res = await client.send(
    new Command({
      TableName: tableName,
      ...processItems(params, attr.wrap),
    })
  );
  return _.omit(processItems(res as DataWithTypeWrappedData, attr.unwrap), "$metadata");
}

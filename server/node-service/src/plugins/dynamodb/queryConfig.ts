import { ConfigToType } from "openblocks-sdk/dataSource";

const jsonParametersFieldConfig = (defaultValue: any) =>
  ({
    key: "params",
    label: "Parameters",
    type: "jsonInput",
    defaultValue: JSON.stringify(defaultValue, null, 4),
  } as const);

const tableNameFieldConfig = {
  label: "Table",
  key: "tableName",
  type: "textInput",
  placeholder: "users",
} as const;

const queryConfig = {
  type: "query",
  label: "Action",
  actions: [
    {
      actionName: "Query",
      label: "Query",
      params: [
        tableNameFieldConfig,
        jsonParametersFieldConfig({
          KeyConditionExpression: "id = :n",
          ExpressionAttributeValues: {
            ":n": { N: "1" },
          },
        }),
      ],
    },
    {
      actionName: "Scan",
      label: "Scan",
      params: [
        tableNameFieldConfig,
        jsonParametersFieldConfig({
          FilterExpression: "id > :n",
          ExpressionAttributeValues: {
            ":n": { N: "0" },
          },
        }),
      ],
    },
    {
      actionName: "PutItem",
      label: "Put item",
      params: [
        tableNameFieldConfig,
        jsonParametersFieldConfig({
          Item: {
            id: 1,
            name: "Alice",
          },
        }),
      ],
    },
    {
      actionName: "GetItem",
      label: "Get item",
      params: [
        tableNameFieldConfig,
        jsonParametersFieldConfig({
          Key: {
            id: 1,
          },
        }),
      ],
    },
    {
      actionName: "UpdateItem",
      label: "Update item",
      params: [
        tableNameFieldConfig,
        jsonParametersFieldConfig({
          Key: {
            id: 1,
          },
          UpdateExpression: "set age = :n",
          ExpressionAttributeValues: {
            ":n": {
              N: "18",
            },
          },
        }),
      ],
    },
    {
      actionName: "DeleteItem",
      label: "Delete item",
      params: [
        tableNameFieldConfig,
        jsonParametersFieldConfig({
          Key: {
            id: 1,
          },
        }),
      ],
    },
    {
      actionName: "ListTables",
      label: "List tables",
      params: [
        jsonParametersFieldConfig({
          Limit: 10,
        }),
      ],
    },
    {
      actionName: "CreateTable",
      label: "Create table",
      params: [
        jsonParametersFieldConfig({
          TableName: "users",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "N",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
          StreamSpecification: {
            StreamEnabled: false,
          },
        }),
      ],
    },
  ],
} as const;

export type ActionDataType = ConfigToType<typeof queryConfig>;

export default queryConfig;

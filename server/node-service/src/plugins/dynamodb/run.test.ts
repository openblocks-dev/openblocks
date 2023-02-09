import { DataSourceDataType } from "./dataSourceConfig";
import { ActionDataType } from "./queryConfig";
import { runDynamoDbQuery } from "./run";

test.skip("run dynamodb query", async () => {
  const dataSourceConfig: DataSourceDataType = {
    region: "hello",
    accessKey: "",
    secretKey: "",
    endpointUrl: "http://localhost:6789",
  };

  const createTableActionData: ActionDataType = {
    actionName: "CreateTable",
    params: {
      AttributeDefinitions: [
        {
          AttributeName: "Season", //ATTRIBUTE_NAME_1
          AttributeType: "N", //ATTRIBUTE_TYPE
        },
        {
          AttributeName: "Episode", //ATTRIBUTE_NAME_2
          AttributeType: "N", //ATTRIBUTE_TYPE
        },
      ],
      KeySchema: [
        {
          AttributeName: "Season", //ATTRIBUTE_NAME_1
          KeyType: "HASH",
        },
        {
          AttributeName: "Episode", //ATTRIBUTE_NAME_2
          KeyType: "RANGE",
        },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1,
      },
      TableName: "TEST_TABLE", //TABLE_NAME
      StreamSpecification: {
        StreamEnabled: false,
      },
    },
  } as any;
  // let res = await runDynamoDbQuery(createTableActionData, dataSourceConfig);
  // console.info(res);

  const listTableActionData: ActionDataType = {
    actionName: "ListTables",
    params: {},
  } as any;
  let res = await runDynamoDbQuery(listTableActionData, dataSourceConfig);
  console.info("listTables:", res);

  const queryActionData: ActionDataType = {
    actionName: "Query",
    params: {
      TableName: "TEST_TABLE",
      KeyConditionExpression: "Season = :s",
      ExpressionAttributeValues: {
        ":s": { N: "1" },
      },
    },
  } as any;
  res = await runDynamoDbQuery(queryActionData, dataSourceConfig);
  console.info("query:", res);

  const scanActionData: ActionDataType = {
    actionName: "Scan",
    params: {
      TableName: "TEST_TABLE",
      FilterExpression: "Season = :s",
      ExpressionAttributeValues: {
        ":s": { N: "1" },
      },
    },
  } as any;
  res = await runDynamoDbQuery(scanActionData, dataSourceConfig);
  console.info("scan:", res);

  const putItemActionData: ActionDataType = {
    actionName: "PutItem",
    params: {
      TableName: "TEST_TABLE",
      Item: {
        Season: {
          N: "1",
        },
        Episode: {
          N: "1",
        },
      },
    },
  } as any;
  res = await runDynamoDbQuery(putItemActionData, dataSourceConfig);
  console.info("put:", res);
});

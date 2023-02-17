import { DataSourcePlugin } from "openblocks-sdk/dataSource";
import dataSourceConfig, { DataSourceDataType } from "./dataSourceConfig";
import queryConfig, { ActionDataType } from "./queryConfig";
import {
  LambdaClient,
  ListFunctionsCommand,
  InvokeCommand,
  InvocationType,
} from "@aws-sdk/client-lambda";
import _ from "lodash";
import { safeJsonParse } from "../../common/util";

function getClient(dataSourceConfig: DataSourceDataType) {
  const { accessKey, secretKey, region } = dataSourceConfig;
  const client = new LambdaClient({
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey: secretKey,
    },
    region,
  });
  return client;
}

const lambdaPlugin: DataSourcePlugin<ActionDataType, DataSourceDataType> = {
  id: "lambda",
  name: "Lambda",
  category: "api",
  icon: "lambda.svg",
  dataSourceConfig,
  queryConfig,
  validateDataSourceConfig: async function (dataSourceConfig) {
    const client = getClient(dataSourceConfig);
    const ret = await client.send(new ListFunctionsCommand({ MaxItems: 1 }));
    return {
      success: Array.isArray(ret.Functions),
    };
  },
  run: async function (actionData, dataSourceConfig): Promise<any> {
    const client = getClient(dataSourceConfig);
    if (actionData.actionName === "ListFunctions") {
      const ret = await client.send(
        new ListFunctionsCommand({
          Marker: actionData.marker || undefined,
          MaxItems: actionData.limit,
        })
      );
      return {
        functions: ret.Functions?.map((i) => i.FunctionName) || [],
        nextMarker: ret.NextMarker || "",
      };
    }

    if (actionData.actionName === "InvokeFunction") {
      const ret = await client.send(
        new InvokeCommand({
          FunctionName: actionData.functionName,
          InvocationType: actionData.invocationType,
          Payload: Uint8Array.from(
            JSON.stringify(actionData.payload || {})
              .split("")
              .map((i) => i.charCodeAt(0))
          ),
        })
      );
      if (actionData.invocationType === InvocationType.RequestResponse) {
        return (ret.Payload && safeJsonParse(Buffer.from(ret.Payload).toString("utf-8"))) || {};
      }
      return {
        statusCode: ret.StatusCode,
      };
    }
  },
};

export default lambdaPlugin;

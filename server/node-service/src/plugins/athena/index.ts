import { DataSourcePlugin } from "openblocks-sdk/dataSource";
import dataSourceConfig, { DataSourceDataType } from "./dataSourceConfig";
import queryConfig, { ActionDataType } from "./queryConfig";
import {
  GetQueryExecutionCommandOutput,
  QueryExecutionState,
  ResultSet,
  AthenaClient,
  GetQueryExecutionCommand,
  GetQueryResultsCommand,
  StartQueryExecutionCommand,
} from "@aws-sdk/client-athena";
import _ from "lodash";
import { ServiceError } from "../../common/error";

function parseResultSet(resultSet?: ResultSet) {
  if (!resultSet) {
    return [];
  }
  const rows: any[] = [];
  const [header, ...data] = resultSet.Rows || [];
  const columns = header.Data?.map((i) => i.VarCharValue) || [];
  data?.forEach((row) => {
    const entries: [string, string][] = [];
    row.Data?.forEach((data, idx) => {
      const column = columns[idx];
      if (!column) {
        entries.push([`_col_${idx}`, data.VarCharValue || ""]);
      } else {
        entries.push([column, data.VarCharValue || ""]);
      }
    });
    rows.push(Object.fromEntries(entries));
  });
  return rows;
}

// fixme: should use the timeout config filled in frontend
const timeout = 1000 * 60; // 60s

const athenaPlugin: DataSourcePlugin<ActionDataType, DataSourceDataType> = {
  id: "athena",
  name: "Athena",
  category: "api",
  icon: "athena.svg",
  dataSourceConfig,
  queryConfig,
  run: async function (actionData, dataSourceConfig): Promise<any> {
    const { accessKey, secretKey, region } = dataSourceConfig;
    const client = new AthenaClient({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretKey,
      },
      region,
    });
    if (actionData.actionName === "Query") {
      const startRet = await client.send(
        new StartQueryExecutionCommand({
          QueryString: actionData.queryString,
          ResultConfiguration: {
            OutputLocation: dataSourceConfig.s3Location,
          },
        })
      );

      const start = Date.now();

      let execution: GetQueryExecutionCommandOutput | undefined = undefined;
      waitLoop: while (Date.now() - start < timeout) {
        execution = await client.send(
          new GetQueryExecutionCommand({ QueryExecutionId: startRet.QueryExecutionId })
        );
        const { State, StateChangeReason } = execution.QueryExecution?.Status || {};
        switch (State) {
          case QueryExecutionState.RUNNING:
          case QueryExecutionState.QUEUED:
            await new Promise((r) => setTimeout(r, 2000));
            break;
          case QueryExecutionState.CANCELLED:
          case QueryExecutionState.FAILED:
            throw new ServiceError(`query execution state: ${State}, reason: ${StateChangeReason}`);
          case QueryExecutionState.SUCCEEDED:
            break waitLoop;
        }
      }

      const result = await client.send(
        new GetQueryResultsCommand({ QueryExecutionId: startRet.QueryExecutionId })
      );

      return parseResultSet(result.ResultSet);
    }
  },
};

export default athenaPlugin;

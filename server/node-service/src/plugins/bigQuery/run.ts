import { DataSourceDataType } from "./dataSourceConfig";
import { ActionDataType } from "./queryConfig";
import { BigQuery } from "@google-cloud/bigquery";

function getClient(params: DataSourceDataType) {
  return new BigQuery({
    credentials: JSON.parse(params.privateKey),
    location: params.region,
  });
}

export async function validateDataSourceConfig(dataSourceConfig: DataSourceDataType) {
  try {
    const client = getClient(dataSourceConfig);
    await client.getDatasets();
    return {
      success: true,
    };
  } catch (e) {
    throw e;
  }
}

export default async function run(action: ActionDataType, dataSourceConfig: DataSourceDataType) {
  const client = getClient(dataSourceConfig);
  if (action.actionName === "Query") {
    const [results] = await client.query(action.googleSQL);
    return results;
  }
}

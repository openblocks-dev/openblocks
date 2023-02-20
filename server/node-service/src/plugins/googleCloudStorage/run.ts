import { Storage } from "@google-cloud/storage";
import { ServiceError } from "../../common/error";
import { DataSourceDataType } from "./dataSourceConfig";
import { ActionDataType } from "./queryConfig";

function getClient(params: DataSourceDataType) {
  return new Storage({
    credentials: JSON.parse(params.privateKey),
  });
}

function getBucket(actionConfig: ActionDataType, dataSourceConfig: DataSourceDataType) {
  if ("bucket" in actionConfig) {
    return actionConfig.bucket;
  }
  return "";
}

async function getFileSignedUrl(bucket: string, fileName: string, client: Storage) {
  const [url] = await client
    .bucket(bucket)
    .file(fileName)
    .getSignedUrl({
      version: "v2", // defaults to 'v2' if missing.
      action: "read",
      expires: Date.now() + 1000 * 60 * 5, // 5 minutes
    });
  return url;
}

export async function validateDataSourceConfig(dataSourceConfig: DataSourceDataType) {
  try {
    const client = getClient(dataSourceConfig);
    await client.getBuckets();
    return {
      success: true,
    };
  } catch (e) {
    throw e;
  }
}

export default async function run(action: ActionDataType, dataSourceConfig: DataSourceDataType) {
  const client = getClient(dataSourceConfig);
  const bucket = getBucket(action, dataSourceConfig);

  // list buckets
  if (action.actionName === "listBuckets") {
    const [buckets] = await client.getBuckets();
    return buckets.map((i) => i.name);
  }

  // list
  if (action.actionName === "listObjects") {
    if (!bucket) {
      throw new ServiceError("Bucket is required", 400);
    }
    const [results] = await client.bucket(bucket).getFiles({
      prefix: action.prefix,
      delimiter: action.delimiter,
      maxResults: action.limit,
    });
    const files = [];
    for (const i of results) {
      let signedUrl: string = "";
      if (action.returnSignedUrl) {
        signedUrl = await getFileSignedUrl(bucket, i.name, client);
      }
      files.push({
        name: i.name,
        size: i.metadata.size,
        lastModified: i.metadata.updated,
        signedUrl,
        url: i.publicUrl(),
      });
    }
    return files;
  }

  // read
  if (action.actionName === "readFile") {
    const encoding = (action.encoding || "base64") as BufferEncoding;
    const [file] = await client.bucket(bucket).file(action.fileName).get();
    const [buffer] = await file.download();
    const data = buffer.toString(encoding);
    return {
      data,
      contentType: file.metadata.contentType,
    };
  }

  // upload
  if (action.actionName === "uploadData") {
    const encoding = (action.encoding || "base64") as BufferEncoding;
    await client
      .bucket(bucket)
      .file(action.fileName)
      .save(Buffer.from(action.data, encoding), { contentType: action.contentType });

    let signedUrl: string = "";
    if (action.returnSignedUrl) {
      signedUrl = await getFileSignedUrl(bucket, action.fileName, client);
    }
    return {
      fileName: action.fileName,
      signedUrl,
    };
  }

  if (action.actionName === "deleteFile") {
    await client.bucket(bucket).file(action.fileName).delete();
    return {
      success: true,
    };
  }
}

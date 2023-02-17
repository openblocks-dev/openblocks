import {
  S3Client,
  GetObjectCommand,
  ListBucketsCommand,
  ListObjectsCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { ServiceError } from "../../common/error";
import { DataSourceDataType } from "./dataSourceConfig";
import { S3I18nTranslator } from "./i18n";
import { ActionDataType } from "./queryConfig";

function getClient(params: DataSourceDataType) {
  return new S3Client({
    region: params.region,
    endpoint: params.endpointUrl || undefined,
    credentials: {
      accessKeyId: params.accessKey,
      secretAccessKey: params.secretKey,
    },
  });
}

function getBucket(actionConfig: ActionDataType, dataSourceConfig: DataSourceDataType) {
  if ("bucket" in actionConfig) {
    return actionConfig.bucket;
  }
  return "";
}

function getFileUrl(dataSourceConfig: DataSourceDataType, bucket: string, fileKey?: string) {
  if (!fileKey) {
    return "";
  }
  if (dataSourceConfig.endpointUrl) {
    return `${dataSourceConfig.endpointUrl}/${bucket}/${fileKey}`;
  }
  return `https://s3.${dataSourceConfig.region}.amazonaws.com/${bucket}/${fileKey}`;
}

async function getFileSignedUrl(bucket: string, fileName: string, client: S3Client) {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: fileName,
  });
  return getSignedUrl(client, command, { expiresIn: 60 * 5 });
}

export async function validateDataSourceConfig(dataSourceConfig: DataSourceDataType) {
  try {
    const client = getClient(dataSourceConfig);
    await client.send(new ListBucketsCommand({}));
    return {
      success: true,
    };
  } catch (e) {
    if (e instanceof S3ServiceException) {
      return {
        success: false,
        message: e.message,
      };
    }
    throw e;
  }
}

export default async function run(
  action: ActionDataType,
  dataSourceConfig: DataSourceDataType,
  i18n: S3I18nTranslator
) {
  const client = getClient(dataSourceConfig);
  const bucket = getBucket(action, dataSourceConfig);

  // list buckets
  if (action.actionName === "listBuckets") {
    const res = await client.send(new ListBucketsCommand({}));
    return res.Buckets?.map((i) => ({
      name: i.Name,
    }));
  }

  // list
  if (action.actionName === "listObjects") {
    if (!bucket) {
      throw new ServiceError(i18n.trans("messages.bucketRequired"), 400);
    }
    const res = await client.send(
      new ListObjectsCommand({
        Prefix: action.prefix,
        Bucket: bucket,
        Delimiter: action.delimiter,
        MaxKeys: action.limit,
      })
    );
    const files = [];
    for (const i of res.Contents || []) {
      let signedUrl: string = "";
      if (action.returnSignedUrl && i.Key) {
        signedUrl = await getFileSignedUrl(bucket, i.Key, client);
      }
      files.push({
        name: i.Key || "",
        size: i.Size,
        lastModified: i.LastModified,
        signedUrl,
        url: getFileUrl(dataSourceConfig, bucket, i.Key),
      });
    }
    return files;
  }

  // read
  if (action.actionName === "readFile") {
    const res = await client.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: action.fileName,
      })
    );
    const data = (await res.Body?.transformToString(action.encoding || "base64")) || "";
    return {
      contentType: res.ContentType,
      length: res.ContentLength,
      lastModified: res.LastModified,
      data,
    };
  }

  // upload
  if (action.actionName === "uploadData") {
    await client.send(
      new PutObjectCommand({
        Body: Buffer.from(action.data, (action.encoding || "base64") as BufferEncoding),
        Bucket: bucket,
        Key: action.fileName,
        ContentType: action.contentType,
      })
    );

    let signedUrl: string = "";
    if (action.returnSignedUrl) {
      signedUrl = await getFileSignedUrl(bucket, action.fileName, client);
    }
    return {
      fileName: action.fileName,
      signedUrl,
      url: getFileUrl(dataSourceConfig, bucket, action.fileName),
    };
  }

  if (action.actionName === "deleteFile") {
    await client.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: action.fileName,
      })
    );
    return {
      success: true,
    };
  }
}

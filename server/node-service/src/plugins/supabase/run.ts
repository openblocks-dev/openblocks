import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { fetch } from "../../common/fetch";
import path from "path";
import { ServiceError } from "../../common/error";
import { DataSourceDataType } from "./dataSourceConfig";
import { ActionDataType } from "./queryConfig";

function getClient(params: DataSourceDataType) {
  return createClient(params.projectUrl, params.apiKey, {
    global: {
      fetch: fetch as any,
    },
  });
}

function getBucket(actionConfig: ActionDataType, dataSourceConfig: DataSourceDataType) {
  if ("bucket" in actionConfig) {
    return actionConfig.bucket;
  }
  return "";
}

const expiresIn = Date.now() + 1000 * 60 * 5; // 5 minutes

async function getFileSignedUrl(bucket: string, fileName: string, client: SupabaseClient) {
  const ret = await client.storage.from(bucket).createSignedUrl(fileName, expiresIn);
  if (ret.error) {
    throw ret.error;
  }
  return ret.data.signedUrl;
}

export async function validateDataSourceConfig(dataSourceConfig: DataSourceDataType) {
  try {
    const client = getClient(dataSourceConfig);
    const ret = await client.storage.listBuckets();
    return {
      success: !!ret.error,
      reason: ret.error?.message,
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
    const ret = await client.storage.listBuckets();
    if (ret.error) {
      throw ret.error;
    }
    return ret.data;
  }

  // list
  if (action.actionName === "listObjects") {
    if (!bucket) {
      throw new ServiceError("Bucket is required", 400);
    }
    const ret = await client.storage.from(bucket).list(action.path, {
      limit: action.limit,
      offset: action.offset,
      sortBy: action.sortBy,
    });
    if (ret.error) {
      throw ret.error;
    }
    const signedUrls: Record<string, string> = {};
    if (action.returnSignedUrl && ret.data.length > 0) {
      const signRet = await client.storage.from(bucket).createSignedUrls(
        ret.data.map((i) => path.join(action.path, i.name)),
        expiresIn
      );
      if (signRet.error) {
        throw signRet.error;
      }
      signRet.data.forEach((i) => {
        if (!i.path) {
          return;
        }
        signedUrls[i.path] = i.signedUrl;
      });
    }
    return (ret.data || []).map((i) => ({
      ...i,
      signedUrl: signedUrls[path.join(action.path, i.name)],
      url: client.storage.from(bucket).getPublicUrl(path.join(action.path, i.name)).data.publicUrl,
    }));
  }

  // read
  if (action.actionName === "readFile") {
    const encoding = (action.encoding || "base64") as BufferEncoding;
    const ret = await client.storage
      .from(bucket)
      .download(action.fileName, { transform: action.transform || undefined });
    if (ret.error) {
      throw ret.error;
    }
    const arrayBuffer = await ret.data.arrayBuffer();
    const data = Buffer.from(arrayBuffer).toString(encoding);
    return {
      data,
      type: ret.data.type,
    };
  }

  // upload
  if (action.actionName === "uploadData") {
    const encoding = (action.encoding || "base64") as BufferEncoding;
    const ret = await client.storage
      .from(bucket)
      .upload(action.fileName, Buffer.from(action.data, encoding), {
        contentType: action.contentType,
      });
    if (ret.error) {
      throw ret.error;
    }
    let signedUrl;
    if (action.returnSignedUrl) {
      signedUrl = await getFileSignedUrl(bucket, action.fileName, client);
    }
    return {
      ...ret.data,
      signedUrl,
    };
  }

  if (action.actionName === "deleteFile") {
    const ret = await client.storage.from(bucket).remove([action.fileName]);
    if (ret.error) {
      throw ret.error;
    }
    return {
      success: true,
    };
  }

  if (action.actionName === "createSignedUrl") {
    const signedUrl = await getFileSignedUrl(bucket, action.fileName, client);
    return {
      signedUrl,
    };
  }
}

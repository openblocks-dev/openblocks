import { ConfigToType, QueryConfig } from "openblocks-sdk/dataSource";

const bucketActionParam = {
  key: "bucket",
  type: "textInput",
  label: "Bucket",
} as const;

const returnSignedUrlParam = {
  key: "returnSignedUrl",
  type: "switch",
  label: "Return signed url",
  placeholder: "false",
} as const;

enum SupabaseCategory {
  Storage = "Firestore",
}

const categories = {
  label: "Service",
  items: [{ label: "Storage", value: SupabaseCategory.Storage }],
};

const queryConfig = {
  type: "query",
  categories,
  label: "Action",
  actions: [
    ...(
      [
        {
          actionName: "listBuckets",
          label: "List Buckets",
          params: [],
        },
        {
          actionName: "listObjects",
          label: "List Files",
          params: [
            bucketActionParam,
            {
              key: "path",
              type: "textInput",
              label: "Path",
            },
            {
              key: "search",
              type: "textInput",
              label: "Search",
            },
            {
              key: "limit",
              type: "numberInput",
              defaultValue: 10,
              label: "Limit",
            },
            {
              key: "offset",
              type: "numberInput",
              defaultValue: 0,
              label: "Offset",
            },
            {
              key: "sortBy",
              type: "jsonInput",
              defaultValue: JSON.stringify({ column: "name", order: "asc" }, null, 4),
              label: "Sort By",
            },
            returnSignedUrlParam,
          ],
        },
        {
          actionName: "readFile",
          label: "Read File",
          params: [
            bucketActionParam,
            {
              key: "fileName",
              type: "textInput",
              label: "File Name",
            },
            {
              key: "encoding",
              type: "select",
              label: "Data Type",
              options: [
                { label: "Base64", value: "base64" },
                { label: "Text", value: "utf8" },
              ],
            },
            {
              key: "transform",
              type: "jsonInput",
              label: "Transform",
              tooltip:
                "Transform the asset before serving it to the client, [more information](https://supabase.com/docs/reference/javascript/storage-from-download).",
            },
          ],
        },
        {
          actionName: "uploadData",
          label: "Upload File",
          params: [
            bucketActionParam,
            {
              key: "fileName",
              type: "textInput",
              label: "File Name",
            },
            {
              key: "encoding",
              type: "select",
              label: "Data Type",
              options: [
                { label: "Base64", value: "base64" },
                { label: "Text", value: "utf8" },
              ],
            },
            {
              key: "data",
              type: "textInput",
              label: "Data",
            },
            {
              key: "contentType",
              type: "textInput",
              label: "Content-Type",
              placeholder: "image/png",
            },
            returnSignedUrlParam,
          ],
        },
        {
          actionName: "deleteFile",
          label: "Delete File",
          params: [
            bucketActionParam,
            {
              key: "fileName",
              type: "textInput",
              label: "fileName",
            },
          ],
        },
        {
          actionName: "createSignedUrl",
          label: "Create Signed URL",
          params: [
            bucketActionParam,
            {
              key: "fileName",
              type: "textInput",
              label: "fileName",
            },
          ],
        },
      ] as const
    ).map((i) => ({ ...i, category: [SupabaseCategory.Storage] })),
  ],
} as const;

export type ActionDataType = ConfigToType<typeof queryConfig>;

export default queryConfig;

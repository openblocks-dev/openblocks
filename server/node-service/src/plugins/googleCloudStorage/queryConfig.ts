import { Config, ConfigToType, QueryConfig } from "openblocks-sdk/dataSource";

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

const queryConfig = {
  type: "query",
  label: "Action",
  actions: [
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
          key: "prefix",
          type: "textInput",
          label: "Prefix",
        },
        {
          key: "delimiter",
          type: "textInput",
          label: "Delimiter",
        },
        {
          key: "limit",
          type: "numberInput",
          defaultValue: 10,
          label: "Limit",
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
  ],
} as const;

export type ActionDataType = ConfigToType<typeof queryConfig>;

export default queryConfig;

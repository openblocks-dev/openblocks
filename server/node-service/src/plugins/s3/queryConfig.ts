import { ActionParamConfig, Config, ConfigToType, QueryConfig } from "openblocks-sdk/dataSource";
import { S3I18nTranslator } from "./i18n";

function getQueryConfig(i18n: S3I18nTranslator) {
  const bucketActionParam = {
    key: "bucket",
    type: "textInput",
    label: i18n.trans("bucket"),
  } as const;

  const returnSignedUrlParam = {
    key: "returnSignedUrl",
    type: "switch",
    label: i18n.trans("returnSignedUrl"),
    placeholder: "false",
  } as const;

  const queryConfig = {
    type: "query",
    label: i18n.trans("actions"),
    actions: [
      {
        actionName: "listBuckets",
        label: i18n.trans("actionName.listBuckets"),
        params: [],
      },
      {
        actionName: "listObjects",
        label: i18n.trans("actionName.listObjects"),
        params: [
          bucketActionParam,
          {
            key: "prefix",
            type: "textInput",
            label: i18n.trans("prefix"),
          },
          {
            key: "delimiter",
            type: "textInput",
            label: i18n.trans("delimiter"),
          },
          {
            key: "limit",
            type: "numberInput",
            defaultValue: 10,
            label: i18n.trans("limit"),
          },
          returnSignedUrlParam,
        ],
      },
      {
        actionName: "readFile",
        label: i18n.trans("actionName.readFile"),
        params: [
          bucketActionParam,
          {
            key: "fileName",
            type: "textInput",
            label: i18n.trans("fileName"),
          },
          {
            key: "encoding",
            type: "select",
            label: i18n.trans("dataType"),
            options: [
              { label: "Base64", value: "base64" },
              { label: "Text", value: "utf8" },
            ],
          },
        ],
      },
      {
        actionName: "uploadData",
        label: i18n.trans("actionName.uploadFile"),
        params: [
          bucketActionParam,
          {
            key: "fileName",
            type: "textInput",
            label: i18n.trans("fileName"),
          },
          {
            key: "encoding",
            type: "select",
            label: i18n.trans("dataType"),
            options: [
              { label: "Base64", value: "base64" },
              { label: "Text", value: "utf8" },
            ],
          },
          {
            key: "data",
            type: "textInput",
            label: i18n.trans("data"),
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
        label: i18n.trans("actionName.deleteFile"),
        params: [
          bucketActionParam,
          {
            key: "fileName",
            type: "textInput",
            label: i18n.trans("fileName"),
          },
        ],
      },
    ],
  } as const;
  return queryConfig;
}

export type ActionDataType = ConfigToType<ReturnType<typeof getQueryConfig>>;

export default getQueryConfig;

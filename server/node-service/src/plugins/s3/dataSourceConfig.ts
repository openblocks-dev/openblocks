import { ConfigToType } from "openblocks-sdk/dataSource";
import { S3I18nTranslator } from "./i18n";

const getDataSourceConfig = (i18n: S3I18nTranslator) => {
  const dataSourceConfig = {
    type: "dataSource",
    params: [
      {
        key: "accessKey",
        label: "Access key ID",
        type: "textInput",
        placeholder: "<Your Access key ID>",
        rules: [{ required: true, message: i18n.trans("akRequiredMessage") }],
      },
      {
        key: "secretKey",
        label: "Secret key",
        type: "password",
        rules: [{ required: true, message: i18n.trans("skRequiredMessage") }],
      },
      {
        key: "endpointUrl",
        label: "Endpoint URL",
        type: "textInput",
        tooltip: i18n.trans("endpointUrlTooltip"),
      },
      {
        key: "region",
        type: "textInput",
        label: i18n.trans("region"),
        defaultValue: "us-west-1",
      },
    ],
  } as const;
  return dataSourceConfig;
};

export default getDataSourceConfig;

export type DataSourceDataType = ConfigToType<ReturnType<typeof getDataSourceConfig>>;

import { ConfigToType } from "openblocks-sdk/dataSource";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      key: "accessKey",
      label: "Access key ID",
      type: "textInput",
      placeholder: "<Your Access key ID>",
      rules: [{ required: true, message: "Please input the Access Key ID" }],
    },
    {
      key: "secretKey",
      label: "Secret key",
      type: "password",
      rules: [{ required: true, message: "Please input the Secret Key" }],
    },
    {
      key: "endpointUrl",
      label: "Endpoint URL",
      type: "textInput",
    },
    {
      key: "region",
      type: "textInput",
      label: "Region",
      defaultValue: "us-west-1",
    },
  ],
} as const;

export default dataSourceConfig;

export type DataSourceDataType = ConfigToType<typeof dataSourceConfig>;

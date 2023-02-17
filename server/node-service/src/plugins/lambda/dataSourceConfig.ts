import { ConfigToType } from "openblocks-sdk/dataSource";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      key: "region",
      type: "textInput",
      label: "Region",
      rules: [{ required: true, message: "Please input the AWS Region" }],
      defaultValue: "us-west-1",
    },
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
  ],
} as const;

export default dataSourceConfig;

export type DataSourceDataType = ConfigToType<typeof dataSourceConfig>;

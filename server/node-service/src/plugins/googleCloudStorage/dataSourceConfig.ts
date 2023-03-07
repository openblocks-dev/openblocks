import { ConfigToType } from "openblocks-sdk/dataSource";

export const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      key: "privateKey",
      label: "Private Key",
      type: "password",
      tooltip:
        "The private key associated with a Service Account with GCS privileges, [Documentation](https://cloud.google.com/iam/docs/service-accounts) for service accounts.",
      rules: [
        { required: true, message: "Please input your private key of google Service Account" },
      ],
    },
    {
      key: "region",
      type: "textInput",
      label: "Region",
    },
  ],
} as const;

export type DataSourceDataType = ConfigToType<typeof dataSourceConfig>;


import { ConfigToType } from "openblocks-sdk/dataSource";

export const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      key: "webhookURL",
      label: "Webhook URL",
      type: "password",
      tooltip: "[Documentation](https://my.slack.com/apps/new/A0F7XDUAZ-incoming-webhooks)",
      rules: [{ required: true, message: "Please input your webhook URL" }],
    },
  ],
} as const;

export type DataSourceDataType = ConfigToType<typeof dataSourceConfig>;

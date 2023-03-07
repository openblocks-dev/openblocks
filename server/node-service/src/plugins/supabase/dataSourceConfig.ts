import { ConfigToType } from "openblocks-sdk/dataSource";

export const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "textInput",
      key: "projectUrl",
      label: "Project URL",
      rules: [{ required: true }],
    },
    {
      type: "password",
      key: "apiKey",
      label: "Api Key",
    },
  ],
} as const;

export type DataSourceDataType = ConfigToType<typeof dataSourceConfig>;

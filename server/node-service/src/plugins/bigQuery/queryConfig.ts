import { ConfigToType } from "openblocks-sdk/dataSource";

const queryConfig = {
  type: "query",
  label: "Action",
  actions: [
    {
      actionName: "Query",
      label: "Query",
      params: [
        {
          label: "Google SQL",
          key: "googleSQL",
          type: "sqlInput",
        },
      ],
    },
  ],
} as const;

export type ActionDataType = ConfigToType<typeof queryConfig>;

export default queryConfig;

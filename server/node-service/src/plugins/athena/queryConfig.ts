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
          label: "Query String",
          key: "queryString",
          type: "sqlInput",
        },
      ],
    },
  ],
} as const;

export type ActionDataType = ConfigToType<typeof queryConfig>;

export default queryConfig;

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
          label: "Message",
          key: "message",
          type: "jsonInput",
        },
        {
          label: "Channel",
          key: "channel",
          type: "textInput",
        },
      ],
    },
  ],
} as const;

export type ActionDataType = ConfigToType<typeof queryConfig>;

export default queryConfig;

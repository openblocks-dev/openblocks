import { ConfigToType } from "openblocks-sdk/dataSource";
import { InvocationType } from "@aws-sdk/client-lambda";

const queryConfig = {
  type: "query",
  label: "Action",
  actions: [
    {
      actionName: "InvokeFunction",
      label: "Invoke Function",
      params: [
        {
          label: "Function Name",
          key: "functionName",
          type: "textInput",
        },
        {
          label: "Payload",
          key: "payload",
          type: "jsonInput",
          defaultValue: JSON.stringify({}),
        },
        {
          label: "Invocation Type",
          key: "invocationType",
          type: "select",
          options: [
            {
              value: InvocationType.RequestResponse,
              label: "RequestResponse",
            },
            {
              value: InvocationType.Event,
              label: "Event",
            },
            {
              value: InvocationType.DryRun,
              label: "DryRun",
            },
          ],
        },
      ],
    },
    {
      actionName: "ListFunctions",
      label: "List Functions",
      params: [
        {
          label: "Limit",
          key: "limit",
          type: "numberInput",
          defaultValue: 50,
          tooltip:
            "The maximum number of functions to return in the response. This returns a maximum of 50 items, even if you set the number higher.",
        },
        {
          label: "Marker",
          key: "marker",
          type: "textInput",
          tooltip:
            "Specify the pagination token that's returned by a previous request to retrieve the next page of results.",
        },
      ],
    },
  ],
} as const;

export type ActionDataType = ConfigToType<typeof queryConfig>;

export default queryConfig;

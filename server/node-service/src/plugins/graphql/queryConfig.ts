export const graphQLQueryConfig = {
  type: "query",
  label: "Action",
  actions: [
    {
      label: "Query",
      actionName: "query",
      params: [
        {
          type: "graphqlInput",
          label: "Query",
          key: "query",
        },
        {
          type: "keyValueInput",
          label: "Variables",
          key: "variables",
          valueType: "json",
        },
        {
          type: "keyValueInput",
          label: "Headers",
          key: "headers",
          valueType: "string",
        },
      ],
    },
  ],
} as const;

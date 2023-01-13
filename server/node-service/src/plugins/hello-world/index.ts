import { DataSourcePlugin, ConfigToType } from "openblocks-sdk/dataSource";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    { key: "username", label: "Username", type: "textInput" },
    { key: "password", label: "Password", type: "password" },
    {
      key: "gender",
      label: "Boy or Girl",
      type: "select",
      options: [
        { label: "Boy", value: "boy" },
        { label: "Girl", value: "girl" },
      ],
    },
    { key: "isOver18", label: "Over 18 years old?", type: "checkbox" },
  ],
} as const;

const queryConfig = {
  type: "query",
  label: "Actions",
  tooltip: "Please select a action",
  actions: [
    {
      actionName: "add",
      label: "Add two numbers",
      params: [
        {
          key: "num1",
          type: "numberInput",
          label: "Number1",
          tooltip: "The first number",
          placeholder: "Please input the first number",
        },
        {
          key: "num2",
          type: "numberInput",
          label: "Number2",
          placeholder: "Please input the second number",
        },
      ],
    },
    {
      actionName: "join",
      label: "Join name and age",
      params: [
        { key: "name", type: "textInput", label: "Name", placeholder: "Please input your name" },
        { key: "age", type: "numberInput", label: "Age", placeholder: "Please input your age" },
        {
          key: "isFat",
          type: "booleanInput",
          label: "Fat?",
          placeholder: "Do you think you are fat?",
        },
      ],
    },
  ],
} as const;

const demoPlugin: DataSourcePlugin<
  ConfigToType<typeof queryConfig>,
  ConfigToType<typeof dataSourceConfig>
> = {
  id: "hello_world",
  name: "Hello World",
  category: "database",
  description: "This is a demo data source plugin",
  dataSourceConfig,
  queryConfig,
  run: async (action, dataSourceConfig) => {
    if (action.actionName === "add") {
      return action.num1 + action.num2;
    }
    if (action.actionName === "join") {
      return `${dataSourceConfig.username}@${dataSourceConfig.password}:${action.name}(${action.age})`;
    }
  },
};

export default demoPlugin;

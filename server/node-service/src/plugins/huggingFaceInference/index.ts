import _ from "lodash";
import { ConfigToType, DataSourcePlugin } from "openblocks-sdk/dataSource";

const dataSourceConfig = {
  type: "dataSource",
  params: [
    {
      type: "password",
      key: "token",
      label: "Access Token",
      rules: [{ required: true }],
      tooltip:
        "You can get an Access Token [in your profile setting page](https://huggingface.co/settings/tokens)",
    },
  ],
} as const;

const queryConfig = {
  type: "query",
  label: "Action",
  actions: [
    {
      actionName: "InvokeInferenceApi",
      category: "inferenceApi",
      label: "Inference API",
      params: [
        {
          key: "model",
          label: "Model Name",
          type: "textInput",
          placeholder: "deepset/roberta-base-squad2",
        },
        {
          key: "body",
          label: "Body",
          type: "jsonInput",
          defaultValue: JSON.stringify({ inputs: "" }, null, 4),
          tooltip:
            "Learn more about [Detailed Parameters](https://huggingface.co/docs/api-inference/detailed_parameters) of Hugging Face",
        },
      ],
    },
  ],
} as const;

type DataSourceConfigType = ConfigToType<typeof dataSourceConfig>;
type ActionConfigType = ConfigToType<typeof queryConfig>;

const huggingFaceInferencePlugin: DataSourcePlugin<ActionConfigType, DataSourceConfigType> = {
  id: "huggingFaceInference",
  name: "Hugging Face Inference",
  icon: "huggingFace.svg",
  category: "api",
  dataSourceConfig,
  queryConfig,
  run: async (actionData, dataSourceConfig) => {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${actionData.model}`,
      {
        headers: { Authorization: `Bearer ${dataSourceConfig.token}` },
        method: "POST",
        body: JSON.stringify(actionData.body),
      }
    );
    return response.json();
  },
};

export default huggingFaceInferencePlugin;

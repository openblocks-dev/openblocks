import { withMethodExposing } from "../generators/withMethodExposing";
import { simpleMultiComp } from "../generators";
import { withExposingConfigs } from "../generators/withExposing";
import { message } from "antd";
import { EvalParamType, ParamsConfig } from "../controls/actionSelector/executeCompTypes";
import { JSONObject } from "../../util/jsonTypes";
import { trans } from "i18n";

const params: ParamsConfig = [
  { name: "text", type: "string" },
  { name: "options", type: "JSON" },
];

const showMessage = (params: EvalParamType[], level: "info" | "success" | "warn" | "error") => {
  const text = params?.[0];
  const options = params?.[1] as JSONObject;
  const duration = options?.["duration"] ?? 3;
  text && message[level](text, duration as number);
};

const MessageCompBase = simpleMultiComp({});

export let MessageComp = withExposingConfigs(MessageCompBase, []);

MessageComp = withMethodExposing(MessageComp, [
  {
    method: { name: "info", description: trans("messageComp.info"), params: params },
    execute: (comp, params) => {
      showMessage(params, "info");
    },
  },
  {
    method: { name: "success", description: trans("messageComp.success"), params: params },
    execute: (comp, params) => {
      showMessage(params, "success");
    },
  },
  {
    method: { name: "warn", description: trans("messageComp.warn"), params: params },
    execute: (comp, params) => {
      showMessage(params, "warn");
    },
  },
  {
    method: { name: "error", description: trans("messageComp.error"), params: params },
    execute: (comp, params) => {
      showMessage(params, "error");
    },
  },
]);

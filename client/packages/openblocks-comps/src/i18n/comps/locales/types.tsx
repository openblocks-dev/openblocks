import { JSONObject } from "openblocks-sdk";
import { XAXisComponentOption } from "echarts";

export type I18nObjects = {
  defaultDataSource: JSONObject[];
  defaultEchartsJsonOption: Record<string, unknown>;
  timeXAxisLabel?: XAXisComponentOption["axisLabel"];
  imageEditorLocale?: Record<string, string>;
};

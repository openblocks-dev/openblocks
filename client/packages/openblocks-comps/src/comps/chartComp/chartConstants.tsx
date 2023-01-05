import { jsonControl, JSONObject, stateComp, toJSONObjectArray, toObject } from "openblocks-sdk";
import { StringControl } from "openblocks-sdk";
import { dropdownControl } from "openblocks-sdk";
import { eventHandlerControl } from "openblocks-sdk";
import { valueComp, withType } from "openblocks-sdk";
import { ValueFromOption } from "openblocks-sdk";
import { uiChildren } from "openblocks-sdk";
import { RecordConstructorToComp, RecordConstructorToView } from "openblocks-core";
import { BarChartConfig } from "./chartConfigs/barChartConfig";
import { XAxisConfig, YAxisConfig } from "./chartConfigs/cartesianAxisConfig";
import { LegendConfig } from "./chartConfigs/legendConfig";
import { LineChartConfig } from "./chartConfigs/lineChartConfig";
import { PieChartConfig } from "./chartConfigs/pieChartConfig";
import { ScatterChartConfig } from "./chartConfigs/scatterChartConfig";
import { SeriesListComp } from "./seriesComp";
import { EChartsOption } from "echarts";
import { i18nObjs, trans } from "i18n/comps";
import { JSONValue } from "openblocks";

export const ChartTypeOptions = [
  {
    label: trans("chart.bar"),
    value: "bar",
  },
  {
    label: trans("chart.line"),
    value: "line",
  },
  {
    label: trans("chart.scatter"),
    value: "scatter",
  },
  {
    label: trans("chart.pie"),
    value: "pie",
  },
] as const;

const chartModeOptions = [
  {
    label: trans("chart.UIMode"),
    value: "ui",
  },
  {
    label: "ECharts JSON",
    value: "json",
  },
] as const;

export const EventOptions = [
  {
    label: trans("chart.select"),
    value: "select",
    description: trans("chart.selectDesc"),
  },

  {
    label: trans("chart.unSelect"),
    value: "unselect",
    description: trans("chart.unselectDesc"),
  },
] as const;

export const XAxisDirectionOptions = [
  {
    label: trans("chart.horizontal"),
    value: "horizontal",
  },
  {
    label: trans("chart.vertical"),
    value: "vertical",
  },
] as const;

export type XAxisDirectionType = ValueFromOption<typeof XAxisDirectionOptions>;

export const noDataAxisConfig = {
  animation: false,
  xAxis: {
    type: "category",
    name: trans("chart.noData"),
    nameLocation: "middle",
    data: [],
    axisLine: {
      lineStyle: {
        color: "#8B8FA3",
      },
    },
  },
  yAxis: {
    type: "value",
    axisLabel: {
      color: "#8B8FA3",
    },
    splitLine: {
      lineStyle: {
        color: "#F0F0F0",
      },
    },
  },
  tooltip: {
    show: false,
  },
  series: [
    {
      data: [700],
      type: "line",
      itemStyle: {
        opacity: 0,
      },
    },
  ],
} as EChartsOption;

export const noDataPieChartConfig = {
  animation: false,
  tooltip: {
    show: false,
  },
  legend: {
    formatter: trans("chart.unknown"),
    top: "bottom",
    selectedMode: false,
  },
  color: ["#B8BBCC", "#CED0D9", "#DCDEE6", "#E6E6EB"],
  series: [
    {
      type: "pie",
      radius: "35%",
      center: ["25%", "50%"],
      silent: true,
      label: {
        show: false,
      },
      data: [
        {
          name: "1",
          value: 70,
        },
        {
          name: "2",
          value: 68,
        },
        {
          name: "3",
          value: 48,
        },
        {
          name: "4",
          value: 40,
        },
      ],
    },
    {
      type: "pie",
      radius: "35%",
      center: ["75%", "50%"],
      silent: true,
      label: {
        show: false,
      },
      data: [
        {
          name: "1",
          value: 70,
        },
        {
          name: "2",
          value: 68,
        },
        {
          name: "3",
          value: 48,
        },
        {
          name: "4",
          value: 40,
        },
      ],
    },
  ],
} as EChartsOption;

export type ChartSize = { w: number; h: number };

export const getDataKeys = (data: Array<JSONObject>) => {
  if (!data) {
    return [];
  }
  const dataKeys: Array<string> = [];
  data.slice(0, 50).forEach((d) => {
    Object.keys(d).forEach((key) => {
      if (!dataKeys.includes(key)) {
        dataKeys.push(key);
      }
    });
  });
  return dataKeys;
};

const ChartOptionMap = {
  bar: BarChartConfig,
  line: LineChartConfig,
  pie: PieChartConfig,
  scatter: ScatterChartConfig,
};

const ChartOptionComp = withType(ChartOptionMap, "bar");
export type CharOptionCompType = keyof typeof ChartOptionMap;

export const chartUiModeChildren = {
  title: StringControl,
  data: jsonControl(toJSONObjectArray, i18nObjs.defaultDataSource),
  xAxisKey: valueComp<string>(""), // x-axis, key from data
  xAxisDirection: dropdownControl(XAxisDirectionOptions, "horizontal"),
  series: SeriesListComp,
  xConfig: XAxisConfig,
  yConfig: YAxisConfig,
  legendConfig: LegendConfig,
  onEvent: eventHandlerControl(EventOptions),
  chartConfig: ChartOptionComp,
};

export const chartChildrenMap = {
  mode: dropdownControl(chartModeOptions, "ui"),
  echartsOption: jsonControl(toObject, i18nObjs.defaultEchartsJsonOption),
  selectedPoints: stateComp<
    Array<{
      seriesName: string;
      // coordinate chart
      x?: any;
      y?: any;
      // pie or funnel
      itemName?: any;
      value?: any;
    }>
  >([]),
  ...chartUiModeChildren,
};

const chartUiChildrenMap = uiChildren(chartChildrenMap);
export type ChartCompPropsType = RecordConstructorToView<typeof chartUiChildrenMap>;
export type ChartCompChildrenType = RecordConstructorToComp<typeof chartUiChildrenMap>;

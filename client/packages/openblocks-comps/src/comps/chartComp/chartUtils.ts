import {
  CharOptionCompType,
  ChartCompPropsType,
  ChartSize,
  noDataAxisConfig,
  noDataPieChartConfig,
} from "comps/chartComp/chartConstants";
import { getPieRadiusAndCenter } from "comps/chartComp/chartConfigs/pieChartConfig";
import { EChartsOption } from "echarts";
import _ from "lodash";
import { chartColorPalette, isNumeric, JSONObject } from "openblocks-sdk";
import { calcXYConfig } from "comps/chartComp/chartConfigs/cartesianAxisConfig";
import Big from "big.js";

export function transformData(
  originData: JSONObject[],
  xAxis: string,
  seriesColumnNames: string[]
) {
  // aggregate data by x-axis
  const transformedData: JSONObject[] = [];
  originData.reduce((prev, cur) => {
    if (cur === null || cur === undefined) {
      return prev;
    }
    const groupValue = cur[xAxis] as string;
    if (!prev[groupValue]) {
      // init as 0
      const initValue: any = {};
      seriesColumnNames.forEach((name) => {
        initValue[name] = 0;
      });
      prev[groupValue] = initValue;
      transformedData.push(prev[groupValue]);
    }
    // remain the x-axis data
    prev[groupValue][xAxis] = groupValue;
    seriesColumnNames.forEach((key) => {
      if (key === xAxis) {
        return;
      } else if (isNumeric(cur[key])) {
        const bigNum = Big(cur[key]);
        prev[groupValue][key] = bigNum.add(prev[groupValue][key]).toNumber();
      } else {
        prev[groupValue][key] += 1;
      }
    });
    return prev;
  }, {} as any);
  return transformedData;
}

const notAxisChartSet: Set<CharOptionCompType> = new Set(["pie"] as const);
export const echartsConfigOmitChildren = ["hidden", "selectedPoints", "onEvent"] as const;
type EchartsConfigProps = Omit<ChartCompPropsType, typeof echartsConfigOmitChildren[number]>;

export function isAxisChart(type: CharOptionCompType) {
  return !notAxisChartSet.has(type);
}

export function getSeriesConfig(props: EchartsConfigProps) {
  const visibleSeries = props.series.filter((s) => !s.getView().hide);
  const seriesLength = visibleSeries.length;
  return visibleSeries.map((s, index) => {
    if (isAxisChart(props.chartConfig.type)) {
      let encodeX: string, encodeY: string;
      const horizontalX = props.xAxisDirection === "horizontal";
      let itemStyle = props.chartConfig.itemStyle;
      // FIXME: need refactor... chartConfig returns a function with paramters
      if (props.chartConfig.type === "bar") {
        // barChart's border radius, depend on x-axis direction and stack state
        const borderRadius = horizontalX ? [2, 2, 0, 0] : [0, 2, 2, 0];
        if (props.chartConfig.stack && index === visibleSeries.length - 1) {
          itemStyle = { ...itemStyle, borderRadius: borderRadius };
        } else if (!props.chartConfig.stack) {
          itemStyle = { ...itemStyle, borderRadius: borderRadius };
        }
      }
      if (horizontalX) {
        encodeX = props.xAxisKey;
        encodeY = s.getView().columnName;
      } else {
        encodeX = s.getView().columnName;
        encodeY = props.xAxisKey;
      }
      return {
        name: s.getView().seriesName,
        selectedMode: "single",
        select: {
          itemStyle: {
            borderColor: "#000",
          },
        },
        encode: {
          x: encodeX,
          y: encodeY,
        },
        // each type of chart's config
        ...props.chartConfig,
        itemStyle: itemStyle,
        label: {
          ...props.chartConfig.label,
          ...(!horizontalX && { position: "outside" }),
        },
      };
    } else {
      // pie
      const radiusAndCenter = getPieRadiusAndCenter(seriesLength, index, props.chartConfig);
      return {
        ...props.chartConfig,
        radius: radiusAndCenter.radius,
        center: radiusAndCenter.center,
        name: s.getView().seriesName,
        selectedMode: "single",
        encode: {
          itemName: props.xAxisKey,
          value: s.getView().columnName,
        },
      };
    }
  });
}

// https://echarts.apache.org/en/option.html
export function getEchartsConfig(props: EchartsConfigProps, chartSize?: ChartSize): EChartsOption {
  if (props.mode === "json") {
    return props.echartsOption ? props.echartsOption : {};
  }
  // axisChart
  const axisChart = isAxisChart(props.chartConfig.type);
  const gridPos = {
    left: 20,
    right: props.legendConfig.left === "right" ? "10%" : 20,
    top: 50,
    bottom: 35,
  };
  let config: EChartsOption = {
    title: { text: props.title, left: "center" },
    tooltip: {
      confine: true,
      trigger: axisChart ? "axis" : "item",
    },
    legend: props.legendConfig,
    grid: {
      ...gridPos,
      containLabel: true,
    },
  };
  if (props.data.length <= 0) {
    // no data
    return {
      ...config,
      ...(axisChart ? noDataAxisConfig : noDataPieChartConfig),
    };
  }
  const yAxisConfig = props.yConfig();
  const seriesColumnNames = props.series
    .filter((s) => !s.getView().hide)
    .map((s) => s.getView().columnName);
  // y-axis is category and time, data doesn't need to aggregate
  const transformedData =
    yAxisConfig.type === "category" || yAxisConfig.type === "time"
      ? props.data
      : transformData(props.data, props.xAxisKey, seriesColumnNames);
  config = {
    ...config,
    dataset: [
      {
        source: transformedData,
        sourceHeader: false,
      },
    ],
    series: getSeriesConfig(props),
  };
  if (axisChart) {
    // pure chart's size except the margin around
    let chartRealSize;
    if (chartSize) {
      const rightSize =
        typeof gridPos.right === "number"
          ? gridPos.right
          : (chartSize.w * parseFloat(gridPos.right)) / 100.0;
      chartRealSize = {
        // actually it's self-adaptive with the x-axis label on the left, not that accurate but work
        w: chartSize.w - gridPos.left - rightSize,
        // also self-adaptive on the bottom
        h: chartSize.h - gridPos.top - gridPos.bottom,
        right: rightSize,
      };
    }
    const finalXyConfig = calcXYConfig(
      props.xConfig,
      yAxisConfig,
      props.xAxisDirection,
      transformedData.map((d) => d[props.xAxisKey]),
      chartRealSize
    );
    config = {
      ...config,
      // @ts-ignore
      xAxis: finalXyConfig.xConfig,
      // @ts-ignore
      yAxis: finalXyConfig.yConfig,
    };
  }
  // log.log("Echarts transformedData and config", transformedData, config);
  return config;
}

export function getSelectedPoints(param: any, option: any) {
  const series = option.series;
  const dataSource = _.isArray(option.dataset) && option.dataset[0]?.source;
  if (series && dataSource) {
    return param.selected.flatMap((selectInfo: any) => {
      const seriesInfo = series[selectInfo.seriesIndex];
      if (!seriesInfo || !seriesInfo.encode) {
        return [];
      }
      return selectInfo.dataIndex.map((index: any) => {
        const commonResult = {
          seriesName: seriesInfo.name,
        };
        if (seriesInfo.encode.itemName && seriesInfo.encode.value) {
          return {
            ...commonResult,
            itemName: dataSource[index][seriesInfo.encode.itemName],
            value: dataSource[index][seriesInfo.encode.value],
          };
        } else {
          return {
            ...commonResult,
            x: dataSource[index][seriesInfo.encode.x],
            y: dataSource[index][seriesInfo.encode.y],
          };
        }
      });
    });
  }
  return [];
}

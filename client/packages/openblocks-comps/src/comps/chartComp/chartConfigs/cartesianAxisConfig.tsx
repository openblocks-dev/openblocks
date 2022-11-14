import { XAXisComponentOption, YAXisComponentOption } from "echarts";
import { ChartSize, XAxisDirectionType } from "../chartConstants";
import { i18n } from "openblocks-core";
import {
  MultiCompBuilder,
  withContext,
  NumberControl,
  StringControl,
  dropdownControl,
  JSONValue,
  isNumeric,
} from "openblocks-sdk";
import { i18nObjs, trans } from "i18n/comps";
import _, { isNil } from "lodash";
import { xAxisTypeUrl } from "./chartUrls";

const XAxisTypeOptions = [
  {
    label: trans("chart.auto"),
    value: "default",
  },
  {
    label: trans("chart.categoryAxis"),
    value: "category",
  },
  {
    label: trans("chart.valueAxis"),
    value: "value",
  },
  {
    label: trans("chart.timeAxis"),
    value: "time",
  },
  {
    label: trans("chart.logAxis"),
    value: "log",
  },
] as const;

const YAxisTypeOptions = [
  {
    label: trans("chart.valueAxis"),
    value: "value",
  },
  {
    label: trans("chart.categoryAxis"),
    value: "category",
  },
  {
    label: trans("chart.timeAxis"),
    value: "time",
  },
  {
    label: trans("chart.logAxis"),
    value: "log",
  },
] as const;

export type EchartsAxisType = "category" | "value" | "time" | "log";

const axisCommonMap = {
  axisName: StringControl,
  logBase: NumberControl,
};

export const AxisFormatterComp = withContext(
  new MultiCompBuilder({ value: StringControl }, (props) => props.value)
    .setPropertyViewFn((children) =>
      children.value.propertyView({
        label: trans("chart.yAxisDataFormat"),
        placeholder: "{{value}}",
        tooltip: trans("chart.yAxisDataFormatTooltip"),
      })
    )
    .build(),
  ["value"] as const
);

export const XAxisConfig = (function () {
  return new MultiCompBuilder(
    {
      ...axisCommonMap,
      type: dropdownControl(XAxisTypeOptions, "default"),
    },
    (props): XAXisComponentOption => {
      const config: XAXisComponentOption = {
        name: props.axisName,
        nameGap: 22,
        // @ts-ignore
        nameLocation: "middle",
      };
      if (props.type !== "default") {
        // don't assign value for default value, compute it in the end
        config.type = props.type;
      }
      return config;
    }
  )
    .setPropertyViewFn((children) => (
      <>
        {children.axisName.propertyView({
          label: trans("chart.xAxisName"),
        })}
        {children.type.propertyView({
          label: trans("chart.xAxisType"),
          tooltip: (
            <>
              {trans("chart.xAxisTypeTooltip")}
              <a href={xAxisTypeUrl} target="_blank" rel="noreferrer">
                {trans("chart.xAxisType")}
              </a>
            </>
          ),
        })}
        {children.type.getView() === "log" &&
          children.logBase.propertyView({
            label: trans("chart.logBase"),
          })}
      </>
    ))
    .build();
})();

export const YAxisConfig = (function () {
  return new MultiCompBuilder(
    {
      ...axisCommonMap,
      // the old data has "type" field with default value "category". change field name to "yAxisType" for compatibility
      yAxisType: dropdownControl(YAxisTypeOptions, "value"),
      formatter: AxisFormatterComp,
    },
    (props) => () => {
      const config: YAXisComponentOption = {
        name: props.axisName,
        type: props.yAxisType,
        nameTextStyle: {
          align: "left",
        },
      };
      const numberFormat = new Intl.NumberFormat(i18n.locales, {
        notation: "compact",
      });
      (config.axisLabel as any) = {
        formatter: (value: string | number) => {
          const res = (props.formatter as any)({ value: value });
          if (!isNil(res) && res !== "") {
            return res;
          }
          if (
            (props.yAxisType === "value" || props.yAxisType === "log") &&
            typeof value === "number"
          ) {
            return numberFormat.format(value);
          }
          return value + "";
        },
      };
      if (props.yAxisType === "log") {
        (config as any).logBase = props.logBase || 10;
      }
      return config;
    }
  )
    .setPropertyViewFn((children) => (
      <>
        {children.axisName.propertyView({
          label: trans("chart.yAxisName"),
        })}
        {children.yAxisType.propertyView({
          label: trans("chart.yAxisType"),
        })}
        {children.yAxisType.getView() === "log" &&
          children.logBase.propertyView({
            label: trans("chart.logBase"),
          })}
        {children.formatter.getPropertyView()}
      </>
    ))
    .build();
})();

function calcXAxisType(xAxisData: Array<JSONValue | undefined>): EchartsAxisType {
  if (!xAxisData || xAxisData.length <= 0) {
    return "category";
  }
  const sampleData = xAxisData[0];
  if (!sampleData) {
    return "category";
  }
  if (isNumeric(sampleData)) {
    return "value";
  } else if (!isNaN(new Date(sampleData.toString()).getDate())) {
    return "time";
  } else {
    return "category";
  }
}

const dateInterval = {
  year: 3600 * 24 * 1000 * 365,
  month: 3600 * 24 * 1000 * 28,
  day: 3600 * 24 * 1000,
};

function calcTimeInterval(xAxisData: Array<JSONValue | undefined>) {
  const minIntervals = xAxisData.map((data) => {
    if (!data) {
      // 1 is echarts default value, to make sure axis tick is integer
      return 1;
    }
    const dataLen = data.toString().length;
    if (dataLen === 4) {
      // year 2022
      return dateInterval.year;
    } else if (dataLen === 6 || dataLen === 7) {
      // month 2022-01 222201
      return dateInterval.month;
    } else if (dataLen === 10 || dataLen === 8) {
      // day 2022-01-01 20220101
      return dateInterval.day;
    } else {
      return 1;
    }
  });
  return _.min(minIntervals);
}

let measureCanvas: HTMLCanvasElement;

// calculate x-axis text width
function getXAxisDataLength(xAxisData: Array<JSONValue | undefined>) {
  const canvas = measureCanvas || (measureCanvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  if (!context) {
    return [];
  }
  // echarts default font
  context.font = "normal 12px sans-serif";
  return xAxisData.map((d) => (d ? context.measureText(d.toString()).width + 2 : 0));
}

export function calcXYConfig(
  xConfig: XAXisComponentOption,
  yConfig: YAXisComponentOption,
  xAxisDirection: XAxisDirectionType,
  xAxisData: Array<JSONValue | undefined>,
  chartSize?: ChartSize & { right: number }
) {
  const resXConfig = { ...xConfig };
  const resYConfig = { ...yConfig };

  if (!resXConfig.type) {
    // simple calculate x-axis type
    resXConfig.type = calcXAxisType(xAxisData);
  }
  // x-axis label style adaptive
  if (resXConfig.type === "category" && chartSize) {
    const xAxisDataLenList = getXAxisDataLength(xAxisData);
    // get x-axis single data's max width
    const maxDataWidth = _.max(xAxisDataLenList);
    const lastDataWidth = xAxisDataLenList[xAxisDataLenList.length - 1];
    // grid width
    let eachDataWidth = chartSize.w / xAxisData.length;
    let rotate = 0;
    let labelWidth = maxDataWidth;
    // rotate when width is not enough
    if (maxDataWidth && eachDataWidth < maxDataWidth && xAxisDirection === "horizontal") {
      labelWidth = Math.min(maxDataWidth, 150);
      // vertical rotate 0.87 => sin(60) when exceeding the right boundary
      const verticalRotate =
        lastDataWidth && lastDataWidth * 0.87 > eachDataWidth / 2 + chartSize.right;
      rotate = verticalRotate ? 270 : 330;
      // to keep x-axis name under label, nameGap is related to label rotation angle
      resXConfig.nameGap = verticalRotate ? labelWidth + 5 : labelWidth / 2 + 10;
    } else if (xAxisDirection === "vertical" && maxDataWidth) {
      // vertical direction
      resXConfig.nameGap = maxDataWidth + 10;
    }
    resXConfig.axisLabel = {
      interval: 0,
      width: labelWidth,
      // @ts-ignore
      overflow: "truncate",
      rotate: rotate,
    };
  } else if (resXConfig.type === "time") {
    (resXConfig as any).minInterval = calcTimeInterval(xAxisData);
    const timeXAxisLabel = i18nObjs.timeXAxisLabel;
    if (timeXAxisLabel) {
      resXConfig.axisLabel = timeXAxisLabel;
    }
  }
  if (xAxisDirection === "vertical") {
    resYConfig.nameLocation = "middle";
    resYConfig.nameGap = 25;
  }

  return xAxisDirection === "horizontal"
    ? {
        xConfig: resXConfig,
        yConfig: resYConfig,
      }
    : {
        xConfig: resYConfig,
        yConfig: resXConfig,
      };
}

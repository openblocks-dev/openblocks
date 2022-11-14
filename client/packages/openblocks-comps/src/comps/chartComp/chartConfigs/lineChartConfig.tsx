import { LineSeriesOption } from "echarts";
import {
  MultiCompBuilder,
  BoolControl,
  dropdownControl,
  showLabelPropertyView,
} from "openblocks-sdk";
import { trans } from "i18n/comps";

const BarTypeOptions = [
  {
    label: trans("chart.basicLine"),
    value: "basicLine",
  },
  {
    label: trans("chart.stackedLine"),
    value: "stackedLine",
  },
  {
    label: trans("chart.areaLine"),
    value: "areaLine",
  },
] as const;

export const LineChartConfig = (function () {
  return new MultiCompBuilder(
    {
      showLabel: BoolControl,
      type: dropdownControl(BarTypeOptions, "basicLine"),
      smooth: BoolControl,
    },
    (props): LineSeriesOption => {
      const config: LineSeriesOption = {
        type: "line",
        label: {
          show: props.showLabel,
        },
      };
      if (props.type === "stackedLine") {
        config.stack = "stackValue";
      } else if (props.type === "areaLine") {
        config.areaStyle = {};
      }
      if (props.smooth) {
        config.smooth = true;
      }
      return config;
    }
  )
    .setPropertyViewFn((children) => (
      <>
        {children.type.propertyView({
          label: trans("chart.lineType"),
        })}
        {showLabelPropertyView(children)}
        {children.smooth.propertyView({ label: trans("chart.smooth") })}
      </>
    ))
    .build();
})();

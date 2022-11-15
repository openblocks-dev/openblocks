import { LineSeriesOption } from "echarts";
import {
  MultiCompBuilder,
  BoolControl,
  dropdownControl,
  showLabelPropertyView,
  withContext,
  StringControl,
  ColorOrBoolCodeControl,
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

export const ItemColorComp = withContext(
  new MultiCompBuilder({ value: ColorOrBoolCodeControl }, (props) => props.value)
    .setPropertyViewFn((children) =>
      children.value.propertyView({
        label: trans("chart.pointColorLabel"),
        placeholder: "{{value < 25000}}",
        tooltip: trans("chart.pointColorTooltip"),
      })
    )
    .build(),
  ["seriesName", "value"] as const
);

export const LineChartConfig = (function () {
  return new MultiCompBuilder(
    {
      showLabel: BoolControl,
      type: dropdownControl(BarTypeOptions, "basicLine"),
      smooth: BoolControl,
      itemColor: ItemColorComp,
    },
    (props): LineSeriesOption => {
      const config: LineSeriesOption = {
        type: "line",
        label: {
          show: props.showLabel,
        },
        itemStyle: {
          color: (params) => {
            if (!params.encode || !params.dimensionNames) {
              return params.color;
            }
            const dataKey = params.dimensionNames[params.encode["y"][0]];
            const color = (props.itemColor as any)({
              seriesName: params.seriesName,
              value: (params.data as any)[dataKey],
            });
            if (color === "true") {
              return "red";
            } else if (color === "false" || !color) {
              return params.color;
            }
            return color;
          },
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
        {children.itemColor.getPropertyView()}
      </>
    ))
    .build();
})();

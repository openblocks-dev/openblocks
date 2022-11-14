import {
  MultiCompBuilder,
  dropdownControl,
  BoolControl,
  showLabelPropertyView,
} from "openblocks-sdk";
import { ScatterSeriesOption } from "echarts";
import { trans } from "i18n/comps";

const ScatterShapeOptions = [
  {
    label: trans("chart.circle"),
    value: "circle",
  },
  {
    label: trans("chart.rect"),
    value: "rect",
  },
  {
    label: trans("chart.triangle"),
    value: "triangle",
  },
  {
    label: trans("chart.diamond"),
    value: "diamond",
  },
  {
    label: trans("chart.pin"),
    value: "pin",
  },
  {
    label: trans("chart.arrow"),
    value: "arrow",
  },
] as const;

export const ScatterChartConfig = (function () {
  return new MultiCompBuilder(
    {
      showLabel: BoolControl,
      shape: dropdownControl(ScatterShapeOptions, "circle"),
    },
    (props): ScatterSeriesOption => {
      return {
        type: "scatter",
        symbol: props.shape,
        label: {
          show: props.showLabel,
        },
      };
    }
  )
    .setPropertyViewFn((children) => (
      <>
        {showLabelPropertyView(children)}
        {children.shape.propertyView({
          label: trans("chart.scatterShape"),
        })}
      </>
    ))
    .build();
})();

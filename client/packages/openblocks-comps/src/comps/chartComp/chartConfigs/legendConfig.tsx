import { dropdownControl, MultiCompBuilder } from "openblocks-sdk";
import { LegendComponentOption } from "echarts";
import { trans } from "i18n/comps";

const LegendPositionOptions = [
  {
    label: trans("chart.bottom"),
    value: "bottom",
  },
  {
    label: trans("chart.right"),
    value: "right",
  },
  {
    label: trans("chart.close"),
    value: "close",
  },
] as const;

export const LegendConfig = (function () {
  return new MultiCompBuilder(
    {
      position: dropdownControl(LegendPositionOptions, "bottom"),
    },
    (props): LegendComponentOption => {
      const config: LegendComponentOption = {
        top: "bottom",
        type: "scroll",
      };
      if (props.position === "right") {
        config.top = "center";
        config.left = "right";
        config.orient = "vertical";
      } else if (props.position === "close") {
        config.show = false;
      }
      return config;
    }
  )
    .setPropertyViewFn((children) => (
      <>
        {children.position.propertyView({
          label: trans("chart.legendPosition"),
          radioButton: true,
        })}
      </>
    ))
    .build();
})();

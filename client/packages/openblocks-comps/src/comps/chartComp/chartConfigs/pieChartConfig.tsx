import { MultiCompBuilder } from "openblocks-sdk";
import { PieSeriesOption } from "echarts";
import { dropdownControl } from "openblocks-sdk";
import { ConstructorToView } from "openblocks-core";
import { trans } from "i18n/comps";

const BarTypeOptions = [
  {
    label: trans("chart.basicPie"),
    value: "basicPie",
  },
  {
    label: trans("chart.doughnutPie"),
    value: "doughnutPie",
  },
  {
    label: trans("chart.rosePie"),
    value: "rosePie",
  },
] as const;

// radius percent for each pie chart when one line has [1, 2, 3] pie charts
const pieRadiusConfig = [65, 35, 20];

type PieConfigViewType = ConstructorToView<typeof PieChartConfig>;

export const PieChartConfig = (function () {
  return new MultiCompBuilder(
    {
      type: dropdownControl(BarTypeOptions, "basicPie"),
    },
    (props): PieSeriesOption => {
      const config: PieSeriesOption = {
        type: "pie",
        label: {
          show: true,
          formatter: "{d}%",
        },
      };
      if (props.type === "rosePie") {
        config.roseType = "area";
      } else if (props.type === "doughnutPie") {
        config.radius = ["40%", "60%"];
      }
      return config;
    }
  )
    .setPropertyViewFn((children) => (
      <>
        {children.type.propertyView({
          label: trans("chart.pieType"),
        })}
      </>
    ))
    .build();
})();

export function getPieRadiusAndCenter(
  seriesLength: number,
  pieIndex: number,
  pieConfig: PieConfigViewType
) {
  const columnPieNum = Math.min(seriesLength, pieRadiusConfig.length);
  const radiusNumber = pieRadiusConfig[columnPieNum - 1];
  const isDoughnutPie = Array.isArray(pieConfig.radius);
  const radius = isDoughnutPie
    ? [(radiusNumber / 1.6).toFixed(2) + "%", radiusNumber + "%"]
    : radiusNumber + "%";

  /*** calculate center coordinates ***/
  const pieDiameter = 100 / columnPieNum;
  const xPosition = (pieDiameter * (pieIndex % columnPieNum) + pieDiameter / 2).toFixed(2) + "%";
  const rowIndex = Math.floor(pieIndex / columnPieNum) + 1;
  const yPosition =
    ((100 / Math.floor((columnPieNum * 2 + seriesLength - 1) / columnPieNum)) * rowIndex).toFixed(
      2
    ) + "%";
  // log.log("Echarts height: index:", pieConfig, radius, pieIndex, xPosition, yPosition);
  return {
    radius: radius,
    center: [xPosition, yPosition],
  } as const;
}

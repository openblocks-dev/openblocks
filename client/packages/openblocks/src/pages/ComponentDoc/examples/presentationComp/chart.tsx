import { uiCompRegistry } from "comps/uiCompRegistry";
import { trans } from "i18n";
import { chartColorPalette } from "openblocks-design";
import Example from "../../common/Example";
import ExampleGroup from "../../common/ExampleGroup";

const ChartCompWithDefault = uiCompRegistry["chart"].comp;

const defaultDataSource = [
  {
    date: "2021-09",
    department: "Administration",
    spending: 9003,
    budget: 8000,
  },
  {
    date: "2021-09",
    department: "Finance",
    spending: 3033,
    budget: 4000,
  },
  {
    date: "2021-09",
    department: "Sales",
    spending: 9230,
    budget: 8000,
  },
  {
    date: "2021-10",
    department: "Administration",
    spending: 13032,
    budget: 15000,
  },
  {
    date: "2021-10",
    department: "Finance",
    spending: 2300,
    budget: 5000,
  },
  {
    date: "2021-10",
    department: "Sales",
    spending: 7323.5,
    budget: 8000,
  },
  {
    date: "2021-11",
    department: "Administration",
    spending: 13000,
    budget: 16023,
  },
  {
    date: "2021-11",
    department: "Finance",
    spending: 3569.5,
    budget: 3000,
  },
  {
    date: "2021-11",
    department: "Sales",
    spending: 10000,
    budget: 9932,
  },
  {
    date: "2021-12",
    department: "Administration",
    spending: 18033,
    budget: 20000,
  },
  {
    date: "2021-12",
    department: "Finance",
    spending: 4890,
    budget: 4500,
  },
  {
    date: "2021-12",
    department: "Sales",
    spending: 9322,
    budget: 8000,
  },
];

const defaultEchartsJsonOption = {
  title: {
    text: "Funnel Chart",
    left: "center",
  },
  backgroundColor: "#ffffff",
  color: chartColorPalette,
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c}%",
  },
  legend: {
    data: ["Show", "Click", "Visit", "Query", "Buy"],
    top: "bottom",
  },
  series: [
    {
      name: "Funnel",
      type: "funnel",
      left: "10%",
      top: 60,
      bottom: 60,
      width: "80%",
      min: 0,
      max: 100,
      gap: 2,
      label: {
        show: true,
        position: "inside",
      },
      data: [
        { value: 100, name: "Show" },
        { value: 80, name: "Click" },
        { value: 60, name: "Visit" },
        { value: 40, name: "Query" },
        { value: 20, name: "Buy" },
      ],
    },
  ],
};

const data = JSON.stringify(defaultDataSource);
const echartsOption = JSON.stringify(defaultEchartsJsonOption);

export default function ChartExample() {
  const blackListConfig: string[] = ["data", "echartsOption", "series"];
  const series = [
    {
      columnName: "spending",
      seriesName: "Spending",
      hide: false,
      dataIndex: "b498129d",
    },
    {
      columnName: "budget",
      seriesName: "Budget",
      hide: false,
      dataIndex: "663942bf",
    },
  ];
  return (
    <>
      <ExampleGroup
        title={trans("componentDoc.basicUsage")}
        description={trans("componentDoc.basicDemoDescription")}
      >
        <Example
          title={trans("componentDoc.default")}
          width={500}
          height={300}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
          }}
          compFactory={ChartCompWithDefault}
        />
        <Example
          title={trans("componentDoc.echart")}
          width={500}
          height={300}
          blackListConfig={blackListConfig}
          config={{
            mode: "json",
            echartsOption: echartsOption,
          }}
          compFactory={ChartCompWithDefault}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.line")}>
        <Example
          title={trans("componentDoc.basicLine")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.type": trans("componentDoc.lineChartType") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: {
              compType: "line",
              comp: { type: "basicLine" },
            },
            xConfig: { type: "category" },
          }}
          compFactory={ChartCompWithDefault}
        />
        <Example
          title={trans("componentDoc.stackedLine")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.type": trans("componentDoc.lineChartType") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: { compType: "line", comp: { type: "stackedLine" } },
            xConfig: { type: "category" },
          }}
          compFactory={ChartCompWithDefault}
        />
        <Example
          title={trans("componentDoc.areaLine")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.type": trans("componentDoc.lineChartType") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: { compType: "line", comp: { type: "areaLine" } },
            xConfig: { type: "category" },
          }}
          compFactory={ChartCompWithDefault}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.scatter")}>
        <Example
          title={trans("componentDoc.circle")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.shape": trans("componentDoc.scatterShape") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: {
              compType: "scatter",
              comp: { shape: "circle" },
            },
            xConfig: { type: "category" },
          }}
          compFactory={ChartCompWithDefault}
        />
        <Example
          title={trans("componentDoc.rect")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.shape": trans("componentDoc.scatterShape") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: { compType: "scatter", comp: { shape: "rect" } },
            xConfig: { type: "category" },
          }}
          compFactory={ChartCompWithDefault}
        />
        <Example
          title={trans("componentDoc.triangle")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.shape": trans("componentDoc.scatterShape") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: { compType: "scatter", comp: { shape: "triangle" } },
            xConfig: { type: "category" },
          }}
          compFactory={ChartCompWithDefault}
        />
        <Example
          title={trans("componentDoc.diamond")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.shape": trans("componentDoc.scatterShape") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: { compType: "scatter", comp: { shape: "diamond" } },
            xConfig: { type: "category" },
          }}
          compFactory={ChartCompWithDefault}
        />
        <Example
          title={trans("componentDoc.pin")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.shape": trans("componentDoc.scatterShape") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: { compType: "scatter", comp: { shape: "pin" } },
            xConfig: { type: "category" },
          }}
          compFactory={ChartCompWithDefault}
        />
        <Example
          title={trans("componentDoc.arrow")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.shape": trans("componentDoc.scatterShape") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: { compType: "scatter", comp: { shape: "arrow" } },
            xConfig: { type: "category" },
          }}
          compFactory={ChartCompWithDefault}
        />
      </ExampleGroup>
      <ExampleGroup title={trans("componentDoc.pie")}>
        <Example
          title={trans("componentDoc.basicPie")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.type": trans("componentDoc.pieChatType") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: {
              compType: "pie",
              comp: { type: "basicPie" },
            },
          }}
          compFactory={ChartCompWithDefault}
        />
        <Example
          title={trans("componentDoc.doughnutPie")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.type": trans("componentDoc.pieChatType") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: { compType: "pie", comp: { type: "doughnutPie" } },
          }}
          compFactory={ChartCompWithDefault}
        />
        <Example
          title={trans("componentDoc.rosePie")}
          width={500}
          height={300}
          nameMap={{ "chartConfig.comp.type": trans("componentDoc.pieChatType") }}
          blackListConfig={blackListConfig}
          config={{
            mode: "ui",
            data: data,
            series: series,
            chartConfig: { compType: "pie", comp: { type: "rosePie" } },
          }}
          compFactory={ChartCompWithDefault}
        />
      </ExampleGroup>
    </>
  );
}

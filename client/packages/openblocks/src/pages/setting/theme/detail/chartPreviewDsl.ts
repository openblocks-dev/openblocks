import { trans } from "i18n";

const dsl = {
  ui: {
    layout: {
      "5716b58b": { i: "5716b58b", h: 5, w: 11, x: 0, y: 0 },
      "44ea6086": { i: "44ea6086", h: 35, w: 12, x: 0, y: 5 },
      fa24d93a: { i: "fa24d93a", h: 35, w: 12, x: 12, y: 5 },
    },
    items: {
      "44ea6086": {
        compType: "chart",
        comp: {
          mode: "ui",
          echartsOption:
            `{\n  "title": {\n    "text": ${trans("theme.chartFunnel")},\n    "left": "center"\n  },\n  "backgroundColor": "#ffffff",\n  "color": [\n    "#4C64D9",\n    "#30A1F2",\n    "#fac858",\n    "#ee6666",\n    "#3ba272",\n    "#fc8452",\n    "#9a60b4",\n    "#ea7ccc",\n    "#91cc75"\n  ],\n  "tooltip": {\n    "trigger": "item",\n    "formatter": "{a} <br/>{b} : {c}%"\n  },\n  "legend": {\n    "data": [\n      ${trans("theme.chartShow")},\n      ${trans("theme.chartClick")},\n      ${trans("theme.chartVisit")},\n      ${trans("theme.chartQuery")},\n      ${trans("theme.chartBuy")}\n    ],\n    "top": "bottom"\n  },\n  "series": [\n    {\n      "name": "Funnel",\n      "type": "funnel",\n      "left": "10%",\n      "top": 60,\n      "bottom": 60,\n      "width": "80%",\n      "min": 0,\n      "max": 100,\n      "gap": 2,\n      "label": {\n        "show": true,\n        "position": "inside"\n      },\n      "data": [\n        {\n          "value": 100,\n          "name": ${trans("theme.chartShow")}\n        },\n        {\n          "value": 80,\n          "name": ${trans("theme.chartClick")}\n        },\n        {\n          "value": 60,\n          "name": ${trans("theme.chartVisit")}\n        },\n        {\n          "value": 40,\n          "name": ${trans("theme.chartQuery")}\n        },\n        {\n          "value": 20,\n          "name": ${trans("theme.chartBuy")}\n        }\n      ]\n    }\n  ]\n}`,
          title: "",
          data: `[\n  {\n    "date": "2021-09",\n    "department": ${trans("theme.chartAdmin")},\n    "spending": 9003,\n    "budget": 8000\n  },\n  {\n    "date": "2021-09",\n    "department": ${trans("theme.chartFinance")},\n    "spending": 3033,\n    "budget": 4000\n  },\n  {\n    "date": "2021-09",\n    "department": ${trans("theme.chartSales")},\n    "spending": 9230,\n    "budget": 8000\n  },\n  {\n    "date": "2021-10",\n    "department": ${trans("theme.chartAdmin")},\n    "spending": 13032,\n    "budget": 15000\n  },\n  {\n    "date": "2021-10",\n    "department": ${trans("theme.chartFinance")},\n    "spending": 2300,\n    "budget": 5000\n  },\n  {\n    "date": "2021-10",\n    "department": ${trans("theme.chartSales")},\n    "spending": 7323.5,\n    "budget": 8000\n  },\n  {\n    "date": "2021-11",\n    "department": ${trans("theme.chartAdmin")},\n    "spending": 13000,\n    "budget": 16023\n  },\n  {\n    "date": "2021-11",\n    "department": ${trans("theme.chartFinance")},\n    "spending": 3569.5,\n    "budget": 3000\n  },\n  {\n    "date": "2021-11",\n    "department": ${trans("theme.chartSales")},\n    "spending": 10000,\n    "budget": 9932\n  }\n]`,
          xAxisKey: "date",
          xAxisDirection: "horizontal",
          series: [
            {
              columnName: "spending",
              seriesName:  trans("theme.chartSpending"),
              hide: false,
              dataIndex: "6c356cc1",
            },
            {
              columnName: "budget",
              seriesName: trans("theme.chartBudget"),
              hide: false,
              dataIndex: "b5bbd1ea",
            },
          ],
          xConfig: { axisName: "", logBase: "", type: "default" },
          yConfig: {
            axisName: "",
            logBase: "",
            yAxisType: "value",
            formatter: { value: "" },
          },
          legendConfig: { position: "bottom" },
          onEvent: [],
          chartConfig: {
            compType: "bar",
            comp: { showLabel: false, type: "basicBar" },
          },
          hidden: "",
        },
        name: "chart1",
      },
      fa24d93a: {
        compType: "chart",
        comp: {
          mode: "ui",
          echartsOption:
            `{\n  "title": {\n    "text": ${trans("theme.chartFunnel")},\n    "left": "center"\n  },\n  "backgroundColor": "#ffffff",\n  "color": [\n    "#4C64D9",\n    "#30A1F2",\n    "#fac858",\n    "#ee6666",\n    "#3ba272",\n    "#fc8452",\n    "#9a60b4",\n    "#ea7ccc",\n    "#91cc75"\n  ],\n  "tooltip": {\n    "trigger": "item",\n    "formatter": "{a} <br/>{b} : {c}%"\n  },\n  "legend": {\n    "data": [\n      ${trans("theme.chartShow")},\n      ${trans("theme.chartClick")},\n      ${trans("theme.chartVisit")},\n      ${trans("theme.chartQuery")},\n      ${trans("theme.chartBuy")}\n    ],\n    "top": "bottom"\n  },\n  "series": [\n    {\n      "name": "Funnel",\n      "type": "funnel",\n      "left": "10%",\n      "top": 60,\n      "bottom": 60,\n      "width": "80%",\n      "min": 0,\n      "max": 100,\n      "gap": 2,\n      "label": {\n        "show": true,\n        "position": "inside"\n      },\n      "data": [\n        {\n          "value": 100,\n          "name": ${trans("theme.chartShow")}\n        },\n        {\n          "value": 80,\n          "name": ${trans("theme.chartClick")}\n        },\n        {\n          "value": 60,\n          "name": ${trans("theme.chartVisit")}\n        },\n        {\n          "value": 40,\n          "name": ${trans("theme.chartQuery")}\n        },\n        {\n          "value": 20,\n          "name": ${trans("theme.chartBuy")}\n        }\n      ]\n    }\n  ]\n}`,
          title: "",
          data: `[\n  {\n    "date": "2021-09",\n    "department": ${trans("theme.chartAdmin")},\n    "spending": 9003,\n    "budget": 8000\n  },\n  {\n    "date": "2021-09",\n    "department": ${trans("theme.chartFinance")},\n    "spending": 3033,\n    "budget": 4000\n  },\n  {\n    "date": "2021-09",\n    "department": ${trans("theme.chartSales")},\n    "spending": 9230,\n    "budget": 8000\n  },\n  {\n    "date": "2021-10",\n    "department": ${trans("theme.chartAdmin")},\n    "spending": 13032,\n    "budget": 15000\n  },\n  {\n    "date": "2021-10",\n    "department": ${trans("theme.chartFinance")},\n    "spending": 2300,\n    "budget": 5000\n  },\n  {\n    "date": "2021-10",\n    "department": ${trans("theme.chartSales")},\n    "spending": 7323.5,\n    "budget": 8000\n  },\n  {\n    "date": "2021-11",\n    "department": ${trans("theme.chartAdmin")},\n    "spending": 13000,\n    "budget": 16023\n  },\n  {\n    "date": "2021-11",\n    "department": ${trans("theme.chartFinance")},\n    "spending": 3569.5,\n    "budget": 3000\n  },\n  {\n    "date": "2021-11",\n    "department": ${trans("theme.chartSales")},\n    "spending": 10000,\n    "budget": 9932\n  }\n]`,
          xAxisKey: "date",
          xAxisDirection: "horizontal",
          series: [
            {
              columnName: "spending",
              seriesName:  trans("theme.chartSpending"),
              hide: false,
              dataIndex: "6c356cc1",
            },
            {
              columnName: "budget",
              seriesName: trans("theme.chartBudget"),
              hide: false,
              dataIndex: "b5bbd1ea",
            },
          ],
          xConfig: { axisName: "", logBase: "", type: "default" },
          yConfig: {
            axisName: "",
            logBase: "",
            yAxisType: "value",
            formatter: { value: "" },
          },
          legendConfig: { position: "bottom" },
          onEvent: [],
          chartConfig: {
            compType: "line",
            comp: {
              showLabel: false,
              type: "basicLine",
              smooth: false,
              itemColor: { value: "" },
            },
          },
          hidden: "",
        },
        name: "chart2",
      },
      "5716b58b": {
        compType: "text",
        comp: {
          text: `### ${trans("theme.chartPreviewTitle")}`,
          autoHeight: "auto",
          type: "markdown",
          horizontalAlignment: "left",
          verticalAlignment: "center",
          style: { background: "", text: "", links: "" },
          hidden: "",
        },
        name: "text1",
      },
    },
  },
  queries: [],
  tempStates: [],
  transformers: [],
  hooks: [
    { compType: "urlParams", comp: {}, name: "url" },
    { compType: "momentJsLib", comp: {}, name: "moment" },
    { compType: "lodashJsLib", comp: {}, name: "_" },
    { compType: "utils", comp: {}, name: "utils" },
    { compType: "message", comp: {}, name: "message" },
    { compType: "localStorage", comp: {}, name: "localStorage" },
    { compType: "currentUser", comp: {}, name: "currentUser" },
  ],
  settings: {
    maxWidth: { dropdown: "__USER_DEFINE", input: "672" },
    themeId: "default",
    customShortcuts: [],
  },
  preload: { libs: [], script: "", css: "" },
};

export default dsl;

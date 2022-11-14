import { language } from "i18n/comps";

const echartsUrlLocale = language === "zh" ? "zh" : "en";
export const optionUrl = `https://echarts.apache.org/${echartsUrlLocale}/option.html`;
export const examplesUrl = `https://echarts.apache.org/examples/${echartsUrlLocale}/index.html`;
export const xAxisTypeUrl = `${optionUrl}#xAxis.type`;

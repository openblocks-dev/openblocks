import { trans } from "i18n";
import { ReactNode } from "react";

const valueTranslate: Record<string, Record<string, ReactNode>> = {
  "label.position": {
    row: trans("componentDoc.left"),
    column: trans("componentDoc.column"),
  },
  "label.align": {
    left: trans("componentDoc.leftAlign"),
    right: trans("componentDoc.rightAlign"),
  },
  formatter: {
    percent: trans("componentDoc.percent"),
  },
  autoHeight: {
    fixed: trans("componentDoc.fixedHeight"),
    auto: trans("componentDoc.auto"),
  },
  uploadType: {
    directory: trans("componentDoc.directory"),
    multiple: trans("componentDoc.multiple"),
    single: trans("componentDoc.singleFile"),
  },
  "options.optionType": {
    manual: trans("componentDoc.manual"),
  },
  type: {
    default: trans("componentDoc.default"),
    text: trans("componentDoc.text"),
  },
  size: {
    small: trans("componentDoc.small"),
    middle: trans("componentDoc.middle"),
    large: trans("componentDoc.large"),
  },
  "selection.mode": {
    single: trans("componentDoc.single"),
    multi: trans("componentDoc.multi"),
    close: trans("componentDoc.close"),
  },
  mode: {
    json: "Echarts JSON",
    ui: `UI ${trans("componentDoc.mode")}`,
  },
  "chartConfig.compType": {
    line: trans("componentDoc.line"),
    scatter: trans("componentDoc.scatter"),
    pie: trans("componentDoc.pie"),
  },
  "chartConfig.comp.type": {
    basicLine: trans("componentDoc.basicLine"),
    stackedLine: trans("componentDoc.stackedLine"),
    areaLine: trans("componentDoc.areaLine"),
    basicPie: trans("componentDoc.basicPie"),
    doughnutPie: trans("componentDoc.doughnutPie"),
    rosePie: trans("componentDoc.rosePie"),
  },
  "xConfig.type": {
    category: trans("componentDoc.category"),
  },
  "chartConfig.comp.shape": {
    circle: trans("componentDoc.circle"),
    rect: trans("componentDoc.rect"),
    triangle: trans("componentDoc.triangle"),
    diamond: trans("componentDoc.diamond"),
    pin: trans("componentDoc.pin"),
    arrow: trans("componentDoc.arrow"),
  },
  align: {
    left: trans("componentDoc.left"),
    right: trans("componentDoc.right"),
    center: trans("componentDoc.center"),
  },
  horizontalAlignment: {
    left: trans("componentDoc.left"),
    right: trans("componentDoc.right"),
    center: trans("componentDoc.center"),
    justify: trans("componentDoc.justify"),
  },
};

export default valueTranslate;

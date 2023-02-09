import { trans } from "i18n";
import { ChartGreenTheme, ChartTheme, ChartYellowTheme } from "./chartThemeConstant";

export enum MENU_TYPE {
  DELETE = "delete",
  SET_DEFAULT = "setDefault",
  CANCEL_DEFAULT = "cancelDefault",
  COPY = "copy",
  EDIT = "edit",
  RENAME = "rename",
}

export enum DETAIL_TYPE {
  CREATE = "create",
  EDIT = "edit",
  COPY = "copy",
}

export const themeTemplateList = [
  {
    name: trans("theme.defaultTheme"),
    id: "1",
    updateTime: 0,
    theme: {
      primary: "#3377FF",
      textDark: "#222222",
      textLight: "#FFFFFF",
      canvas: "#F5F5F6",
      primarySurface: "#FFFFFF",
      borderRadius: "4px",
      chart: JSON.stringify(ChartTheme, null, 2),
    },
  },
  {
    name: trans("theme.yellow"),
    id: "2",
    updateTime: 0,
    theme: {
      primary: "#F2CB55",
      textDark: "#222222",
      textLight: "#FFFFFF",
      canvas: "#29324F",
      primarySurface: "#495780",
      borderRadius: "4px",
      chart: JSON.stringify(ChartYellowTheme, null, 2),
    },
  },
  {
    name: trans("theme.green"),
    id: "3",
    updateTime: 0,
    theme: {
      primary: "#079968",
      textDark: "#222222",
      textLight: "#FFFFFF",
      canvas: "#F5F5F6",
      primarySurface: "#FFFFFF",
      borderRadius: "4px",
      chart: JSON.stringify(ChartGreenTheme, null, 2),
    },
  },
];

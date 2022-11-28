import { trans } from "i18n";

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
      canvas: "#2E354D",
      primarySurface: "#54628C",
      borderRadius: "4px",
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
    },
  },
];

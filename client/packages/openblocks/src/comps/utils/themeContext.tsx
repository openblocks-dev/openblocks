import { ThemeDetail } from "api/commonSettingApi";
import React from "react";

export class Theme {
  readonly theme?: ThemeDetail;
  readonly previewTheme?: ThemeDetail;
}
export const ThemeContext = React.createContext<Theme | undefined>(undefined);

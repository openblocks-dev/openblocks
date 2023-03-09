import { ThemeType } from "api/commonSettingApi";
import { getLocalThemeId } from "util/localStorageUtil";
import { getGlobalSettings } from "./globalSettings";

export const DEFAULT_THEMEID = "default";

function findTheme(themeList: ThemeType[], id?: string | null) {
  return id ? themeList.find((t) => t.id === id) : undefined;
}

export function getCurrentTheme(themeList: ThemeType[], appThemeId: string) {
  const theme = findTheme(themeList, getLocalThemeId());
  if (theme) {
    return theme;
  }
  return findTheme(
    themeList,
    appThemeId === DEFAULT_THEMEID
      ? getGlobalSettings().orgCommonSettings?.defaultTheme
      : appThemeId
  );
}

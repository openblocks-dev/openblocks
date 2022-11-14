import { AppState } from "redux/reducers";

export const getPreload = (state: AppState) => {
  const {
    preloadCSS,
    preloadJavaScript,
    preloadLibs,
    applyPreloadCSSToHomePage,
    runJavaScriptInHost,
  } = state.ui.commonSettings;
  return {
    preloadCSS,
    preloadJavaScript,
    preloadLibs,
    applyPreloadCSSToHomePage,
    runJavaScriptInHost,
  };
};

export const getIsCommonSettingFetching = (state: AppState) => {
  return state.ui.commonSettings.fetching;
};

export const getIsCommonSettingSaving = (state: AppState) => {
  return state.ui.commonSettings.saving;
};

export const getIsCommonSettingFetched = (state: AppState) => {
  return state.ui.commonSettings.fetched;
};

export const getThemeList = (state: AppState) => {
  return state.ui.commonSettings.themeList;
};

export const getDefaultTheme = (state: AppState) => {
  return state.ui.commonSettings.defaultTheme;
};

export const getDefaultHomePage = (state: AppState) => {
  return state.ui.commonSettings.defaultHomePage;
};

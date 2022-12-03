import { AppState } from "redux/reducers";

export const getPreload = (state: AppState) => {
  const {
    preloadCSS,
    preloadJavaScript,
    preloadLibs,
    applyPreloadCSSToHomePage,
    runJavaScriptInHost,
  } = state.ui.commonSettings.settings;
  return {
    preloadCSS,
    preloadJavaScript,
    preloadLibs,
    applyPreloadCSSToHomePage,
    runJavaScriptInHost,
  };
};

export const getCommonSettings = (state: AppState) => {
  return state.ui.commonSettings.settings;
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
  return state.ui.commonSettings.settings.themeList;
};

export const getDefaultTheme = (state: AppState) => {
  return state.ui.commonSettings.settings.defaultTheme;
};

export const getDefaultHomePage = (state: AppState) => {
  return state.ui.commonSettings.settings.defaultHomePage;
};

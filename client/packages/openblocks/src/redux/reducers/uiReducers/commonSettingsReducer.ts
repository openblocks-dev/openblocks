import { createReducer } from "util/reducerUtils";
import { ReduxAction, ReduxActionTypes } from "constants/reduxActionConstants";
import { CommonSettingResponseData, ThemeType } from "api/commonSettingApi";
import { GenericApiResponse } from "api/apiResponses";

export interface CommonSettingsState {
  themeList?: ThemeType[] | null;
  defaultTheme?: string | null;
  defaultHomePage?: string | null;
  preloadCSS?: string | null;
  preloadJavaScript?: string | null;
  preloadLibs?: string[] | null;
  applyPreloadCSSToHomePage?: boolean | null;
  runJavaScriptInHost?: boolean | null;
  setResult: boolean;

  fetched: boolean;
  fetching: boolean;
  saving: boolean;
}

const initialState: CommonSettingsState = {
  themeList: undefined,
  defaultTheme: undefined,
  setResult: false,

  fetched: false,
  fetching: false,
  saving: false,
};

const commonSettingsReducer = createReducer(initialState, {
  [ReduxActionTypes.FETCH_COMMON_SETTING]: (state: CommonSettingsState) => ({
    ...state,
    fetchingTheme: true,
    fetching: true,
  }),
  [ReduxActionTypes.FETCH_COMMON_SETTING_SUCCESS]: (
    state: CommonSettingsState,
    action: ReduxAction<GenericApiResponse<CommonSettingResponseData>>
  ): CommonSettingsState => {
    return {
      ...state,
      ...action.payload.data,
      themeList: action.payload.data.themeList || [],
      defaultTheme: action.payload.data.defaultTheme || null,
      fetching: false,
      fetched: true,
    };
  },
  [ReduxActionTypes.SET_COMMON_SETTING]: (state: CommonSettingsState) => ({
    ...state,
    setting: true,
  }),
  [ReduxActionTypes.SET_COMMON_SETTING_SUCCESS]: (
    state: CommonSettingsState,
    action: ReduxAction<CommonSettingResponseData>
  ) => ({
    ...state,
    ...action.payload,
    setting: false,
  }),
});

export default commonSettingsReducer;

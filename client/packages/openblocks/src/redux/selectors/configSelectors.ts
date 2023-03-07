import { AppState } from "redux/reducers";
import { SystemConfig } from "constants/configConstants";

export const getSystemConfigFetching = (state: AppState) => {
  return state.ui.config.fetchingConfig;
};

export const selectSystemConfig = (state: AppState): SystemConfig | undefined => {
  return state.ui.config.systemConfig;
};

export const getBrandingConfig = (state: AppState) => {
  return state.ui.config.systemConfig?.branding;
};

export const getExternalEditorState = (state: AppState) => {
  return state.ui.config.editorExternalState;
};

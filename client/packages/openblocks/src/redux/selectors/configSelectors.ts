import { AppState } from "redux/reducers";
import { SystemConfig } from "@openblocks-ee/constants/configConstants";

export const selectSystemConfig = (state: AppState): SystemConfig | undefined => {
  return state.ui.config.systemConfig;
};

export const getExternalEditorState = (state: AppState) => {
  return state.ui.config.editorExternalState;
};

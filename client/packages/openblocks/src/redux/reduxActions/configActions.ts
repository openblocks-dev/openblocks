import { ReduxActionTypes } from "constants/reduxActionConstants";
import { ExternalEditorContextState } from "util/context/ExternalEditorContext";

export const fetchConfigAction = () => {
  return {
    type: ReduxActionTypes.FETCH_SYS_CONFIG_INIT,
  };
};

export const setEditorExternalStateAction = (state: Partial<ExternalEditorContextState>) => {
  return {
    type: ReduxActionTypes.SET_EDITOR_EXTERNAL_STATE,
    payload: state,
  };
};

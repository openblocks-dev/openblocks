import { createReducer } from "util/reducerUtils";
import { ReduxAction, ReduxActionTypes } from "constants/reduxActionConstants";
import { DataSourceTypeInfo } from "api/datasourceApi";

export interface PluginDataState {
  data: DataSourceTypeInfo[];
  // response?: GenericApiResponse<Plugin[]>;
}

const initialState: PluginDataState = {
  data: [],
};
const pluginReducer = createReducer(initialState, {
  [ReduxActionTypes.FETCH_PLUGINS_SUCCESS]: (
    state: PluginDataState,
    action: ReduxAction<DataSourceTypeInfo[]>
  ): PluginDataState => {
    return {
      data: action.payload,
    };
  },
});
export default pluginReducer;

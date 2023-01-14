import { createReducer } from "util/reducerUtils";
import { ReduxAction, ReduxActionTypes } from "constants/reduxActionConstants";
import { DataSourceTypeInfo } from "api/datasourceApi";

export interface PluginDataState {
  data: DataSourceTypeInfo[];
  isDataSourceTypesFetched: boolean;
}

const initialState: PluginDataState = {
  data: [],
  isDataSourceTypesFetched: false,
};

const pluginReducer = createReducer(initialState, {
  [ReduxActionTypes.FETCH_DATA_SOURCE_TYPES_SUCCESS]: (
    state: PluginDataState,
    action: ReduxAction<DataSourceTypeInfo[]>
  ): PluginDataState => {
    return {
      data: action.payload,
      isDataSourceTypesFetched: true,
    };
  },
});
export default pluginReducer;

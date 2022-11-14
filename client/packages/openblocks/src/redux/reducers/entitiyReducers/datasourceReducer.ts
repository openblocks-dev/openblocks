import { createReducer } from "util/reducerUtils";
import { ReduxAction, ReduxActionTypes } from "constants/reduxActionConstants";
import { DatasourceInfo, DatasourceStructure } from "api/datasourceApi";
import { Datasource } from "@openblocks-ee/api/datasourceApi";

export interface DatasourceDataState {
  data: DatasourceInfo[];
  structure: Record<string, DatasourceStructure[]>;
}

const initialState: DatasourceDataState = {
  data: [],
  structure: {},
};

const datasourceReducer = createReducer(initialState, {
  [ReduxActionTypes.FETCH_DATASOURCE_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<DatasourceInfo[]>
  ): DatasourceDataState => {
    return {
      ...state,
      data: action.payload,
    };
  },

  [ReduxActionTypes.FETCH_DATASOURCE_STRUCTURE_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<Record<string, DatasourceStructure[]>>
  ): DatasourceDataState => {
    return {
      ...state,
      structure: { ...state.structure, ...action.payload },
    };
  },

  [ReduxActionTypes.CREATE_DATASOURCE_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<Datasource>
  ) => {
    return {
      ...state,
      loading: false,
      data: state.data.concat({ datasource: action.payload, edit: true }),
    };
  },

  [ReduxActionTypes.UPDATE_DATASOURCE_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<Datasource>
  ): DatasourceDataState => {
    return {
      ...state,
      data: state.data.map((info) => {
        if (info.datasource.id === action.payload.id)
          return { datasource: action.payload, edit: true };
        return info;
      }),
    };
  },

  [ReduxActionTypes.DELETE_DATASOURCE_SUCCESS]: (
    state: DatasourceDataState,
    action: ReduxAction<any>
  ): DatasourceDataState => {
    return {
      ...state,
      data: state.data.filter((info) => info.datasource.id !== action.payload?.datasourceId),
    };
  },
});
export default datasourceReducer;

import { createReducer } from "util/reducerUtils";
import { JSLibraryMeta, RecommendedJSLibraryMeta } from "api/jsLibraryApi";
import { ReduxAction, ReduxActionTypes } from "constants/reduxActionConstants";

export interface JSLibraryState {
  recommends: RecommendedJSLibraryMeta[];
  meta: Record<string, JSLibraryMeta>;
}

const initialState: JSLibraryState = {
  recommends: [],
  meta: {},
};

const jsLibraryReducer = createReducer(initialState, {
  [ReduxActionTypes.FETCH_JS_LIB_METAS_SUCCESS]: (
    state: JSLibraryState,
    action: ReduxAction<JSLibraryMeta[]>
  ): JSLibraryState => {
    return {
      ...state,
      meta: {
        ...state.meta,
        ...action.payload.reduce((obj, item) => Object.assign(obj, { [item.name]: item }), {}),
      },
    };
  },
  [ReduxActionTypes.FETCH_JS_LIB_RECOMMENDS_SUCCESS]: (
    state: JSLibraryState,
    action: ReduxAction<RecommendedJSLibraryMeta[]>
  ): JSLibraryState => {
    return {
      ...state,
      recommends: action.payload,
    };
  },
});

export default jsLibraryReducer;

import { ReduxActionTypes } from "constants/reduxActionConstants";

export interface FetchJSLibraryMetasPayload {
  names: string[];
}

export const fetchJSLibraryMetasAction = (names: string[]) => ({
  type: ReduxActionTypes.FETCH_JS_LIB_METAS,
  payload: {
    names,
  },
});

export const fetchJSLibraryRecommendsAction = () => ({
  type: ReduxActionTypes.FETCH_JS_LIB_RECOMMENDS,
});

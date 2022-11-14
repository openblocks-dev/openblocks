import { createReducer } from "util/reducerUtils";
import { ReduxAction, ReduxActionTypes } from "constants/reduxActionConstants";
import {
  LibraryQuery,
  LibraryQueryDropdownInfo,
  LibraryQueryRecordMeta,
} from "../../../api/queryLibraryApi";
import { omit } from "lodash";

export interface QueryLibraryState {
  queryLibraryInfo: Record<string, LibraryQuery>;
  queryLibraryDropdownInfo: Record<string, LibraryQueryDropdownInfo>; // <queryId, info>
  queryLibraryRecordsDSL: Record<string, Record<string, any>>; // <queryId, <recordId, dsl>>
  queryLibraryRecords: Record<string, Record<string, LibraryQueryRecordMeta>>; // <queryId, <recordId, meta>>
}

const initialState: QueryLibraryState = {
  queryLibraryInfo: {},
  queryLibraryDropdownInfo: {},
  queryLibraryRecordsDSL: {},
  queryLibraryRecords: {},
};

export const queryLibraryReducer = createReducer(initialState, {
  [ReduxActionTypes.FETCH_QUERY_LIBRARY_BY_ORG_SUCCESS]: (
    state: QueryLibraryState,
    action: ReduxAction<LibraryQuery[]>
  ): QueryLibraryState => {
    const info: Record<string, LibraryQuery> = {};
    action.payload.forEach((t) => {
      info[t.id] = t;
    });
    return {
      ...state,
      queryLibraryInfo: info,
    };
  },

  [ReduxActionTypes.FETCH_QUERY_LIBRARY_RECORD_DSL_SUCCESS]: (
    state: QueryLibraryState,
    action: ReduxAction<{
      libraryQueryId: string;
      libraryQueryRecordId: string;
      dsl: any;
    }>
  ): QueryLibraryState => {
    const { libraryQueryId, libraryQueryRecordId, dsl } = action.payload;
    const record: Record<string, Record<string, any>> = { ...state.queryLibraryRecordsDSL };
    const dslByVersions = { ...(record[libraryQueryId] ?? {}) };
    dslByVersions[libraryQueryRecordId] = dsl;
    record[libraryQueryId] = dslByVersions;
    return {
      ...state,
      queryLibraryRecordsDSL: record,
    };
  },

  [ReduxActionTypes.FETCH_QUERY_LIBRARY_DROPDOWN_SUCCESS]: (
    state: QueryLibraryState,
    action: ReduxAction<LibraryQueryDropdownInfo[]>
  ): QueryLibraryState => {
    const info: Record<string, LibraryQueryDropdownInfo> = {};
    action.payload.forEach((t) => (info[t.libraryQueryMetaView.id] = t));
    return {
      ...state,
      queryLibraryDropdownInfo: info,
    };
  },

  [ReduxActionTypes.FETCH_QUERY_LIBRARY_RECORD_SUCCESS]: (
    state: QueryLibraryState,
    action: ReduxAction<LibraryQueryRecordMeta[]>
  ): QueryLibraryState => {
    const queryId = action.payload[0]?.libraryQueryId;
    const records = { ...state.queryLibraryRecords };

    if (queryId) {
      const info: Record<string, LibraryQueryRecordMeta> = {};
      action.payload.forEach((t) => {
        info[t.id] = t;
      });
      records[queryId] = info;
    }

    return {
      ...state,
      queryLibraryRecords: records,
    };
  },

  [ReduxActionTypes.CREATE_QUERY_LIBRARY_RECORD_SUCCESS]: (
    state: QueryLibraryState,
    action: ReduxAction<LibraryQueryRecordMeta>
  ): QueryLibraryState => {
    const queryId = action.payload?.libraryQueryId;
    const records = { ...state.queryLibraryRecords };
    if (queryId) {
      const info: Record<string, LibraryQueryRecordMeta> = {};
      info[action.payload.id] = action.payload;
      records[queryId] = { ...info, ...(state.queryLibraryRecords[queryId] ?? {}) };
    }

    return {
      ...state,
      queryLibraryRecords: records,
    };
  },

  [ReduxActionTypes.CREATE_QUERY_LIBRARY_SUCCESS]: (
    state: QueryLibraryState,
    action: ReduxAction<LibraryQuery>
  ) => {
    const queryLibraryInfo = state.queryLibraryInfo;
    queryLibraryInfo[action.payload.id] = action.payload;

    return {
      ...state,
      queryLibraryInfo: queryLibraryInfo,
    };
  },

  [ReduxActionTypes.UPDATE_QUERY_LIBRARY_SUCCESS]: (
    state: QueryLibraryState,
    action: ReduxAction<LibraryQuery>
  ): QueryLibraryState => {
    const info = state.queryLibraryInfo;
    info[action.payload.id] = action.payload;
    return {
      ...state,
      queryLibraryInfo: info,
    };
  },

  [ReduxActionTypes.DELETE_QUERY_LIBRARY_SUCCESS]: (
    state: QueryLibraryState,
    action: ReduxAction<{ queryLibraryId: string }>
  ): QueryLibraryState => {
    return {
      ...state,
      queryLibraryInfo: omit(state.queryLibraryInfo, action.payload?.queryLibraryId),
    };
  },
});

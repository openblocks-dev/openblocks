import { AppState } from "../reducers";

export const getQueryLibrary = (state: AppState) => {
  return state.entities.queryLibrary.queryLibraryInfo;
};

export const getQueryLibraryDropdownInfo = (state: AppState) => {
  return state.entities.queryLibrary.queryLibraryDropdownInfo;
};

export const getQueryLibraryRecordsDSL = (state: AppState) => {
  return state.entities.queryLibrary.queryLibraryRecordsDSL;
};

export const getQueryLibraryRecords = (state: AppState) => {
  return state.entities.queryLibrary.queryLibraryRecords;
};

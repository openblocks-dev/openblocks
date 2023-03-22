import { AppState } from "redux/reducers";

export const jsLibrarySelector = (state: AppState) => state.jsLibrary.meta;

export const recommendJSLibrarySelector = (state: AppState) => state.jsLibrary.recommends;

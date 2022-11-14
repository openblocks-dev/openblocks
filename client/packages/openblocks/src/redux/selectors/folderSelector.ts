import { AppState } from "redux/reducers";
import { FolderMeta } from "constants/applicationConstants";

export const foldersSelector = (state: AppState): FolderMeta[] => state.ui.folder.folders;

export const folderElementsSelector = (state: AppState) => state.ui.folder.folderElements;

export const isFetchingFolderElements = (state: AppState) =>
  state.ui.folder.loadingStatus.isFetchingFolderElements;

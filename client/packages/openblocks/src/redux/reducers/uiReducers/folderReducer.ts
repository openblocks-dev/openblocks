import {
  ReduxAction,
  ReduxActionErrorTypes,
  ReduxActionTypes,
} from "constants/reduxActionConstants";
import {
  RecycleApplicationPayload,
  UpdateAppMetaPayload,
} from "redux/reduxActions/applicationActions";
import { createReducer } from "util/reducerUtils";
import { ApplicationDetail, ApplicationMeta, FolderMeta } from "constants/applicationConstants";
import { DeleteFolderPayload, MoveToFolderPayload } from "../../reduxActions/folderActions";

const initialState: FolderReduxState = {
  folders: [],
  folderElements: {},
  loadingStatus: {
    isFetchingFolderElements: false,
  },
};

export const folderReducer = createReducer(initialState, {
  [ReduxActionTypes.CREATE_APPLICATION_SUCCESS]: (
    state: FolderReduxState,
    action: ReduxAction<ApplicationDetail>
  ): FolderReduxState => {
    const info = action.payload.applicationInfoView;
    const elements = { ...state.folderElements };
    elements[info.folderId ?? ""] = [info, ...(elements[info.folderId ?? ""] ?? [])];
    return {
      ...state,
      folderElements: elements,
    };
  },

  [ReduxActionTypes.RECYCLE_APPLICATION_SUCCESS]: (
    state: FolderReduxState,
    action: ReduxAction<RecycleApplicationPayload>
  ): FolderReduxState => {
    const elements = { ...state.folderElements };
    elements[action.payload.folderId ?? ""] = elements[action.payload.folderId ?? ""]?.filter(
      (e) => e.folder || (!e.folder && e.applicationId !== action.payload.applicationId)
    );
    return {
      ...state,
      folderElements: elements,
    };
  },

  [ReduxActionTypes.UPDATE_APPLICATION_META_SUCCESS]: (
    state: FolderReduxState,
    action: ReduxAction<UpdateAppMetaPayload>
  ): FolderReduxState => {
    const elements = { ...state.folderElements };
    elements[action.payload.folderId ?? ""] = elements[action.payload.folderId ?? ""]?.map((e) => {
      if (!e.folder && e.applicationId === action.payload.applicationId) {
        return { ...e, ...action.payload };
      }
      return e;
    });
    return {
      ...state,
      folderElements: elements,
    };
  },

  [ReduxActionTypes.CREATE_FOLDER_SUCCESS]: (
    state: FolderReduxState,
    action: ReduxAction<FolderMeta>
  ): FolderReduxState => {
    const elements = { ...state.folderElements };
    elements[action.payload.parentFolderId ?? ""] = [
      action.payload,
      ...(elements[action.payload.parentFolderId ?? ""] ?? []),
    ];
    return {
      ...state,
      folderElements: elements,
      folders: [{ ...action.payload, subFolders: [], subApplications: [] }, ...state.folders],
    };
  },
  [ReduxActionTypes.UPDATE_FOLDER_SUCCESS]: (
    state: FolderReduxState,
    action: ReduxAction<FolderMeta>
  ): FolderReduxState => {
    const elements = { ...state.folderElements };
    elements[action.payload.parentFolderId ?? ""] = elements[
      action.payload.parentFolderId ?? ""
    ]?.map((e) => {
      if (e.folder && e.folderId === action.payload.folderId) {
        return { ...action.payload, name: action.payload.name };
      }
      return e;
    });
    return {
      ...state,
      folderElements: elements,
      folders: state.folders.map((e) => {
        if (e.folder && e.folderId === action.payload.folderId) {
          return { ...action.payload, name: action.payload.name };
        }
        return e;
      }),
    };
  },
  [ReduxActionTypes.MOVE_TO_FOLDER_SUCCESS]: (
    state: FolderReduxState,
    action: ReduxAction<MoveToFolderPayload>
  ): FolderReduxState => {
    const elements = { ...state.folderElements };
    elements[action.payload.sourceFolderId ?? ""] = elements[
      action.payload.sourceFolderId ?? ""
    ]?.filter(
      (e) =>
        (e.folder && e.folderId !== action.payload.sourceId) ||
        (!e.folder && e.applicationId !== action.payload.sourceId)
    );
    return {
      ...state,
      folderElements: elements,
    };
  },
  [ReduxActionTypes.DELETE_FOLDER_SUCCESS]: (
    state: FolderReduxState,
    action: ReduxAction<DeleteFolderPayload>
  ): FolderReduxState => {
    const elements = { ...state.folderElements };
    elements[action.payload.parentFolderId ?? ""] = elements[
      action.payload.parentFolderId ?? ""
    ]?.filter((e) => !e.folder || (e.folder && e.folderId !== action.payload.folderId));
    return {
      ...state,
      folderElements: elements,
      folders: [...state.folders.filter((e) => e.folder && e.folderId !== action.payload.folderId)],
    };
  },
  [ReduxActionTypes.FETCH_FOLDER_ELEMENTS_INIT]: (state: FolderReduxState): FolderReduxState => ({
    ...state,
    loadingStatus: { ...state.loadingStatus, isFetchingFolderElements: true },
  }),
  [ReduxActionTypes.FETCH_FOLDER_ELEMENTS_SUCCESS]: (
    state: FolderReduxState,
    action: ReduxAction<{ parentFolderId: string; elements: Array<FolderMeta | ApplicationMeta> }>
  ): FolderReduxState => {
    const elements = { ...state.folderElements };
    elements[action.payload.parentFolderId ?? ""] = action.payload.elements;
    return {
      ...state,
      folderElements: elements,
      loadingStatus: { ...state.loadingStatus, isFetchingFolderElements: false },
    };
  },
  [ReduxActionErrorTypes.FETCH_FOLDER_ELEMENTS_ERROR]: (
    state: FolderReduxState
  ): FolderReduxState => ({
    ...state,
    loadingStatus: { ...state.loadingStatus, isFetchingFolderElements: false },
  }),
  [ReduxActionTypes.FETCH_ALL_FOLDERS_SUCCESS]: (
    state: FolderReduxState,
    action: ReduxAction<FolderMeta[]>
  ): FolderReduxState => ({
    ...state,
    folders: action.payload,
  }),
});

export interface FolderReduxState {
  folders: FolderMeta[];
  folderElements: Record<string, Array<ApplicationMeta | FolderMeta>>;
  loadingStatus: {
    isFetchingFolderElements: boolean;
  };
}

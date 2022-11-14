import {
  ReduxAction,
  ReduxActionTypes,
  ReduxActionWithCallbacks,
} from "constants/reduxActionConstants";

export interface CreateFolderPayload {
  name: string;
  orgId: string;
  parentFolderId?: string; // null represents folder in the root folder
}

export const createFolder = (
  payload: CreateFolderPayload,
  onSuccessCallback: (response: any) => void,
  onErrorCallback: () => void
): ReduxActionWithCallbacks<CreateFolderPayload, any, any> => {
  return {
    type: ReduxActionTypes.CREATE_FOLDER_INIT,
    payload: payload,
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  };
};

export interface UpdateFolderPayload {
  id: string;
  name: string;
  parentFolderId?: string; // null represents folder in the root folder
}

export const updateFolder = (payload: UpdateFolderPayload): ReduxAction<UpdateFolderPayload> => {
  return {
    type: ReduxActionTypes.UPDATE_FOLDER_INIT,
    payload: payload,
  };
};

export interface DeleteFolderPayload {
  parentFolderId: string;
  folderId: string;
}

export const deleteFolder = (
  payload: DeleteFolderPayload,
  onSuccessCallback: (response: any) => void,
  onErrorCallback: () => void
): ReduxActionWithCallbacks<DeleteFolderPayload, any, any> => {
  return {
    type: ReduxActionTypes.DELETE_FOLDER_INIT,
    payload: payload,
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  };
};

export interface MoveToFolderPayload {
  sourceFolderId: string;
  sourceId: string;
  folderId: string;
}

export const moveToFolder = (
  payload: MoveToFolderPayload,
  onSuccessCallback: (response: any) => void,
  onErrorCallback: () => void
): ReduxActionWithCallbacks<MoveToFolderPayload, any, any> => {
  return {
    type: ReduxActionTypes.MOVE_TO_FOLDER_INIT,
    payload: payload,
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  };
};

export interface FetchFolderElementsPayload {
  folderId?: string;
}

export const fetchFolderElements = (
  payload: FetchFolderElementsPayload
): ReduxAction<FetchFolderElementsPayload> => {
  return {
    type: ReduxActionTypes.FETCH_FOLDER_ELEMENTS_INIT,
    payload: payload,
  };
};

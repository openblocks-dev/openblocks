import {
  ReduxAction,
  ReduxActionTypes,
  ReduxActionWithCallbacks,
  ReduxActionWithoutPayload,
} from "constants/reduxActionConstants";
import { LibraryQuery, LibraryQueryPublishRequest } from "../../api/queryLibraryApi";
import { AxiosResponse } from "axios";
import { GenericApiResponse } from "../../api/apiResponses";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";

export const fetchQueryLibrary = (): ReduxActionWithoutPayload => {
  return {
    type: ReduxActionTypes.FETCH_QUERY_LIBRARY_BY_ORG_INIT,
  };
};

export const fetchQueryLibraryDropdown = (): ReduxActionWithoutPayload => {
  return {
    type: ReduxActionTypes.FETCH_QUERY_LIBRARY_DROPDOWN_INIT,
  };
};

export const fetchQueryLibraryRecordDSL = (props: {
  libraryQueryId: string;
  libraryQueryRecordId: string;
  onErrorCallback?: (error: any) => void;
}): ReduxActionWithCallbacks<
  { libraryQueryId: string; libraryQueryRecordId: string },
  any,
  any
> => {
  return {
    type: ReduxActionTypes.FETCH_QUERY_LIBRARY_RECORD_DSL_INIT,
    payload: { ...props },
    onErrorCallback: props.onErrorCallback,
  };
};

export const createQueryLibrary = (
  libraryQuery: Partial<LibraryQuery>,
  onSuccessCallback: (response: AxiosResponse<GenericApiResponse<LibraryQuery>>) => void,
  onErrorCallback: () => void
): ReduxActionWithCallbacks<Partial<Datasource>, any, any> => {
  return {
    type: ReduxActionTypes.CREATE_QUERY_LIBRARY_INIT,
    payload: libraryQuery,
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  };
};

export const updateQueryLibrary = (
  libraryQuery: LibraryQuery
  // onSuccessCallback: (response: any) => void,
  // onErrorCallback: () => void
): ReduxActionWithCallbacks<LibraryQuery, any, any> => {
  return {
    type: ReduxActionTypes.UPDATE_QUERY_LIBRARY_INIT,
    payload: libraryQuery,
    // onSuccessCallback: onSuccessCallback,
    // onErrorCallback: onErrorCallback,
  };
};

export const deleteQueryLibrary = ({ queryLibraryId }: { queryLibraryId: string }) => {
  return {
    type: ReduxActionTypes.DELETE_QUERY_LIBRARY_INIT,
    payload: { queryLibraryId: queryLibraryId },
  };
};

export const fetchQueryLibraryRecord = (props: {
  libraryQueryId: string;
}): ReduxAction<{ libraryQueryId: string }> => {
  return {
    type: ReduxActionTypes.FETCH_QUERY_LIBRARY_RECORD,
    payload: { ...props },
  };
};

export const createQueryLibraryRecord = (props: {
  libraryQueryId: string;
  request: LibraryQueryPublishRequest;
  onSuccessCallback: (response: AxiosResponse<GenericApiResponse<boolean>>) => void;
  onErrorCallback: (error: any) => void;
}): ReduxActionWithCallbacks<
  { libraryQueryId: string; request: LibraryQueryPublishRequest },
  any,
  any
> => {
  return {
    type: ReduxActionTypes.CREATE_QUERY_LIBRARY_RECORD,
    payload: { ...props },
    onSuccessCallback: props.onSuccessCallback,
    onErrorCallback: props.onErrorCallback,
  };
};

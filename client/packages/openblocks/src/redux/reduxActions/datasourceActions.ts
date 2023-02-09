import {
  EvaluationReduxAction,
  ReduxActionTypes,
  ReduxActionWithCallbacks,
} from "constants/reduxActionConstants";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";
import { DatasourceInfo, DataSourceTypeInfo } from "api/datasourceApi";

export type FetchDatasourcePayload = {
  organizationId: string;
  onSuccess?: (dataSources: DatasourceInfo[]) => void;
};

export const fetchDatasource = (
  payload: FetchDatasourcePayload
): EvaluationReduxAction<FetchDatasourcePayload> => {
  return {
    type: ReduxActionTypes.FETCH_DATASOURCE_INIT,
    payload,
  };
};

export interface FetchDataSourceByAppActionPayload {
  applicationId: string;
  onSuccess?: (dataSources: DatasourceInfo[]) => void;
}

export const fetchDataSourceByApp = (
  payload: FetchDataSourceByAppActionPayload
): EvaluationReduxAction<FetchDataSourceByAppActionPayload> => {
  return {
    type: ReduxActionTypes.FETCH_DATASOURCE_BY_APP_INIT,
    payload,
  };
};

export const fetchDatasourceStructure = ({
  datasourceId,
}: {
  datasourceId: string;
}): EvaluationReduxAction<any> => {
  return {
    type: ReduxActionTypes.FETCH_DATASOURCE_STRUCTURE_INIT,
    payload: { datasourceId: datasourceId },
  };
};

export interface FetchDataSourceTypesActionPayload {
  organizationId: string;
  onSuccess?: (dataSourceTypes: DataSourceTypeInfo[]) => void;
}

export const fetchDataSourceTypes = (
  params: FetchDataSourceTypesActionPayload
): EvaluationReduxAction<FetchDataSourceTypesActionPayload> => {
  return {
    type: ReduxActionTypes.FETCH_DATA_SOURCE_TYPES,
    payload: params,
  };
};

export const createDatasource = (
  datasource: Partial<Datasource>,
  onSuccessCallback: (response: any) => void,
  onErrorCallback: () => void
): ReduxActionWithCallbacks<Partial<Datasource>, any, any> => {
  return {
    type: ReduxActionTypes.CREATE_DATASOURCE_INIT,
    payload: datasource,
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  };
};

export const updateDatasource = (
  datasource: Partial<Datasource>,
  onSuccessCallback: (response: any) => void,
  onErrorCallback: () => void
): ReduxActionWithCallbacks<Partial<Datasource>, any, any> => {
  return {
    type: ReduxActionTypes.UPDATE_DATASOURCE_INIT,
    payload: datasource,
    onSuccessCallback: onSuccessCallback,
    onErrorCallback: onErrorCallback,
  };
};

export const deleteDatasource = ({ datasourceId }: { datasourceId: string }) => {
  return {
    type: ReduxActionTypes.DELETE_DATASOURCE_INIT,
    payload: { datasourceId: datasourceId },
  };
};

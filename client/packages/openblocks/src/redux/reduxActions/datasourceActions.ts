import {
  EvaluationReduxAction,
  ReduxActionTypes,
  ReduxActionWithCallbacks,
} from "constants/reduxActionConstants";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";

export type FetchDatasourcePayload = {
  organizationId: string;
};
export const fetchDatasource = ({
  organizationId,
}: {
  organizationId: string;
}): EvaluationReduxAction<FetchDatasourcePayload> => {
  return {
    type: ReduxActionTypes.FETCH_DATASOURCE_INIT,
    payload: { organizationId },
  };
};

export const fetchDataSourceByApp = ({
  applicationId,
}: {
  applicationId: string;
}): EvaluationReduxAction<{
  applicationId: string;
}> => {
  return {
    type: ReduxActionTypes.FETCH_DATASOURCE_BY_APP_INIT,
    payload: { applicationId },
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

export const fetchDataSourceTypes = ({
  organizationId,
}: {
  organizationId: string;
}): EvaluationReduxAction<{ organizationId: string }> => {
  return {
    type: ReduxActionTypes.FETCH_PLUGINS_INIT,
    payload: { organizationId },
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

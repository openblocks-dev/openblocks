import { AppState } from "../reducers";
import { DataSourceTypeInfo } from "../../api/datasourceApi";
import { DatasourceType } from "@openblocks-ee/constants/queryConstants";

export const getDataSource = (state: AppState) => {
  return state.entities.datasource.data;
};

export const getDataSourceTypes = (state: AppState) => {
  return state.entities.plugins.data;
};

export const getIsDataSourceTypesFetched = (state: AppState) => {
  return state.entities.plugins.isDataSourceTypesFetched;
};

export const getDataSourceTypesMap = (state: AppState) => {
  const datasourceTypes = state.entities.plugins.data;
  return datasourceTypes
    ?.filter((plugin) => !!plugin.id)
    .reduce((map: Partial<Record<DatasourceType, DataSourceTypeInfo>>, plugin) => {
      map[plugin.id] = plugin;
      return map;
    }, {});
};

export const getDataSourceStructures = (state: AppState) => state.entities.datasource.structure;

export const getDataSourcePermissionInfo = (state: AppState) =>
  state.entities.datasource.permissionInfo;

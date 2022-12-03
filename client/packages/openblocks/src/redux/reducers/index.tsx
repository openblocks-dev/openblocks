import entityReducer from "redux/reducers/entitiyReducers";
import { PluginDataState } from "redux/reducers/entitiyReducers/pluginReducer";
import { DatasourceDataState } from "redux/reducers/entitiyReducers/datasourceReducer";
import uiReducer from "redux/reducers/uiReducers";
import { ApplicationReduxState } from "redux/reducers/uiReducers/applicationReducer";
import { OrgReduxState } from "redux/reducers/uiReducers/orgReducer";
import { UsersReduxState } from "redux/reducers/uiReducers/usersReducer";
import { ConfigState } from "redux/reducers/uiReducers/configReducer";
import { AppSnapshotState } from "redux/reducers/uiReducers/appSnapshotReducer";
import { CommonSettingsState } from "./uiReducers/commonSettingsReducer";
import { QueryLibraryState } from "./entitiyReducers/queryLibraryReducer";
import { FolderReduxState } from "./uiReducers/folderReducer";
import { combineReducers } from "redux";
import npmPluginReducer, { NPMPluginState } from "./npmPluginReducers";

export interface AppState {
  ui: {
    users: UsersReduxState;
    org: OrgReduxState;
    application: ApplicationReduxState;
    folder: FolderReduxState;
    appSnapshot: AppSnapshotState;
    config: ConfigState;
    commonSettings: CommonSettingsState;
  };
  entities: {
    datasource: DatasourceDataState;
    plugins: PluginDataState;
    queryLibrary: QueryLibraryState;
  };
  npmPlugin: NPMPluginState;
}

export const reducerObject = {
  ui: uiReducer,
  entities: entityReducer,
  npmPlugin: npmPluginReducer,
};

export const appReducer = combineReducers(reducerObject);

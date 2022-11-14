import { combineReducers } from "redux";
import applicationReducer from "redux/reducers/uiReducers/applicationReducer";
import orgReducer from "redux/reducers/uiReducers/orgReducer";
import usersReducer from "redux/reducers/uiReducers/usersReducer";
import configReducer from "redux/reducers/uiReducers/configReducer";
import appSnapshotReducer from "redux/reducers/uiReducers/appSnapshotReducer";
import commonSettingsReducer from "./commonSettingsReducer";
import { folderReducer } from "./folderReducer";

export const uiReducerObject = {
  application: applicationReducer,
  folder: folderReducer,
  appSnapshot: appSnapshotReducer,
  users: usersReducer,
  org: orgReducer,
  config: configReducer,
  commonSettings: commonSettingsReducer,
};

const uiReducer = combineReducers(uiReducerObject);
export default uiReducer;

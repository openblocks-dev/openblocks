import orgSagas from "redux/sagas/orgSagas";
import { pluginSagas } from "redux/sagas/pluginSagas";
import { datasourceSagas } from "redux/sagas/datasourceSagas";
import userSagas from "redux/sagas/userSagas";
import applicationSagas from "redux/sagas/applicationSagas";
import configSagas from "redux/sagas/configSagas";
import appSnapshotSagas from "redux/sagas/appSnapshotSagas";
import commonSettingsSagas from "./commonSettingsSagas";
import { queryLibrarySagas } from "./queryLibrarySagas";
import { folderSagas } from "./folderSagas";
import { all, call, spawn } from "redux-saga/effects";
import log from "loglevel";
import { datasourcePermissionSagas } from "./datasourcePermissionSagas";
import { jsLibrarySagas } from "redux/sagas/jsLibrarySagas";

export const sagas = [
  applicationSagas,
  folderSagas,
  userSagas,
  orgSagas,
  queryLibrarySagas,
  datasourceSagas,
  datasourcePermissionSagas,
  pluginSagas,
  configSagas,
  appSnapshotSagas,
  commonSettingsSagas,
  jsLibrarySagas,
];

export function* rootSaga(sagasToRun = sagas) {
  yield all(
    sagasToRun.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            log.error(e);
          }
        }
      })
    )
  );
}

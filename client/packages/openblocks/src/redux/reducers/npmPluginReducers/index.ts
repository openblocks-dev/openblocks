import { createReducer } from "util/reducerUtils";
import { ReduxAction, ReduxActionTypes } from "constants/reduxActionConstants";
import { NpmPackageMeta } from "types/remoteComp";

export interface NPMPluginState {
  packageMeta: Record<string, NpmPackageMeta>;
  packageVersion: Record<string, string>;
}

const initialState: NPMPluginState = {
  packageMeta: {},
  packageVersion: {},
};

const npmPluginReducer = createReducer(initialState, {
  [ReduxActionTypes.SELECT_PACKAGE_VERSION]: (
    state: NPMPluginState,
    action: ReduxAction<Record<string, string>>
  ): NPMPluginState => {
    return {
      ...state,
      packageVersion: {
        ...state.packageVersion,
        ...action.payload,
      },
    };
  },

  [ReduxActionTypes.PACKAGE_META_READY]: (
    state: NPMPluginState,
    action: ReduxAction<Record<string, NpmPackageMeta>>
  ): NPMPluginState => {
    const selectVersions: Record<string, string> = {};

    Object.keys(action.payload).forEach((i) => {
      const meta = action.payload[i];
      if (!meta || state.packageVersion[i]) {
        return;
      }
      let defaultVersion = meta["dist-tags"]?.latest;
      if (!defaultVersion) {
        defaultVersion = Object.keys(meta.versions || {})
          .sort()
          .reverse()[0];
      }
      selectVersions[i] = defaultVersion;
    });

    return {
      ...state,
      packageMeta: {
        ...state.packageMeta,
        ...action.payload,
      },
      packageVersion: {
        ...state.packageVersion,
        ...selectVersions,
      },
    };
  },
});

export default npmPluginReducer;

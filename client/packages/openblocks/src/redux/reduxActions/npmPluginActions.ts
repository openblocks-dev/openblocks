import { ReduxActionTypes } from "constants/reduxActionConstants";
import { NpmPackageMeta } from "types/remoteComp";

export const packageMetaReadyAction = (packageName: string, meta: NpmPackageMeta) => ({
  type: ReduxActionTypes.PACKAGE_META_READY,
  payload: {
    [packageName]: meta,
  },
});

export const selectNpmPluginVersionAction = (packageName: string, version: string) => ({
  type: ReduxActionTypes.SELECT_PACKAGE_VERSION,
  payload: {
    [packageName]: version,
  },
});

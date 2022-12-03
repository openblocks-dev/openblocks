import { SystemConfig } from "@openblocks-ee/constants/configConstants";

export function localEnv(): boolean {
  return REACT_APP_ENV === "local";
}

export function developEnv(): boolean {
  return REACT_APP_ENV === "development" || localEnv();
}

/**
 * is enterprise edition
 */
export function isEE(): boolean {
  return REACT_APP_EDITION === "enterprise";
}

export function isSaasMode(config?: SystemConfig) {
  return config?.workspaceMode === "SAAS";
}

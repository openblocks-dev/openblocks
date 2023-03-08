import { SystemConfig } from "constants/configConstants";

export function enableCustomBrand(config?: SystemConfig) {
  return config?.featureFlag?.enableCustomBranding;
}

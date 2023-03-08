import { SystemConfig } from "@openblocks-ee/constants/configConstants";

export function enableCustomBrand(config?: SystemConfig) {
  return config?.featureFlag?.enableCustomBranding;
}

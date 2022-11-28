import { libsImportCode } from "./external.js";

export function globalDepPlugin() {
  const virtualModuleId = "virtual:globals";
  return {
    name: "openblocks-global-plugin",
    resolveId(id) {
      if (id === virtualModuleId) {
        return id;
      }
    },
    load(id) {
      if (id === virtualModuleId) {
        return libsImportCode();
      }
    },
  };
}

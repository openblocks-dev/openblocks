import { libsImportCode } from "./external.js";

export function globalDepPlugin(exclude = []) {
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
        return libsImportCode(exclude);
      }
    },
  };
}

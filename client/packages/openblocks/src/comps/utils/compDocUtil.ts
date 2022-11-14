import { UICompType } from "comps/uiCompRegistry";
import { trans } from "i18n";

export function getComponentDocUrl(compType: UICompType) {
  if (!compType) {
    return "";
  }
  switch (compType) {
    case "module":
      return trans("docUrls.module");
    default:
      return trans("docUrls.components", { compType });
  }
}

import "core-js/actual";
import { trans } from "i18n";
import { isCurrentBrowserSupported } from "./utils/browser";

document.addEventListener("DOMContentLoaded", () => {
  if (!isCurrentBrowserSupported()) {
    const node = document.getElementById("not-supported-browser");
    if (node) {
      node.style.display = "block";
      node.innerText = trans("notSupportedBrowser");
    }
  }
});

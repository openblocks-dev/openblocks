import "core-js/actual";
import ResizeObserver from "resize-observer-polyfill";
import numbro from "numbro";
import Papa from "papaparse";
import * as uuid from "uuid";
import "regenerator-runtime/runtime";
import "virtual:globals";
import { debug } from "loglevel";
import { bootstrap } from "./app";
import "./index.less";
import log from "loglevel";
import "antd-mobile/es/global";

window.numbro = numbro;
window.Papa = Papa;
window.uuid = uuid;

// for chrome 63
if (!window.ResizeObserver) {
  window.ResizeObserver = ResizeObserver;
}

function hideLoading() {
  // hide loading
  const node = document.getElementById("loading");
  if (node) {
    // @ts-ignore
    node.style.opacity = 0;
  }
}

debug(`REACT_APP_EDITION: ${REACT_APP_EDITION}`);
debug(`REACT_APP_LANGUAGES:, ${REACT_APP_LANGUAGES}`);
debug(`REACT_APP_API_HOST:, ${REACT_APP_API_HOST}`);
debug(`REACT_APP_ENV:, ${REACT_APP_ENV}`);
debug(`REACT_APP_LOG_LEVEL:, ${REACT_APP_LOG_LEVEL}`);

try {
  bootstrap();
  hideLoading();
} catch (e) {
  log.error(e);
}

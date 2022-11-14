import "core-js/actual";
import "systemjs";
import numbro from "numbro";
import Papa from "papaparse";
import * as uuid from "uuid";
import "regenerator-runtime/runtime";
import "virtual:globals";
import { debug } from "loglevel";
import { bootstrap } from "./app";
import "./index.less";
import log from "loglevel";

window.numbro = numbro;
window.Papa = Papa;
window.uuid = uuid;

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
debug(`REACT_APP_IMPORT_MAP:, ${REACT_APP_IMPORT_MAP}`);

try {
  bootstrap();
  hideLoading();
} catch (e) {
  log.error(e);
}

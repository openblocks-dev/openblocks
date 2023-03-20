import log, { LogLevelDesc } from "loglevel";
import moment from "moment";
import { getMomentLocale } from "i18n/momentLocale";
import _ from "lodash";

// https://github.com/vitejs/vite/discussions/7492#discussioncomment-2449310
import "moment/dist/locale/en-gb";
import "moment/dist/locale/zh-cn";

export function initApp() {
  moment.locale(getMomentLocale());
  const logLevel = getEnvLogLevel();
  log.setLevel(logLevel);
}

function getEnvLogLevel(): LogLevelDesc {
  if (REACT_APP_LOG_LEVEL) {
    return REACT_APP_LOG_LEVEL as LogLevelDesc;
  }
  return "error";
}

// check keyboard is type of Mac
export const isMac = (() => {
  const platform = typeof navigator !== "undefined" ? navigator.platform : undefined;
  return !platform ? false : /Mac/.test(platform);
})();

const BASE64_STRING_REGEX = /^([A-Za-z\d+/]{4})*([A-Za-z\d+/]{3}=|[A-Za-z\d+/]{2}==)?$/;

export const isBase64String = (data: any) => {
  return typeof data === "string" && BASE64_STRING_REGEX.test(data);
};

// minimum transparant base64 image
export const TransparentImg = new Image(0, 0);
TransparentImg.src =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function runScriptInHost(code: string) {
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.textContent = code;
  document.body.appendChild(script);
}

export async function loadScript(src: string) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = src;
    script.onerror = reject;
    script.onload = (e) => {
      resolve(e);
    };
    document.body.appendChild(script);
  });
}

export function checkIsMobile(width?: number) {
  return !_.isNil(width) && width <= 500;
}

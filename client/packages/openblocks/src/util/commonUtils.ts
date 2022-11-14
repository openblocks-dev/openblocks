import log, { LogLevelDesc } from "loglevel";
import moment from "moment";
import { getMomentLocale } from "i18n/momentLocale";
import _ from "lodash";

import "moment/locale/en-gb";
import "moment/locale/zh-cn";

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

const URL_STRING_REGEX =
  /^((blob:)?https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/;

export const isBase64String = (data: any) => {
  return typeof data === "string" && BASE64_STRING_REGEX.test(data);
};

export const isUrlString = (data: any) => {
  return typeof data === "string" && new RegExp(URL_STRING_REGEX, "i").test(data);
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

// landscape orientation and portrait
export const isSmallScreen = window.innerWidth < 500 || window.innerHeight < 500;

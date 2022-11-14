import en_GB from "antd/lib/locale/en_GB";
import en_US from "antd/lib/locale/en_US";
import zh_CN from "antd/es/locale/zh_CN";
import zh_HK from "antd/es/locale/zh_HK";
import zh_TW from "antd/es/locale/zh_TW";
import { getValueByLocale } from "openblocks-core";

export function getAntdLocale(language?: string) {
  if (language) {
    return selectAntdLocale(language, "");
  }
  return getValueByLocale(en_US, (locale) => selectAntdLocale(locale.language, locale.region));
}

function selectAntdLocale(language: string, region?: string) {
  switch (language) {
    case "en":
      switch (region) {
        case "GB":
          return en_GB;
      }
      return en_US;
    case "zh":
      switch (region) {
        case "HK":
          return zh_HK;
        case "TW":
          return zh_TW;
      }
      return zh_CN;
  }
}

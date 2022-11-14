import { language } from "i18n";

export function getMomentLocale() {
  switch (language) {
    case "zh":
      return "zh-cn";
    default:
      return "en-gb";
  }
}

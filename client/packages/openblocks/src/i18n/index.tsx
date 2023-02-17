import { getI18nObjects, Translator } from "openblocks-core";
import * as localeData from "./locales";
import { I18nObjects } from "./locales/types";

export const { trans, transToNode, language } = new Translator<typeof localeData.en>(
  localeData,
  REACT_APP_LANGUAGES
);
export const i18nObjs = getI18nObjects<I18nObjects>(localeData, REACT_APP_LANGUAGES);

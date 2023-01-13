import { en } from "./en";
import { zh } from "./zh";
import { I18n } from "../../../common/i18n";

export default function getI18nTranslator(languages: string[]) {
  return new I18n<typeof en>({ zh, en }, languages);
}

export type S3I18nTranslator = ReturnType<typeof getI18nTranslator>;

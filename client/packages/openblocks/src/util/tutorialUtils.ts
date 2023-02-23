import { DatasourceType } from "@openblocks-ee/constants/queryConstants";
import { trans } from "i18n";

const DatasourceTutorials: Partial<Record<DatasourceType, string>> = {
  mysql: trans("datasourceTutorial.mysql"),
  mongodb: trans("datasourceTutorial.mongodb"),
  postgres: trans("datasourceTutorial.postgres"),
  redis: trans("datasourceTutorial.redis"),
  es: trans("datasourceTutorial.es"),
  smtp: trans("datasourceTutorial.smtp"),
  clickHouse: trans("datasourceTutorial.clickHouse"),
  googleSheets: "https://docs.openblocks.dev/data-sources/connect-to-databases/google-sheets",
};

export const getDatasourceTutorial = (datasourceType: DatasourceType) => {
  return DatasourceTutorials[datasourceType];
};

export const QueryTutorials = {
  js: trans("queryTutorial.js"),
  transformer: trans("queryTutorial.transformer"),
  tempState: trans("queryTutorial.tempState"),
  dataResponder: "",
  es: "https://www.elastic.co/guide/en/elasticsearch/reference/current/rest-apis.html",
  redis: "https://redis.io/commands/",
  googleSheets: {
    readData: "https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/get",
    appendData:
      "https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/append",
    updateData:
      "https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/update",
    deleteData: undefined,
    clearData:
      "https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets.values/clear",
  },
} as const;

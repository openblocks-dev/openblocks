import { JSONObject } from "util/jsonTypes";

export type I18nObjects = {
  jsonForm: {
    defaultSchema: JSONObject;
    defaultUiSchema: JSONObject;
    defaultFormData: JSONObject;
  };
  table: {
    columns: { key: string; title: string; isTag?: boolean }[];
    defaultData: JSONObject[];
  };
  editorTutorials: {
    sampleDatasourceName?: string;
    mockDataUrl?: string;
    data: (
      code: (text: string) => React.ReactNode,
      link: (text: string, url: string) => React.ReactNode
    ) => React.ReactNode;
    compProperties: (code: (text: string) => React.ReactNode) => React.ReactNode;
  };
  iconSearchKeywords?: Record<string, string>;
  cascader: JSONObject[];
  cascaderDefult: string[];
};

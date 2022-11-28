/// <reference path="./global.d.ts" />
/// <reference types="vite/client" />

declare module "*.svg" {
  import * as React from "react";

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}

declare module "*.md" {
  const value: string;
  export default value;
}

declare module "eslint4b-prebuilt";
declare module "mq-polyfill";
declare module "@rjsf/antd";
declare module "really-relaxed-json";
declare module "tui-image-editor";

declare var numbro: any;
declare var uuid: any;
declare var PUBLIC_URL: string;
declare var REACT_APP_EDITION: string;
declare var REACT_APP_LANGUAGES: string;
declare var REACT_APP_COMMIT_ID: string;
declare var REACT_APP_API_HOST: string;
declare var REACT_APP_ENV: string;
declare var REACT_APP_BUILD_ID: string;
declare var REACT_APP_LOG_LEVEL: string;
declare var REACT_APP_IMPORT_MAP: string;
declare var REACT_APP_SERVER_IPS: string;

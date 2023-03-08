import { KeyValue } from "../types/common";
import { matchPath } from "react-router";
import { AppPathParams } from "../constants/applicationConstants";
import { APP_EDITOR_URL, APPLICATION_VIEW_URL } from "../constants/routesURL";
import history from "./history";
import { isEmpty } from "lodash";
import { UiLayoutType } from "comps/comps/uiComp";

export function keyValueListToSearchStr(kvs: KeyValue[]) {
  const searchParams = new URLSearchParams();
  kvs.forEach((i) => {
    const { key, value } = i;
    if (!key) {
      return;
    }
    searchParams.set(key as string, value as string);
  });
  return searchParams.toString();
}

export function recordToSearchStr(params: Record<string, string>) {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    searchParams.set(k, v);
  });
  return searchParams.toString();
}

export function openApp(props: {
  applicationId: string;
  queryParams?: string;
  hashParams?: string;
  newTab?: boolean;
}) {
  const m = matchPath<AppPathParams>(window.location.pathname, APP_EDITOR_URL);
  if (!m || !props.applicationId) {
    return;
  }
  let targetURL = APPLICATION_VIEW_URL(props.applicationId, m.params.viewMode);
  // query
  if (props.queryParams && !isEmpty(props.queryParams)) {
    targetURL += `?${props.queryParams}`;
  }

  // hash
  if (props.hashParams && !isEmpty(props.hashParams)) {
    targetURL += `#${props.hashParams}`;
  }

  if (props.newTab) {
    targetURL = new URL(targetURL, window.location.href).toString();
    window.open(targetURL, "_blank");
  } else {
    history.push(targetURL);
  }
}

export function isAggregationApp(appType: UiLayoutType) {
  return appType === "nav" || appType === "mobileTabLayout";
}

import { AppPathParams } from "constants/applicationConstants";
import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { DATASOURCE_URL, QUERY_LIBRARY_URL } from "../constants/routesURL";
import { AuthSearchParams } from "constants/authConstants";
import { checkIsMobile } from "util/commonUtils";
import { EditorContext } from "comps/editorState";
import { getDataSourceStructures } from "redux/selectors/datasourceSelectors";
import { DatasourceStructure } from "api/datasourceApi";

export const ForceViewModeContext = React.createContext<boolean>(false);

export function isUserViewMode(params?: AppPathParams) {
  if (!params) {
    return false;
  }
  const { viewMode } = params;
  return viewMode === "preview" || viewMode === "view";
}

/**
 * whether it's user view mode (not editing)
 */
export function useUserViewMode() {
  const params = useParams<AppPathParams>();
  return isUserViewMode(params);
}

export function useAppPathParam() {
  return useParams<AppPathParams>();
}

export function useMaxWidth() {
  const search = useLocation().search;
  const searchParams = new URLSearchParams(search);
  return Number(searchParams.get("mjMaxWidth")) || undefined;
}

export function useTemplateViewMode() {
  const search = useLocation().search;
  if (!useUserViewMode) {
    return false;
  }
  const searchParams = new URLSearchParams(search);
  return !!searchParams.get("template");
}

export function useApplicationId() {
  return useParams<AppPathParams>().applicationId;
}

export function useRedirectUrl() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  return queryParams.get(AuthSearchParams.redirectUrl);
}

export function useFixedDelay(callback: () => Promise<unknown>, delay: number | null) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = () => callback();
  }, [callback]);

  useEffect(() => {
    if (!delay || delay < 100 || Number.isNaN(delay)) {
      return;
    }

    let stop = false; // make sure effect destroyed before the next timer period
    let timer: number | undefined = undefined;

    const reload = () =>
      (timer = window.setTimeout(() => callback().finally(() => !stop && reload()), delay));

    reload();

    return () => {
      stop = true;
      window.clearTimeout(timer);
    };
  }, [delay]);
}

/**
 * delay update state according to delay condition
 *
 * @param initialState the initial state
 * @param delay if set as not-true, hold the new state as an internal state; if set as true, make the internal state as the new external state
 * @returns [delayState, setState]
 *  delayState: the external state
 *  setState: the same setState as `useState`
 */
export function useDelayState<S>(
  initialState: S | (() => S),
  delay?: boolean
): [S, Dispatch<SetStateAction<S>>] {
  const [state, setState] = useState(initialState);
  const [delayState, setDelayState] = useState(state);
  useEffect(() => {
    if (state !== delayState && !delay) {
      setDelayState(state);
    }
  }, [delay, delayState, state]);
  return [delayState, setState];
}

export function useShallowEqualSelector<TState = {}, TSelected = unknown>(
  selector: (state: TState) => TSelected
) {
  return useSelector(selector, shallowEqual);
}

export type PageType = "application" | "module" | "datasource" | "queryLibrary";

export function useCurrentPage(): PageType {
  const pathname = useLocation().pathname;
  if (pathname.startsWith("MODULE_APPLICATIONS_URL")) {
    return "module";
  } else if (pathname.startsWith(DATASOURCE_URL)) {
    return "datasource";
  } else if (pathname.startsWith(QUERY_LIBRARY_URL)) {
    return "queryLibrary";
  } else {
    return "application";
  }
}

export function useIsMobile() {
  const editorState = useContext(EditorContext);
  return checkIsMobile(editorState?.getAppSettings().maxWidth);
}

function getMetaData(
  datasourceStructure: Record<string, DatasourceStructure[]>,
  selectedDatasourceId: string
): Record<string, string> {
  let ret: Record<string, string> = {};
  datasourceStructure[selectedDatasourceId]?.forEach((table) => {
    ret[table.name] = "table";
    table.columns?.forEach((c) => {
      ret[c.name] = c.type;
    });
  });
  return ret;
}

export function useMetaData(datasourceId: string) {
  const datasourceStructure = useSelector(getDataSourceStructures);
  return useMemo(
    () => getMetaData(datasourceStructure, datasourceId),
    [datasourceStructure, datasourceId]
  );
}

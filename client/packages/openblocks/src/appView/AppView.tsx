import { HTMLAttributes, useEffect, useMemo, useRef } from "react";
import { createBrowserHistory } from "history";
import { Provider } from "react-redux";
import { Router, Route } from "react-router";
import { GetContainerParams, useCompInstance } from "comps/utils/useCompInstance";
import { RootComp } from "comps/comps/rootComp";
import { reduxStore } from "redux/store/store";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import { changeValueAction, CompActionTypes, deferAction } from "openblocks-core";

const browserHistory = createBrowserHistory();

export interface OpenblocksAppBootStrapOptions {
  /**
   * where to load application dsl and static assets
   */
  baseUrl?: string;
}

export interface OpenblocksAppViewProps
  extends HTMLAttributes<HTMLDivElement>,
    OpenblocksAppBootStrapOptions {
  appId: string;
}

interface AppViewProps {
  dsl: any;
  appId: string;
  moduleDsl: any;
  moduleInputs?: Record<string | number, { name: string; value: any }>;
  onModuleEventTriggered?: (eventName: string) => void;
  onCompChange?: (comp: RootComp | null) => void;
}

export function AppView(props: AppViewProps) {
  const { dsl, moduleDsl, appId, moduleInputs, onCompChange, onModuleEventTriggered } = props;

  const onModuleEventTriggeredRef = useRef(onModuleEventTriggered);
  onModuleEventTriggeredRef.current = onModuleEventTriggered;

  const params = useMemo<GetContainerParams<typeof RootComp>>(
    () => ({
      Comp: RootComp,
      initialValue: dsl,
      reduceContext: {
        readOnly: true,
        applicationId: appId,
        parentApplicationPath: [],
        moduleDSL: moduleDsl || {},
      },
      initHandler: (comp: any) => comp.preload(`app-${appId}`),
      actionPreInterceptor: (action) => {
        if (action.type === CompActionTypes.TRIGGER_MODULE_EVENT) {
          onModuleEventTriggeredRef.current?.(action.name);
          return false;
        }
        return true;
      },
    }),
    [appId]
  );

  const [comp] = useCompInstance(params);

  useEffect(() => {
    onCompChange?.(comp);
  }, [comp]);

  useEffect(() => {
    const moduleLayoutComp = comp?.children.ui.getModuleLayoutComp();
    if (!moduleLayoutComp || !moduleInputs) {
      return;
    }
    const inputs = moduleLayoutComp.children.io.children.inputs.getView();

    inputs.forEach((input) => {
      const { name } = input.getView();
      const nextValue = moduleInputs[name];
      if (nextValue !== undefined) {
        input.children.defaultValue.children.comp.dispatch(
          deferAction(changeValueAction(nextValue))
        );
      }
    });
  }, [moduleInputs]);

  return (
    <Provider store={reduxStore}>
      <ExternalEditorContext.Provider
        value={{
          applicationId: appId,
          appType: 1,
          readOnly: true,
          hideHeader: true,
        }}
      >
        <Router history={browserHistory}>
          <Route path="/" render={() => comp?.getView()} />
        </Router>
      </ExternalEditorContext.Provider>
    </Provider>
  );
}

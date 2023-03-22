/**
 * The current file cannot import "comps", will cause circular dependencies
 */
import { CompName } from "components/CompName";
import { CompNameContext } from "comps/editorState";
import { withIsLoading, withTypeAndChildren } from "comps/generators";
import { ToInstanceType } from "comps/generators/multi";
import { CompExposingContext } from "comps/generators/withContext";
import { withErrorBoundary } from "comps/generators/withErrorBoundary";
import {
  ExposingMultiCompConstructor,
  UICompLayoutInfo,
  uiCompRegistry,
  UICompType,
} from "comps/uiCompRegistry";
import { ExposingInfo } from "comps/utils/exposingTypes";
import { getReduceContext, WithParamsContext } from "comps/utils/reduceContext";
import { parseCompType } from "comps/utils/remote";
import { Comp, CompAction, ConstructorToDataType } from "openblocks-core";
import { ScrollBar, SearchTextContext } from "openblocks-design";
import React, { Profiler, useContext, useEffect, useMemo, useState } from "react";
import { profilerCallback } from "util/cacheUtils";
import { setFieldsNoTypeCheck, shallowEqual } from "util/objectUtils";
import { remoteComp } from "./remoteComp/remoteComp";
import { SimpleNameComp } from "./simpleNameComp";

export function defaultLayout(compType: UICompType): UICompLayoutInfo {
  return uiCompRegistry[compType]?.layoutInfo ?? { w: 5, h: 5 };
}

const childrenMap = {
  name: SimpleNameComp,
};

const TmpComp = withTypeAndChildren<
  Record<string, ExposingMultiCompConstructor>,
  ToInstanceType<typeof childrenMap>
>(
  (type) => {
    const compInfo = parseCompType(type);
    if (compInfo.isRemote) {
      return remoteComp(compInfo);
    }
    const entries = Object.entries(uiCompRegistry);
    for (let [name, manifest] of entries) {
      if (name !== type) {
        continue;
      }
      const comp = manifest.withoutLoading ? manifest.comp : withIsLoading(manifest.comp);
      return withErrorBoundary(comp) as ExposingMultiCompConstructor;
    }
  },
  "button",
  childrenMap
);

function CachedView(props: { comp: Comp; name: string }) {
  return React.useMemo(
    () => (
      <Profiler id={props.name} onRender={profilerCallback}>
        <CompNameContext.Provider value={props.name}>
          {props.comp.getView()}
        </CompNameContext.Provider>
      </Profiler>
    ),
    [props.comp, props.name]
  );
}

function CachedPropertyView(props: {
  comp: Comp;
  name: string;
  withParamsContext: WithParamsContext;
}) {
  const prevHints = useContext(CompExposingContext);
  const { withParamsContext } = props;
  const hints = useMemo(
    () => ({
      ...prevHints,
      ...withParamsContext.params,
    }),
    [prevHints, withParamsContext.params]
  );
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    setSearchText("");
  }, [props.name]);
  return useMemo(() => {
    return (
      <>
        <CompName name={props.name} search={{ searchText, setSearchText }} />
        <CompNameContext.Provider value={props.name}>
          <CompExposingContext.Provider value={hints}>
            <SearchTextContext.Provider value={searchText}>
              <ScrollBar>
                <div style={{ paddingBottom: "80px" }}>{props.comp.getPropertyView()}</div>
              </ScrollBar>
            </SearchTextContext.Provider>
          </CompExposingContext.Provider>
        </CompNameContext.Provider>
      </>
    );
  }, [props.comp, props.name, hints, searchText, setSearchText]);
}

export class GridItemComp extends TmpComp {
  private readonly withParamsContext: WithParamsContext = { params: {} };
  override getView() {
    return <CachedView comp={this.children.comp} name={this.children.name.getView()} />;
  }

  override getPropertyView() {
    const name = this.children.name.getView();
    const comp = this.children.comp;
    return (
      <CachedPropertyView comp={comp} name={name} withParamsContext={this.withParamsContext} />
    );
  }

  autoHeight(): boolean {
    return this.children.comp.autoHeight();
    // Or add a node specifically for providing exposingData data
  }

  exposingInfo(): ExposingInfo {
    return this.children.comp.exposingInfo();
  }

  override reduce(action: CompAction): this {
    let comp = super.reduce(action);
    const withParamsContext = getReduceContext().withParamsContext;
    if (!shallowEqual(withParamsContext.params, this.withParamsContext.params)) {
      comp = setFieldsNoTypeCheck(comp, { withParamsContext }, { keepCacheKeys: ["node"] });
    }
    return comp;
  }
}

export type GridItemDataType = ConstructorToDataType<typeof GridItemComp>;

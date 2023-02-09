/**
 * The current file cannot import "comps", will cause circular dependencies
 */
import { CompName } from "components/CompName";
import { CompNameContext } from "comps/editorState";
import { withIsLoading, withTypeAndChildren } from "comps/generators";
import { CompExposingContext } from "comps/generators/withContext";
import { withErrorBoundary } from "comps/generators/withErrorBoundary";
import {
  ExposingMultiCompConstructor,
  UICompLayoutInfo,
  uiCompRegistry,
  UICompType,
} from "comps/uiCompRegistry";
import { ExposingInfo } from "comps/utils/exposingTypes";
import { getReduceContext, ListViewContext } from "comps/utils/reduceContext";
import _ from "lodash";
import { Comp, CompAction, ConstructorToDataType } from "openblocks-core";
import React, { Profiler, useContext, useMemo } from "react";
import { profilerCallback } from "util/cacheUtils";
import { setFieldsNoTypeCheck } from "util/objectUtils";
import { SimpleNameComp } from "./simpleNameComp";

const ITEM_CHAR = "ijklmn";

function getListExposingHints(listViewDepth: number): Record<typeof ITEM_CHAR[number], 0> {
  return _(_.range(0, Math.min(listViewDepth, ITEM_CHAR.length)))
    .map((i) => [ITEM_CHAR[i], 0] as const)
    .fromPairs()
    .value();
}

const compMap: Record<string, ExposingMultiCompConstructor> = {};

function getCompMap() {
  if (!compMap) {
    return compMap;
  }
  Object.entries(uiCompRegistry).forEach(([name, manifest]) => {
    const comp = manifest.withoutLoading ? manifest.comp : withIsLoading(manifest.comp);
    compMap[name as UICompType] = withErrorBoundary(comp);
  });
  return compMap;
}

export function defaultLayout(compType: UICompType): UICompLayoutInfo {
  return uiCompRegistry[compType]?.layoutInfo ?? { w: 5, h: 5 };
}

const TmpComp = withTypeAndChildren(getCompMap, "button", {
  name: SimpleNameComp,
});

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

function CachedPropertyView(props: { comp: Comp; name: string; listViewContext: ListViewContext }) {
  const prevHints = useContext(CompExposingContext);
  const prevCurrentItems = useMemo(
    () => (typeof prevHints?.currentItems === "object" ? prevHints?.currentItems : {}),
    [prevHints?.currentItems]
  );
  const { listViewContext } = props;
  const hints = useMemo(
    () => ({
      ...prevHints,
      ...getListExposingHints(listViewContext.listViewDepth),
      currentItem: { ...prevCurrentItems, ...listViewContext.currentItem },
    }),
    [prevHints, listViewContext.listViewDepth, listViewContext.currentItem, prevCurrentItems]
  );

  return useMemo(() => {
    return (
      <>
        <CompName name={props.name} />
        <CompNameContext.Provider value={props.name}>
          <CompExposingContext.Provider value={hints}>
            {props.comp.getPropertyView()}
          </CompExposingContext.Provider>
        </CompNameContext.Provider>
      </>
    );
  }, [props.comp, props.name, hints]);
}

export class GridItemComp extends TmpComp {
  private readonly listViewContext: ListViewContext = { listViewDepth: 0, currentItem: {} };
  override getView() {
    return <CachedView comp={this.children.comp} name={this.children.name.getView()} />;
  }

  override getPropertyView() {
    const name = this.children.name.getView();
    const comp = this.children.comp;
    return <CachedPropertyView comp={comp} name={name} listViewContext={this.listViewContext} />;
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
    const listViewContext = getReduceContext().listViewContext;
    if (listViewContext !== this.listViewContext)
      comp = setFieldsNoTypeCheck(comp, { listViewContext }, { keepCacheKeys: ["node"] });
    return comp;
  }
}

export type GridItemDataType = ConstructorToDataType<typeof GridItemComp>;

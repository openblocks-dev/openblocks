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
import { getReduceContext, ListViewContext } from "comps/utils/reduceContext";
import { parseCompType } from "comps/utils/remote";
import _ from "lodash";
import { Comp, CompAction, ConstructorToDataType } from "openblocks-core";
import React, { Profiler, useContext, useMemo } from "react";
import { profilerCallback } from "util/cacheUtils";
import { setFieldsNoTypeCheck } from "util/objectUtils";
import { remoteComp } from "./remoteComp/remoteComp";
import { SimpleNameComp } from "./simpleNameComp";

const ITEM_CHAR = "ijklmn";

function getListExposingHints(listViewDepth: number): Record<typeof ITEM_CHAR[number], 0> {
  return _(_.range(0, Math.min(listViewDepth, ITEM_CHAR.length)))
    .map((i) => [ITEM_CHAR[i], 0] as const)
    .fromPairs()
    .value();
}

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

function CachedPropertyView(props: { comp: Comp; name: string; listViewContext: ListViewContext }) {
  const prevHints = useContext(CompExposingContext);
  const prevCurrentItems = useMemo(
    () => (typeof prevHints?.currentItems === "object" ? prevHints?.currentItems : {}),
    [prevHints?.currentItems]
  );
  const { listViewContext } = props;
  const currentItem = useMemo(
    () => ({ ...prevCurrentItems, ...listViewContext.currentItem }),
    [listViewContext.currentItem, prevCurrentItems]
  );
  const hints = useMemo(
    () => ({
      ...prevHints,
      ...getListExposingHints(listViewContext.listViewDepth),
      ...(_.isEmpty(currentItem) ? {} : { currentItem }),
    }),
    [prevHints, listViewContext.listViewDepth, currentItem]
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

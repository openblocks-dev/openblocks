/**
 * The current file cannot import "comps", will cause circular dependencies
 */
import { Comp, ConstructorToDataType } from "openblocks-core";
import { CompNameContext } from "comps/editorState";
import { withIsLoading, withTypeAndChildren } from "comps/generators";
import {
  uiCompRegistry,
  ExposingMultiCompConstructor,
  UICompType,
  UICompLayoutInfo,
} from "comps/uiCompRegistry";
import { ExposingInfo } from "comps/utils/exposingTypes";
import { CompName } from "components/CompName";
import React, { Profiler } from "react";
import { profilerCallback } from "util/cacheUtils";
import { SimpleNameComp } from "./simpleNameComp";
import { withErrorBoundary } from "comps/generators/withErrorBoundary";

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

function CachedPropertyView(props: { comp: Comp; name: string }) {
  return React.useMemo(
    () => (
      <>
        <CompName name={props.name} />
        <CompNameContext.Provider value={props.name}>
          {props.comp.getPropertyView()}
        </CompNameContext.Provider>
      </>
    ),
    [props.comp, props.name]
  );
}

export class GridItemComp extends TmpComp {
  override getView() {
    return <CachedView comp={this.children.comp} name={this.children.name.getView()} />;
  }

  override getPropertyView() {
    const name = this.children.name.getView();
    const comp = this.children.comp;
    return <CachedPropertyView comp={comp} name={name} />;
  }

  autoHeight(): boolean {
    return this.children.comp.autoHeight();
    // Or add a node specifically for providing exposingData data
  }

  exposingInfo(): ExposingInfo {
    return this.children.comp.exposingInfo();
  }
}

export type GridItemDataType = ConstructorToDataType<typeof GridItemComp>;

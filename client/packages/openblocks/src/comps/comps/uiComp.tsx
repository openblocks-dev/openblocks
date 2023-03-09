import { CompConstructor, CompParams } from "openblocks-core";
import { withType, withViewFn } from "comps/generators";
import { COMP_DATA_TYPE } from "comps/generators/withType";
import { NameAndExposingInfo } from "comps/utils/exposingTypes";
import { findParentContainer } from "./containerBase/utils";
import { AppLayoutComp } from "./gridLayoutComp";
import { ModuleLayoutComp } from "./moduleContainerComp/moduleLayoutComp";

export type UiLayoutType = "normal" | "module" | "nav" | "mobileTabLayout";
/**
 * support different base layout
 */
const LayoutMap = {
  normal: AppLayoutComp, // grid layout
  module: ModuleLayoutComp, // Module
  // nav: NavLayout, // navigation layout
  // other basic layout
  // empty
};

/**
 * FIXME: type-safe
 * The navigation layout needs to be registered because it depends on rootComp
 */
export function registerLayoutMap(props: { compType: UiLayoutType; comp: CompConstructor }) {
  (LayoutMap as any)[props.compType] = props.comp;
}

const UICompTmp = withType(LayoutMap, "normal");

class UICompTmp2 extends UICompTmp {
  override parseChildrenFromValue(params: CompParams<COMP_DATA_TYPE<typeof LayoutMap>>) {
    // compatible with old data
    if (params.value && !params.value.compType) {
      return super.parseChildrenFromValue({
        value: { compType: "normal", comp: params.value as any },
        dispatch: params.dispatch,
      });
    }
    return super.parseChildrenFromValue(params);
  }

  override toJsonValue() {
    const result = super.toJsonValue();
    if (result.compType === "normal") {
      // temporarily do not modify the old data format
      return result.comp as any;
    }
    return result;
  }

  /**
   * this method is here due to historical reasons.
   * outside code should not use this method.
   */
  getComp() {
    const compType = this.children.compType.getView();
    if (!Object.keys(LayoutMap).includes(compType)) {
      return undefined;
    }
    return this.children.comp;
  }

  getModuleLayoutComp() {
    if (this.children.compType.getView() === "module") {
      return this.children.comp as ModuleLayoutComp;
    }
    return undefined;
  }

  getAllCompItems() {
    return this.children.comp.getAllCompItems();
  }

  getTopCompItems() {
    return this.children.comp.getCompTree().items;
  }

  getTree() {
    return this.children.comp.getCompTree();
  }

  findParentContainer(compName: string, containerCompType?: string) {
    return findParentContainer(
      undefined,
      this.children.comp.getCompTree(),
      compName,
      containerCompType
    );
  }

  nameAndExposingInfo(): NameAndExposingInfo {
    return this.children.comp.nameAndExposingInfo();
  }
}

const UIComp = withViewFn(UICompTmp2, (comp) => {
  return comp.children.comp.getView();
});

export default UIComp;

import { JSONValue } from "util/jsonTypes";
import { Comp, CompParams } from "openblocks-core";
import { UICompBuilder } from "comps/generators";
import {
  PropertyViewFnTypeForComp,
  ToConstructor,
  ToDataType,
  ViewFnTypeForComp,
} from "comps/generators/multi";
import { NewChildren as UiChildren } from "comps/generators/uiCompBuilder";
import { NameGenerator } from "comps/utils";
import { IContainer } from "./iContainer";
import { SimpleContainerComp } from "./simpleContainerComp";
import { CompTree, oldContainerParamsToNew } from "./utils";

// type UiChildren<ChildrenCompMap extends Record<string, Comp<unknown>>> = ChildrenCompMap;

export type ContainerChildren<ChildrenCompMap extends Record<string, Comp<unknown>>> =
  UiChildren<ChildrenCompMap> & {
    container: InstanceType<typeof SimpleContainerComp>;
  };

export function containerChildren<ChildrenCompMap extends Record<string, Comp<unknown>>>(
  childrenMap: ToConstructor<ChildrenCompMap>
): ToConstructor<ContainerChildren<ChildrenCompMap>> {
  return { ...childrenMap, container: SimpleContainerComp } as any;
}

export class ContainerCompBuilder<
  ViewReturn,
  ChildrenCompMap extends Record<string, Comp<unknown>>
> {
  private childrenMap: ToConstructor<ChildrenCompMap>;
  private viewFn: ViewFnTypeForComp<ViewReturn, ContainerChildren<ChildrenCompMap>>;
  private propertyViewFn?: PropertyViewFnTypeForComp<ContainerChildren<ChildrenCompMap>>;
  /**
   * If viewFn is not placed in the constructor, the type of ViewReturn cannot be inferred
   */
  constructor(
    childrenMap: ToConstructor<ChildrenCompMap>,
    viewFn: ViewFnTypeForComp<ViewReturn, ContainerChildren<ChildrenCompMap>>
  ) {
    this.childrenMap = childrenMap;
    this.viewFn = viewFn;
  }
  setPropertyViewFn(propertyViewFn: PropertyViewFnTypeForComp<ContainerChildren<ChildrenCompMap>>) {
    this.propertyViewFn = propertyViewFn;
    return this;
  }
  build() {
    if (!this.propertyViewFn) {
      throw new Error("no propertyViewFn provided");
    }
    if (this.childrenMap.hasOwnProperty("container")) {
      throw new Error("already has container");
    }
    const newChildrenMap = containerChildren(this.childrenMap);
    const TmpComp = new UICompBuilder(newChildrenMap, (props, dispatch) => {
      return this.viewFn(props as any, dispatch);
    })
      .setPropertyViewFn(this.propertyViewFn as any)
      .build();
    class Container extends TmpComp implements IContainer {
      realSimpleContainer(key?: string): SimpleContainerComp | undefined {
        return this.children.container.realSimpleContainer(key);
      }
      getCompTree(): CompTree {
        return this.children.container.getCompTree();
      }
      findContainer(key: string): IContainer | undefined {
        const foundContainer = this.children.container.findContainer(key);
        if (foundContainer) {
          return foundContainer === this.children.container ? this : foundContainer;
        }
        return undefined;
      }
      getPasteValue(nameGenerator: NameGenerator): JSONValue {
        const containerPasteValue = this.children.container.getPasteValue(nameGenerator);
        return { container: containerPasteValue };
      }
      override parseChildrenFromValue(
        params: CompParams<ToDataType<ContainerChildren<ChildrenCompMap>>>
      ): ContainerChildren<ChildrenCompMap> {
        // Compatible with old Container format
        const newParams = oldContainerParamsToNew(params);
        return super.parseChildrenFromValue(newParams);
      }
    }
    return Container;
  }
}

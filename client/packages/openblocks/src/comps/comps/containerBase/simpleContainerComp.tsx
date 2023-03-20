import { JSONValue } from "util/jsonTypes";
import { changeValueAction, CustomAction, multiChangeAction } from "openblocks-core";
import { ConstructorToDataType } from "openblocks-core";
import { sameTypeMap, stateComp, valueComp } from "comps/generators";
import { MultiCompBuilder } from "comps/generators/multi";
import { addMapChildAction, multiMapAction } from "comps/generators/sameTypeMap";
import { NameGenerator } from "comps/utils";
import { genRandomKey } from "comps/utils/idGenerator";
import { DEFAULT_POSITION_PARAMS, Layout, LayoutItem, PositionParams } from "layout";
import _ from "lodash";
import { GridItemComp, GridItemDataType } from "../gridItemComp";
import { IContainer, isContainer } from "./iContainer";
import { CompTree, getCompTree } from "./utils";

const children = {
  layout: valueComp<Layout>({}),
  items: sameTypeMap(GridItemComp),
  positionParams: stateComp<PositionParams>(DEFAULT_POSITION_PARAMS),
};

const SimpleContainerTmpComp = new MultiCompBuilder(children, (props, dispatch) => {
  return {
    ...props,
    dispatch: dispatch,
  };
})
  .setPropertyViewFn(() => <></>)
  .build();

export class SimpleContainerComp extends SimpleContainerTmpComp implements IContainer {
  realSimpleContainer(key?: string): SimpleContainerComp | undefined {
    const compMap = this.children.items.children;
    if (_.isNil(key) || compMap.hasOwnProperty(key)) {
      return this;
    }
  }
  getCompTree(): CompTree {
    const compMap = this.children.items.children;
    return getCompTree(compMap);
  }
  findContainer(key: string): IContainer | undefined {
    const compMap = this.children.items.children;
    if (compMap.hasOwnProperty(key)) {
      return this;
    }
    for (const childComp of Object.values(compMap)) {
      if (isContainer(childComp.children.comp)) {
        const childResult = childComp.children.comp?.findContainer?.(key);
        if (childResult) {
          return childResult;
        }
      }
    }
    return undefined;
  }
  getPasteValue(nameGenerator: NameGenerator): JSONValue {
    let compMap = this.children.items.children;

    const keyMap = _.mapValues(compMap, () => genRandomKey());
    let layout = this.children.layout.getView();
    layout = _.mapKeys(layout, (_, key) => keyMap[key]);
    layout = _.mapValues(layout, (item, key) => ({ ...item, i: key }));
    compMap = _.mapKeys(compMap, (_, key) => keyMap[key]);

    const newJSONValue = _.mapValues(compMap, (comp) => {
      const compValue = isContainer(comp.children.comp)
        ? (comp.children.comp as any).getPasteValue(nameGenerator)
        : comp.children.comp.toJsonValue();
      const name = nameGenerator.genItemName(comp.children.compType.getView());
      return { ...comp.toJsonValue(), name, comp: compValue };
    });

    const finalValue = {
      ...this.toJsonValue(),
      items: newJSONValue,
      layout,
    };
    // log.debug("getPasteValue. origin: ", this.toJsonValue(), " result: ", finalValue);
    return finalValue;
  }
}

export function toSimpleContainerData(
  infos: {
    item: GridItemDataType;
    layoutItem: LayoutItem;
  }[]
): ConstructorToDataType<typeof SimpleContainerComp> {
  const layout: Layout = {};
  const items: Record<string, GridItemDataType> = {};
  infos.forEach((info) => {
    const key = genRandomKey();
    layout[key] = { ...info.layoutItem, i: key };
    items[key] = info.item;
  });
  return {
    layout: layout,
    items: items,
  };
}

export function simpleContainerAddAction(
  currentLayout: Layout,
  infos: {
    item: GridItemDataType;
    layoutItem: LayoutItem;
  }[]
) {
  const data = toSimpleContainerData(infos);
  return multiChangeAction({
    layout: changeValueAction(
      {
        ...currentLayout,
        ...data.layout,
      },
      true
    ),
    items: multiMapAction(
      Object.entries(data.items ?? {}).map(
        ([key, value]) => addMapChildAction(key, value) as CustomAction
      )
    ),
  });
}

import { HookComp } from "comps/hooks/hookComp";
import _ from "lodash";
import { GridItemComp } from "../gridItemComp";

type CompItemType = GridItemComp | HookComp;

export type CompTree = {
  items: Record<string, CompItemType>;
  children: Record<string, CompTree>;
  itemOrder?: Array<string>;
};

export function getCompTree(compMap: Record<string, CompItemType>): CompTree {
  let children: Record<string, CompTree> = _.mapValues(
    compMap,
    (item) => (item.children.comp as any)?.getCompTree?.() ?? undefined
  );
  children = _.omitBy(children, _.isNil);
  return { items: { ...compMap }, children };
}

export function mergeCompTrees(compTrees: CompTree[]): CompTree {
  const items = {};
  const children = {};
  compTrees.forEach((compTree) => {
    _.assign(items, compTree.items);
    _.assign(children, compTree.children);
  });
  return { items, children };
}

export function getAllCompItems(compTree: CompTree): Record<string, CompItemType> {
  // log.debug("getAllCompItems. compMap: ", compMap);
  const allItems = { ...compTree.items };
  for (const [, childCompMap] of Object.entries(compTree.children)) {
    const allChildCompItems = getAllCompItems(childCompMap);
    for (const [k, v] of Object.entries(allChildCompItems)) {
      allItems[k] = v;
    }
  }
  return allItems;
}

export function traverseCompTree(
  compTree: CompTree,
  consumer: (item: CompItemType) => boolean
): boolean {
  for (const item of Object.values(compTree.items)) {
    if (item && !consumer(item)) {
      return false;
    }
  }
  for (const subTree of Object.values(compTree.children)) {
    if (subTree && !traverseCompTree(subTree, consumer)) {
      return false;
    }
  }
  return true;
}

// Find the parent container according to compName, can specify the parent container type
export function findParentContainer(
  containerItem: CompItemType | undefined,
  compTree: CompTree,
  compName: string,
  containerCompType?: string
): CompItemType | undefined {
  // Whether the container type matches
  if (
    !containerCompType ||
    (containerItem && containerItem.children.compType.getView() === containerCompType)
  ) {
    // find by compName
    if (Object.values(compTree.items).find((c) => c.children.name.getView() === compName)) {
      return containerItem;
    }
  }
  // recursively search
  for (const [key, tree] of Object.entries(compTree.children)) {
    const ret = findParentContainer(compTree.items[key], tree, compName, containerCompType);
    if (ret) {
      return ret;
    }
  }
}

export function oldContainerParamsToNew(params: any): any {
  // log.debug("oldContainerParamsToNew. params: ", params);
  if (
    params.value &&
    (params.value.hasOwnProperty("layout") || params.value.hasOwnProperty("items"))
  ) {
    const newValue = {
      ..._.omit(params.value, ["layout", "items"]),
      container: { layout: params.value.layout, items: params.value.items },
    };
    const newParams = { ...params, value: newValue };
    // log.debug("params: ", params, "newParams: ", newParams);
    return newParams;
  }
  return params;
}

export function fixOldStyleData(oldData: any) {
  if (
    oldData &&
    (oldData.hasOwnProperty("bgColor") ||
      oldData.hasOwnProperty("headerBgColor") ||
      oldData.hasOwnProperty("footerBgColor"))
  ) {
    return {
      ...oldData,
      style: {
        background: oldData.bgColor,
        headerBackground: oldData.headerBgColor,
        footerBackground: oldData.footerBgColor,
      },
    };
  }
  return oldData;
}

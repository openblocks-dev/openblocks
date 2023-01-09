import _ from "lodash";
import { memoizeN } from "util/memoize/memoizeN";
import { changeItemOp, LayoutOp, LayoutOpTypes, stickyItemOp } from "./layoutOp";
import {
  cascade,
  changeStickyItem,
  ExtraLayout,
  getStickyItemMap,
  Layout,
  modifyLayout,
  withLayoutItem,
} from "./utils";

export type LayoutOps = LayoutOp[];
export namespace layoutOpUtils {
  // try to reduce two adjacent ops to one
  function mergeOp(op1: LayoutOp, op2: LayoutOp): LayoutOp | undefined {
    if (op2.type === LayoutOpTypes.CHANGE_ITEM) {
      if (op1.type === LayoutOpTypes.CHANGE_ITEM && op1.key === op2.key) {
        return changeItemOp(op1.key, { ...op1.item, ...op2.item });
      }
    }
    if (op2.type === LayoutOpTypes.DELETE_ITEM) {
      if (
        (op1.type === LayoutOpTypes.CHANGE_ITEM ||
          op1.type === LayoutOpTypes.DELETE_ITEM ||
          op1.type === LayoutOpTypes.HIDE_ITEM) &&
        op1.key === op2.key
      ) {
        return op2;
      }
    }
    if (op2.type === LayoutOpTypes.STICKY_ITEM) {
      if (op1.type === LayoutOpTypes.STICKY_ITEM && op1.key === op2.key) {
        return stickyItemOp(op1.key, { ...op1.item, ...op2.item });
      }
    }
    return undefined;
  }

  function shouldSkipPrev(prevOp: LayoutOp, op: LayoutOp): boolean {
    if (
      op.type === LayoutOpTypes.CHANGE_ITEM ||
      op.type === LayoutOpTypes.DELETE_ITEM ||
      op.type === LayoutOpTypes.HIDE_ITEM
    ) {
      if (
        (prevOp.type === LayoutOpTypes.CHANGE_ITEM ||
          prevOp.type === LayoutOpTypes.DELETE_ITEM ||
          prevOp.type === LayoutOpTypes.HIDE_ITEM) &&
        prevOp.key !== op.key
      ) {
        return false;
      }
    }
    return true;
  }

  export function batchPush(ops: LayoutOps | undefined, newOps: LayoutOps): LayoutOps {
    let finalOps = ops ?? [];
    newOps.forEach((op) => {
      finalOps = push(finalOps, op);
    });
    return finalOps;
  }

  export function push(ops: LayoutOps | undefined, op: LayoutOp): LayoutOps {
    if (!ops) {
      return [op];
    }

    let newOps: LayoutOps = [];
    // check whether to reduce in the reversed order
    for (let i = ops.length - 1; i >= 0; --i) {
      const prevOp = ops[i];
      const newOp = mergeOp(prevOp, op);
      // can be merged or not
      if (newOp) {
        op = newOp;
      } else {
        newOps.push(prevOp);
        if (shouldSkipPrev(prevOp, op)) {
          newOps = newOps.concat(ops.slice(0, i).reverse());
          break;
        }
      }
    }
    newOps.reverse();
    newOps.push(op);
    return newOps;
  }
}

function reduce(layout: Layout, op: LayoutOp, stickyItemMap?: Record<string, Set<string>>): Layout {
  let newLayout = layout;
  switch (op.type) {
    case LayoutOpTypes.CHANGE_ITEM: {
      const item = layout[op.key];
      newLayout = modifyLayout(layout, { ...item, ...op.item });
      break;
    }
    case LayoutOpTypes.STICKY_ITEM: {
      const item = layout[op.key];
      newLayout = changeStickyItem(layout, { ...item, ...op.item }, stickyItemMap);
      break;
    }
    case LayoutOpTypes.HIDE_ITEM: {
      newLayout = withLayoutItem(layout, op.key, (item) => ({
        ...item,
        hide: true,
      }))[0];
      break;
    }
    case LayoutOpTypes.DELETE_ITEM: {
      newLayout = _.omit(layout, op.key);
      break;
    }
    case LayoutOpTypes.RENAME_ITEM: {
      const item = layout[op.sourceKey];
      if (_.isNil(item)) break;
      newLayout = {
        ..._.omit(layout, [op.sourceKey]),
        [op.targetKey]: { ...item, i: op.targetKey },
      };
      break;
    }
  }
  return newLayout;
}

/**
 * infer a final layout from a composite state
 * - sticky: pre calculate `stickyItemMap`, represent sticky relations between items
 * - hidden: set h=0 for the hidden items, reset h after completed
 *
 * @param layout saved source layout
 * @param extraLayout extra info providing hidden and isSelected properties for items
 * @param changedHs recorded autoHeight info
 * @param ops other operations
 * @returns final layout
 */
export let getUILayout = (
  layout: Layout,
  extraLayout: ExtraLayout | undefined,
  changedHs: Record<string, number> | undefined,
  ops: LayoutOps | undefined,
  setHiddenCompHeightZero: boolean = false
): Layout => {
  // log.log("getUILayout. layout: ", layout, " extraLayout: ", extraLayout, " changedHs: ", changedHs, " ops: ", ops);
  const stickyItemMap = getStickyItemMap(layout);
  const hiddenItemHeight = _.fromPairs(
    _.toPairs(extraLayout)
      .filter(([, extraItem]) => extraItem.hidden && !extraItem.isSelected)
      .map(([i]) => [i, layout[i].h])
  );
  const realOps = [
    ..._.toPairs(changedHs)
      .filter(([i]) => layout.hasOwnProperty(i))
      .map(([i, h]) => (layout[i].h > h ? stickyItemOp(i, { h }) : changeItemOp(i, { h }))),
    ...Object.keys(hiddenItemHeight).map((i) => stickyItemOp(i, { h: 0 })),
    ...(ops ?? []),
  ];
  realOps.forEach((op) => {
    layout = reduce(layout, op, stickyItemMap);
  });
  layout = cascade(layout);
  if (!setHiddenCompHeightZero) {
    const recoverHiddenOps = _.toPairs(hiddenItemHeight).map(([i, h]) => changeItemOp(i, { h }));
    recoverHiddenOps.forEach((op) => {
      layout = reduce(layout, op, stickyItemMap);
    });
  }
  // log.log("getUILayout. finalLayout: ", layout);
  return layout;
};

getUILayout = memoizeN(getUILayout, {});

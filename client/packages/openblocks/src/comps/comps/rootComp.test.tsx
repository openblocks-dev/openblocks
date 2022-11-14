import { Comp } from "openblocks-core";
import { evalAndReduce } from "comps/utils";

// This file contains the trials that all comps need to pass

test("layoutChangeNotCauseQueryChange", () => {
  // TODO
});

/**
 * debug tool
 * The reason why comp's reference was changed after eval.
 * 1. comp of the same value, but the return value of node has changed
 * 2. the node reference has not changed, but the reference of the eval value has changed
 * 3, the eval value's reference has not changed, but changed when reducing
 *
 */
function whyEvalChanged(comp: Comp) {
  if (comp.node() !== comp.node()) {
    return "same comp bad node";
  }
  if (comp.node()?.evaluate() !== comp.node()?.evaluate()) {
    return "same node bad eval";
  }
  const comp2 = evalAndReduce(comp);
  if (comp.node() !== comp2.node()) {
    return "equal comp bad node";
  }
  return "good";
}

/**
 * eval invariance, an important feature of comp
 */
function isEvalEqual(comp: Comp) {
  const newComp = evalAndReduce(comp);
  return comp === newComp;
}

test("trueData", () => {
  // let comp = new RootComp({
  //   value: ROOT_COMP_VALUE as any,
  // });
});

import { evalAndReduce } from "comps/utils";
import { Comp } from "openblocks-core";
import { NumberControl, StringControl } from "./codeControl";

function serialize(comp: Comp) {
  return JSON.stringify(comp.toJsonValue());
}

test("test code editor", () => {
  let comp = new StringControl({});
  expect(serialize(comp)).toEqual('""');
  const action = comp.changeValueAction("valueCode");
  comp = comp.reduce(action);
  expect(serialize(comp)).toEqual('"valueCode"');
});

test("test code editor value", () => {
  let comp = new StringControl({ value: "INIT_VALUE" });
  expect(serialize(comp)).toEqual('"INIT_VALUE"');
  comp = evalAndReduce(comp);
  expect(comp.getView()).toEqual("INIT_VALUE");
});

test("test number control", () => {
  // number control with string
  let comp = new NumberControl({ value: "111" });
  expect(serialize(comp)).toEqual('"111"');
  comp = evalAndReduce(comp);
  expect(comp.getView()).toEqual(111);

  // number control with number
  comp = new NumberControl({ value: -1 });
  expect(serialize(comp)).toEqual('"-1"');
  comp = evalAndReduce(comp);
  expect(comp.getView()).toEqual(-1);
});

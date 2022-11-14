import { changeValueAction } from "openblocks-core";
import { Comp } from "openblocks-core";
import { evalAndReduce } from "comps/utils";
import { StringControl } from "./codeControl";

function serialize(comp: Comp) {
  return JSON.stringify(comp.toJsonValue());
}

test("test code editor", () => {
  let comp = new StringControl({});
  expect(serialize(comp)).toEqual('""');
  const action = changeValueAction("valueCode");
  comp = comp.reduce(action);
  expect(serialize(comp)).toEqual('"valueCode"');
});

test("test code editor value", () => {
  let comp = new StringControl({ value: "INIT_VALUE" });
  expect(serialize(comp)).toEqual('"INIT_VALUE"');
  comp = evalAndReduce(comp);
  expect(comp.getView()).toEqual("INIT_VALUE");
});

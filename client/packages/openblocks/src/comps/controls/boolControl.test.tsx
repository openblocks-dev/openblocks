import { evalAndReduce } from "comps/utils";
import { BoolControl } from "./boolControl";

function changeAndExpect(comp: BoolControl, value: boolean | string, expected: boolean) {
  const newComp = evalAndReduce(comp.reduce(comp.changeValueAction(value)));
  expect(newComp.getView()).toEqual(expected);
  return newComp;
}
function changeMode(comp: BoolControl) {
  return evalAndReduce(comp.reduce(comp.changeModeAction()));
}

test("test bool control value", () => {
  let comp = new BoolControl({});
  expect(comp.getView()).toEqual(false);
  comp = changeAndExpect(comp, "true", true);
  comp = changeAndExpect(comp, "false", false);
  comp = changeAndExpect(comp, '{{"true"}}', true);
  comp = changeAndExpect(comp, "{{1-1}}", false);
  comp = changeAndExpect(comp, "{{1+3-4}}", false);
  comp = changeAndExpect(comp, "{{undefined}}", false);
  comp = changeAndExpect(comp, "{{null}}", false);
});

test("test bool control change mode", () => {
  let comp = new BoolControl({});
  expect(comp.getView()).toEqual(false);
  expect(comp.toJsonValue()).toEqual(false);
  comp = changeMode(comp);
  expect(comp.toJsonValue()).toEqual("false");
  comp = changeAndExpect(comp, "true", true);
  comp = changeMode(comp);
  expect(comp.toJsonValue()).toEqual(true);
  comp = changeMode(comp);
  expect(comp.toJsonValue()).toEqual("true");
  comp = changeAndExpect(comp, "{{1+3-4}}", false);
  comp = changeMode(comp);
  expect(comp.toJsonValue()).toEqual(false);
  comp = changeMode(comp);
  expect(comp.toJsonValue()).toEqual("{{1+3-4}}");
});

function changeModeAndReload(comp: BoolControl) {
  return evalAndReduce(
    new BoolControl({ dispatch: comp.dispatch, value: changeMode(comp).toJsonValue() })
  );
}

test("test bool control change mode and reload", () => {
  let comp = new BoolControl({});
  expect(comp.getView()).toEqual(false);
  expect(comp.toJsonValue()).toEqual(false);
  comp = changeModeAndReload(comp);
  expect(comp.toJsonValue()).toEqual("false");
  comp = changeAndExpect(comp, "true", true);
  comp = changeModeAndReload(comp);
  expect(comp.toJsonValue()).toEqual(true);
  comp = changeModeAndReload(comp);
  expect(comp.toJsonValue()).toEqual("true");
  comp = changeAndExpect(comp, "{{1+3-4}}", false);
  comp = changeModeAndReload(comp);
  expect(comp.toJsonValue()).toEqual(false);
  comp = changeModeAndReload(comp);
  expect(comp.toJsonValue()).toEqual("false");
});

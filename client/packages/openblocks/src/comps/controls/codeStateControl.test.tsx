import { MultiCompBuilder } from "comps/generators";
import { evalAndReduce } from "comps/utils";
import { fromValue } from "openblocks-core";
import { NameConfig, withExposingConfigs } from "../generators/withExposing";
import { arrayStringStateControl, StringStateControl } from "./codeStateControl";

test("test string state control", () => {
  const exposingNodes = {
    s1: fromValue("s1Value"),
  };
  const exposingNodesAdded = {
    ...exposingNodes,
    s2: fromValue("s2Value"),
  };
  const exposingNodesChanged = {
    s1: fromValue("s1Value"),
  };
  let comp = new StringStateControl({
    value: "3{{s1}}",
  });
  // const oldCode = comp.children.defaultValue;
  comp = evalAndReduce(comp, exposingNodes);
  // expect(comp.children.defaultValue).toBe(oldCode);
  expect(comp.getView().value).toBe("3s1Value");
  // trigger change when modify value
  comp = evalAndReduce(comp.reduce(comp.changeChildAction("value", "newx")), exposingNodes);
  expect(comp.getView().value).toBe("newx");
  // get stable value from multi eval
  comp = evalAndReduce(comp, exposingNodesAdded);
  expect(comp.getView().value).toBe("newx");
  // value changes when depends change
  comp = evalAndReduce(comp, exposingNodesChanged);
  expect(comp.getView().value).toBe("3s1Value");
});

test("test comp", () => {
  let TestComp = (function () {
    const childrenMap = {
      v1: arrayStringStateControl(["a"]),
    };

    return new MultiCompBuilder(childrenMap, (props) => {
      return "a";
    })
      .setPropertyViewFn(() => <></>)
      .build();
  })();
  TestComp = withExposingConfigs(TestComp, [new NameConfig("v1")]);
  let comp = new TestComp({});
  comp = evalAndReduce(comp);
  comp = evalAndReduce(comp);
  let comp2 = evalAndReduce(comp);
  expect(comp === comp2).toBeTruthy();
});

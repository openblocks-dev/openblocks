import { ExecuteAction } from "comps/controls/actionSelector/executeCompTypes";
import { BoolControl } from "comps/controls/boolControl";
import { StringControl } from "comps/controls/codeControl";
import { numberExposingStateControl } from "comps/controls/codeStateControl";
import { evalAndReduce } from "comps/utils";
import { customAction, Node, RecordNode } from "openblocks-core";
import { shallowEqual } from "util/objectUtils";
import { MultiCompBuilder, valueComp } from ".";
import { depsConfig, NameConfig, withExposingConfigs } from "./withExposing";

const TestComp = (function () {
  const childrenMap = {
    v1: valueComp("abc"),
    v2: valueComp("v2"),
    visible: BoolControl,
    value: StringControl,
    num: numberExposingStateControl("num"),
  };
  return new MultiCompBuilder(childrenMap, (props) => {
    return props;
  })
    .setPropertyViewFn(() => <></>)
    .build();
})();

const TestExposingComp = withExposingConfigs(TestComp, [
  new NameConfig("v1"),
  new NameConfig("visible"),
  new NameConfig("value"),
  new NameConfig("num"),
]);

test("exposing data and methods", () => {
  let comp = new TestExposingComp({});
  comp = evalAndReduce(comp);
  const oldNode = comp.extraNode()!.node;
  comp = evalAndReduce(comp.reduce(comp.changeChildAction("v2", "ppp")));
  expect(comp.children.v2.getView()).toBe("ppp");
  const newNode = comp.extraNode()!.node;
  expect(shallowEqual(oldNode, newNode)).toBe(true);
  comp = evalAndReduce(comp.reduce(comp.changeChildAction("v1", "v1_value")));
  expect(evalAndReduce(comp)).toBe(comp);
  expect(comp.exposingValues.v1).toBe("v1_value");
  expect(comp.exposingValues.visible).toBe(false);
  expect(Object.keys(comp.exposingInfo().methods)).toContain("setNum");
});

test("run exposing method", () => {
  let comp = new TestExposingComp({
    dispatch: (action) => {
      comp = evalAndReduce(comp.reduce(action));
    },
  });
  comp = evalAndReduce(comp);
  comp.reduce(
    customAction<ExecuteAction>(
      {
        type: "execute",
        methodName: "setNum",
        params: [100],
      },
      false
    )
  );
  expect(comp.getView().num.value).toEqual(100);
});

test("exposing deps", () => {
  const TestExposingComp2 = withExposingConfigs(TestComp, [
    new NameConfig("v1"),
    depsConfig({
      name: "X",
      desc: "",
      depKeys: ["v1", "visible"],
      func: (input) => {
        return input.v1 + " " + input.visible;
      },
    }),
  ]);
  let comp = new TestExposingComp2({});
  comp = evalAndReduce(comp);
  const oldNode = comp.exposingInfo().property;
  expect(comp.exposingValues.X).toBe("abc false");
  // Modifying v2 will not affect the reference of xx node
  comp = evalAndReduce(comp.reduce(comp.changeChildAction("v2", "ppp")));
  const newNode = comp.exposingInfo().property;

  function toX(node: RecordNode<Record<string, Node<unknown>>>) {
    return node.children["X"];
  }

  expect(toX(oldNode as any)).toBe(toX(newNode as any));
});

import {
  changeChildAction,
  changeValueAction,
  multiChangeAction,
  updateNodesV2Action,
  wrapChildAction,
} from "openblocks-core";
import { valueComp, withDefault } from ".";
import { Comp } from "openblocks-core";
import { MultiCompBuilder } from "./multi";
import { StringControl } from "comps/controls/codeControl";
import { evalAndReduce } from "comps/utils";
import { fromRecord, fromValue } from "openblocks-core";
import { BoolControl } from "comps/controls/boolControl";

const emptyViewFunc = (props: Record<string, any>) => {
  return <div></div>;
};
const TestComp = (function () {
  const childrenMap = {
    v1: valueComp<string>("abc"),
  };

  return new MultiCompBuilder(childrenMap, (props) => {
    return props.v1;
  })
    .setPropertyViewFn(emptyViewFunc)
    .build();
})();

function serialize(comp: Comp) {
  return JSON.stringify(comp.toJsonValue());
}

// shallow copy all values and methods.
test("test object create", () => {
  class A {
    a: number = 1;
    b: string = "abc";
    getValue() {
      return this.a + 10;
    }
  }
  const a = new A();
  expect(a.a).toEqual(1);
  expect(a.getValue()).toEqual(11);
  const b = Object.create(a);
  b.a = 2;
  expect(b.a).toEqual(2);
  expect(b.getValue()).toEqual(12);
  expect(a.a).toEqual(1);
  expect(a.getValue()).toEqual(11);
});

test("test action and reduce", () => {
  let comp = new TestComp({});
  expect(serialize(comp)).toEqual('{"v1":"abc"}');
  comp = comp.reduce(comp.changeChildAction("v1", "changed"));
  expect(serialize(comp)).toEqual('{"v1":"changed"}');
  comp = comp.reduce(comp.changeChildAction("v1", "changedXXXX"));
  expect(serialize(comp)).toEqual('{"v1":"changedXXXX"}');
});

test("test value constructor", () => {
  let comp = new TestComp({ value: { v1: "changed" } });
  expect(serialize(comp)).toEqual('{"v1":"changed"}');
});

const Test2Comp = (function () {
  const childrenMap = {
    v1: valueComp("abc"),
    v2: TestComp,
  };
  return new MultiCompBuilder(childrenMap, (props) => {
    return props;
  })
    .setPropertyViewFn(emptyViewFunc)
    .build();
})();

test("test multi2 toJson", () => {
  let comp = new Test2Comp({});
  const strValue = JSON.stringify(comp.toJsonValue());
  expect(strValue).toEqual('{"v1":"abc","v2":{"v1":"abc"}}');

  comp = comp.reduce(wrapChildAction("v2", comp.children.v2.changeChildAction("v1", "changed")));
  expect(serialize(comp)).toEqual('{"v1":"abc","v2":{"v1":"changed"}}');

  let comp2: Comp = new Test2Comp({ value: JSON.parse(serialize(comp)) });
  expect(serialize(comp2)).toEqual(serialize(comp));
});

test("test multi change action", () => {
  let comp = new Test2Comp({});
  expect(comp.getView().v1).toEqual("abc");
  expect(comp.getView().v2).toEqual("abc");
  const action = multiChangeAction({
    v1: changeValueAction("v1_value", true),
    v2: changeChildAction("v1", "xxxy", true),
  });
  comp = comp.reduce(action);
  expect(comp.getView().v1).toEqual("v1_value");
  expect(comp.getView().v2).toEqual("xxxy");
});

const Test3Comp = (function () {
  const childrenMap = {
    v1: valueComp<string>("abc"),
    v2: Test2Comp,
    v3: StringControl,
  };
  return new MultiCompBuilder(childrenMap, (props) => {
    return props.v3;
  })
    .setPropertyViewFn(emptyViewFunc)
    .build();
})();

test("test multi toNode", () => {
  const x = new Test3Comp({}).node().evaluate();
  expect(x.v3.value).toEqual("");
});

test("test comp don't change if no value change", () => {
  let comp = new Test3Comp({});
  expect(evalAndReduce(comp)).toBe(comp);
});

test("test cache", () => {
  let comp = evalAndReduce(new Test3Comp({}));
  const v1 = comp.children.v1;
  const v2 = comp.children.v2;
  comp = comp.reduce(comp.changeChildAction("v1", "XXX"));
  // v1 changed
  expect(comp.children.v1.getView()).toEqual("XXX");
  expect(comp.children.v1).not.toBe(v1);
  // v2 not change
  expect(comp.children.v2).toBe(v2);
  comp = evalAndReduce(comp);

  // The node obtained by the same comp is unchanged
  expect(comp.node()).toBe(comp.node());
  // comp references the same under the same updateNode
  const evalValue = comp.node().evaluate();
  comp = comp.reduce(updateNodesV2Action(evalValue));
  const comp2 = comp.reduce(updateNodesV2Action(evalValue));
  expect(comp2).toBe(comp);
  // The value evaled from the same node is the same
  expect(comp.node().evaluate()).toBe(comp.node().evaluate());
  // comp does not change, the result of eval remains unchanged
  expect(evalAndReduce(comp)).toBe(comp);
});

test("test code", () => {
  const CodeComp = (function () {
    const childrenMap = {
      v1: withDefault(StringControl, "{{a.b}}"),
    };
    return new MultiCompBuilder(childrenMap, (props) => {
      return props.v1;
    })
      .setPropertyViewFn(emptyViewFunc)
      .build();
  })();
  let comp = new CodeComp({});
  const exposingNode = {
    a: fromRecord({
      b: fromValue("abc"),
    }),
  };
  comp = evalAndReduce(comp, exposingNode);
  expect(comp.getView()).toEqual("abc");
});

test("removeDefault", () => {
  const Comp1 = (function () {
    const childrenMap = {
      v0: StringControl,
      v1: withDefault(StringControl, "{{a.b}}"),
      v2: BoolControl,
      v3: BoolControl.DEFAULT_TRUE,
    };
    return new MultiCompBuilder(childrenMap, (props) => props)
      .setPropertyViewFn(emptyViewFunc)
      .build();
  })();
  expect(evalAndReduce(new Comp1({})).toJsonValue()).toEqual({ v1: "{{a.b}}", v3: true });
  expect(
    evalAndReduce(
      new Comp1({ value: { v0: "", v1: "{{a.b}}", v2: false, v3: true } })
    ).toJsonValue()
  ).toEqual({ v1: "{{a.b}}", v3: true });
  expect(
    evalAndReduce(new Comp1({ value: { v0: "bc", v1: "", v2: true, v3: false } })).toJsonValue()
  ).toEqual({
    v0: "bc",
    v1: "",
    v2: true,
    v3: false,
  });
  expect(
    evalAndReduce(
      new Comp1({ value: { v0: "bc", v1: "{{a.b}}", v2: true, v3: true } })
    ).toJsonValue()
  ).toEqual({
    v0: "bc",
    v1: "{{a.b}}",
    v2: true,
    v3: true,
  });
});

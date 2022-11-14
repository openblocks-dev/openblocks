import {
  dependingNodeMapEquals,
  fromRecord,
  fromUnevaledValue,
  fromValue,
  Node,
  withFunction,
} from "eval";
import _ from "lodash";

it("simple test", () => {
  const n1 = fromValue("hi");
  const n1Value = n1.evaluate();
  expect(n1Value).toStrictEqual("hi");
});

it("fromUnevaledValue test", () => {
  const n1 = fromUnevaledValue("hi {{1+2}}");
  const n1Value = n1.evaluate();
  expect(n1Value).toStrictEqual("hi 3");
});

it("eval cache test", () => {
  const x = fromRecord({
    x1: fromValue("x1Value"),
    x2: fromUnevaledValue("x2 {{v2}}"),
  });
  const v1 = x.evaluate({});
  const v2 = x.evaluate({ x1: fromValue("hi") });
  expect(v1).toBe(v2);
});

it("integration test", async () => {
  const x = fromRecord({
    x1: fromValue("x1Value"),
    x2: fromUnevaledValue("x2 {{v2}}"),
  });
  const exposingNodes = {
    v1: fromValue("n1Value"),
    v2: fromValue(["l1", "l2"]),
    v3: fromUnevaledValue("hi {{1+2}} {{v1}}"),
    x: x,
  };
  const n1 = fromUnevaledValue("{{v1}} {{v2}} {{v3}}");
  const n2 = fromRecord({
    n1: n1,
    x: x,
    xfn: withFunction(x, (xValue) => xValue.x1 + xValue.x2),
  });
  const n1Value = n1.evaluate(exposingNodes);
  expect(n1Value).toStrictEqual("n1Value l1,l2 hi 3 n1Value");
  const n2Value = n2.evaluate(exposingNodes);
  expect(n2Value.n1).toStrictEqual("n1Value l1,l2 hi 3 n1Value");
  expect(n2Value.x.x1).toStrictEqual("x1Value");
  expect(n2Value.x.x2).toStrictEqual("x2 l1,l2");
  expect(n2Value.xfn).toStrictEqual("x1Valuex2 l1,l2");
  // expect(n2.maxEvalTime()).toEqual(n1.maxEvalTime());
  // expect(n2.maxEvalTime()).toBeGreaterThan(x.maxEvalTime());
  // expect(latestNode(x, n2).evaluate()).toEqual(n2.evaluate());
});

it("context test", () => {
  const v1 = fromRecord({
    xx: fromUnevaledValue("11 {{v2 + v1 + 10}}"),
  });
  const c1 = v1.wrapContext("v1,v2");
  const c1Value = c1.evaluate();
  expect(c1Value(10, 10).xx).toStrictEqual("11 30");
  expect(c1Value(11, 11).xx).toStrictEqual("11 32");
});

it("context test 2", () => {
  const v1 = fromRecord({
    xx: fromUnevaledValue("{{i}}"),
    yy: fromUnevaledValue("a{{i}}"),
  });
  const c1 = v1.wrapContext("i");
  const c1Value = c1.evaluate();
  expect(c1Value(1).xx).toStrictEqual(1);
  expect(c1Value(1).yy).toStrictEqual("a1");
});

it("map deep compare test", () => {
  const node1 = fromValue(1);
  const node2 = fromValue(1);
  const map1 = new Map<Node<unknown>, string[]>([[node1, ["n"]]]);
  const map2 = new Map<Node<unknown>, string[]>([[node2, ["n"]]]);
  expect(node1 === node2).toBe(false);
  expect(_.isEqual(map1, map2)).toBe(true);
  expect(dependingNodeMapEquals(map1, map2)).toBe(false);
});

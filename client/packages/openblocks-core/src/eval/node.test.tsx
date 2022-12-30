import {
  dependingNodeMapEquals,
  fromRecord,
  fromUnevaledValue,
  fromValue,
  Node,
  SimpleNode,
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

it("map deep compare test", () => {
  const node1 = new SimpleNode(1);
  const node2 = new SimpleNode(1);
  const map1 = new Map([[node1, new Set(["n"])]]);
  const map2 = new Map([[node2, new Set(["n"])]]);
  expect(node1 === node2).toBe(false);
  expect(_.isEqual(map1, map2)).toBe(true);
  expect(dependingNodeMapEquals(map1, map2)).toBe(false);
  expect(dependingNodeMapEquals(map1, map1)).toBe(true);

  expect(dependingNodeMapEquals(new Map(), new Map())).toBe(true);
  expect(dependingNodeMapEquals(undefined, map1)).toBe(false);
  expect(dependingNodeMapEquals(new Map(), map1)).toBe(false);
  expect(dependingNodeMapEquals(map1, new Map([[node1, new Set([])]]))).toBe(false);
  expect(dependingNodeMapEquals(map1, new Map([[node1, new Set(["b"])]]))).toBe(false);
  expect(dependingNodeMapEquals(map1, new Map([[node1, new Set(["n"])]]))).toBe(true);
});

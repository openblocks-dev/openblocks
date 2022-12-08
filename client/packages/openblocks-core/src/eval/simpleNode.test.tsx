import { fromValueWithCache } from "./simpleNode";

describe("simpleNode", () => {
  it("fromValue's Cache", () => {
    const a1Node = fromValueWithCache("a");
    const a2Node = fromValueWithCache("a");
    expect(a1Node === a2Node).toBeTruthy();

    const o1 = { 1: "a", 2: "b" };
    const o2 = { 1: "a", 2: "b" };
    const o1Node = fromValueWithCache(o1);
    const o2Node = fromValueWithCache(o2);
    const e1Node = fromValueWithCache(o1);
    expect(o1Node === e1Node).toBeTruthy();
    expect(o1Node === o2Node).toBeFalsy();
  });
});

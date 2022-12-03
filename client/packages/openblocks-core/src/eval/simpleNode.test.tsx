import { fromValue } from "./simpleNode";

describe("simpleNode", () => {
  it("fromValue's Cache", () => {
    const a1Node = fromValue("a");
    const a2Node = fromValue("a");
    expect(a1Node === a2Node).toBeTruthy();

    const o1 = { 1: "a", 2: "b" };
    const o2 = { 1: "a", 2: "b" };
    const o1Node = fromValue(o1);
    const o2Node = fromValue(o2);
    const e1Node = fromValue(o1);
    expect(o1Node === e1Node).toBeTruthy();
    expect(o1Node === o2Node).toBeFalsy();
  });
});

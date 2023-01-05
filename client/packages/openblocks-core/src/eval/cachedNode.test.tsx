import { evalNodeOrMinor } from "./cachedNode";
import { fromUnevaledValue } from "./codeNode";
import { fromValue } from "./simpleNode";
import { wrapContext } from "./wrapContextNode";

describe("CachedNode", () => {
  it("notCached test", () => {
    const x1 = fromUnevaledValue("1");
    const x2 = fromValue("2");
    expect(evalNodeOrMinor(x1, x2).evaluate()).toEqual("1");
    expect(evalNodeOrMinor(x1, x2).evaluate()).toEqual("2");
    expect(evalNodeOrMinor(x1, x2).evaluate()).toEqual("2");
  });
  it("isCached test", () => {
    const x1 = fromUnevaledValue("1");
    const x2 = fromValue("2");
    const x = evalNodeOrMinor(x1, x2);
    expect(x.evaluate()).toEqual("1");
    expect(x.evaluate()).toEqual("1");
  });

  it("isCached multi level test", () => {
    const exposingNodes = {
      e1: fromValue("e1V"),
      e2: evalNodeOrMinor(fromUnevaledValue("e21 {{e1}}"), fromValue("e22")),
    };
    const x1 = fromUnevaledValue("1 {{e1}} {{e2}}");
    const x2 = fromValue("2");
    const x = evalNodeOrMinor(x1, x2);
    expect(x.evaluate(exposingNodes)).toEqual("1 e1V e21 e1V");
    const newExposingNodes = {
      ...exposingNodes,
      e1: fromValue("e1Vn"),
    };
    expect(x.evaluate(newExposingNodes)).toEqual("1 e1Vn e21 e1Vn");
  });

  it("isCached multi inference test", () => {
    const x1 = fromUnevaledValue("1");
    const x2 = fromValue("2");
    expect(
      fromUnevaledValue("1 {{e1}} {{e2}}").evaluate({
        e1: evalNodeOrMinor(x1, x2),
        e2: evalNodeOrMinor(x1, x2),
      })
    ).toEqual("1 1 1");
  });

  it("wrapContext: evalNodeOrMinor", () => {
    const x1 = fromUnevaledValue("{{i}}");
    const x2 = fromValue("0");
    expect(wrapContext(evalNodeOrMinor(x1, x2)).evaluate()({ i: 2 })).toStrictEqual(2);
    expect(wrapContext(evalNodeOrMinor(x1, x2)).evaluate()({ i: 2 })).toStrictEqual("0");
    expect(wrapContext(evalNodeOrMinor(x1, x2)).evaluate()({ i: 2 })).toStrictEqual("0");
    expect(wrapContext(evalNodeOrMinor(x1, x2)).evaluate()({ i: 1 })).toStrictEqual(1);
    expect(wrapContext(evalNodeOrMinor(x1, x2)).evaluate()({ i: 1 })).toStrictEqual("0");
    expect(wrapContext(evalNodeOrMinor(x1, x2)).evaluate()({ i: 1 })).toStrictEqual("0");
    expect(wrapContext(evalNodeOrMinor(x1, x2)).evaluate()({ i: 3 })).toStrictEqual(3);
  });
});

import { fromUnevaledValue } from "./codeNode";
import { fromRecord } from "./recordNode";
import { fromValue } from "./simpleNode";
import { WrapContextNodeV2 } from "./wrapContextNodeV2";

const testNode = fromRecord({
  v1: fromUnevaledValue("v1: {{a0}} {{b0}} {{c0}}"),
  v2: fromUnevaledValue("v2: {{a1}} {{b0}} {{c0}}"),
});

describe("wrapContextNodeV2", () => {
  it("normal", () => {
    const contextNode = {
      a0: fromValue("a0"),
      b0: fromValue("b0"),
      c0: fromUnevaledValue("{{a0+b0}}"),
    };
    const exposingNodes = { a0: fromValue("a000"), a1: fromUnevaledValue("{{b0+b0}}") };
    const value = new WrapContextNodeV2(testNode, contextNode).evaluate(exposingNodes);
    const expectedValue = {
      v1: "v1: a0 b0 a0b0",
      v2: "v2: b0b0 b0 a0b0",
    };
    expect(value).toEqual(expectedValue);
  });
});

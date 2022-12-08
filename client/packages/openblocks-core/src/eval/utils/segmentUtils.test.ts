import { getDynamicStringSegments, isDynamicSegment } from "./segmentUtils";

describe("isDynmicSegment", () => {
  it("legal dynamic string should return true from isDynamicSegment", () => {
    expect(isDynamicSegment("{{}}")).toBe(true);
    expect(isDynamicSegment("{{ button }}")).toBe(true);
  });

  it("illegal dynamic string should not return true from isDynamicSegment", () => {
    expect(isDynamicSegment("{{")).toBe(false);
  });
});

describe.each([
  ["", []],
  ["{{A}}", ["{{A}}"]],
  ["A {{B}}", ["A ", "{{B}}"]],
  [
    "Hello {{Customer.Name}}, the status for your order id {{orderId}} is {{status}}",
    [
      "Hello ",
      "{{Customer.Name}}",
      ", the status for your order id ",
      "{{orderId}}",
      " is ",
      "{{status}}",
    ],
  ],
  ["{{data.map(datum => {return {id: datum}})}}", ["{{data.map(datum => {return {id: datum}})}}"]],
  ["{{}}{{}}}", ["{{}}", "{{}}", "}"]],
  ["{{{}}", ["{", "{{}}"]],
  ["a{{{A}}}b", ["a", "{{{A}}}", "b"]],
  ["{{{A}} {{B}}}", ["{", "{{A}}", " ", "{{B}}", "}"]],
  ["#{{'{'}}", ["#", "{{'{'}}"]],
  ["{{", ["{{"]],
  ["}}", ["}}"]],
  ["{{ {{", ["{{ {{"]],
  ["}} }}", ["}} }}"]],
  ["}} {{", ["}} {{"]],
])("getDynamicStringSegments(%s, %j)", (dynamicString, expected) => {
  test(`returns ${expected}`, () => {
    expect(getDynamicStringSegments(dynamicString as string)).toStrictEqual(expected);
  });
});

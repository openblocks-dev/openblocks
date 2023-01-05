import { fromUnevaledValue } from "./codeNode";
import { fromRecord } from "./recordNode";
import { wrapContext } from "./wrapContextNode";

it("context test", () => {
  const v1 = fromRecord({
    xx: fromUnevaledValue("11 {{v2 + v1 + 10}}"),
  });
  const c1 = wrapContext(v1);
  const c1Value = c1.evaluate();
  expect(c1Value({ v1: 10, v2: 10 }).xx).toStrictEqual("11 30");
  expect(c1Value({ v1: 11, v2: 11 }).xx).toStrictEqual("11 32");
  expect(c1Value({ v1: 11 }).xx).toStrictEqual("11 NaN");
  expect(c1Value().xx).toStrictEqual("11 NaN");
});

it("context test 2", () => {
  const v1 = fromRecord({
    xx: fromUnevaledValue("{{i}}"),
    yy: fromUnevaledValue("a{{i}}"),
  });
  const c1 = wrapContext(v1);
  const c1Value = c1.evaluate();
  expect(c1Value({ i: 1 }).xx).toStrictEqual(1);
  expect(c1Value({ i: 1 }).yy).toStrictEqual("a1");
  expect(c1Value({}).yy).toStrictEqual("a");
  expect(c1Value().yy).toStrictEqual("a");
});

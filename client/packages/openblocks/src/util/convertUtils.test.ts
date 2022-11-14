import {
  toString,
  toNumber,
  toBoolean,
  toStringArray,
  toJSONObject,
  showTransform,
} from "util/convertUtils";

test("toString", () => {
  expect(toString(undefined)).toEqual("");
  expect(toString(null)).toEqual("");

  expect(toString("")).toEqual("");
  expect(toString(" ")).toEqual(" ");
  expect(toString("abc")).toEqual("abc");

  expect(toString(0)).toEqual("0");
  expect(toString(3)).toEqual("3");
  expect(toString(-4)).toEqual("-4");
  expect(toString(1.2)).toEqual("1.2");

  expect(toString(false)).toEqual("false");
  expect(toString(true)).toEqual("true");

  expect(toString([])).toEqual("[]");
  expect(toString([3])).toEqual("[3]");
  expect(toString([3, 5])).toEqual("[3,5]");

  expect(toString({})).toEqual("{}");
  expect(toString({ a: 3, b: "4" })).toEqual('{"a":3,"b":"4"}');
});

test("toNumber", () => {
  expect(toNumber((undefined as any) + 0)).toEqual(0); // NaN
  expect(toNumber(NaN)).toEqual(0); // NaN
  expect(toNumber(undefined)).toEqual(0);
  expect(toNumber(null)).toEqual(0);

  expect(toNumber(0)).toEqual(0);
  expect(toNumber(3)).toEqual(3);
  expect(toNumber(-4)).toEqual(-4);
  expect(toNumber(1.2)).toEqual(1.2);

  expect(toNumber("")).toEqual(0);
  expect(toNumber(" ")).toEqual(0);
  expect(toNumber("abc")).toEqual(0);
  expect(toNumber("123abc")).toEqual(0);
  expect(toNumber("0")).toEqual(0);
  expect(toNumber("3")).toEqual(3);
  expect(toNumber("-4")).toEqual(-4);
  expect(toNumber("1.2")).toEqual(1.2);

  expect(toNumber(false)).toEqual(0);
  expect(toNumber(true)).toEqual(1);

  expect(toNumber([])).toEqual(0);
  expect(toNumber({})).toEqual(0);
});

test("toBoolean", () => {
  expect(toBoolean(undefined)).toEqual(false);
  expect(toBoolean(null)).toEqual(false);

  expect(toBoolean("")).toEqual(false);
  expect(toBoolean(" ")).toEqual(true);
  expect(toBoolean("abc")).toEqual(true);
  expect(toBoolean("0")).toEqual(false);
  expect(toBoolean("false")).toEqual(false);

  expect(toBoolean(0)).toEqual(false);
  expect(toBoolean(3)).toEqual(true);
  expect(toBoolean(-4)).toEqual(true);
  expect(toBoolean(1.2)).toEqual(true);

  expect(toBoolean(false)).toEqual(false);
  expect(toBoolean(true)).toEqual(true);

  expect(toBoolean([])).toEqual(true);
  expect(toBoolean({})).toEqual(true);
});

test("toJSONObject", () => {
  expect(toJSONObject(undefined)).toEqual({});
  expect(toJSONObject(null)).toEqual({});

  expect(toJSONObject("")).toEqual({});

  expect(toJSONObject({})).toEqual({});
  expect(toJSONObject({ a: 3, b: "4" })).toEqual({ a: 3, b: "4" });
});

test("toStringArray", () => {
  expect(toStringArray(undefined)).toEqual([]);
  expect(toStringArray(null)).toEqual([]);

  expect(toStringArray("")).toEqual([]);

  expect(toStringArray([])).toEqual([]);
  expect(toStringArray([3])).toEqual(["3"]);
  expect(toStringArray([3, 5])).toEqual(["3", "5"]);
  expect(toStringArray(["abc", 5])).toEqual(["abc", "5"]);
});

test("showTransform", () => {
  expect(showTransform("", "")).toBe(false);
  expect(showTransform("efg", "efg")).toBe(false);
  expect(showTransform("   abc   ", " abc ")).toBe(false);
  expect(showTransform("abc", "efg")).toBe(true);
  expect(showTransform(123.4, "123.4")).toBe(false);
  expect(showTransform(123.5, "123.4")).toBe(true);
  expect(showTransform(0, "0")).toBe(false);
  expect(showTransform(0, "")).toBe(true);
  expect(showTransform(true, "true")).toBe(false);
  expect(showTransform(false, "false")).toBe(false);
  expect(showTransform(false, "true")).toBe(true);
  expect(showTransform(false, "")).toBe(true);
  expect(showTransform([], "[]")).toBe(false);
  expect(showTransform({}, "{}")).toBe(false);
  expect(showTransform({}, "")).toBe(true);
  expect(showTransform(undefined, "")).toBe(true);
  expect(showTransform(undefined, "undefined")).toBe(true);
  expect(showTransform(null, "")).toBe(true);
  expect(showTransform(null, "null")).toBe(true);

  expect(showTransform(123.5, 123.5)).toBe(false);
  expect(showTransform(123.4, 123.5)).toBe(true);
  expect(showTransform("123.5", 123.5)).toBe(false);
  expect(showTransform("123.4", 123.5)).toBe(true);
  expect(showTransform("123.5abc", 123.5)).toBe(true);
  expect(showTransform("", 0)).toBe(true);
  expect(showTransform(true, 1)).toBe(true);
  expect(showTransform(false, 0)).toBe(true);
  expect(showTransform([], 0)).toBe(true);
  expect(showTransform({}, 0)).toBe(true);
  expect(showTransform(undefined, 0)).toBe(true);
  expect(showTransform(null, 0)).toBe(true);
  expect(showTransform(NaN, 0)).toBe(true);
  expect(showTransform(Infinity, 0)).toBe(true);

  expect(showTransform(false, false)).toBe(false);
  expect(showTransform(true, true)).toBe(false);
  expect(showTransform(false, true)).toBe(true);
  expect(showTransform(true, false)).toBe(true);
  expect(showTransform("abc", true)).toBe(true);
  expect(showTransform("", false)).toBe(true);
  expect(showTransform("0", false)).toBe(true);
  expect(showTransform("true", true, "true  ")).toBe(false);
  expect(showTransform("true", true, "{{'true'}}")).toBe(true);
  expect(showTransform("false", false, "  false")).toBe(false);
  expect(showTransform("false", false, "{{'false'}}")).toBe(true);
  expect(showTransform(123.5, true)).toBe(true);
  expect(showTransform(0, false)).toBe(true);
  expect(showTransform([], true)).toBe(true);
  expect(showTransform({}, true)).toBe(true);
  expect(showTransform(undefined, false)).toBe(true);
  expect(showTransform(null, false)).toBe(true);

  expect(showTransform("", undefined)).toBe(true);
  expect(showTransform(0, undefined)).toBe(true);
  expect(showTransform(false, undefined)).toBe(true);
  expect(showTransform([], undefined)).toBe(true);
  expect(showTransform({}, undefined)).toBe(true);
  expect(showTransform(undefined, undefined)).toBe(false);
  expect(showTransform(null, undefined)).toBe(true);

  expect(showTransform("", null)).toBe(true);
  expect(showTransform(0, null)).toBe(true);
  expect(showTransform(false, null)).toBe(true);
  expect(showTransform([], null)).toBe(true);
  expect(showTransform({}, null)).toBe(true);
  expect(showTransform(undefined, null)).toBe(true);
  expect(showTransform(null, null)).toBe(false);

  expect(showTransform(undefined, [])).toBe(true);
  expect(showTransform(null, [])).toBe(true);

  expect(showTransform(undefined, {})).toBe(true);
  expect(showTransform(null, {})).toBe(true);
});

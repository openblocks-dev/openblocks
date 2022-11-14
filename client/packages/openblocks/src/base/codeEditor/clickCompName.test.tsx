import { getCompNameRanges, getJsCompNameRanges } from "./clickCompName";

test("getJsCompNameRanges", () => {
  expect(getJsCompNameRanges("", {})).toStrictEqual([]);
  expect(getJsCompNameRanges(" ", {})).toStrictEqual([]);
  expect(getJsCompNameRanges("input1")).toStrictEqual([]);
  expect(getJsCompNameRanges("input1", {})).toStrictEqual([]);

  expect(getJsCompNameRanges("input1.value", { input1: { value: 3 }, value: 1 })).toStrictEqual([
    [0, 6],
  ]);

  expect(
    getJsCompNameRanges("input12 input1.value", { input1: { value: 3 }, value: 1 })
  ).toStrictEqual([[8, 14]]);

  expect(
    getJsCompNameRanges("input1 value input1 input12", { input1: { value: 3 }, value: 1 })
  ).toStrictEqual([
    [0, 6],
    [7, 12],
    [13, 19],
  ]);

  expect(
    getJsCompNameRanges("  input1.value+query3[0]*text", { input1: 3, query3: 1, text: "" })
  ).toStrictEqual([
    [2, 8],
    [15, 21],
    [25, 29],
  ]);
});

test("getCompNameRanges", () => {
  expect(getCompNameRanges("", undefined, {})).toStrictEqual([]);
  expect(getCompNameRanges(" ", undefined, {})).toStrictEqual([]);
  expect(getCompNameRanges("input1")).toStrictEqual([]);
  expect(getCompNameRanges("input1", undefined, {})).toStrictEqual([]);

  expect(
    getCompNameRanges("input1.value", "Function", { input1: { value: 3 }, value: 1 })
  ).toStrictEqual([[0, 6]]);

  expect(
    getCompNameRanges("input1.value", undefined, { input1: { value: 3 }, value: 1 })
  ).toStrictEqual([]);

  expect(
    getCompNameRanges("input1.value{{input1.value+query3[0]*text}}abe{{query3}}", undefined, {
      input1: 3,
      query3: 1,
      text: "",
    })
  ).toStrictEqual([
    [14, 20],
    [27, 33],
    [37, 41],
    [48, 54],
  ]);
});

import { isNumeric } from "util/stringUtils";

test("test is isNumeric", () => {
  expect(isNumeric(true)).toEqual(false);
  expect(isNumeric(0)).toEqual(true);
  expect(isNumeric(-4)).toEqual(true);
  expect(isNumeric(1.2)).toEqual(true);
  expect(isNumeric(Number(3))).toEqual(true);
  expect(isNumeric("13.3")).toEqual(true);
  expect(isNumeric("-13.3")).toEqual(true);
  expect(isNumeric("")).toEqual(false);
  expect(isNumeric(undefined)).toEqual(false);
  expect(isNumeric(null)).toEqual(false);
  expect(isNumeric({})).toEqual(false);
  expect(isNumeric([])).toEqual(false);
  expect(isNumeric([3])).toEqual(false);
});

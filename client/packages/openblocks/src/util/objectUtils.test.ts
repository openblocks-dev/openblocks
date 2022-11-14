import { limitExecutor, setFields, setFieldsNoTypeCheck } from "./objectUtils";

class A {
  v1: string;
  private v2: number;
  constructor(v1: string, v2: number) {
    this.v1 = v1;
    this.v2 = v2;
  }
  getV2Add() {
    return this.v2 + 10;
  }
}
test("test bool control value", () => {
  const a = new A("XX", 10);
  let a2 = setFields(a, {});
  expect(a2.v1).toEqual("XX");
  expect(a2.getV2Add()).toEqual(20);
  a2 = setFields(a, { v1: "X2" });
  expect(a2.v1).toEqual("X2");
  a2 = setFieldsNoTypeCheck(a, { v1: "YY", v2: 13 });
  expect(a2.v1).toEqual("YY");
  expect(a2.getV2Add()).toEqual(23);
});

test("test limit executors", async () => {
  const target = {};
  let cnt = 0;
  limitExecutor(
    target,
    "test",
    "throttle",
    200
  )(() => {
    cnt += 1;
  });

  await new Promise((r) => setTimeout(r, 10));

  limitExecutor(
    target,
    "test",
    "throttle",
    200
  )(() => {
    throw new Error("fail");
  });
  expect(cnt).toEqual(1);
  // delay changed, so add one on
  limitExecutor(
    target,
    "test",
    "throttle",
    300
  )(() => {
    cnt += 1;
  });
  expect(cnt).toEqual(2);
});

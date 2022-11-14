import { memo } from "./cacheUtils";

class A {
  cnt = 0;

  @memo
  getV() {
    return this.getWithoutMemo();
  }

  getWithoutMemo() {
    this.cnt += 1;
    return 1 + this.cnt;
  }
}

test("test memo", () => {
  let a = new A();
  expect(a.getWithoutMemo()).toEqual(2);
  expect(a.getWithoutMemo()).toEqual(3);
  expect(a.getWithoutMemo()).toEqual(4);
  a = new A();
  expect(a.getV()).toEqual(2);
  expect(a.getV()).toEqual(2);
  expect(a.getV()).toEqual(2);
});

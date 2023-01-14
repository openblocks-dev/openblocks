import { shallowEqual } from "util/objectUtils";
import { memoized } from ".";

describe("memorize", () => {
  it("memorize_with_shallowEqual", () => {
    class Test {
      @memoized([shallowEqual])
      test(record: Record<string, Record<string, number>>) {
        console.info("cache: ", (this as any).__cache.test, " record: ", record);
        return Math.random();
      }
    }
    const test = new Test();
    const sub1 = { a: 1 },
      sub2 = { b: 2 },
      sub3 = { c: 3 };
    const rec1 = { a: sub1, b: sub2 };
    const rec2 = { a: sub1, b: sub2 };
    const rec3 = { c: sub3 };
    test.test(rec3);
    test.test(rec1);
    (test as any).__cache.test.value = 123;
    expect(test.test(rec2)).toEqual(123);
  });
});

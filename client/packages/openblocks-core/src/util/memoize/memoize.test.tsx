import { shallowEqual } from "util/objectUtils";
import { memoized } from ".";

describe("memoized", () => {
  it("shallowEqual", () => {
    class Test {
      data: Record<string, number> = {};
      @memoized([shallowEqual])
      test(record: Record<string, Record<string, number>>) {
        const key = Object.values(record)
          .flatMap((t) => Object.values(t))
          .join("");
        const num = this.data[key] ?? 0;
        this.data[key] = num + 1;
        return key + ":" + num;
      }
    }
    const test = new Test();
    const sub1 = { a: 1 },
      sub2 = { b: 2 },
      sub3 = { c: 3 };
    const rec1 = { a: sub1, b: sub2 };
    const rec2 = { a: sub1, b: sub2 };
    const rec3 = { c: sub3 };
    expect(test.test(rec1)).toEqual("12:0");
    expect(test.test(rec2)).toEqual("12:0");
    expect(test.test(rec3)).toEqual("3:0");
    expect(test.test(rec2)).toEqual("12:1");
  });
  it("cyclic", () => {
    class Test {
      cyclic: boolean = false;
      @memoized()
      test(): any {
        if (this.cyclic) {
          return 5;
        }
        this.cyclic = true;
        const ret = this.test();
        this.cyclic = false;
        return ret + ":3";
      }
    }
    const test = new Test();
    expect(test.test()).toEqual("5:3");
  });
});

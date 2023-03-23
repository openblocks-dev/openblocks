import {
  clearMockWindow,
  createBlackHole,
  evalFunc,
  evalScript,
  SandBoxOption,
} from "./evalScript";

test("evalFunc", () => {
  expect(() => evalFunc("return fetch();", {})).not.toThrow();
  expect(() =>
    evalFunc("return fetch('https://example.com/');", {}, undefined, { disableLimit: true })
  ).not.toThrow();
  expect(() =>
    evalFunc("setTimeout(() => {});", {}, undefined, { disableLimit: true })
  ).not.toThrow();
  expect(evalFunc("console.info(window.fetch);return window.fetch;", {}, {})).not.toBe(
    window.fetch
  );
  expect(evalFunc("return window.seTimeout", {}, {}, { scope: "expression" })).not.toBe(
    window.setTimeout
  );
  expect(evalFunc("return window.setTimeout", {}, {}, { scope: "function" })).toBe(
    window.setTimeout
  );
});

test("evalFuncDisableLimit", async () => {
  const st = evalFunc("return window.setTimeout", {}, {}, { disableLimit: true });
  let i = 1;
  await new Promise((r) => {
    st(() => {
      i += 1;
      r("");
    });
  });
  expect(i).toBe(2);

  const stMock = evalFunc("return window.setTimeout", {});
  const p = await Promise.race([
    new Promise((r) => stMock(r)),
    new Promise((r) => setTimeout(() => r(1), 100)),
  ]);
  expect(p).toBe(1);
});

describe("evalScript", () => {
  it("get", () => {
    expect(evalScript("btoa('hello')", {})).toBe("aGVsbG8=");
    expect(evalScript("atob('aGVsbG8=')", {})).toBe("hello");
    expect(evalScript("isNaN(3)", {})).toBe(false);
    expect(evalScript("NaN", {})).toBe(NaN);
    expect(evalScript("undefined", {})).toBe(undefined);
    expect(evalScript("123//abc", {})).toBe(123);

    let context = { input1: { value: { test: 7, tefe: null } } };
    expect(evalScript("input1", context)).toStrictEqual({
      value: { test: 7, tefe: null },
    });
    expect(evalScript("JSON.stringify(input1)", context)).toStrictEqual(
      JSON.stringify({
        value: { test: 7, tefe: null },
      })
    );
    expect(evalScript("input1.value", context)).toStrictEqual({ test: 7, tefe: null });
    expect(evalScript("input1.value.test+4", context)).toBe(11);
    expect(evalScript("input1.value.tefe", context)).toBe(null);
    expect(evalScript("input1.vvv", context)).toBe(undefined);
    expect(evalScript("input1.value.vwfe", context)).toBe(undefined);
    expect(evalScript("a[0]", { a: [] })).toBe(undefined);

    expect(evalScript("abc", {})).toBeUndefined();
    expect(evalScript("window.window === window", {})).toBe(true);
    expect(evalScript("window.window", {})).not.toBe(window);
    expect(evalScript("window.global", {})).not.toBe(window);
    expect(evalScript("setTimeout in window", {})).toBe(true);
    expect(evalScript("WebSocket in window", {})).toBe(true);
    expect(evalScript("anything in window", {})).toBe(true);
    expect(evalScript("window.someThingNotExisted", {})).toBe(undefined);
    expect(evalScript("JSON.stringify(1+2)", {})).toBe("3");

    // mock window doesn't need to throw
    expect(() => evalScript("window", {})).not.toThrow();
    expect(() => evalScript("globalThis", {})).not.toThrow();
    expect(() => evalScript("self", {})).not.toThrow();

    expect(() => evalScript("top", {})).not.toThrow();
    expect(() => evalScript("parent", {})).not.toThrow();
    expect(() => evalScript("document", {})).not.toThrow();
    expect(() => evalScript("location", {})).not.toThrow();
    expect(() => evalScript("setTimeout(() => {})", {})).not.toThrow();
  });

  it("set", () => {
    // expect(() => evalScript("isNaN=3;", {})).toThrow();
    // expect(() => evalScript("NaN=3", {})).toThrow();
    // expect(() => evalScript("undefined=3", {})).toThrow();

    let context = { input1: { value: { test: 7 } } };
    expect(() => evalScript("input1=3", context)).toThrow();
    expect(() => evalScript("input1.value=3", context)).toThrow();
    expect(() => evalScript("input1.value.test=3", context)).toThrow();
    expect(evalScript("input1.value.test", context)).toBe(7);

    // expect(() => evalScript("JSON=3", {})).toThrow();
    // expect(() => evalScript("undefined=3", {})).toThrow();

    expect(() => evalScript("window=3", {})).toThrow();
    expect(() => evalScript("self=3", {})).toThrow();
    expect(() => evalScript("globalThis=3", {})).toThrow();

    // expect(() => evalScript("top=3", {})).toThrow();
    // expect(() => evalScript("parent=3", {})).toThrow();
    // expect(() => evalScript("document=3", {})).toThrow();
    // expect(() => evalScript("location=3", {})).toThrow();
    // expect(() => evalScript("setTimeout=3", {})).toThrow();
    // expect(() => evalScript("abc=3", {})).toThrow();
  });

  it("defineProperty", () => {
    expect(() => evalScript("Object.defineProperty(this, 'isNaN', {})", {})).not.toThrow();
    expect(() => evalScript("Object.defineProperty(this, 'NaN', {})", {})).not.toThrow();
    expect(() => evalScript("Object.defineProperty(this, 'undefined', {})", {})).not.toThrow();
    expect(() => evalScript("Object.defineProperty(this, 'setTimeout', {})", {})).not.toThrow();
    expect(() => evalScript("Object.defineProperty(this, 'window', {})", {})).toThrow();

    let context = { input1: { value: { test: 7 } } };
    expect(() => evalScript("Object.defineProperty(this, 'input1', {})", context)).toThrow();
    expect(() => evalScript("Object.defineProperty(input1, 'value1', {})", context)).toThrow();
    expect(() => evalScript("Object.defineProperty(input1.value, 'test1', {})", context)).toThrow();
  });

  it("deleteProperty", () => {
    // expect(() => evalScript("delete this.isNaN", {})).toThrow();
    // expect(() => evalScript("delete isNaN", {})).toThrow();
    expect(() => evalScript("delete this.window", {})).toThrow();
    expect(() => evalScript("delete window", {})).toThrow();

    let context = { input1: { value: { test: 7 } } };
    expect(() => evalScript("delete input1", context)).toThrow();
    expect(() => evalScript("delete this.input1", context)).toThrow();
    expect(() => evalScript("delete input1.value", context)).toThrow();
    expect(() => evalScript("delete input1.value.test", context)).toThrow();
  });

  it("setPrototypeOf", () => {
    let context = { input1: { value: { test: 7 } } };
    expect(() => evalScript("Object.setPrototypeOf(input1, {})", context)).toThrow();
    expect(() => evalScript("Object.setPrototypeOf(input1.value, {})", context)).toThrow();
  });

  it("mockWindow", () => {
    clearMockWindow();
    expect(() => evalScript("window.setTimeout", {})).not.toThrow();
    expect(evalScript("window.crypto", {})).not.toBeUndefined();
    expect(evalScript("this.crypto", {})).not.toBeUndefined();
    expect(evalScript("crypto", {})).not.toBeUndefined();

    evalFunc("window.a1 = 1;", {});
    expect(evalScript("window.a1", {})).toBe(1);
  });

  it("onSetGlobalVars", () => {
    clearMockWindow();

    let globalVars: string[] = [];
    const onSetGlobalVars = (v: string) => {
      if (!globalVars.includes(v)) {
        globalVars.push(v);
      }
    };
    const options: SandBoxOption = { onSetGlobalVars, scope: "function" };
    evalFunc("a = 1; window.b = 2; this.c = 3;", {}, {}, options);
    expect(globalVars).toEqual(["a", "b", "c"]);

    globalVars = [];
    evalFunc("d = 1; window.e = 2; ; window.window.g = 2; this.f = 3;", {}, {}, options);
    expect(globalVars).toEqual(["d", "e", "g", "f"]);
  });

  it("black hole is everything", () => {
    const a = createBlackHole();
    [
      () => a(),
      () => a + "",
      () => a.toString(),
      () => JSON.stringify(a),
      () => a.b.c.e.f.g,
      () => a ** 2,
      () => a.trim(),
      () =>
        JSON.stringify(a, (k, v) => {
          switch (typeof v) {
            case "bigint":
              return v.toString();
          }
          return v;
        }),
    ].forEach((i) => {
      expect(i).not.toThrow();
    });
  });
});

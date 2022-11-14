import { evalFunction, evalJson } from "./string2Fn";

function test1() {
  return 5;
}
function test2() {
  return 7;
}

describe.each([
  ["", ""],
  [" ", ""],

  ["  {{'abc'}}", "abc"],
  ["{{123}}  ", 123],
  ["{{true}}", true],
  ["{{false}}", false],

  ["  ab cef ", "ab cef"],
  ["  ab cef{{123}} ", "ab cef123"],

  ["[ab, {{123}}]", ["ab", 123]],

  // relaxed json key
  ['{ "": 666 }', { "": 666 }],
  ['{ " ": 666 }', { " ": 666 }],
  ['{ "key": 666 }', { key: 666 }],
  ['{ "key": "\\{" }', { key: "{" }],
  ['{ "key": "\\\\{" }', { key: "\\{" }],
  ['{ " abc key e ": 666 }', { " abc key e ": 666 }],
  ["{ ' abc key e ': 666 }", { " abc key e ": 666 }],
  ["{ null: 666 }", { null: 666 }],
  ["{ key: 666 }", { key: 666 }],
  ["{ 123: 666 }", { "123": 666 }],
  ["{ 12.3: 666 }", { "12.3": 666 }],
  ["[{ 12.3: 666 }]", [{ "12.3": 666 }]],

  // relaxed json value
  ["{ 'kkk': \"\" }", { kkk: "" }],
  ["{ 'kkk': \" \" }", { kkk: " " }],
  ["{ 'kkk': \"key\" }", { kkk: "key" }],
  ["{ 'kkk': \" abc key e \" }", { kkk: " abc key e " }],
  ["{ 'kkk': ' abc key e ' }", { kkk: " abc key e " }],
  ["{ 'kkk': null }", { kkk: null }],
  ["{ 'kkk': key }", { kkk: "key" }],
  ["{ 'kkk': 123 }", { kkk: 123 }],
  ["{ 'kkk': 12.3 }", { kkk: 12.3 }],

  // relaxed json key, with {{}}
  ["{ {{}}: 666 }", { "": 666 }],
  ["{ {{cnull}}: 666 }", { null: 666 }],
  ["{ {{s0}}: 666 }", { "": 666 }],
  ["{ {{s1}}: 666 }", { " ": 666 }],
  ["{ {{s2}}: 666 }", { "abc def": 666 }],
  ["{ {{s3}}: 666 }", { " fdf fdfd'\" ": 666 }],
  ["{ {{n1}}: 666 }", { "57": 666 }],
  ["{ {{n2}}: 666 }", { "4.69": 666 }],
  ["{ {{ n1 + n2 }} : 666 }", { "61.69": 666 }],
  ["{ {{ n1 + n2 }}end : 666 }", { "61.69end": 666 }],
  ["{ st{{ n1 + n2 }}mi{{7.3}}end : 666 }", { "st61.69mi7.3end": 666 }],

  // relaxed json value, with {{}}
  ["{ 'kkk': {{}} }", { kkk: "" }],
  ["{ 'kkk': {{cnull}} }", { kkk: null }],
  ["{ 'kkk': {{s0}} }", { kkk: "" }],
  ["{ 'kkk': {{s1}} }", { kkk: " " }],
  ["{ 'kkk': {{s2}} }", { kkk: "abc def" }],
  ["{ 'kkk': {{s3}} }", { kkk: " fdf fdfd'\" " }],
  ["{ 'kkk': {{n1}} }", { kkk: 57 }],
  ["{ 'kkk': {{n2}} }", { kkk: 4.69 }],
  ["{ 'kkk': {{o1}} }", { kkk: { k1: 1, k2: "vv" } }],
  ["{ 'kkk': {{o2}} }", { kkk: [{ k1: 1, k2: "vv" }] }],
  ["{ 'kkk': {{ n1 + n2 }}  }", { kkk: 61.69 }],
  ["{ 'kkk': {{ n1 + n2 }}end  }", { kkk: "61.69end" }],
  ["{ 'kkk': st{{ n1 + n2 }}mi{{7.3}}end  }", { kkk: "st61.69mi7.3end" }],

  // relaxed json key, with {{}}, with quotes
  ["{ '{{}}': 666 }", { "": 666 }],
  ["{ '{{cnull}}': 666 }", { null: 666 }],
  ["{ '{{s0}}': 666 }", { "": 666 }],
  ["{ '{{s1}}': 666 }", { " ": 666 }],
  ["{ '{{s2}}': 666 }", { "abc def": 666 }],
  ["{ '{{s3}}': 666 }", { " fdf fdfd'\" ": 666 }],
  ["{ '{{n1}}': 666 }", { "57": 666 }],
  ["{ '{{n2}}': 666 }", { "4.69": 666 }],
  ["{ '{{ n1 + n2 }}' : 666 }", { "61.69": 666 }],
  ["{ '{{ n1 + n2 }}end' : 666 }", { "61.69end": 666 }],
  ["{ 'st{{ n1 + n2 }}mi{{7.3}}end' : 666 }", { "st61.69mi7.3end": 666 }],
  ['{ "st{{ n1 + n2 }}mi{{7.3}}end" : 666 }', { "st61.69mi7.3end": 666 }],

  // relaxed json value, with {{}}, with quotes
  ["{ 'kkk': '{{}}' }", { kkk: "" }],
  ["{ 'kkk': '{{cnull}}' }", { kkk: "null" }],
  ["{ 'kkk': '{{s0}}' }", { kkk: "" }],
  ["{ 'kkk': '{{s1}}' }", { kkk: " " }],
  ["{ 'kkk': '{{s2}}' }", { kkk: "abc def" }],
  ["{ 'kkk': '{{s3}}' }", { kkk: " fdf fdfd'\" " }],
  ["{ 'kkk': '{{n1}}' }", { kkk: "57" }],
  ["{ 'kkk': '{{n2}}' }", { kkk: "4.69" }],
  ["{ 'kkk': '{{ n1 + n2 }}'  }", { kkk: "61.69" }],
  ["{ 'kkk': '{{ n1 + n2 }}end'  }", { kkk: "61.69end" }],
  ["{ 'kkk': 'st{{ n1 + n2 }}mi{{7.3}}end'  }", { kkk: "st61.69mi7.3end" }],
  ["{ 'kkk': \"st{{ n1 + n2 }}mi{{7.3}}end\"  }", { kkk: "st61.69mi7.3end" }],
  ["[{ 'kkk': \"st{{ n1 + n2 }}mi{{7.3}}end\"  }]", [{ kkk: "st61.69mi7.3end" }]],

  // relaxed json with function
  ["{a: {{func1}}, b: {c: {{func2}}}}", { a: test1, b: { c: test2 } }],
  ["{{{'a': func1, 'b': {'c': func2 }}}}", { a: test1, b: { c: test2 } }],
])("evalJson(%s)", (value, expected) => {
  test(`returns ${expected}`, () => {
    const context = {
      cnull: null,
      s0: "",
      s1: " ",
      s2: "abc def",
      s3: " fdf fdfd'\" ",
      n1: 57,
      n2: 4.69,
      o1: { k1: 1, k2: "vv" },
      o2: [{ k1: 1, k2: "vv" }],
      func1: test1,
      func2: test2,
    };
    expect(evalJson(value as string, context).value).toStrictEqual(expected);
  });
});

test("evalFunction", async () => {
  let context = { input1: { value: 123 } };
  const methods = {
    input1: {
      setValue: async (v: number) => {
        await new Promise((resolve) =>
          setTimeout(() => {
            context.input1.value = v;
            resolve(undefined);
          }, 20)
        );
      },
    },
  };
  const ret = await evalFunction(
    "input1.setValue(456); return input1.value//abc",
    context,
    methods
  ).value();
  expect(ret).toBe(123);
  expect(context.input1.value).toBe(123);
});

test("evalFunction return promise", async () => {
  let context = { input1: { value: 123 } };
  const methods = {
    input1: {
      setValue: async (v: number) => {
        await new Promise((resolve) =>
          setTimeout(() => {
            context.input1.value = v;
            resolve(undefined);
          }, 20)
        );
      },
    },
  };
  const ret = await evalFunction("return input1.setValue(456)//abc", context, methods).value();
  expect(context.input1.value).toBe(456);
});

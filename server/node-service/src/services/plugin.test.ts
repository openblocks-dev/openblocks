import _ from "lodash";
import { evalCodeToValue, evalToValue, getPlugin, listPlugins } from "./plugin";

const action1 = {
  actionName: "action1",
  label: "ACT1",
  params: [
    { key: "k11", type: "textInput", label: "NewaV1A2" },
    { key: "k12", type: "numberInput", label: "NewaV1A2" },
  ],
} as const;

const action2 = [
  { key: "k21", type: "textInput", label: "NewaV1A2" },
  { key: "k22", type: "numberInput", label: "V3" },
  { key: "k23", type: "numberInput", label: "V4" },
] as const;

const queryConfig = {
  type: "query",
  actions: [
    action1,
    {
      actionName: "action2",
      label: "ACT2",
      params: action2,
    },
  ],
} as const;

const dsl = {
  actionName: "action1",
  action: {
    k11: "{{ a + 1}}, {{b + 2}}",
    k12: "{{a + 2}}",
  },
};

const context = [
  {
    key: " a + 1",
    value: 2,
  },
  {
    key: "b + 2",
    value: 4,
  },
  {
    key: "a + 2",
    value: 3,
  },
];

test("test action run", async () => {
  const value = await evalToValue(queryConfig, dsl, context, {});
  expect(value.actionName).toBe("action1");
  expect(value.k11).toBe("2, 4");
  expect(value.k12).toBe(3);
});

test("eval code to value", async () => {
  let a = evalCodeToValue("{{a}}", [
    {
      key: "a",
      value: 0,
    },
  ]);
  expect(a).toBe(0);

  let b = evalCodeToValue("{{a}}", [
    {
      key: "a",
      value: { name: "Tom" },
    },
  ]);
  expect(b).toEqual({ name: "Tom" });

  let c = evalCodeToValue("Hello: {{a}}", [
    {
      key: "a",
      value: { name: "Tom" },
    },
  ]);
  expect(c).toBe("Hello: " + String({ name: "Tom" }));
});

test("eval to value", async () => {
  let value;

  // boolean input
  value = await evalToValue({ key: "a", type: "booleanInput" }, "1", [], {});
  expect(value).toBe(true);
  value = await evalToValue(
    { key: "a", type: "booleanInput" },
    "{{a}}",
    [{ key: "a", value: 1 }],
    {}
  );
  expect(value).toBe(true);
  value = await evalToValue(
    { key: "a", type: "booleanInput" },
    "{{a}}",
    [{ key: "a", value: 0 }],
    {}
  );
  expect(value).toBe(false);
  value = await evalToValue({ key: "a", type: "booleanInput" }, "{{a}}", [], {});
  expect(value).toBe(false);

  // test input
  value = await evalToValue(
    { key: "a", type: "textInput" },
    "{{hello}}: {{name}}: {{data}}",
    [
      { key: "hello", value: "world" },
      { key: "name", value: "Tom" },
      { key: "data", value: { n: 1 } },
    ],
    {}
  );
  expect(value).toBe(`world: Tom: ${String({ n: 1 })}`);
  value = await evalToValue({ key: "a", type: "textInput" }, "{{hello}}: {{name}}", [], {});
  expect(value).toBe(": ");
  value = await evalToValue(
    { key: "a", type: "textInput" },
    "{{hello}}",
    [{ key: "hello", value: { n: 1 } }],
    {}
  );
  expect(value).toBe(JSON.stringify({ n: 1 }));

  // checkbox
  value = await evalToValue({ key: "a", type: "checkbox" }, "any-value", [], {});
  expect(value).toBe(true);
  value = await evalToValue({ key: "a", type: "checkbox" }, "", [], {});
  expect(value).toBe(false);
  value = await evalToValue({ key: "a", type: "checkbox" }, "{{a}}", [], {});
  expect(value).toBe(false);
  value = await evalToValue({ key: "a", type: "checkbox" }, "{{a}}", [{ key: "a", value: 1 }], {});
  expect(value).toBe(true);
  value = await evalToValue({ key: "a", type: "checkbox" }, "{{a}}", [{ key: "a", value: 0 }], {});
  expect(value).toBe(false);

  // file
  value = await evalToValue({ key: "a", type: "file" }, "some-base64", [], {});
  expect(value).toBe("some-base64");
  value = await evalToValue({ key: "a", type: "file" }, "{name: 1.png, type: image/png}", [], {});
  expect(value).toEqual({ name: "1.png", type: "image/png" });
  value = await evalToValue(
    { key: "a", type: "file" },
    "{name: 1.png, type: {{type}}, data: {{data}}}",
    [
      { key: "type", value: "image/png" },
      { key: "data", value: "/** some \nvalue\n" },
    ],
    {}
  );
  expect(value).toEqual({ name: "1.png", type: "image/png", data: "/** some \nvalue\n" });

  // json
  value = await evalToValue({ key: "a", type: "jsonInput" }, "some-string", [], {});
  expect(value).toEqual("some-string");
  value = await evalToValue({ key: "a", type: "jsonInput" }, "{}", [], {});
  expect(value).toEqual({});
  value = await evalToValue(
    { key: "a", type: "jsonInput" },
    "{a: {{b}}}",
    [{ key: "b", value: "1" }],
    {}
  );
  expect(value).toEqual({ a: "1" });
  value = await evalToValue(
    { key: "a", type: "jsonInput" },
    "{a: {{b}}}",
    [{ key: "b", value: 1 }],
    {}
  );
  expect(value).toEqual({ a: 1 });
  value = await evalToValue({ key: "a", type: "jsonInput" }, "{a: {{b}}}", [], {});
  expect(value).toEqual({});

  // number
  value = await evalToValue({ key: "a", type: "numberInput" }, "invalid number", [], {});
  expect(value).toBe(0);
  value = await evalToValue({ key: "a", type: "numberInput" }, "1", [], {});
  expect(value).toBe(1);
  value = await evalToValue(
    { key: "a", type: "numberInput" },
    "{{a}}1",
    [{ key: "a", value: 1 }],
    {}
  );
  expect(value).toBe(11);
});

test("list plugins", () => {
  const plugins = listPlugins({ languages: ["en"] });
  expect(plugins.length).toBeGreaterThan(0);
});

test("get plugins", () => {
  const ctx = { languages: ["en"] };
  expect(() => getPlugin("not-found", ctx)).toThrow("plugin not found: not-found");
  expect(() => getPlugin("s3", ctx)).not.toThrow();
});

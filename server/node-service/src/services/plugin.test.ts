import _ from "lodash";
import { evalToValue, getPlugin, listPlugins } from "./plugin";

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

test("test action run", () => {
  const value = evalToValue(queryConfig, dsl, context);
  expect(value.actionName).toBe("action1");
  expect(value.k11).toBe("2, 4");
  expect(value.k12).toBe(3);
});

test("list plugins", () => {
  const plugins = listPlugins({ languages: ["en"] });
  expect(plugins.length).toBeGreaterThan(0);
  expect(plugins[0].id.startsWith("plugin:")).toBe(true);
});

test("get plugins", () => {
  const ctx = { languages: ["en"] };
  expect(() => getPlugin("s3", ctx)).toThrow("invalid plugin name: s3");
  expect(() => getPlugin("plugin:not-found", ctx)).toThrow("plugin not found: plugin:not-found");
  expect(() => getPlugin("plugin:s3", ctx)).not.toThrow();
});

import { extractSecurityParams, getSchemaExample, extractLevelData, parseUrl } from "./util";

test("extractSecurityParams", () => {
  const params = extractSecurityParams({ "ApiKeyAuth.value": "hello", ApiKeyAuth: null }, {
    openapi: "3.0",
    components: {
      securitySchemes: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "X-N8N-API-KEY",
        },
      },
    },
  } as any);

  expect(params.authorized).toEqual({ ApiKeyAuth: { value: "hello" } });
});

test("extractLevelData", () => {
  expect(extractLevelData({ "a.b": 1, a: null })).toEqual({
    a: {
      b: 1,
    },
  });
  expect(extractLevelData({ "a.b.c": 1, "a.d": 2, c: 3 })).toEqual({
    a: {
      "b.c": 1,
      d: 2,
    },
  });
});

test("getSchemaExample", () => {
  expect(
    getSchemaExample({
      type: "boolean",
      example: true,
    })
  ).toBe(true);

  expect(
    getSchemaExample({
      type: "object",
      example: {},
      properties: {
        a: {
          type: "number",
          example: 1,
        },
      },
    })
  ).toEqual({});

  expect(
    getSchemaExample({
      type: "object",
      properties: {
        a: {
          type: "number",
          example: 1,
        },
        b: {
          type: "object",
          properties: {
            b_1: {
              type: "number",
              example: 2,
            },
            b_2: {
              type: "array",
              items: {
                example: 3,
              },
            },
            b_3: {
              type: "array",
              items: {
                enum: ["ok", "hello"],
              },
            },
            b_4: {
              type: "array",
              items: {},
            },
          },
        },
      },
    })
  ).toEqual({ a: 1, b: { b_1: 2, b_2: [3], b_3: ["ok"], b_4: [] } });

  expect(
    getSchemaExample({
      type: "array",
      items: {
        type: "object",
        properties: {
          a: {
            type: "number",
            example: 1,
          },
          b: {
            type: "object",
            properties: {
              b_1: {
                type: "number",
                example: 2,
              },
            },
          },
          c: {
            type: "boolean",
            example: true,
            readOnly: true,
          },
        },
      },
    })
  ).toEqual([{ a: 1, b: { b_1: 2 } }]);
});

test("parseUrl", () => {
  expect(parseUrl("https://hello.com:8080/api/v1?a=1")).toEqual({
    host: "hello.com:8080",
    pathname: "/api/v1",
    schema: "https",
  });
  expect(() => parseUrl("hello.com:8080/api/v1?a=1")).toThrow();
  expect(() => parseUrl("//hello.com:8080/api/v1?a=1")).toThrow();
});

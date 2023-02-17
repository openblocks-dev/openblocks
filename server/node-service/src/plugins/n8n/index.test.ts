import { prepareServerUrl } from ".";

test("server url", () => {
  expect(prepareServerUrl("https://a.com/api/v1")).toBe("https://a.com/api/v1");
  expect(prepareServerUrl("https://a.com/api/v2")).toBe("https://a.com/api/v2");
  expect(prepareServerUrl("https://a.com:5678")).toBe("https://a.com:5678/api/v1");
});

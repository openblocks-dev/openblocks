import { isMac } from "./commonUtils";
import { configKeyString } from "./keyUtils";

test("configKeyString", () => {
  expect(configKeyString({})).toBe("");
  expect(configKeyString({ mod: true, key: "a" })).toBe(isMac ? "meta+a" : "ctrl+a");
  expect(configKeyString({ ctrl: true, shift: true, key: "z" })).toBe("ctrl+shift+z");
  expect(configKeyString({ alt: true, key: "Enter" })).toBe("alt+enter");
});

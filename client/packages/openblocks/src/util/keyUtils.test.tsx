import { isMac } from "./commonUtils";
import { configKeyString } from "./keyUtils";

test("configKeyString", () => {
  expect(configKeyString({})).toBe("");
  expect(configKeyString({ mod: true, key: "A" })).toBe(isMac ? "Meta A" : "Ctrl A");
  expect(configKeyString({ ctrl: true, shift: true, key: "Z" })).toBe("Ctrl Shift Z");
  expect(configKeyString({ alt: true, key: "Enter" })).toBe("Alt Enter");
});

import { normalizeNpmPackage, validateNpmPackage } from "./remote";

test("normalize npm package name", () => {
  expect(normalizeNpmPackage("https://www.npmjs.com/package/some-package")).toBe("some-package");
  expect(normalizeNpmPackage("https://www.npmjs.org/package/some-package")).toBe("some-package");
  expect(normalizeNpmPackage("https://npmjs.com/package/some-package")).toBe("some-package");
  expect(normalizeNpmPackage("https://npmjs.org/package/some-package")).toBe("some-package");
  expect(normalizeNpmPackage("http://www.npmjs.com/package/some-package")).toBe("some-package");
  expect(normalizeNpmPackage("http://www.npmjs.org/package/some-package")).toBe("some-package");
  expect(normalizeNpmPackage("http://npmjs.com/package/some-package")).toBe("some-package");
  expect(normalizeNpmPackage("http://npmjs.org/package/some-package")).toBe("some-package");
});

test("validate npm plugin name", () => {
  expect(validateNpmPackage("https://www.npmjs.com/package/some-package")).toBeTruthy();
  expect(validateNpmPackage("some-package")).toBeTruthy();
  expect(validateNpmPackage("example.com")).toBeTruthy();
  expect(validateNpmPackage("@npm/thingy")).toBeTruthy();
  expect(validateNpmPackage("crazy!")).toBeFalsy();
  expect(validateNpmPackage(".start-with-period")).toBeFalsy();
  expect(validateNpmPackage("@npm-zors/money!time.js")).toBeFalsy();
});

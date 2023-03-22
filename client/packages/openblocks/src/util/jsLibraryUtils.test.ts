import { parseJSLibraryURL } from "util/jsLibraryUtils";

const normal = {
  name: "jquery",
  version: "3.2.1",
};
const latest = {
  name: "jquery",
  version: "latest",
};

test("parseJSLibrary", () => {
  expect(
    parseJSLibraryURL("https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js")
  ).toMatchObject(normal);
  expect(parseJSLibraryURL("https://cdn.jsdelivr.net/npm/jquery@3.2.1")).toMatchObject(normal);
  expect(parseJSLibraryURL("https://cdn.jsdelivr.net/npm/jquery/dist/jquery.min.js")).toMatchObject(
    latest
  );
  expect(parseJSLibraryURL("https://cdn.jsdelivr.net/npm/jquery")).toMatchObject(latest);
  expect(
    parseJSLibraryURL(
      "https://cdn.jsdelivr.net/combine/gh/jquery/jquery@3.1/dist/jquery.min.js,gh/twbs/bootstrap@3.3/dist/js/bootstrap.min.js"
    )
  ).toMatchObject(latest);
  expect(parseJSLibraryURL("https://unpkg.com/jquery@3.2.1")).toMatchObject(normal);

  expect(
    parseJSLibraryURL("https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js")
  ).toMatchObject(normal);
  expect(
    parseJSLibraryURL("https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js")
  ).toMatchObject(normal);
  expect(
    parseJSLibraryURL("https://cdn.jsdelivr.net/npm/jquery@3.2.1/dist/jquery.min.js")
  ).toMatchObject(normal);
});

import {
  formatJsonWithJsSnippets,
  formatSqlWithJsSnippets,
  formatStringWithJsSnippets,
} from "./autoFormat";

test("formatSqlWithJsSnippets", async () => {
  await expect(formatSqlWithJsSnippets("")).resolves.toBe("");
  await expect(formatSqlWithJsSnippets(" ")).resolves.toBe("");

  const text = 'select "{{12+ 5}}",12+3 from {{"users" +3}} where a="?";';
  const expected = 'select\n  "{{12 + 5}}",\n  12 + 3\nfrom\n  {{"users" + 3}}\nwhere\n  a = "?";';
  await expect(formatSqlWithJsSnippets(text)).resolves.toBe(expected);

  const text1 = 'select "{{12+ \n5}}",12+3 from {{"users" +3}} where a="?";';
  const expected1 = 'select\n  "{{12 + 5}}",\n  12 + 3\nfrom\n  {{"users" + 3}}\nwhere\n  a = "?";';
  await expect(formatSqlWithJsSnippets(text1)).resolves.toBe(expected1);
});

test("formatJsonWithJsSnippets", async () => {
  await expect(formatJsonWithJsSnippets("")).resolves.toBe("");
  await expect(formatJsonWithJsSnippets(" ")).resolves.toBe("");

  const text = "{a:3,b:{}}";
  const expected = '{\n  "a": 3,\n  "b": {}\n}';
  await expect(formatJsonWithJsSnippets(text)).resolves.toBe(expected);

  const text1 = "{a:{{1+ 3}},b:{ {{5 +7}}:def}}";
  const expected1 = '{\n  "a": {{1 + 3}},\n  "b": {\n    {{5 + 7}}: "def"\n  }\n}';
  await expect(formatJsonWithJsSnippets(text1)).resolves.toBe(expected1);

  const text2 = "{a:{{1+ 3}}jk,b:{ {{5 +7}}p:def}}";
  const expected2 = '{\n  "a": "{{1 + 3}}jk",\n  "b": {\n    "{{5 + 7}}p": "def"\n  }\n}';
  await expect(formatJsonWithJsSnippets(text2)).resolves.toBe(expected2);

  const text3 = "{a:gh{{1+ 3}},b:{ uy{{5 +7}}r:def}}";
  const expected3 = '{\n  "a": "gh{{1 + 3}}",\n  "b": {\n    "uy{{5 + 7}}r": "def"\n  }\n}';
  await expect(formatJsonWithJsSnippets(text3)).resolves.toBe(expected3);

  const text4 = '{a:"{{1+ 3}}",b:{ "uy{{5 +7}}r":def}}';
  const expected4 = '{\n  "a": "{{1 + 3}}",\n  "b": {\n    "uy{{5 + 7}}r": "def"\n  }\n}';
  await expect(formatJsonWithJsSnippets(text4)).resolves.toBe(expected4);

  const text5 = "abc de";
  const expected5 = "abc de";
  await expect(formatJsonWithJsSnippets(text5)).resolves.toBe(expected5);

  const text6 = 'abc {{12+ 5}}efefe {{"users" +3}}';
  const expected6 = 'abc {{12 + 5}}efefe {{"users" + 3}}';
  await expect(formatJsonWithJsSnippets(text6)).resolves.toBe(expected6);
});

test("formatStringWithJsSnippets", async () => {
  await expect(formatStringWithJsSnippets("")).resolves.toBe("");
  await expect(formatStringWithJsSnippets(" ")).resolves.toBe(" ");

  const text = 'abc {{12+ 5}}efefe {{"users" +3}}';
  const expected = 'abc {{12 + 5}}efefe {{"users" + 3}}';
  await expect(formatStringWithJsSnippets(text)).resolves.toBe(expected);
  await expect(formatStringWithJsSnippets("{{function(){}()}}")).resolves.toBe(
    "{{(function () {})()}}"
  );
  await expect(formatStringWithJsSnippets("{{(function () {})()}}")).resolves.toBe(
    "{{(function () {})()}}"
  );
});

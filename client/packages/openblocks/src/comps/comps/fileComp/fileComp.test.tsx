import { readFile } from "fs/promises";
import { resolveParsedValue } from "./fileComp";
import mime from "mime";

global.TextDecoder = require("util").TextDecoder;

const expectJSONParseValue = [
  { id: 1, name: "Reagen Gilberthorpe", date: "7/5/2022", department: "Marketing" },
  {
    id: 2,
    name: "Haroun Lortzing",
    date: "11/6/2022",
    department: "Human Resources",
  },
  { id: 3, name: "Garret Kilmaster", date: "11/14/2021", department: "Research and Development" },
  {
    id: 4,
    name: "Israel Harrowsmith",
    date: "4/3/2022",
    department: "Training",
  },
  { id: 5, name: "Loren O'Lagen", date: "9/10/2022", department: "Services" },
  {
    id: 6,
    name: "Wallis Hothersall",
    date: "4/18/2022",
    department: "Accounting",
  },
  { id: 7, name: "Kaia Biskup", date: "3/4/2022", department: "Sales" },
  {
    id: 8,
    name: "Travers Saterweyte",
    date: "1/9/2022",
    department: "Human Resources",
  },
  { id: 9, name: "Mikey Niemetz", date: "1/4/2022", department: "Marketing" },
  {
    id: 10,
    name: "Mano Meckiff",
    date: "2/19/2022",
    department: "Research and Development",
  },
];

const expectParseValue = [
  { id: "1", name: "Reagen Gilberthorpe", date: "7/5/2022", department: "Marketing" },
  {
    id: "2",
    name: "Haroun Lortzing",
    date: "11/6/2022",
    department: "Human Resources",
  },
  { id: "3", name: "Garret Kilmaster", date: "11/14/2021", department: "Research and Development" },
  {
    id: "4",
    name: "Israel Harrowsmith",
    date: "4/3/2022",
    department: "Training",
  },
  { id: "5", name: "Loren O'Lagen", date: "9/10/2022", department: "Services" },
  {
    id: "6",
    name: "Wallis Hothersall",
    date: "4/18/2022",
    department: "Accounting",
  },
  { id: "7", name: "Kaia Biskup", date: "3/4/2022", department: "Sales" },
  {
    id: "8",
    name: "Travers Saterweyte",
    date: "1/9/2022",
    department: "Human Resources",
  },
  { id: "9", name: "Mikey Niemetz", date: "1/4/2022", department: "Marketing" },
  {
    id: "10",
    name: "Mano Meckiff",
    date: "2/19/2022",
    department: "Research and Development",
  },
];

function toArrayBuffer(buf: Buffer) {
  const ab = new ArrayBuffer(buf.length);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

function getFile(path: string) {
  return readFile(path).then((b) => ({
    originFileObj: {
      arrayBuffer: () => new Promise((resolve) => resolve(toArrayBuffer(b))),
      type: mime.getType(path.substring(path.lastIndexOf("."))),
    },
  }));
}

test("test resolveParsedValue", async () => {
  const files = await Promise.all([
    getFile("packages/openblocks/src/comps/comps/fileComp/fileComp.test.csv"),
    getFile("packages/openblocks/src/comps/comps/fileComp/fileComp.test.json"),
    getFile("packages/openblocks/src/comps/comps/fileComp/fileComp.test.png"),
    getFile("packages/openblocks/src/comps/comps/fileComp/fileComp.test.txt"),
    getFile("packages/openblocks/src/comps/comps/fileComp/fileComp.test.xlsx"),
  ]);
  const parsedValue = await resolveParsedValue(files as any);
  expect(parsedValue[0]).toMatchObject(expectParseValue);
  expect(parsedValue[1]).toMatchObject(expectJSONParseValue);
  expect(parsedValue[2]).toBeNull();
  expect(parsedValue[3]).toMatchObject(expectJSONParseValue);
  expect(parsedValue[4]).toMatchObject(expectParseValue);
});

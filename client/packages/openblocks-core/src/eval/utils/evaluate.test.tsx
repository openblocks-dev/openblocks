import { fromValue } from "eval/simpleNode";
import _ from "lodash";
import { changeDependName, filterDepends } from "./evaluate";

describe("deps", () => {
  test("filterDeps", () => {
    const context = {
      data: fromValue([]),
      i: fromValue(0),
      str: fromValue(""),
    };

    const depsA = filterDepends("{{data[str].b}}", context);
    expect(depsA.has(context.data)).toBe(true);
    expect(depsA.has(context.str)).toBe(true);
    expect(depsA.has(context.i)).toBe(false);

    const depsB = filterDepends("{{data[i]['a']}}", context);
    expect(depsB.has(context.data)).toBe(true);
    expect(depsB.has(context.str)).toBe(false);
    expect(depsB.has(context.i)).toBe(true);

    const depsC = filterDepends("{{str[data[i].length]}}", context);
    expect(depsC.has(context.data)).toBe(true);
    expect(depsC.has(context.str)).toBe(true);
    expect(depsC.has(context.i)).toBe(true);

    const depsD = filterDepends("{{str[data.length]}}", context);
    expect(depsD.has(context.data)).toBe(true);
    expect(depsD.has(context.str)).toBe(true);
    expect(depsD.has(context.i)).toBe(false);

    expect(filterDepends("{{new Date().toLocaleString()}}", context)).toStrictEqual(new Map());
  });
});

describe("changeDependName", () => {
  it("changeDependName", () => {
    expect(changeDependName("", "input1", "hello")).toBe("");
    expect(changeDependName("input1", "input1", "hello")).toBe("input1");
    expect(changeDependName(" abcinput1de  ", "input1", "hello")).toBe(" abcinput1de  ");
    expect(changeDependName(" abc input1 de  ", "input1", "hello")).toBe(" abc input1 de  ");
    expect(changeDependName(" abc input1{{}} de  ", "input1", "hello")).toBe(
      " abc input1{{}} de  "
    );

    expect(changeDependName(" abc input1{{input1}} de  ", "input1", "hello")).toBe(
      " abc input1{{hello}} de  "
    );
    expect(changeDependName(" abc input1{{ input1  }} de  ", "input1", "hello")).toBe(
      " abc input1{{ hello  }} de  "
    );
    expect(changeDependName(" abc input1{{input1.va}} de  ", "input1", "hello")).toBe(
      " abc input1{{hello.va}} de  "
    );
    expect(changeDependName(" abc input1{{input12}} de  ", "input1", "hello")).toBe(
      " abc input1{{input12}} de  "
    );
    expect(changeDependName(" abc input1{{ainput1}} de  ", "input1", "hello")).toBe(
      " abc input1{{ainput1}} de  "
    );
    expect(
      changeDependName(
        " abc input1{{343 + input1.va + input1.de + input12 + input1}} de{{input1.ef.gg}}  ",
        "input1",
        "hello"
      )
    ).toBe(" abc input1{{343 + hello.va + hello.de + input12 + hello}} de{{hello.ef.gg}}  ");

    expect(changeDependName(" abc input1{{a}} de  ", "a", "hello")).toBe(
      " abc input1{{hello}} de  "
    );
    expect(changeDependName(" abc input1{{ a  }} de  ", "a", "hello")).toBe(
      " abc input1{{ hello  }} de  "
    );
    expect(changeDependName(" abc input1{{a.a}} de  ", "a", "hello")).toBe(
      " abc input1{{hello.a}} de  "
    );
    expect(changeDependName(" abc input1{{a2}} de  ", "a", "hello")).toBe(" abc input1{{a2}} de  ");
    expect(changeDependName(" abc input1{{aa}} de  ", "a", "hello")).toBe(" abc input1{{aa}} de  ");
    expect(changeDependName(" abc input1{{a[b]}} de  ", "b", "hello")).toBe(
      " abc input1{{a[hello]}} de  "
    );
    expect(changeDependName(" abc input1{{a[b.length]}} de  ", "b", "b2")).toBe(
      " abc input1{{a[b2.length]}} de  "
    );
    expect(changeDependName(" abc input1{{a[b[i].length]}} de  ", "i", "j")).toBe(
      " abc input1{{a[b[j].length]}} de  "
    );
    expect(changeDependName(" abc input1{{a[b[i].length]}} de  ", "b", "b2")).toBe(
      " abc input1{{a[b2[i].length]}} de  "
    );
  });
});

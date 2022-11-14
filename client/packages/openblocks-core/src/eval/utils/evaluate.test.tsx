import { changeDependName } from "./evaluate";

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
  });
});

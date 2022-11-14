import { CodeNode } from "./codeNode";
import { fromValue } from "./simpleNode";
import { WrapNode } from "./wrapNode";

it("test wrap node", () => {
  const exposingNodes = {
    n1: fromValue(5),
    n2: fromValue(7),
    s1: fromValue("c"),
    s2: fromValue("d"),
    hello: new CodeNode("{{n1+n2}}"),
  };
  const inputNodes = {
    input1: new CodeNode("{{n1+n2}}hello{{s1+s2}}"),
    input2: fromValue("ccc"),
    input3: "hello",
  };
  const moduleExposingNodes = {
    n1: fromValue(11),
    n2: fromValue(22),
    s1: fromValue("aaa"),
    s2: fromValue("bbb"),
    s3: new CodeNode("{{n1}}{{s1}}"),
  };
  const f1 = (v: string) =>
    new WrapNode(new CodeNode(v), moduleExposingNodes).evaluate(exposingNodes).value;
  expect(f1("{{n1+n2}}")).toStrictEqual(33);
  expect(f1("{{s1+s2}}")).toStrictEqual("aaabbb");

  const f2 = (v: string) => {
    const w = new WrapNode(new CodeNode(v), moduleExposingNodes, {}, inputNodes);
    return w.evaluate(exposingNodes).value;
  };
  expect(f2("{{input1.value}}")).toStrictEqual("12hellocd");
  expect(f2("{{input2}}")).toStrictEqual("ccc");
  expect(f2("{{n1+n2}}")).toStrictEqual(33);
  expect(f2("{{s1+s2}}")).toStrictEqual("aaabbb");
  expect(f2("{{input1.value}}yes{{input2}}gof{{s1+s2}}{{s3.value}}")).toStrictEqual(
    "12hellocdyescccgofaaabbb11aaa"
  );
  expect(f2("{{input3.value}}")).toStrictEqual(12);
});

import { CodeNode, fromUnevaledValue } from "./codeNode";
import { ValueAndMsg } from "./types/valueAndMsg";
import { FunctionNode } from "./functionNode";
import { fromRecord } from "./recordNode";
import { fromValue } from "./simpleNode";

describe("simple evaluation", () => {
  it("two adjacent expressions", () => {
    const node = fromUnevaledValue("{{1}}{{1}}");
    expect(node.evaluate()).toStrictEqual("11");
  });
});

describe("depends evaluation", () => {
  const exposingNodes = {
    n1: fromValue(1),
    n2: fromValue(2),
    s1: fromValue("a"),
    s2: fromValue("b"),
    o1: fromRecord({ n1: fromValue(1), s1: fromValue("a") }),
    o2: fromRecord({ n2: fromValue(2), s2: fromValue("b") }),
  };

  // evaluation1: add number
  const e1 = fromUnevaledValue("{{n1+n2}}");

  it("eval1: add 1 and 2 should return 3", () => {
    expect(e1.evaluate(exposingNodes)).toStrictEqual(3);
  });

  // evaluation2: add string
  const e2 = fromUnevaledValue("hello {{s1+s2}}");

  it("eval2: add 'a' and 'b' should return 'ab'", () => {
    expect(e2.evaluate(exposingNodes)).toStrictEqual("hello ab");
  });

  // evaluation3: extend object
  const e3 = fromUnevaledValue("{{{...o1, ...o2}}}");

  it("eval3: mix two objects into one object should work well", () => {
    expect(e3.evaluate(exposingNodes)).toStrictEqual({ n1: 1, n2: 2, s1: "a", s2: "b" });
  });

  // evaluation4: eval after eval
  const e4 = fromUnevaledValue("hello {{e1}} and {{e2}}");

  it("eval4: eval with two variables should work well", () => {
    const nodes = { ...exposingNodes, e1, e2 };
    const tmp = e4.evaluate(nodes);
    expect(tmp).toStrictEqual("hello 3 and hello ab");
  });

  // evaluation5: cyclic dependency
  const e5Code = new CodeNode("{{n1+e6}}");
  const e6Code = new CodeNode("{{n1+e5}}");
  const e5 = new FunctionNode(e5Code, (valueAndMsg) => valueAndMsg.value);
  const e6 = new FunctionNode(e6Code, (valueAndMsg) => valueAndMsg.value);

  it("eval5: additional node causing cyclic dependency should not be evaled", () => {
    const nodes = { e6, e5, ...exposingNodes };
    expect(e5Code.evaluate(nodes)).toStrictEqual(
      new ValueAndMsg(
        "11",
        `DependencyError: "${e5Code.unevaledValue}" caused a cyclic dependency.`,
        { segments: [{ value: "{{n1+e6}}", success: false }] }
      )
    );
  });

  // it("eval6: eval error should be returned as errorMessage", () => {
  //   expect(e6Code.evaluate(exposingNodes)).toStrictEqual(
  //     new ValueAndMsg("", "ReferenceError: e5 not exist", {
  //       segments: [{ value: "{{n1+e5}}", success: false }],
  //     })
  //   );
  // });
});

describe("additional evaluation", () => {
  it("additional test", () => {
    const result = new CodeNode("{{input1.x}}").evaluate({
      input1: fromRecord({
        disabled: fromValue(false),
      }),
    });
    expect(result).toStrictEqual(
      new ValueAndMsg(undefined, undefined, {
        segments: [{ value: "{{input1.x}}", success: true }],
      })
    );
  });
});

describe("function evaluation", () => {
  const exposingNodes = {
    n1: fromValue(1),
    n2: fromValue(2),
  };

  it("eval1", async () => {
    const e1 = new CodeNode("var tmp = 10; return tmp+n1+n2;", { codeType: "Function" });
    const ret = await (e1.evaluate(exposingNodes).value as Function)();
    expect(ret).toStrictEqual(13);
  });
});

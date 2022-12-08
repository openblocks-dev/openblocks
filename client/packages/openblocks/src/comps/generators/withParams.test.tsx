import { NumberControl, StringControl } from "comps/controls/codeControl";
import { MultiCompBuilder } from "./multi";
import { withParams, withParamsWithDefault } from "./withParams";
import { evalAndReduce } from "comps/utils";

const TestComp = new MultiCompBuilder(
  {
    v1: StringControl,
    v2: NumberControl,
  },
  (props) => props
)
  .setPropertyViewFn(() => <></>)
  .build();

const testData = {
  value: {
    v1: "v1: {{a + 1}}",
    v2: "{{a + 2}}",
  },
};

describe("withParams", () => {
  it("normal", () => {
    const Comp = withParams(TestComp, ["a"]);
    let comp = new Comp(testData);
    comp = evalAndReduce(comp);
    let output = comp.getView();
    expect(output.v1).toEqual("v1: 1");
    expect(output.v2).toEqual(2);

    comp = comp.reduce(Comp.changeParamDataAction({ a: "10" }));
    comp = evalAndReduce(comp);
    output = comp.getView();
    expect(output.v1).toEqual("v1: 101");
    expect(output.v2).toEqual(102);
  });
});

describe("withParams", () => {
  it("normal with default", () => {
    const Comp = withParamsWithDefault(TestComp, { a: 10 });
    let comp = new Comp(testData);
    comp = evalAndReduce(comp);
    let output = comp.getView();
    expect(output.v1).toEqual("v1: 11");
    expect(output.v2).toEqual(12);

    comp = comp.reduce(Comp.changeParamDataAction({ a: "10" } as any));
    comp = evalAndReduce(comp);
    output = comp.getView();
    expect(output.v1).toEqual("v1: 101");
    expect(output.v2).toEqual(102);
  });
});

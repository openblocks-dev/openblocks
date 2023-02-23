import { NumberControl, StringControl } from "comps/controls/codeControl";
import { evalAndReduce } from "comps/utils";
import { MultiCompBuilder } from "./multi";
import { withParams, withParamsWithDefault } from "./withParams";

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

    comp = comp.reduce(Comp.setPartialParamDataAction({ a: "10" }));
    comp = evalAndReduce(comp);
    output = comp.getView();
    expect(output.v1).toEqual("v1: 101");
    expect(output.v2).toEqual(102);
  });

  it("normal with default", () => {
    const Comp = withParamsWithDefault(TestComp, { a: 10 });
    let comp = new Comp(testData);
    comp = evalAndReduce(comp);
    let output = comp.getView();
    expect(output.v1).toEqual("v1: 11");
    expect(output.v2).toEqual(12);

    comp = comp.reduce(Comp.setPartialParamDataAction({ a: "10" } as any));
    comp = evalAndReduce(comp);
    output = comp.getView();
    expect(output.v1).toEqual("v1: 101");
    expect(output.v2).toEqual(102);
  });

  it("keep node stable", () => {
    const Comp = withParams(TestComp, ["a"]);
    let comp = new Comp(testData);
    comp = evalAndReduce(comp);
    const comp1 = comp.setParams({ a: 0 });
    expect(comp1.getComp().node() === comp.getComp().node()).toBeTruthy();
    expect(comp1.node()?.children.comp.child === comp.node()?.children.comp.child).toBeTruthy();
    expect((comp1 as any).extraNode() === (comp as any).extraNode()).toBeTruthy();
    expect(comp1.node()?.children.wrap === comp.node()?.children.wrap).toBeTruthy();
  });
});

import { NumberControl, StringControl } from "comps/controls/codeControl";
import { evalAndReduce } from "comps/utils";
import { wrapDispatch } from "openblocks-core";
import { MultiCompBuilder } from "./multi";
import { MAP_KEY, withMultiContext } from "./withMultiContext";

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

const WithMContextComp = withMultiContext(TestComp);

describe("withMultiContext", () => {
  it("common", () => {
    let comp = new WithMContextComp({
      dispatch: (action) => {
        comp = evalAndReduce(comp.reduce(action));
      },
      ...testData,
    });
    comp = evalAndReduce(comp);
    const key1 = "k1";
    const a0 = comp.getView()({ a: 11 }, key1).getView();
    expect(a0.v1 === "v1: 12").toBeTruthy();
    expect(a0.v2 === 13).toBeTruthy();
    // interaction
    let tmpComp = comp
      .getOriginalComp()
      .changeDispatch(wrapDispatch(wrapDispatch(comp.dispatch, MAP_KEY), key1))
      .getComp();
    tmpComp.dispatch(tmpComp.changeChildAction("v2", "{{a + 3}}"));
    expect(comp.children[MAP_KEY].getView()[key1].getView().v2).toEqual(14);
    const notExistKey = "not-exist";
    tmpComp = comp
      .getOriginalComp()
      .changeDispatch(wrapDispatch(wrapDispatch(comp.dispatch, MAP_KEY), notExistKey))
      .getComp();
    tmpComp.dispatch(tmpComp.changeChildAction("v2", "{{a + 3}}"));
    expect(comp.children[MAP_KEY].getView().hasOwnProperty(notExistKey)).toBeFalsy();
  });
});

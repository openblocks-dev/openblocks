import { NumberControl, StringControl } from "comps/controls/codeControl";
import { evalAndReduce } from "comps/utils";
import _ from "lodash";
import { updateNodesV2Action } from "openblocks-core";
import { getObjectId } from "util/objectUtils";
import { cost } from "util/perfUtils";
import { MultiCompBuilder } from "./multi";
import { withParamsForMap } from "./withParamsForMap";

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

const Comp = withParamsForMap(TestComp, ["a"]);
function checkNode(comp: InstanceType<typeof Comp>, str: string) {
  const coreComp = comp.getOriginalComp().getComp();
  console.info(`---- checkNode ${str}. node id: `, getObjectId(coreComp.node()));
  _.forEach(comp.getView(), (subComp, key) => {
    if (subComp.getComp().node() !== coreComp.node()) {
      console.info("  diff node id: ", getObjectId(subComp.getComp().node()), " key: ", key);
    }
  });
}

describe("withParamsForMap", () => {
  it("performance", () => {
    let comp = new Comp(testData);
    comp = evalAndReduce(comp);
    // checkNode(comp, "0");
    const paramValues = _.chain(_.range(5000))
      .map((idx) => [idx, { a: idx }] as const)
      .fromPairs()
      .value();
    comp = comp.batchSet(paramValues);
    // checkNode(comp, "1");
    // console.info("node: ", comp.node());
    // console.info("node[map]: ", (comp.node() as any).children.__map__);
    const costMs = cost(() => evalAndReduce(comp));
    // checkNode(comp, "2");
    // evalPerfUtil.print(0);
    expect(costMs < 10000).toBeTruthy();
  });

  it("test_node", () => {
    let comp = new TestComp({ value: { v1: "", v2: "2" } });
    comp = evalAndReduce(comp);
    const comp1 = comp.reduce(updateNodesV2Action(testData.value));
    expect(comp1.node() === comp.node()).toBeTruthy();
    expect(getObjectId(comp1.node()) === getObjectId(comp.node())).toBeTruthy();
  });
});

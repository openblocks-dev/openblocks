import { evalAndReduce } from "comps/utils";
import { customAction, fromRecord, fromValue, RecordNode, SimpleNode } from "openblocks-core";
import { ExecuteAction } from "comps/controls/actionSelector/executeCompTypes";
import { ButtonComp } from "comps/comps/buttonComp/buttonComp";
import { withIsLoading } from "comps/generators/withIsLoading";

test("test withIsLoading", async () => {
  const LoadingButtonComp = withIsLoading(ButtonComp);
  let comp = new LoadingButtonComp({
    value: {
      text: "{{query1.data}}",
    },
  });
  const dataNode = fromValue("aaa");
  comp = evalAndReduce(comp, {
    query1: fromRecord({ data: dataNode }),
  });
  expect(comp.children.text.getView()).toEqual("aaa");
  expect((comp as any).isLoading).toBe(false);
  // query fetching...
  comp = evalAndReduce(comp, {
    query1: fromRecord({
      data: dataNode,
      isFetching: fromValue(true),
    }),
  });
  expect((comp as any).isLoading).toBe(true);
  // fetching end...
  comp = evalAndReduce(comp, {
    query1: fromRecord({
      data: dataNode,
      isFetching: fromValue(false),
      latestEndTime: fromValue(new Date().getTime()),
    }),
  });
  expect((comp as any).isLoading).toBe(false);
});

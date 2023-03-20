import { customAction } from "openblocks-core";
import { NumberControl } from "comps/controls/codeControl";
import { evalAndReduce } from "comps/utils";
import { MultiCompBuilder, withDefault } from ".";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { ExecuteAction } from "comps/controls/actionSelector/executeCompTypes";
import {
  booleanExposingStateControl,
  numberExposingStateControl,
  stringExposingStateControl,
} from "comps/controls/codeStateControl";

const TestComp = (function () {
  const childrenMap = {
    numChild: numberExposingStateControl("num"),
    textChild: stringExposingStateControl("text"),
    booleanChild: booleanExposingStateControl("status"),
    value: withDefault(NumberControl, "0"),
  };
  return new MultiCompBuilder(childrenMap, (props) => {
    return props;
  })
    .setPropertyViewFn(() => <></>)
    .build();
})();

const TestExposingComp = withMethodExposing(TestComp, [
  {
    method: {
      name: "doAdd",
      params: [{ name: "addend", type: "number" }],
    },
    execute: (comp, values) => {
      comp.children.value.dispatchChangeValueAction(
        comp.children.value.getView() + (values[0] as number) + ""
      );
    },
  },
]);

test("test exec method", async () => {
  let comp = new TestExposingComp({
    dispatch: (action) => {
      comp = evalAndReduce(comp.reduce(action));
    },
  });
  comp = evalAndReduce(comp);
  comp.reduce(
    customAction<ExecuteAction>(
      {
        type: "execute",
        methodName: "setText",
        // @ts-ignore
        params: ["testText"],
      },
      false
    )
  );
  comp.reduce(
    customAction<ExecuteAction>(
      {
        type: "execute",
        methodName: "setStatus",
        // @ts-ignore
        params: [true],
      },
      false
    )
  );
  comp.reduce(
    customAction<ExecuteAction>(
      {
        type: "execute",
        methodName: "doAdd",
        // @ts-ignore
        params: [10],
      },
      false
    )
  );
  await new Promise((r) => setTimeout(r, 20));
  expect(comp.getView().textChild.value).toEqual("testText");
  expect(comp.getView().booleanChild.value).toEqual(true);
  expect(comp.getView().value).toEqual(10);
});

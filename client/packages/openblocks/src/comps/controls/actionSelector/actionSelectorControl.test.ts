import { simpleMultiComp } from "comps/generators/multi";
import { valueComp } from "comps/generators/simpleGenerators";
import { setGlobalSettings } from "comps/utils/globalSettings";
import { evalAndReduce } from "comps/utils";
import { fromValue } from "openblocks-core";
import { ActionSelectorControl } from "./actionSelectorControl";

test("action handler always get latest data", async () => {
  const fn = jest.fn();
  (window as any).someFunc = fn;

  setGlobalSettings({
    orgCommonSettings: {
      runJavaScriptInHost: true,
    },
  });

  const TestComp = simpleMultiComp({
    a: ActionSelectorControl,
    b: valueComp<boolean>(false),
  });
  const values: any = {
    a: {
      compType: "runScript",
      comp: {
        script: "someFunc()",
      },
      condition: "{{b}}",
    },
    b: false,
  };
  let comp: InstanceType<typeof TestComp>;

  const dispatch = (acton: any) => {
    const temp = comp.reduce(acton);
    comp = evalAndReduce(temp, { b: fromValue(true) });
  };
  comp = new TestComp({ value: values, dispatch });

  const handler = comp.children.a.getView();
  expect(typeof handler).toBe("function");

  handler?.();
  expect(fn).toBeCalledTimes(0);

  comp.children.b.dispatchChangeValueAction(true);
  // using the same ref of a handler cross dispatch is common
  // should ensure this case work properly
  handler?.();
  expect(fn).toBeCalledTimes(1);
});

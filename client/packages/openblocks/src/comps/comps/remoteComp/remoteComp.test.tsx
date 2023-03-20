import { ExecuteAction } from "comps/controls/actionSelector/executeCompTypes";
import { simpleMultiComp, valueComp } from "comps/generators";
import { withSimpleExposing } from "comps/generators/withExposing";
import { withMethodExposing } from "comps/generators/withMethodExposing";
import { evalAndReduce } from "comps/utils";
import { customAction } from "openblocks-core";
import { RemoteCompInfo } from "types/remoteComp";
import { remoteComp } from "./remoteComp";

const npmRemoteInfo: RemoteCompInfo = {
  isRemote: true,
  source: "npm",
  packageName: "p",
  packageVersion: "v",
  compName: "n",
};

const RComp = remoteComp(npmRemoteInfo, async () => {
  return valueComp(123);
});
test("remote comp", async () => {
  let c: any = null;
  c = new RComp({
    dispatch: (action) => {
      if (c) {
        c = c.reduce(action);
      }
    },
  });

  expect(c.toJsonValue()).toBe(undefined);
  await c.load();
  expect(c.toJsonValue()).toBe(123);

  c.dispatchChangeValueAction(345);
  expect(c.toJsonValue()).toBe(345);
});

test("remote comp keep values", async () => {
  let c: any = null;
  c = new RComp({
    dispatch: (action) => {
      if (c) {
        c = c.reduce(action);
      }
    },
    value: 456,
  });

  expect(c.toJsonValue()).toBe(456);
  await c.load();
  expect(c.toJsonValue()).toBe(456);
});

test("remote comp exposing data", async () => {
  const EComp = remoteComp(npmRemoteInfo, async () => {
    return withSimpleExposing(simpleMultiComp({ hello: valueComp(123) }), (comp) => {
      return {
        hello: comp.children.hello.getView(),
      };
    });
  });

  let c: any = null;
  c = new EComp({
    dispatch: (action) => {
      if (c) {
        c = c.reduce(action);
      }
    },
  });

  await c.load();
  const c1 = evalAndReduce(c);
  expect(c1.exposingValues.hello).toBe(123);
});

test("remote comp execute method", async () => {
  const MComp = remoteComp(npmRemoteInfo, async () => {
    return withMethodExposing(simpleMultiComp({ hello: valueComp<number>(123) }), [
      {
        method: {
          name: "add",
          params: [{ name: "value", type: "number" }],
        },
        execute: (comp, values) => {
          const hello = comp.children.hello;
          hello.dispatchChangeValueAction(hello.getView() + (values[0] as number));
        },
      },
    ]);
  });

  let c: any = null;
  c = new MComp({
    dispatch: (action) => {
      if (c) {
        c = c.reduce(action);
      }
    },
  });

  await c.load();
  c.reduce(
    customAction<ExecuteAction>(
      {
        type: "execute",
        methodName: "add",
        params: [10],
      },
      false
    )
  );
  await new Promise((r) => setTimeout(r, 20));
  expect(c.children.hello.getView()).toEqual(133);
});

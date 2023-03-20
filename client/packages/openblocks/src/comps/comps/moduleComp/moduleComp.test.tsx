import "comps";
import { loadComps } from "comps";
import { ExecuteAction } from "comps/controls/actionSelector/executeCompTypes";
import { getCompContainer } from "comps/utils/useCompInstance";
import { ModuleLayoutCompName } from "constants/compConstants";
import {
  customAction,
  executeQueryAction,
  Node,
  routeByNameAction,
  triggerModuleEventAction,
} from "openblocks-core";
import { getPromiseAfterDispatch } from "util/promiseUtils";
import { RootComp } from "../rootComp";
import { TextComp } from "../textComp";
import { InputComp } from "../textInputComp/inputComp";

const appDSL = {
  ui: {
    items: {
      "2e2d4bf2": {
        compType: "module",
        comp: {
          appId: "123",
          events: [
            {
              name: "event1",
              handler: {
                compType: "executeComp",
                comp: {
                  name: "outerInput",
                  methodName: "setValue",
                  params: [{ compType: "string", comp: "event1_triggered", name: "value" }],
                },
              },
            },
          ],
        },
        name: "module1",
      },
      "2bb084bf": {
        compType: "input",
        comp: {
          value: "",
        },
        name: "outerInput",
      },
    },
  },
  queries: [
    {
      compType: "js",
      comp: {
        script: "return 3;",
      },
      id: "dievziawwqy72gszoa42i6m8",
      name: "jsQuery3",
      triggerType: "manual",
    },
    {
      compType: "js",
      comp: {
        script: "return 3 + a;",
      },
      id: "dievziawwqy72gszoa42i6m9",
      name: "jsQuery4",
      triggerType: "manual",
    },
  ],
};

const moduleAppDsl = {
  ui: {
    compType: "module",
    comp: {
      methods: [
        {
          name: "method1",
          action: {
            compType: "executeComp",
            comp: {
              name: "input1",
              methodName: "setValue",
              params: [
                {
                  compType: "string",
                  comp: "hello method1",
                  name: "value",
                },
              ],
            },
          },
        },
        {
          name: "method2",
          params: [{ name: "param1", type: "string" }],
          action: {
            compType: "executeComp",
            comp: {
              name: "input1",
              methodName: "setValue",
              params: [
                {
                  compType: "string",
                  comp: "hello {{param1}}",
                  name: "value",
                },
              ],
            },
          },
        },
      ],
      events: {
        list: [
          { name: "event1", description: "" },
          { name: "event2", description: "" },
        ],
        onEvent: [
          {
            name: "event1",
            handler: {
              compType: "executeComp",
              comp: {
                name: "input1",
                methodName: "setValue",
                params: [{ compType: "string", comp: "from_event1", name: "value" }],
              },
            },
          },
        ],
      },
      io: {
        inputs: [
          { name: "inQuery", description: "", type: "query" },
          { name: "inNum", description: "", type: "number" },
          {
            name: "inString",
            description: "",
            type: "string",
            defaultValue: { compType: "string", comp: "default_value" },
            test: { compType: "string", comp: "test_value" },
          },
        ],
        outputs: [{ description: "", value: "{{input1.value}}", name: "out" }],
      },
      containerSize: {
        height: 20,
        width: 24,
      },
      container: {
        items: {
          "2010af2a": {
            compType: "input",
            comp: {
              value: "hello",
            },
            name: "input1",
          },
          e97d3df7: {
            compType: "text",
            comp: {
              text: "inNum:{{inNum.value}}",
            },
            name: "text1",
          },
          e97d3df8: {
            compType: "text",
            comp: {
              text: "inString:{{inString.value}}",
            },
            name: "text2",
          },
          e97d3df9: {
            compType: "text",
            comp: {
              text: "inQueryData:{{inQuery.data}}",
            },
            name: "text3",
          },
        },
      },
    },
  },
  queries: [
    {
      compType: "js",
      comp: {
        script: "return 1 + 1",
      },
      id: "dievziawwqy72gszoa42i6m7",
      name: "jsQuery",
      triggerType: "manual",
      onEvent: [
        {
          name: "success",
          handler: {
            compType: "executeComp",
            comp: {
              name: "input1",
              methodName: "setValue",
              params: [
                {
                  compType: "string",
                  comp: "hello success",
                  name: "value",
                },
              ],
            },
          },
        },
      ],
    },
    {
      compType: "js",
      comp: {
        script: "inQuery.run({a: 10}); \ninput1.setValue('hello input query'); return 'ok'",
      },
      id: "dievziawwqy72gszoa42i6m8",
      name: "jsQuery2",
      triggerType: "manual",
    },
    {
      compType: "js",
      comp: {
        script: "event1.trigger();",
      },
      id: "dievziawwqy72gszoa42i6m9",
      name: "jsQuery3",
      triggerType: "manual",
    },
  ],
};

interface InitModuleReturn {
  root: () => RootComp;
  moduleRoot: () => RootComp;
  module: () => any;
  moduleOutputNodes: () => Record<string, Node<any>>;
  input: () => InstanceType<typeof InputComp>;
  inputValue: () => string;
  text1: () => InstanceType<typeof TextComp>;
  text2: () => InstanceType<typeof TextComp>;
  text3: () => InstanceType<typeof TextComp>;
  outerInputValue: () => string;
}

function afterInitModule(callback: (ret: InitModuleReturn) => void) {
  const container = getCompContainer({
    Comp: RootComp,
    initialValue: appDSL,
    reduceContext: {
      readOnly: false,
      applicationId: "123",
      moduleDSL: { 123: moduleAppDsl },
      parentApplicationPath: [],
    },
  });
  if (!container) {
    throw new Error();
  }

  const getItem = (rootComp: RootComp, i: string) => {
    const items = rootComp.children.ui.getAllCompItems();
    return items[i].children.comp as any;
  };

  const getAppItem = (i: string) => {
    return getItem(container.comp as any, i);
  };

  const moduleComp = () => {
    return getAppItem("2e2d4bf2");
  };

  const getModuleItem = (i: string) => {
    const module = moduleComp();
    const rootComp = (module as any).moduleRootComp as RootComp;
    return getItem(rootComp, i);
  };

  container.init().then(() => {
    moduleComp().dispatch(customAction({ type: "init" }, false));
    setTimeout(() => {
      callback({
        root: () => container.comp as RootComp,
        moduleRoot: () => moduleComp().moduleRootComp as RootComp,
        module: moduleComp,
        moduleOutputNodes: () => moduleComp().getOutputNodes(),
        input: () => getModuleItem("2010af2a"),
        inputValue: () => getModuleItem("2010af2a").children.value.getView().value as string,
        text1: () => getModuleItem("e97d3df7"),
        text2: () => getModuleItem("e97d3df8"),
        text3: () => getModuleItem("e97d3df9"),
        outerInputValue: () => getAppItem("2bb084bf").children.value.getView().value as string,
      });
    });
  });
}

beforeAll(async () => {
  await loadComps();
});

describe("module comp", () => {
  test("init module to ready", (done) => {
    afterInitModule(({ module, text1, text2 }) => {
      // outputs
      expect(Object.keys(module().getOutputNodes())).toStrictEqual(["out"]);
      expect(module().exposingValues.out).toBe("hello");

      // inputs
      expect(Object.keys(module().children.inputs.getInputNodes())).toStrictEqual([]);
      expect(text1().children.text.getView().value).toBe("inNum:");
      module().children.inputs.children.inNum.dispatchChangeValueAction(1);
      expect(text1().children.text.getView().value).toBe("inNum:1");
      expect(Object.keys(module().children.inputs.getInputNodes())).toStrictEqual(["inNum"]);

      // inputs with default
      expect(text2().children.text.getView().value).toBe("inString:default_value");
      module().children.inputs.children.inString.dispatchChangeValueAction("hello");
      expect(text2().children.text.getView().value).toBe("inString:hello");
      expect(Object.keys(module().children.inputs.getInputNodes())).toStrictEqual([
        "inNum",
        "inString",
      ]);

      done();
    });
  });

  test("change value in module", (done) => {
    afterInitModule(({ input, inputValue }) => {
      expect(inputValue()).toBe("hello");

      // sync change value
      input().children.value.dispatchChangeValueAction("world" as any);
      expect(inputValue()).toBe("world");

      // change value with promise
      const promiseAction = getPromiseAfterDispatch(
        input().children.value.dispatch,
        input().children.value.changeValueAction("hello world"),
        {
          autoHandleAfterReduce: true,
        }
      );
      promiseAction.then(() => {
        expect(inputValue()).toBe("hello world");
        done();
      });
    });
  });

  test("exec query in module", (done) => {
    afterInitModule(({ moduleRoot, module, inputValue }) => {
      expect(module().exposingValues.out).toBe("hello");
      // run js query
      moduleRoot().dispatch(routeByNameAction("jsQuery", executeQueryAction({})));

      // query result processed async
      setTimeout(() => {
        // check query success event triggered
        expect(inputValue()).toBe("hello success");
        expect(module().exposingValues.out).toBe("hello success");
        done();
      }, 300);
    });
  });

  test("input query data", (done) => {
    afterInitModule(({ text3, module, root, inputValue }) => {
      expect(text3().children.text.getView().value).toBe("inQueryData:");

      // select input query
      module().children.inputs.children.inQuery.dispatchChangeValueAction({ value: "jsQuery3" });
      expect(Object.keys(module().children.inputs.getInputNodes())).toStrictEqual(["inQuery"]);
      expect(text3().children.text.getView().value).toBe("inQueryData:");

      // execute query from outer
      root().dispatch(routeByNameAction("jsQuery3", executeQueryAction({})));

      setTimeout(() => {
        expect(text3().children.text.getView().value).toBe("inQueryData:3");
        done();
      }, 1000);
    });
  });

  test("exec input query", (done) => {
    afterInitModule(({ text3, module, moduleRoot, inputValue }) => {
      expect(text3().children.text.getView().value).toBe("inQueryData:");

      // select input query
      module().children.inputs.children.inQuery.dispatchChangeValueAction({ value: "jsQuery4" });
      expect(Object.keys(module().children.inputs.getInputNodes())).toStrictEqual(["inQuery"]);
      expect(text3().children.text.getView().value).toBe("inQueryData:");

      // execute query from inner: inQuery.run({a: 10});
      moduleRoot().dispatch(routeByNameAction("jsQuery2", executeQueryAction({})));

      setTimeout(() => {
        expect(inputValue()).toBe("hello input query");
        expect(text3().children.text.getView().value).toBe("inQueryData:13");
        done();
      }, 1000);
    });
  });

  test("exec methods", (done) => {
    afterInitModule(({ root, inputValue }) => {
      const exposing = root().nameAndExposingInfo();
      expect(Object.keys(exposing.module1.methods)).toStrictEqual(["method1", "method2"]);
      root().dispatch(
        routeByNameAction(
          "module1",
          customAction<ExecuteAction>(
            {
              type: "execute",
              methodName: "method1",
              params: [],
            },
            false
          )
        )
      );
      setTimeout(() => {
        expect(inputValue()).toBe("hello method1");
        done();
      }, 2000);
    });
  });

  test("exec methods with params", (done) => {
    afterInitModule(({ root, inputValue }) => {
      const exposing = root().nameAndExposingInfo();
      expect(Object.keys(exposing.module1.methods)).toStrictEqual(["method1", "method2"]);
      root().dispatch(
        routeByNameAction(
          "module1",
          customAction<ExecuteAction>(
            {
              type: "execute",
              methodName: "method2",
              params: ["Lucy"],
            },
            false
          )
        )
      );
      setTimeout(() => {
        expect(inputValue()).toBe("hello Lucy");
        done();
      }, 2000);
    });
  });

  test("trigger events by event", (done) => {
    afterInitModule(({ root, text3, module, moduleRoot, outerInputValue }) => {
      expect(outerInputValue()).toBe("");
      moduleRoot().dispatch(
        routeByNameAction(ModuleLayoutCompName, triggerModuleEventAction("event1"))
      );
      setTimeout(() => {
        expect(outerInputValue()).toBe("event1_triggered");
        done();
      });
    });
  });
  test("trigger events by js query", (done) => {
    afterInitModule(({ root, text3, module, moduleRoot, outerInputValue }) => {
      expect(outerInputValue()).toBe("");
      // execute query from inner: event1.trigger();
      moduleRoot().dispatch(routeByNameAction("jsQuery3", executeQueryAction({})));
      setTimeout(() => {
        expect(outerInputValue()).toBe("event1_triggered");
        done();
      }, 1000);
    });
  });
});

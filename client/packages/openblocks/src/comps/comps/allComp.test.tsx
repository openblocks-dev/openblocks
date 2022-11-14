import { uiCompRegistry } from "../uiCompRegistry";
import { CompConstructor, CustomAction, wrapChildAction } from "openblocks-core";
import { StringControl } from "comps/controls/codeControl";
import { BoolControl } from "comps/controls/boolControl";
import { LabelControl } from "comps/controls/labelControl";
import { MultiCompBuilder, valueComp } from "comps/generators";
import { QueryComp } from "comps/queries";
import { JSQuery } from "comps/queries/jsQuery";
import { evalAndReduce } from "comps/utils";
import { InputComp } from "comps/comps/textInputComp/inputComp";
import { CheckboxComp } from "./selectInputComp/checkboxComp";
import { AppLayoutComp } from "./gridLayoutComp";
import { RootComp } from "./rootComp";
import { TableComp } from "./tableComp";
import { ColumnComp, RenderComp } from "comps/comps/tableComp/column/tableColumnComp";
import { ParamsStringControl } from "../controls/paramsControl";
import { isExposingMethodComp } from "comps/generators/withMethodExposing";
import _ from "lodash";
import { SQLQuery } from "../queries/sqlQuery/SQLQuery";
import { loadComps } from "comps";
import { QueryMap } from "@openblocks-ee/constants/queryConstants";
import log from "loglevel";

beforeAll(async () => {
  await loadComps();
});

// This file contains the trials that all comps need to pass

// TODO: serialization of each comp, deserialization is normal
const TestComp = (function () {
  const childrenMap = {
    v1: valueComp("abc"),
    v2: valueComp("v2"),
  };
  return new MultiCompBuilder(childrenMap, (props) => {
    return props;
  })
    .setPropertyViewFn(() => <></>)
    .build();
})();

const COMPS_MAP = {
  checkboxBasic: CheckboxComp,
  bool: BoolControl,
  label: LabelControl,
  string: StringControl,
  test: TestComp,
  input: InputComp,
  query: QueryComp,
  js: JSQuery,
  mysql: SQLQuery,
  params: ParamsStringControl,
  layout: AppLayoutComp,
  root: RootComp,
  table: TableComp,
  tableColumn: ColumnComp,
  tableColumnRender: RenderComp,
} as Record<string, CompConstructor>;

const compContextActionMap = {
  tableColumn: wrapChildAction(
    "render",
    RenderComp.changeContextDataAction({
      currentCell: "aaa",
      currentRow: [{ a: "aa" }],
      currentIndex: 1,
      currentOriginalIndex: 1,
    })
  ),
  tableColumnRender: RenderComp.changeContextDataAction({
    currentCell: "aaa",
    currentRow: [{ a: "aa" }],
    currentIndex: 1,
    currentOriginalIndex: 1,
  }),
} as Record<string, CustomAction>;

Object.entries(uiCompRegistry).forEach(([key, value]) => {
  COMPS_MAP["ui_" + key] = value.comp;
});
Object.keys(QueryMap).forEach((key) => {
  COMPS_MAP["query_" + key] = (QueryMap as Record<string, CompConstructor>)[key];
});

test("test comp don't change if no value change", () => {
  Object.keys(COMPS_MAP).forEach((name) => {
    const Comp = COMPS_MAP[name];
    let comp = new Comp({});
    if (compContextActionMap[name]) {
      // fill the context
      comp = comp.reduce(compContextActionMap[name]);
    }
    comp.getView(); // under the state of uneval can also getView
    comp = evalAndReduce(comp);
    expect(comp.node() === comp.node()).toBe(true);
    expect(comp.node()?.evaluate() === comp.node()?.evaluate()).toBe(true);
    const comp2 = evalAndReduce(comp);
    if (comp2 !== comp) {
      const comp3 = evalAndReduce(comp2);
      if (comp3 === comp2) {
        // log.debug(`${name} need two eval`);
      } else {
        const newComp = evalAndReduce(comp);
        Object.keys((comp as any).children).forEach((key) => {
          log.log(
            `${key}, isEqual ${(comp as any).children[key] === (newComp as any).children[key]}`
          );
        });
        throw new Error("bad " + name);
      }
    }
  });
});

test("test root comp exposing", () => {
  let comp = new RootComp({
    value: {
      ui: {
        items: {
          item1: {
            name: "input1",
            compType: "input",
          },
          item2: {
            name: "text1",
            compType: "text",
          },
        },
      },
    },
  });
  comp = evalAndReduce(comp);
  const input1Node = comp.nameAndExposingInfo().input1.property;
  expect(input1Node.type).toBe("record");
  // Both calls refer to the same
  expect(comp.nameAndExposingInfo().input1.property).toBe(input1Node);
});

test("comp exposing method duplicate name", () => {
  // Exposure methods of the same component cannot have the same name
  Object.values(COMPS_MAP).forEach((Comp) => {
    const comp = new Comp({});
    const methods = [];
    if (isExposingMethodComp(comp)) {
      methods.push(comp.getMethodConfig());
    }
    const childrenMap = (comp as any).children;
    childrenMap &&
      Object.values(childrenMap).forEach((child) => {
        if (isExposingMethodComp(child as any)) {
          methods.push((child as any).getMethodConfig());
        }
      });
    const allMethodName = methods.flatMap((m) => m.map((methodConfig) => methodConfig.name));
    expect(allMethodName.length).toEqual(_.uniq(allMethodName).length);
  });
});

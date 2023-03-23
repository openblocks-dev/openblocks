import { QueryMap } from "@openblocks-ee/constants/queryConstants";
import { loadComps } from "comps";
import { ColumnComp, RenderComp } from "comps/comps/tableComp/column/tableColumnComp";
import { InputComp } from "comps/comps/textInputComp/inputComp";
import { BoolControl } from "comps/controls/boolControl";
import { StringControl } from "comps/controls/codeControl";
import { IconControl } from "comps/controls/iconControl";
import { LabelControl } from "comps/controls/labelControl";
import { RefControl } from "comps/controls/refControl";
import { MultiCompBuilder, valueComp } from "comps/generators";
import { isExposingMethodComp } from "comps/generators/withMethodExposing";
import { QueryComp } from "comps/queries";
import { JSQuery } from "comps/queries/jsQuery";
import { evalAndReduce } from "comps/utils";
import _ from "lodash";
import { CompConstructor } from "openblocks-core";
import { ParamsStringControl } from "../controls/paramsControl";
import { SQLQuery } from "../queries/sqlQuery/SQLQuery";
import { uiCompRegistry } from "../uiCompRegistry";
import { AppLayoutComp } from "./gridLayoutComp";
import { ListViewComp } from "./listViewComp";
import { RootComp } from "./rootComp";
import { CheckboxComp } from "./selectInputComp/checkboxComp";
import { TableComp } from "./tableComp";

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
  icon: IconControl,
  ref: RefControl,
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
  listView: ListViewComp,
  table: TableComp,
  tableColumn: ColumnComp,
  tableColumnRender: RenderComp,
} as Record<string, CompConstructor>;

Object.entries(uiCompRegistry).forEach(([key, value]) => {
  COMPS_MAP["ui_" + key] = value.comp;
});
Object.keys(QueryMap).forEach((key) => {
  COMPS_MAP["query_" + key] = (QueryMap as Record<string, CompConstructor>)[key];
});

function logDiff(comp: any, newComp: any, prefix?: string) {
  if (_.isNil(comp.children)) {
    console.info(`diff. comp.${prefix}: `, comp, ` newComp.${prefix}: `, newComp);
    return;
  }
  Object.keys(comp.children).forEach((key) => {
    const child = comp.children[key];
    const newChild = newComp.children[key];
    if (child !== newChild) {
      const outputKey = (prefix ? prefix + "." : "") + key;
      console.info(`diff ${outputKey}. comp: `, child, ` newComp: `, newChild);
      logDiff(child, newChild, outputKey);
    }
  });
}

test("test comp don't change if no value change", () => {
  Object.keys(COMPS_MAP).forEach((name) => {
    const Comp = COMPS_MAP[name];
    let comp = new Comp({});
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
        logDiff(comp, newComp);
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

test("changeDispatch shouldn't drop the node() cache", () => {
  Object.values(COMPS_MAP).forEach((Comp) => {
    let comp = new Comp({
      dispatch: (action) => {
        comp = evalAndReduce(comp.reduce(action));
      },
    });
    comp.node();
    let newComp = comp.changeDispatch((action) => {
      newComp = evalAndReduce(newComp.reduce(action));
    });
    expect(comp.node() === newComp.node()).toBeTruthy();
  });
});

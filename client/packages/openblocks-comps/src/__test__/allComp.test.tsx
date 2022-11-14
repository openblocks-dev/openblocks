import _ from "lodash";
import { CompConstructor, CustomAction } from "openblocks-core";
import { evalAndReduce, isExposingMethodComp } from "openblocks-sdk";
import { ChartCompWithDefault } from "comps/chartComp/chartComp";
import log from "loglevel";

const COMPS_MAP = {
  chart: ChartCompWithDefault,
} as Record<string, CompConstructor>;

const compContextActionMap = {} as Record<string, CustomAction>;

test("test comp don't change if no value change", () => {
  Object.keys(COMPS_MAP).forEach((name) => {
    const Comp = COMPS_MAP[name];
    let comp = new Comp({});
    if (compContextActionMap[name]) {
      // set context
      comp = comp.reduce(compContextActionMap[name]);
    }
    comp.getView(); // getView() is allowed when unevaluated
    comp = evalAndReduce(comp);
    expect(comp.node() === comp.node()).toBe(true);
    expect(comp.node()?.evaluate() === comp.node()?.evaluate()).toBe(true);
    const comp2 = evalAndReduce(comp);
    if (comp2 !== comp) {
      const comp3 = evalAndReduce(comp2);
      if (comp3 === comp2) {
        // log.debug(`${name} need eval twice to converge`);
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

test("comp exposing method duplicate name", () => {
  // one comp can't expose two methods with the same name
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

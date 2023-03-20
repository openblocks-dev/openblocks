import _ from "lodash";
import { map } from "./map";
import { valueComp } from "./simpleGenerators";

const TestComp = valueComp<string>("");
const MapComp = map(TestComp, true);

describe("mapComp", () => {
  it("map actions", () => {
    let comp = new MapComp({ value: {} });
    expect(_.size(comp.getView())).toEqual(0);

    comp = comp.reduce(MapComp.batchSetAction({ a: "a" }));
    expect(_.size(comp.getView())).toEqual(1);
    expect(comp.getView().a.getView()).toEqual("a");

    comp = comp.reduce(MapComp.batchSetAction({ a: "a0", b: "b" }));
    expect(_.size(comp.getView())).toEqual(2);
    expect(comp.getView().a.getView()).toEqual("a0");
    expect(comp.getView().b.getView()).toEqual("b");

    comp = comp.reduce(MapComp.batchSetAction({ a: "a", c: "c" }));
    expect(_.size(comp.getView())).toEqual(3);
    expect(comp.getView().a.getView()).toEqual("a");
    expect(comp.getView().b.getView()).toEqual("b");
    expect(comp.getView().c.getView()).toEqual("c");

    let comp1 = comp.reduce(MapComp.filterAction(["a", "c"]));
    expect(_.size(comp1.getView())).toEqual(2);
    expect(comp1.getView().a.getView()).toEqual("a");
    expect(comp1.getView().c.getView()).toEqual("c");

    comp = comp.reduce(MapComp.batchDeleteAction(["a", "c"]));
    expect(_.size(comp.getView())).toEqual(1);
    expect(comp.getView().b.getView()).toEqual("b");

    comp = comp.reduce(MapComp.clearAction());
    expect(_.size(comp.getView())).toEqual(0);
  });
});

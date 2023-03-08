import _ from "lodash";
import { map } from "./map";
import { valueComp } from "./simpleGenerators";

const TestComp = valueComp<string>("");
const MapComp = map(TestComp);

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

    comp = comp.reduce(MapComp.clearAction());
    expect(_.size(comp.getView())).toEqual(0);
  });
});

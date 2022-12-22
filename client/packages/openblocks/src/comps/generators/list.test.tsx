import { arrayMove } from "comps/utils";
import { valueComp } from ".";
import { ConstructorToComp } from "openblocks-core";
import { list } from "./list";
import { MultiCompBuilder } from "./multi";

const emptyViewFunc = (props: Record<string, any>) => {
  return <div></div>;
};
const TestComp = (function () {
  const childrenMap = {
    v1: valueComp<string>("abc"),
  };
  return new MultiCompBuilder(childrenMap, (props) => {
    return props.v1;
  })
    .setPropertyViewFn(emptyViewFunc)
    .build();
})();
const ListTestComp = list(TestComp);

/**
 * The result of deserialization after serialization is the same
 */
function expectToJsonPass(comp: ConstructorToComp<typeof ListTestComp>) {
  let comp2 = new ListTestComp({ value: comp.toJsonValue() });
  expect(comp2.getView().length).toEqual(comp.getView().length);
  for (let i = 0; i < comp2.getView().length; i++) {
    expect(comp2.getView()[i].getView()).toEqual(comp.getView()[i].getView());
  }
}

test("array move", () => {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  expect(arrayMove(data, 8, 3)).toEqual([0, 1, 2, 8, 3, 4, 5, 6, 7, 9]);
  expect(arrayMove(data, 0, 4)).toEqual([1, 2, 3, 4, 0, 5, 6, 7, 8, 9]);
});

test("list actions", () => {
  let comp = new ListTestComp({ value: [] });
  expect(comp.getView().length).toEqual(0);
  comp = comp.reduce(comp.pushAction({ v1: "value1" }));
  expect(comp.getView().length).toEqual(1);
  expect(comp.getView()[0].getView()).toEqual("value1");
  comp = comp.reduce(comp.pushAction({ v1: "value2" }));
  expect(comp.getView().length).toEqual(2);
  expect(comp.getView()[1].getView()).toEqual("value2");

  expectToJsonPass(comp);

  comp = comp.reduce(comp.pushAction({ v1: "value3" }));
  expect(comp.getView().length).toEqual(3);

  comp = comp.reduce(comp.arrayMoveAction(2, 0));
  expect(comp.getView().length).toEqual(3);
  expect(comp.getView()[0].getView()).toEqual("value3");
  expect(comp.getView()[1].getView()).toEqual("value1");
  expect(comp.getView()[2].getView()).toEqual("value2");

  expectToJsonPass(comp);
  comp = comp.reduce(comp.deleteAction(1));
  expect(comp.getView().length).toEqual(2);
  expect(comp.getView()[0].getView()).toEqual("value3");
  expect(comp.getView()[1].getView()).toEqual("value2");

  const item1 = comp.getView()[0];

  comp = comp.reduce(comp.clearAction());
  expect(comp.getView().length).toEqual(0);
  comp = comp.reduce(comp.pushCompAction(item1));
  expect(comp.getView().length).toEqual(1);
  expect(comp.getView()[0].getView()).toEqual("value3");
});

test("list multi action", () => {
  let comp = new ListTestComp({ value: [] });
  expect(comp.getView().length).toEqual(0);
  comp = comp.reduce(comp.pushAction({ v1: "value1" }));
  comp = comp.reduce(comp.pushAction({ v1: "value2" }));
  expect(comp.getView().length).toEqual(2);
  comp = comp.reduce(comp.multiAction([comp.deleteAction(0), comp.pushAction({ v1: "value3" })]));
  expect(comp.getView().length).toEqual(2);
  expect(comp.getView()[0].getView()).toEqual("value2");
  expect(comp.getView()[1].getView()).toEqual("value3");
});

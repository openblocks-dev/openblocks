import { Comp } from "openblocks-core";

function serialize(comp: Comp) {
  return JSON.stringify(comp.toJsonValue());
}

test("test action and reduce", () => {
  // let comp = new GridLayoutComp({});
  // expect(serialize(comp)).toEqual('{"layout":[],"items":{}}');
  // expect(Object.keys(comp.children.items.children).length).toEqual(0);
  // const action = wrapChildAction("items", addChildAction("key", {compType: "test"}));
  // comp = comp.reduce(action);
  // const oldItems = comp.children.items;
  // comp = comp.reduce(changeChildAction("layout", [{w: 1, h: 2}]));
  // comp = evalAndReduce(comp);
  // expect(comp.children.items).toBe(oldItems);
});

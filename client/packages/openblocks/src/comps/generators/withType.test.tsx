import { withType, withTypeAndChildrenAbstract } from "./withType";
import { valueComp } from "./simpleGenerators";

const compMap = {
  v1: valueComp<number>(0),
  v2: valueComp<string>("abc"),
};
test("with type", () => {
  const NewComp = withType(compMap, "v2");
  const comp = new NewComp({});
  comp.getView();
  const result = comp.getTypeSafeView();
  expect(result).toBe("abc");
  const pass: string | number = result;
  // find a way to verify that the type inference is correct, it is expected that the following code will not compile
  // const reject: string = result;
});

test("withTypeAndChildrenAbstract", () => {
  const AbstractComp = withTypeAndChildrenAbstract(compMap, "v2", {});
  const NewComp = class extends AbstractComp {
    getView() {
      return this.children.compType.getView();
    }
  };
  const comp = new NewComp({});
  comp.getView();
  const result = comp.getTypeSafeView();
  expect(result).toBe("abc");
});

test("withTypeAndChildrenAbstract with custom", () => {
  const AbstractComp = withTypeAndChildrenAbstract(compMap, "v2", {}, "myType", "myComp");
  const NewComp = class extends AbstractComp {
    getView() {
      return this.children.myComp.getView();
    }
  };
  const comp = new NewComp({});
  comp.getView();
  const result = comp.getTypeSafeView();
  expect(result).toBe("abc");
});

test("withTypeAndChildrenAbstract preserve previous value", () => {
  const AbstractComp = withTypeAndChildrenAbstract(compMap, "v2", {}, "myType", "myComp");
  const NewComp = class extends AbstractComp {
    getView() {
      return this.children.myComp.getView();
    }
  };
  let comp = new NewComp({
    dispatch: (action) => {
      if (comp) {
        comp = comp.reduce(action);
      }
    },
  });
  expect(comp.getTypeSafeView()).toBe("abc");

  // change success, previous value should be saved
  comp.dispatchChangeAndPreserveAction({ myType: "v1", myComp: 1 });
  expect(comp.getTypeSafeView()).toBe(1);

  // use previous
  comp.dispatchChangeAndPreserveAction({ myType: "v2" });
  expect(comp.getTypeSafeView()).toBe("abc");

  // use previous
  comp.dispatchChangeAndPreserveAction({ myType: "v1" });
  expect(comp.getTypeSafeView()).toBe(1);

  // use new value, previous value should be overwritten
  comp.dispatchChangeAndPreserveAction({ myType: "v2", myComp: "cde" });
  expect(comp.getTypeSafeView()).toBe("cde");

  // v1's previous value should not be saved persistence
  expect(comp.toJsonValue()).toMatchObject({ myType: "v2", myComp: "cde" });
});

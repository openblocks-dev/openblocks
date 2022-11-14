import { valueComp } from ".";
import { MultiCompBuilder } from "./multi";
import { migrateOldData } from "./simpleGenerators";

export const TestComp = (function () {
  const childrenMap = {
    cnt: valueComp<number>(1),
    str: valueComp<string>("df"),
  };

  return new MultiCompBuilder(childrenMap, (props) => {
    return props;
  })
    .setPropertyViewFn(() => null)
    .build();
})();

const NewComp = migrateOldData(TestComp, (data: any) => {
  if (typeof data === "number") {
    return {
      cnt: data + 100,
      str: "",
    };
  }
  return data;
});

test("test migrate old data", () => {
  let comp = new NewComp({ value: { cnt: 11 } });
  expect(comp.getView().cnt).toEqual(11);
  comp = new NewComp({ value: 12 } as any);
  expect(comp.getView().cnt).toEqual(112);
});

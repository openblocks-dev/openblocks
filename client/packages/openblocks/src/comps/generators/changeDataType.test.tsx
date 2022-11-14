import { NumberControl, StringControl } from "comps/controls/codeControl";
import { changeDataType } from "./changeDataType";
import { MultiCompBuilder } from "./multi";
import { evalAndReduce } from "comps/utils";
import { Comp } from "openblocks-core";

const childrenMap = {
  value: StringControl,
  defaultValue: NumberControl,
};
const MultiComp = new MultiCompBuilder(childrenMap, (props) => {
  return props;
})
  .setPropertyViewFn(() => <></>)
  .build();

const NewComp = changeDataType(
  MultiComp,
  (x) => x.value ?? "",
  (value) => ({
    defaultValue: "23",
    value: value,
  })
);

test("test change data type", () => {
  let comp = new NewComp({ value: "ss" });
  comp = evalAndReduce(comp);
  const props = comp.getView();
  expect(props.value).toEqual("ss");
  expect(props.defaultValue).toEqual(23);
  expect(comp.toJsonValue()).toEqual("ss");
});

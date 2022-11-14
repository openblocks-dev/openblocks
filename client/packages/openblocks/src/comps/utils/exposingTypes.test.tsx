import { fromUnevaledValue } from "openblocks-core";
import { exposingDataForAutoComplete, NameAndExposingInfo } from "./exposingTypes";

describe("exposingDataForAutoComplete", () => {
  const func = () => {};
  const info: NameAndExposingInfo = {
    input1: {
      property: fromUnevaledValue("1"),
      propertyValue: { value: 3, hidden: false },
      propertyDesc: {},
      methods: {},
    },
    input2: {
      property: fromUnevaledValue("2"),
      propertyValue: { value: 3, hidden: false },
      propertyDesc: {},
      methods: { setValue: { params: [], func: func } },
    },
  };
  it("not function", () => {
    expect(exposingDataForAutoComplete(undefined)).toStrictEqual({});
    expect(exposingDataForAutoComplete(info)).toStrictEqual({
      input1: { value: 3, hidden: false },
      input2: { value: 3, hidden: false },
    });
  });
  it("function", () => {
    expect(exposingDataForAutoComplete(info, true)).toStrictEqual({
      input1: { value: 3, hidden: false },
      input2: { value: 3, hidden: false, setValue: func },
    });
  });
});

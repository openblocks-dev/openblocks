import { textInputValidate } from "./textInputConstants";
import { trans } from "../../../i18n";

test("textInputValidate", () => {
  expect(
    textInputValidate({
      value: { value: "1" },
      required: false,
      minLength: 0,
      maxLength: 0,
      validationType: "Regex",
      regex: /\d/,
      customRule: "",
    })
  ).toMatchObject({ validateStatus: "" });

  expect(
    textInputValidate({
      value: { value: "x" },
      required: false,
      minLength: 0,
      maxLength: 0,
      validationType: "Regex",
      regex: /\d/,
      customRule: "",
    })
  ).toMatchObject({ validateStatus: "error", help: trans("validationDesc.regex") });

  expect(
    textInputValidate({
      value: { value: "" },
      required: true,
      minLength: 0,
      maxLength: 0,
      validationType: "Regex",
      regex: /\d/,
      customRule: "",
    })
  ).toMatchObject({ validateStatus: "error", help: trans("prop.required") });

  expect(
    textInputValidate({
      value: { value: "" },
      required: true,
      minLength: 0,
      maxLength: 0,
      validationType: "Regex",
      regex: /\d/,
      customRule: "test",
    })
  ).toMatchObject({ validateStatus: "error", help: "test" });

  expect(
    textInputValidate({
      value: { value: "" },
      required: false,
      minLength: 3,
      maxLength: 0,
      validationType: "Regex",
      regex: /\d/,
      customRule: "",
    })
  ).toMatchObject({
    validateStatus: "error",
    help: trans("validationDesc.minLength", { length: 0, minLength: 3 }),
  });

  expect(
    textInputValidate({
      value: { value: "xxxx" },
      required: false,
      minLength: 0,
      maxLength: 2,
      validationType: "Regex",
      regex: /\d/,
      customRule: "",
    })
  ).toMatchObject({
    validateStatus: "error",
    help: trans("validationDesc.maxLength", { length: 4, maxLength: 2 }),
  });
});

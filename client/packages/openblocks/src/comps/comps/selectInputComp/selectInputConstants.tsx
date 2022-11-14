import { Section, sectionNames } from "openblocks-design";
import { ChildrenTypeToDepsKeys, depsConfig } from "../../generators/withExposing";
import { BoolControl } from "../../controls/boolControl";
import { CustomRuleControl } from "../../controls/codeControl";
import { isEmpty } from "lodash";
import { ConstructorToComp, RecordConstructorToComp } from "openblocks-core";
import {
  arrayStringExposingStateControl,
  jsonExposingStateControl,
  stringExposingStateControl,
} from "../../controls/codeStateControl";
import { requiredPropertyView } from "comps/utils/propertyUtils";
import { trans } from "i18n";

export const SelectInputValidationChildren = {
  required: BoolControl,
  customRule: CustomRuleControl,
};
type ValidationComp = RecordConstructorToComp<typeof SelectInputValidationChildren>;

type ValidationParams = {
  value: { value: string | (string | number)[] };
  required: boolean;
  customRule: string;
};

export const selectInputValidate = (
  props: ValidationParams
): {
  validateStatus: "success" | "warning" | "error";
  help?: string;
} => {
  if (props.customRule) {
    return { validateStatus: "error", help: props.customRule };
  }
  const value = props.value.value;
  if (props.required && isEmpty(value)) {
    return { validateStatus: "error", help: trans("prop.required") };
  }
  return { validateStatus: "success" };
};

type ValidationCompWithValue = ValidationComp & {
  value: ConstructorToComp<
    ReturnType<
      | typeof stringExposingStateControl
      | typeof arrayStringExposingStateControl
      | typeof jsonExposingStateControl<(string | number)[]>
    >
  >;
};
export const SelectInputInvalidConfig = depsConfig<
  ValidationCompWithValue,
  ChildrenTypeToDepsKeys<ValidationCompWithValue>
>({
  name: "invalid",
  desc: trans("export.invalidDesc"),
  depKeys: ["value", "required", "customRule"],
  func: (input) =>
    selectInputValidate({
      ...input,
      value: { value: input.value },
    }).validateStatus !== "success",
});

export const SelectInputValidationSection = (children: ValidationComp) => (
  <Section name={sectionNames.validation}>
    {requiredPropertyView(children)}
    {children.customRule.propertyView({})}
  </Section>
);

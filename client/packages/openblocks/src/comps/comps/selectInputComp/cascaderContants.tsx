import { SelectEventHandlerControl } from "../../controls/eventHandlerControl";
import { Section, sectionNames } from "openblocks-design";
import { RecordConstructorToComp } from "openblocks-core";
import { JSONObjectArrayControl, BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { arrayStringExposingStateControl } from "comps/controls/codeStateControl";
import { BoolControl } from "comps/controls/boolControl";
import { LabelControl } from "comps/controls/labelControl";
import { styleControl } from "comps/controls/styleControl";
import { CascaderStyle } from "comps/controls/styleControlConstants";
import {
  allowClearPropertyView,
  hiddenPropertyView,
  disabledPropertyView,
  placeholderPropertyView,
} from "comps/utils/propertyUtils";
import { trans, i18nObjs } from "i18n";

export const defaultDataSource = JSON.stringify(i18nObjs.cascader, null, " ");

export const CascaderChildren = {
  value: arrayStringExposingStateControl("value", i18nObjs.cascaderDefult),
  label: LabelControl,
  placeholder: StringControl,
  disabled: BoolCodeControl,
  onEvent: SelectEventHandlerControl,
  allowClear: BoolControl,
  options: JSONObjectArrayControl,
  style: styleControl(CascaderStyle),
};

export const CascaderPropertyView = (
  children: RecordConstructorToComp<typeof CascaderChildren & { hidden: typeof BoolCodeControl }>
) => (
  <>
    <Section name={sectionNames.basic}>
      {children.options.propertyView({ label: trans("cascader.options") })}
      {children.value.propertyView({ label: trans("prop.defaultValue") })}
      {placeholderPropertyView(children)}
    </Section>

    {children.label.getPropertyView()}

    <Section name={sectionNames.interaction}>
      {children.onEvent.getPropertyView()}
      {disabledPropertyView(children)}
    </Section>

    <Section name={sectionNames.advanced}>{allowClearPropertyView(children)}</Section>

    <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

    <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
  </>
);

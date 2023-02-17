import { SelectEventHandlerControl } from "../../controls/eventHandlerControl";
import { Section, sectionNames } from "openblocks-design";
import { RecordConstructorToComp } from "openblocks-core";
import {
  BoolCodeControl,
  JSONObjectArrayControl,
  StringControl,
} from "comps/controls/codeControl";
import { arrayStringExposingStateControl } from "comps/controls/codeStateControl";
import { BoolControl } from "comps/controls/boolControl";
import { LabelControl } from "comps/controls/labelControl";
import { styleControl } from "comps/controls/styleControl";
import { CascaderStyle } from "comps/controls/styleControlConstants";
import {
  allowClearPropertyView,
  disabledPropertyView,
  hiddenPropertyView,
  placeholderPropertyView,
  showSearchPropertyView,
} from "comps/utils/propertyUtils";
import { i18nObjs, trans } from "i18n";
import styled from "styled-components";
import { withDefault } from "@openblocks-ee/comps/generators";

export const defaultDataSource = JSON.stringify(i18nObjs.cascader, null, " ");

const MarginContainer = styled.div<{}>`
  display: flex;
  justify-content: space-between;
  .hUXIwu {
    flex: 0 0 36px;
  }
  .fgbLEe {
    margin-right: 5px;
    margin-bottom: 10px;
  }
`;

const PaddingContainer = styled.div<{}>`
  display: flex;
  justify-content: space-between;
  .hUXIwu {
    flex: 0 0 36px;
  }
  .fgbLEe {
    margin-right: 5px;
    margin-bottom: 10px;
  }
`;

export const CascaderChildren = {
  value: arrayStringExposingStateControl("value", i18nObjs.cascaderDefult),
  label: LabelControl,
  placeholder: StringControl,
  disabled: BoolCodeControl,
  onEvent: SelectEventHandlerControl,
  allowClear: BoolControl,
  options: JSONObjectArrayControl,
  style: styleControl(CascaderStyle),
  showSearch: BoolControl.DEFAULT_TRUE,
  marginLeft: withDefault(StringControl, ""),
  marginRight: withDefault(StringControl, ""),
  marginTop: withDefault(StringControl, ""),
  marginBottom: withDefault(StringControl, ""),
  paddingLeft: withDefault(StringControl, ""),
  paddingRight: withDefault(StringControl, ""),
  paddingTop: withDefault(StringControl, ""),
  paddingBottom: withDefault(StringControl, ""),
};

export const CascaderPropertyView = (
  children: RecordConstructorToComp<
    typeof CascaderChildren & { hidden: typeof BoolCodeControl }
  >
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

    <Section name={sectionNames.advanced}>
      {allowClearPropertyView(children)}
      {showSearchPropertyView(children)}
    </Section>

    <Section name={sectionNames.layout}>{hiddenPropertyView(children)}</Section>

    <Section name={sectionNames.style}>
      {children.style.getPropertyView()}
      <h4>Margin</h4>
      <div>
        <MarginContainer>
          {children.marginLeft.propertyView({
            label: trans("componentDoc.left"),
          })}
          {children.marginRight.propertyView({
            label: trans("componentDoc.right"),
          })}
        </MarginContainer>
        <MarginContainer>
          {children.marginTop.propertyView({
            label: trans("componentDoc.top"),
          })}
          {children.marginBottom.propertyView({
            label: trans("componentDoc.bottom"),
          })}
        </MarginContainer>
      </div>
      <h4>Padding</h4>
      <PaddingContainer>
        {children.paddingLeft.propertyView({
          label: trans("componentDoc.left"),
        })}
        {children.paddingRight.propertyView({
          label: trans("componentDoc.right"),
        })}
      </PaddingContainer>
      <PaddingContainer>
        {children.paddingTop.propertyView({
          label: trans("componentDoc.top"),
        })}
        {children.paddingBottom.propertyView({
          label: trans("componentDoc.bottom"),
        })}
      </PaddingContainer>
    </Section>
  </>
);

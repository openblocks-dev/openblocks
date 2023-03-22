import { BoolCodeControl, StringControl } from "comps/controls/codeControl";
import { dropdownControl } from "comps/controls/dropdownControl";
import { ButtonEventHandlerControl } from "comps/controls/eventHandlerControl";
import { IconControl } from "comps/controls/iconControl";
import { CompNameContext, EditorContext, EditorState } from "comps/editorState";
import { withDefault } from "comps/generators";
import { UICompBuilder } from "comps/generators/uiCompBuilder";
import {
  disabledPropertyView,
  hiddenPropertyView,
  loadingPropertyView,
} from "comps/utils/propertyUtils";
import { CommonBlueLabel, controlItem, Dropdown, Section, sectionNames } from "openblocks-design";
import { trans } from "i18n";
import styled from "styled-components";
import { CommonNameConfig, NameConfig, withExposingConfigs } from "../../generators/withExposing";
import { IForm } from "../formComp/formDataConstants";
import { SimpleNameComp } from "../simpleNameComp";
import {
  Button100,
  ButtonCompWrapper,
  buttonRefMethods,
  ButtonStyleControl,
} from "./buttonCompConstants";
import { RefControl } from "comps/controls/refControl";

const FormLabel = styled(CommonBlueLabel)`
  font-size: 13px;
  margin-right: 4px;
`;

const IconWrapper = styled.div`
  display: flex;
`;

function getFormOptions(editorState: EditorState) {
  return editorState
    .uiCompInfoList()
    .filter((info) => info.type === "form")
    .map((info) => ({
      label: info.name,
      value: info.name,
    }));
}

function getForm(editorState: EditorState, formName: string) {
  const comp = editorState?.getUICompByName(formName);
  if (comp && comp.children.compType.getView() === "form") {
    return comp.children.comp as unknown as IForm;
  }
}

function getFormEventHandlerPropertyView(editorState: EditorState, formName: string) {
  const form = getForm(editorState, formName);
  if (!form) {
    return undefined;
  }
  return (
    <CompNameContext.Provider value={formName}>
      {form.onEventPropertyView(
        <>
          <FormLabel
            onClick={() => editorState.setSelectedCompNames(new Set([formName]), "rightPanel")}
          >
            {formName}
          </FormLabel>
          {trans("button.formButtonEvent")}
        </>
      )}
    </CompNameContext.Provider>
  );
}

class SelectFormControl extends SimpleNameComp {
  override getPropertyView() {
    const label = trans("button.formToSubmit");
    return controlItem(
      { filterText: label },
      <EditorContext.Consumer>
        {(editorState) => (
          <>
            <Dropdown
              label={label}
              value={this.value}
              options={getFormOptions(editorState)}
              onChange={(value) => this.dispatchChangeValueAction(value)}
              allowClear={true}
            />
            {getFormEventHandlerPropertyView(editorState, this.value)}
          </>
        )}
      </EditorContext.Consumer>
    );
  }
}

const typeOptions = [
  {
    label: trans("button.default"),
    value: "",
  },
  {
    label: trans("button.submit"),
    value: "submit",
  },
] as const;

function isDefault(type?: string) {
  return !type;
}

function submitForm(editorState: EditorState, formName: string) {
  const form = getForm(editorState, formName);
  if (form) {
    form.submit();
  }
}

const ButtonTmpComp = (function () {
  const childrenMap = {
    text: withDefault(StringControl, trans("button.button")),
    type: dropdownControl(typeOptions, ""),
    onEvent: ButtonEventHandlerControl,
    disabled: BoolCodeControl,
    loading: BoolCodeControl,
    form: SelectFormControl,
    prefixIcon: IconControl,
    suffixIcon: IconControl,
    style: ButtonStyleControl,
    viewRef: RefControl<HTMLElement>,
  };
  return new UICompBuilder(childrenMap, (props) => (
    <ButtonCompWrapper disabled={props.disabled}>
      <EditorContext.Consumer>
        {(editorState) => (
          <Button100
            ref={props.viewRef}
            $buttonStyle={props.style}
            loading={props.loading}
            disabled={
              props.disabled ||
              (!isDefault(props.type) && getForm(editorState, props.form)?.disableSubmit())
            }
            onClick={() =>
              isDefault(props.type) ? props.onEvent("click") : submitForm(editorState, props.form)
            }
          >
            {props.prefixIcon && <IconWrapper>{props.prefixIcon}</IconWrapper>}
            {
              props.text || (props.prefixIcon || props.suffixIcon ? undefined : " ") // Avoid button disappearing
            }
            {props.suffixIcon && <IconWrapper>{props.suffixIcon}</IconWrapper>}
          </Button100>
        )}
      </EditorContext.Consumer>
    </ButtonCompWrapper>
  ))
    .setPropertyViewFn((children) => (
      <>
        <Section name={sectionNames.basic}>
          {children.text.propertyView({ label: trans("text") })}
        </Section>

        <Section name={sectionNames.interaction}>
          {children.type.propertyView({ label: trans("prop.type"), radioButton: true })}
          {isDefault(children.type.getView())
            ? [
                children.onEvent.getPropertyView(),
                disabledPropertyView(children),
                loadingPropertyView(children),
              ]
            : children.form.getPropertyView()}
        </Section>

        <Section name={sectionNames.layout}>
          {children.prefixIcon.propertyView({ label: trans("button.prefixIcon") })}
          {children.suffixIcon.propertyView({ label: trans("button.suffixIcon") })}
          {hiddenPropertyView(children)}
        </Section>

        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    ))
    .setExposeMethodConfigs(buttonRefMethods)
    .build();
})();

export const ButtonComp = withExposingConfigs(ButtonTmpComp, [
  new NameConfig("text", trans("button.textDesc")),
  new NameConfig("loading", trans("button.loadingDesc")),
  ...CommonNameConfig,
]);

import { RecordConstructorToComp } from "openblocks-core";
import { StringControl } from "comps/controls/codeControl";
import { CompNameContext, EditorContext } from "comps/editorState";
import { Section } from "openblocks-design";
import { ReactNode } from "react";
import { trans } from "i18n";

export interface IForm {
  onEventPropertyView(title: ReactNode): ReactNode;
  submit(): Promise<void>;
  disableSubmit(): boolean;
}

export const formDataChildren = {
  formDataKey: StringControl,
};

type FormDataComp = RecordConstructorToComp<typeof formDataChildren>;

export const FormDataPropertyView = (children: FormDataComp) => (
  <EditorContext.Consumer>
    {(editorState) => (
      <CompNameContext.Consumer>
        {(name) => (
          <>
            {editorState?.findUIParentContainer(name, "form") && (
              <Section name={trans("form")}>
                {children.formDataKey.propertyView({
                  label: trans("formComp.name"),
                  placeholder: name,
                  tooltip: trans("formComp.nameTooltip"),
                })}
              </Section>
            )}
          </>
        )}
      </CompNameContext.Consumer>
    )}
  </EditorContext.Consumer>
);

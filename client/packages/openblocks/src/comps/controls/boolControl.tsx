import { withDefault } from "comps/generators";
import {
  AbstractComp,
  CompAction,
  CompActionTypes,
  CompParams,
  customAction,
  DispatchType,
  Node,
  SimpleComp,
  ValueAndMsg,
} from "openblocks-core";
import { CheckBox, controlItem, Switch, SwitchJsIcon, SwitchWrapper } from "openblocks-design";
import { ReactNode } from "react";
import styled from "styled-components";
import { setFieldsNoTypeCheck } from "util/objectUtils";
import { BoolCodeControl } from "./codeControl";
import { ControlParams } from "./controlParams";

/**
 * BoolControl without CodeEditor
 */
export class BoolPureControl extends SimpleComp<boolean> {
  readonly IGNORABLE_DEFAULT_VALUE = false;
  protected getDefaultValue(): boolean {
    return false;
  }

  getPropertyView(): ReactNode {
    return <Switch value={this.value} onChange={(x) => this.dispatchChangeValueAction(x)} />;
  }

  propertyView(params: ControlParams & { type?: "switch" | "checkbox" }) {
    return controlItem(
      { filterText: params.label },
      <SwitchWrapper {...params}>
        {params.type === "checkbox" ? (
          <CheckBox
            style={{ marginRight: "8px" }}
            checked={this.value}
            onChange={(x) => this.dispatchChangeValueAction(x.target.checked)}
          />
        ) : (
          this.getPropertyView()
        )}
      </SwitchWrapper>
    );
  }
}

/**
 * Normal input for boolean type, codeEditor for string
 */
type DataType = boolean | string;
type ChangeModeAction = {
  useCodeEditor: boolean;
};

function parseValue(value?: any) {
  const useCodeEditor = typeof value === "string";
  return { useCodeEditor, value: useCodeEditor ? value : value ? "true" : "false" };
}

const Wrapper = styled.div<{ hasLabel: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.hasLabel ? "column" : "row")};
  height: ${(props) => (props.hasLabel ? "auto" : "32px")};
  align-items: ${(props) => (props.hasLabel ? "auto" : "center")};
  gap: 4px;
`;

const CodeEditorWrapper = styled.div<{ hasLabel: boolean }>`
  ${(props) => (!props.hasLabel ? "flex: 1" : "")}
`;

/**
 * BoolControl, support switching to CodeEditor mode
 */
class BoolControl extends AbstractComp<boolean, DataType, Node<ValueAndMsg<boolean>>> {
  static DEFAULT_TRUE: typeof BoolControl;
  private readonly useCodeEditor: boolean;
  private readonly codeControl: InstanceType<typeof BoolCodeControl>;

  readonly IGNORABLE_DEFAULT_VALUE = false;

  constructor(params: CompParams<DataType>) {
    super(params);
    const { useCodeEditor, value } = parseValue(params.value);
    this.useCodeEditor = useCodeEditor;
    this.codeControl = new BoolCodeControl({ ...params, value });
  }

  getUnEvaledValue() {
    return this.useCodeEditor ? this.codeControl.unevaledValue : "";
  }

  getView(): boolean {
    return this.codeControl.getView();
  }

  getPropertyView(): ReactNode {
    throw new Error("Method not implemented.");
  }

  changeModeAction() {
    return customAction<ChangeModeAction>({ useCodeEditor: !this.useCodeEditor }, true);
  }

  propertyView(params: ControlParams) {
    const changeModeIcon = (
      <SwitchJsIcon
        checked={this.useCodeEditor}
        onChange={() => {
          this.dispatch(this.changeModeAction());
        }}
      />
    );
    const hasLabel = !!params.label;
    return controlItem(
      { filterText: params.label },
      <Wrapper hasLabel={hasLabel}>
        <SwitchWrapper
          label={params.label}
          tooltip={params.tooltip}
          lastNode={hasLabel && changeModeIcon}
        >
          {!this.useCodeEditor && (
            <Switch
              value={this.getView()}
              onChange={(x) => this.dispatchChangeValueAction(x)}
            ></Switch>
          )}
        </SwitchWrapper>

        {this.useCodeEditor && (
          <CodeEditorWrapper hasLabel={hasLabel}>
            {this.codeControl.codeEditor(params)}
          </CodeEditorWrapper>
        )}

        {!hasLabel && (
          <div style={{ marginLeft: 4, display: "flex", alignItems: "center" }}>
            {changeModeIcon}
          </div>
        )}
      </Wrapper>
    );
  }

  toJsonValue(): DataType {
    return this.useCodeEditor ? this.codeControl.toJsonValue() : this.getView();
  }

  reduce(action: CompAction): this {
    switch (action.type) {
      case CompActionTypes.CUSTOM:
        return setFieldsNoTypeCheck(this, {
          useCodeEditor: (action.value as ChangeModeAction).useCodeEditor,
        });
      case CompActionTypes.CHANGE_VALUE:
        const { useCodeEditor, value } = parseValue(action.value);
        const codeControl = this.codeControl.reduce({ ...action, value });
        if (useCodeEditor !== this.useCodeEditor || codeControl !== this.codeControl) {
          return setFieldsNoTypeCheck(this, { useCodeEditor, codeControl });
        }
        return this;
    }
    const comp = this.codeControl.reduce(action);
    if (comp !== this.codeControl) {
      return setFieldsNoTypeCheck(this, { codeControl: comp });
    }
    return this;
  }

  exposingNode() {
    return this.codeControl.exposingNode();
  }

  override nodeWithoutCache() {
    return this.codeControl.nodeWithoutCache();
  }

  override changeDispatch(dispatch: DispatchType): this {
    const result = setFieldsNoTypeCheck(
      super.changeDispatch(dispatch),
      { codeControl: this.codeControl.changeDispatch(dispatch) },
      { keepCacheKeys: ["node"] }
    );
    return result;
  }
}

const BoolDefaultTrueControl: typeof BoolControl = withDefault(BoolControl, true);

BoolControl.DEFAULT_TRUE = BoolDefaultTrueControl;

export { BoolControl };

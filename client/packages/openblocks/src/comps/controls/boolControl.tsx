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
import { CheckBox, Switch, SwitchJsIcon, SwitchWrapper } from "openblocks-design";
import { ReactNode } from "react";
import { setFieldsNoTypeCheck } from "util/objectUtils";
import { BoolCodeControl } from "./codeControl";
import { ControlParams } from "./controlParams";

/**
 * BoolControl without CodeEditor
 */
export class BoolPureControl extends SimpleComp<boolean> {
  protected getDefaultValue(): boolean {
    return false;
  }

  getPropertyView(): ReactNode {
    return <Switch value={this.value} onChange={(x) => this.dispatchChangeValueAction(x)} />;
  }

  propertyView(params: ControlParams & { type?: "switch" | "checkbox" }): ReactNode {
    return (
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

/**
 * BoolControl, support switching to CodeEditor mode
 */
class BoolControl extends AbstractComp<boolean, DataType, Node<ValueAndMsg<boolean>>> {
  static DEFAULT_TRUE: typeof BoolControl;
  private readonly useCodeEditor: boolean;
  private readonly codeControl: InstanceType<typeof BoolCodeControl>;

  constructor(params: CompParams<DataType>) {
    super(params);
    const { useCodeEditor, value } = parseValue(params.value);
    this.useCodeEditor = useCodeEditor;
    this.codeControl = new BoolCodeControl({ ...params, value });
  }

  getView(): boolean {
    return this.codeControl.getView();
  }

  getPropertyView(): ReactNode {
    throw new Error("Method not implemented.");
  }

  changeModeAction() {
    return customAction<ChangeModeAction>({ useCodeEditor: !this.useCodeEditor });
  }

  propertyView(params: ControlParams): ReactNode {
    const jsContent = (
      <SwitchJsIcon
        checked={this.useCodeEditor}
        onChange={() => {
          this.dispatch(this.changeModeAction());
        }}
      />
    );
    return (
      <>
        <SwitchWrapper label={params.label} tooltip={params.tooltip} lastNode={jsContent}>
          {!this.useCodeEditor && (
            <Switch
              value={this.getView()}
              onChange={(x) => this.dispatchChangeValueAction(x)}
            ></Switch>
          )}
        </SwitchWrapper>
        {this.useCodeEditor && this.codeControl.codeEditor(params)}
      </>
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

  changeDispatch(dispatch: DispatchType): this {
    return setFieldsNoTypeCheck(
      super.changeDispatch(dispatch),
      { codeControl: this.codeControl.changeDispatch(dispatch) },
      { keepCacheKeys: ["node"] }
    );
  }
}

const BoolDefaultTrueControl: typeof BoolControl = withDefault(BoolControl, true);

BoolControl.DEFAULT_TRUE = BoolDefaultTrueControl;

export { BoolControl };

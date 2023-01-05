import {
  CompAction,
  CompParams,
  MultiBaseComp,
  Node,
  WrapContextFn,
  wrapChildAction,
  wrapContext,
} from "openblocks-core";
import { ReactNode } from "react";
import { lastValueIfEqual } from "util/objectUtils";
import { CodeControlType, JSONValueControl } from "./codeControl";
import { ControlParams } from "./controlParams";

const __CONTEXT_CONTROL_FIELD_NAME = "__CONTEXT_CONTROL_FIELD_NAME";

function toContextControl<T extends CodeControlType>(Control: T) {
  return class ContextControl extends MultiBaseComp<{ text: InstanceType<T> }> {
    private readonly valueFn: WrapContextFn<unknown> = (params?: Record<string, unknown>) => "";

    override parseChildrenFromValue(params: CompParams<string>) {
      const dispatchChild = (action: CompAction): void => {
        params.dispatch && params.dispatch(wrapChildAction("text", action));
      };
      return {
        text: new Control({ dispatch: dispatchChild, value: params.value }) as InstanceType<T>,
      };
    }

    override getView() {
      return this.valueFn;
    }

    override getPropertyView(): ReactNode {
      return this.children.text.getPropertyView();
    }

    propertyView(params: ControlParams): ReactNode {
      return this.children.text.propertyView(params);
    }

    override toJsonValue() {
      return this.children.text.toJsonValue();
    }

    override extraNode() {
      return {
        node: {
          [__CONTEXT_CONTROL_FIELD_NAME]: lastValueIfEqual(
            this,
            "context_control_cache",
            [this.children.text.unevaledValue, wrapContext(this.children.text.exposingNode())],
            (a, b) => a[0] === b[0]
          )[1] as Node<any>,
        },
        updateNodeFields: (value: any) => ({ valueFn: value[__CONTEXT_CONTROL_FIELD_NAME] }),
      };
    }
  };
}

export type ContextControlType = ReturnType<typeof toContextControl>;

export const ContextJsonControl = toContextControl(JSONValueControl);

import { SimpleComp } from "openblocks-core";
import { ControlPropertyViewWrapper, Input } from "openblocks-design";
import { ReactNode } from "react";
import { ControlParams } from "./controlParams";

export function stringSimpleControl(defaultValue?: string) {
  class StringSimpleControl extends SimpleComp<string> {
    readonly IGNORABLE_DEFAULT_VALUE = defaultValue ? undefined : "";
    protected getDefaultValue(): string {
      return defaultValue ?? "";
    }
    getPropertyView(): ReactNode {
      throw new Error("Method not implemented.");
    }
    propertyView(params: ControlParams) {
      return (
        <ControlPropertyViewWrapper
          placement={params.placement}
          label={params.label}
          tooltip={params.tooltip}
          lastNode={params.lastNode}
        >
          <Input
            value={this.value}
            onChange={(e) => this.dispatchChangeValueAction(e.target.value)}
            width="100%"
            style={{ margin: "0px" }}
            placeholder={params.placeholder}
          />
        </ControlPropertyViewWrapper>
      );
    }
  }
  return StringSimpleControl;
}

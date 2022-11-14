import { Input } from "openblocks-design";
import { SimpleComp } from "openblocks-core";
import { ControlPropertyViewWrapper } from "openblocks-design";
import { ReactNode } from "react";
import { changeValueAction } from "openblocks-core";
import { ControlParams } from "./controlParams";

export function stringSimpleControl(defaultValue?: string) {
  class StringSimpleControl extends SimpleComp<string> {
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
            onChange={(e) => this.dispatch(changeValueAction(e.target.value))}
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

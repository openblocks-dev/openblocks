import { InputNumber } from "antd";
import { SimpleComp } from "openblocks-core";
import { ControlPropertyViewWrapper } from "openblocks-design";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { ControlParams } from "./controlParams";

type SimpleNumberParams = {
  min?: number;
  labelStyle?: React.CSSProperties;
  inputStyle?: React.CSSProperties;
};

const Wrapper = styled.div`
  .ant-input-number {
    width: 100%;
  }
  span {
    color: #8b8fa3;
    font-size: 12px;
    line-height: 16px;
    display: block;
  }
  &.error {
    span {
      color: #f73131;
    }
    .ant-input-number {
      border-color: #ff4d4f;
      box-shadow: 0 0 0 2px #ff4d4f33;
    }
  }
`;

export function numberSimpleControl(defaultValue?: number) {
  class NumberSimpleControl extends SimpleComp<number> {
    wrapperEl = React.createRef();
    protected getDefaultValue(): number {
      return defaultValue ?? 0;
    }
    getPropertyView(): ReactNode {
      throw new Error("Method not implemented.");
    }
    propertyView(params: ControlParams & SimpleNumberParams) {
      const ref = React.createRef<HTMLDivElement>();
      const handleChange = (target: HTMLInputElement, currentValue?: number) => {
        const wrapperEl = ref.current!;
        const value = currentValue ?? Number(target.value);
        if (params.min && value >= params.min) {
          this.dispatchChangeValueAction(value);
          wrapperEl.classList.remove("error");
        } else {
          wrapperEl.classList.add("error");
        }
      };
      return (
        <ControlPropertyViewWrapper
          placement={params.placement}
          label={params.label}
          tooltip={params.tooltip}
          labelStyle={params.labelStyle}
        >
          <Wrapper ref={ref} style={params.inputStyle}>
            <InputNumber
              value={this.value}
              onKeyUp={(e) => handleChange(e.target as HTMLInputElement)}
              onBlur={(e) => handleChange(e.target, this.value)}
              width="100%"
              style={{ margin: "0px" }}
              placeholder={params.placeholder}
              controls={false}
            />
            {params.lastNode && params.lastNode}
          </Wrapper>
        </ControlPropertyViewWrapper>
      );
    }
  }
  return NumberSimpleControl;
}

import * as React from "react";
import { ReactNode } from "react";
import styled, { css } from "styled-components";
import { ReactComponent as jsIcon } from "icons/icon-Js-colors.svg";
import { ReactComponent as jsIconGray } from "icons/icon-Js-Gray.svg";
import { ToolTipLabel } from "components/toolTip";

type ControlPlacement = "bottom" | "right" | "modal";

interface Ishow {
  show?: string;
}

export const SwitchStyle: any = styled.input`
  display: inline-block;
  width: 24px;
  height: 14px;
  position: relative;
  background-color: #dedede;
  border-radius: 7px;
  background-clip: content-box;
  margin-right: 8px;
  -webkit-appearance: none;
  caret-color: transparent;
  user-select: none;
  outline: none;
  top: 50%;
  transform: translateY(18%);
  transition: all 0.4s ease;

  :hover {
    cursor: pointer;
  }

  :checked {
    border-color: #636775;
    background-color: #636775;
  }

  :checked::before {
    left: 10px;
  }

  ::before {
    content: "";
    left: 0;
    transition: left 0.4s;
    width: 10px;
    height: 10px;
    position: absolute;
    margin-top: 2px;
    margin-left: 2px;
    border-radius: 20px;
    background-color: #ffffff;
  }
`;

const SwitchDiv = styled.div<{
  type?: "inline" | "updown" | "inline-code";
  placement?: ControlPlacement;
}>`
  ${(props) => {
    switch (props.type) {
      case "inline-code":
        return css`
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
        `;
      case "inline":
        return css`
          display: flex;
          align-items: center;
          ${() => {
            if (props.placement === "bottom") {
              return css`
                margin-left: 112px;
              `;
            }
          }}
        `;
      case "updown":
        return css`
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;

          &:first-child {
            margin: 0;
          }
        `;
      default:
        return css``;
    }
  }}
`;

interface ILabel {
  border?: boolean;
  type?: "inline" | "updown" | "inline-code";
}

const LabelDiv = styled.div<ILabel>`
  ${(props) => {
    switch (props.type) {
      case "inline":
        return css`
          display: inline-block;
        `;
      case "inline-code":
        return `
            flex: 0 0 96px;
          `;
      case "updown":
        return css`
          display: block;
        `;
      default:
        return css`
          width: fit-content;
          display: inline-block;
        `;
    }
  }}
`;
const SwitchLastNode = styled.div<{
  type?: "inline" | "updown" | "inline-code";
}>`
  ${(props) => {
    switch (props.type) {
      case "inline":
        return css`
          display: inline;
        `;
      case "inline-code":
        return `
            flex:1 1 auto;
          `;
      case "updown":
        return css`
          display: inline;
        `;
      default:
        return css`
          display: inline;
        `;
    }
  }}
`;
const IconCss = css`
  height: 20px;
  width: 20px;
  float: right;
  margin-top: 1px;

  :hover {
    cursor: pointer;
  }

  &:hover g {
    fill: #315efb;
  }

  display: inline-block;
`;

const JsIcon = styled(jsIcon)<Ishow>`
  ${IconCss}
`;

const JsIconGray = styled(jsIconGray)<Ishow>`
  ${IconCss}
`;

interface SwitchProps extends Omit<React.HTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
  value: boolean;
  onChange: (value: boolean) => void;
}

export const Switch = (props: SwitchProps) => {
  const { value, onChange, ...inputChanges } = props;
  return (
    <SwitchStyle
      type="checkbox"
      checked={props.value}
      onClick={() => props.onChange(!props.value)}
      onChange={() => {}} // remove warning
      {...inputChanges}
    ></SwitchStyle>
  );
};

export const SwitchJsIcon = (props: {
  checked: boolean;
  onChange: (value: boolean) => void;
  children: JSX.Element | React.ReactNode;
}) => {
  const toggleShow = () => {
    props.onChange(!props.checked);
  };
  const Icon = props.checked ? JsIcon : JsIconGray;
  return (
    <>
      <Icon onClick={toggleShow} />
      {props.checked && props.children}
    </>
  );
};

export const SwitchWrapper = (props: {
  label?: ReactNode;
  tooltip?: ReactNode;
  children?: JSX.Element | React.ReactNode;
  lastNode?: JSX.Element | React.ReactNode; // the latter node
  type?: "inline" | "updown" | "inline-code";
  placement?: ControlPlacement;
}) => {
  const tooltip = props.tooltip;
  const label = props.label;
  return (
    <SwitchDiv type={props.type} placement={props.placement}>
      {props.children}
      {label ? (
        <LabelDiv type={props.type}>
          <ToolTipLabel title={tooltip} label={label} />
        </LabelDiv>
      ) : (
        <></>
      )}
      <SwitchLastNode type={props.type}>{props.lastNode}</SwitchLastNode>
    </SwitchDiv>
  );
};

export function TacoSwitch(props: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <SwitchWrapper label={props.label}>
      <Switch
        onChange={(value) => {
          props.onChange(value);
        }}
        value={props.checked}
      />
    </SwitchWrapper>
  );
}

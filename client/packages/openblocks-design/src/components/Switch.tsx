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

const SwitchStyle: any = styled.input`
  display: inline-block;
  width: 24px;
  height: 14px;
  background-color: #dedede;
  border-radius: 7px;
  background-clip: content-box;
  margin-right: 8px;
  -webkit-appearance: none;
  caret-color: transparent;
  user-select: none;
  outline: none;
  position: relative;
  transform: translateY(0);
  /* transition: all 0.4s ease; */

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
  placement?: ControlPlacement;
}>`
  min-height: 21px;
  display: flex;
  align-items: center;
  ${(props) => {
    if (props.placement === "bottom") {
      return css`
        margin-left: 112px;
      `;
    }
  }}
`;

const LabelDiv = styled.div`
  flex: 1;
`;
const SwitchLastNode = styled.div`
  display: flex;
  align-items: center;
`;

const IconCss = css`
  height: 20px;
  width: 20px;
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
      onChange={() => {}}
      {...inputChanges}
    />
  );
};

export const SwitchJsIcon = (props: { checked: boolean; onChange: (value: boolean) => void }) => {
  const toggleShow = () => {
    props.onChange(!props.checked);
  };
  const Icon = props.checked ? JsIcon : JsIconGray;
  return <Icon onClick={toggleShow} />;
};

export const SwitchWrapper = (props: {
  label?: ReactNode;
  tooltip?: ReactNode;
  children?: JSX.Element | React.ReactNode;
  lastNode?: JSX.Element | React.ReactNode; // the latter node
  placement?: ControlPlacement;
}) => {
  const tooltip = props.tooltip;
  const label = props.label;
  return (
    <SwitchDiv placement={props.placement}>
      {props.children}
      {label ? (
        <LabelDiv>
          <ToolTipLabel title={tooltip} label={label} />
        </LabelDiv>
      ) : (
        <></>
      )}
      <SwitchLastNode>{props.lastNode}</SwitchLastNode>
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

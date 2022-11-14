import { ColorCodeControl } from "./codeControl";
import { ColorSelect } from "openblocks-design";
import styled from "styled-components";
import { ControlPropertyViewWrapper } from "openblocks-design";
import { IconDep } from "openblocks-design";
import React, { useEffect, useState } from "react";
import { ControlParams } from "./controlParams";
import { trans } from "i18n";

const ColorContainer = styled.div`
  display: inline-flex;
  align-items: flex-start;
  justify-content: space-between;
  float: right;
  gap: 8px;
  margin-left: -24px;
  > div:nth-of-type(1) {
    margin: 3px 0;
  }
`;

const DEFAULT_COLOR = "#ffffff";

const DepIcon = styled(IconDep)`
  margin-right: 4px;
`;

const ColorInput = styled.div`
  outline: none;
  width: 140px;
  min-height: 30px;
`;

const DepStyle = styled.div`
  left: 30px;
  width: 140px;
  min-height: 30px;
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  span {
    display: inline-flex;
    align-items: center;
  }
  span:nth-of-type(1) {
    color: #8b8fa3;
  }
  span:nth-of-type(2) {
    color: #315efb;
    display: none;
  }
  &:hover {
    span:nth-of-type(1) {
      display: none;
    }
    span:nth-of-type(2) {
      display: inline-flex;
    }
  }
`;

type PropertyViewParam = {
  label?: string;
  panelDefaultColor?: string;
  // auto-generated prop?
  isDep?: boolean;
  // auto-generated message?
  depMsg?: string;
};

export class ColorControl extends ColorCodeControl {
  propertyView(param: PropertyViewParam): React.ReactNode {
    return <ColorItem param={param} controlThis={this} propertyView={super.propertyView} />;
  }
}

function ColorItem(props: {
  param: PropertyViewParam;
  controlThis: ColorControl;
  propertyView: (param: ControlParams) => React.ReactNode;
}) {
  const { param, controlThis, propertyView } = props;
  const [showDep, setShowDep] = useState(param.isDep);
  const [focus, setFocus] = useState(false);
  const inputRef = React.createRef<HTMLDivElement>();

  const input = propertyView.call(controlThis, {
    placeholder: param.panelDefaultColor,
    expandable: false,
    onFocus: (focused) => {
      setFocus(focused);
    },
  });

  function defaultFocus() {
    const el = inputRef.current as HTMLElement;
    const inputEl = el.getElementsByClassName("cm-content")[0] as HTMLElement;
    inputEl.focus();
  }

  useEffect(() => {
    // input focus by default on clicking "custom setting"
    if (inputRef.current) {
      if (focus) defaultFocus();
    }
  }, [inputRef]);

  const color = controlThis.getView();
  useEffect(() => {
    setShowDep(param.isDep && !focus && !color);
  }, [color, focus, param.isDep]);

  return (
    <ControlPropertyViewWrapper label={param.label} labelEllipsis>
      <ColorContainer>
        <ColorSelect
          dispatch={controlThis.dispatch}
          color={param.panelDefaultColor || color || DEFAULT_COLOR}
        />
        {showDep ? (
          <DepStyle
            onClick={() => {
              setShowDep(false);
              setFocus(true);
            }}
          >
            <span>
              {/* <DepIcon title="" /> */}
              {param.depMsg}
            </span>
            <span>{trans("style.customize")}</span>
          </DepStyle>
        ) : (
          <ColorInput ref={inputRef}>{input}</ColorInput>
        )}
      </ColorContainer>
    </ControlPropertyViewWrapper>
  );
}

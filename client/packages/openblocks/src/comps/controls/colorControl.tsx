import { ColorCodeControl } from "./codeControl";
import { ColorSelect, controlItem, ControlPropertyViewWrapper, IconDep } from "openblocks-design";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { ControlParams } from "./controlParams";
import { trans } from "i18n";

const ColorContainer = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  float: right;
  gap: 6px;
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
  //position: absolute;
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
  propertyView(param: PropertyViewParam) {
    return controlItem(
      { filterText: param.label },
      <ColorItem param={param} controlThis={this} propertyView={super.propertyView} />
    );
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
  const containerRef = React.createRef<HTMLDivElement>();

  const input = propertyView.call(controlThis, {
    placeholder: param.panelDefaultColor,
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
  }, [focus]);

  const color = controlThis.getView();
  useEffect(() => {
    setShowDep(param.isDep && !focus && !color);
  }, [color, focus, param.isDep]);

  useEffect(() => {
    const handler = (event: any) => {
      if (containerRef.current && !containerRef.current?.contains(event.target)) {
        setFocus(false);
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [containerRef]);

  return (
    <ControlPropertyViewWrapper label={param.label} labelEllipsis>
      <ColorContainer ref={containerRef}>
        <ColorSelect
          dispatch={controlThis.dispatch}
          color={param.panelDefaultColor || color || DEFAULT_COLOR}
        />
        <div style={{ display: "flex" }}>
          <DepStyle
            hidden={!showDep}
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
          <ColorInput
            ref={inputRef}
            hidden={showDep}
            onFocus={(e) => {
              if (!e.target.parentElement?.getElementsByClassName("cm-gutters").length) {
                setFocus(true);
              }
            }}
          >
            {input}
          </ColorInput>
        </div>
      </ColorContainer>
    </ControlPropertyViewWrapper>
  );
}

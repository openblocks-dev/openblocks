import { trans } from "i18n/design";
import { useContext, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Packup } from "icons/icon-Pack-up.svg";
import { labelCss } from "./Label";
import React from "react";

const SectionItem = styled.div<{ width?: number }>`
  width: ${(props) => (props.width ? props.width : 312)}px;
  border-bottom: 1px solid #e1e3eb;
  &:last-child {
    border-bottom: none;
  }
`;
const Sectionlabel = styled.span`
  ${labelCss};
  font-size: 14px;
  color: #8b8fa3;
  line-height: 46px;
  font-weight: 600;
  :hover {
    cursor: pointer;
  }
`;
interface Irotate {
  deg: string;
}
const PackupIcon = styled(Packup)<Irotate>`
  height: 20px;
  width: 20px;
  float: right;
  margin-top: 13px;
  margin-right: 16px;
  color: #8b8fa3;
  transform: ${(props) => props.deg};
  :hover {
    cursor: pointer;
  }
`;

const SectionlabelDiv = styled.div`
  height: 46px;
  margin-left: 16px;
  :hover {
    cursor: pointer;
  }
  &:hover ${Sectionlabel} {
    color: #222222;
  }
  &:hover ${PackupIcon} path {
    fill: #222222;
  }
`;

const ShowChildren = styled.div<{ show?: string; noMargin?: boolean }>`
  display: ${(props) => props.show || "none"};
  flex-direction: column;
  gap: 8px;
  transition: all 3s;
  margin-left: ${(props) => (props.noMargin ? 0 : 16)}px;
  padding-bottom: 16px;
  padding-right: ${(props) => (props.noMargin ? 0 : "16px")};
`;

interface ISectionConfig {
  name?: string;
  width?: number;
  noMargin?: boolean;
  style?: React.CSSProperties;
  children: any;
}

export interface PropertySectionState {
  [compName: string]: {
    [sectionName: string]: boolean;
  };
}

export interface PropertySectionContextType {
  toggle: (compName: string, sectionName: string) => void;
  compName: string;
  state: PropertySectionState;
}

export const PropertySectionContext = React.createContext<PropertySectionContextType>({
  toggle: () => {},
  compName: "",
  state: {},
});

export const Section = (props: ISectionConfig) => {
  const { name } = props;
  const { compName, state, toggle } = useContext(PropertySectionContext);
  const open = name ? state[compName]?.[name] !== false : true;

  const handleToggle = () => {
    if (!name) {
      return;
    }
    toggle(compName, name);
  };

  return (
    <SectionItem width={props.width} style={props.style}>
      {props.name && (
        <SectionlabelDiv onClick={handleToggle}>
          <Sectionlabel>{props.name}</Sectionlabel>
          <PackupIcon deg={open ? "rotate(0deg)" : "rotate(180deg)"} />
        </SectionlabelDiv>
      )}
      <ShowChildren show={open ? "flex" : "none"} noMargin={props.noMargin}>
        {props.children}
      </ShowChildren>
    </SectionItem>
  );
};

// common section names
export const sectionNames = {
  basic: trans("prop.basic"),
  interaction: trans("prop.interaction"),
  advanced: trans("prop.advanced"),
  validation: trans("prop.validation"),
  layout: trans("prop.layout"),
  style: trans("prop.style"),
};

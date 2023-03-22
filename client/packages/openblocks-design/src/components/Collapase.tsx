import { Collapse as AntdCollapse } from "antd";
import { ReactComponent as UnFold } from "icons/icon-unfold.svg";
import { ReactComponent as Folded } from "icons/icon-folded.svg";
import { ReactComponent as Omit } from "icons/icon-omit.svg";
import styled, { css } from "styled-components";
import React, { ReactNode } from "react";

const Panel = styled(AntdCollapse.Panel)`
  .ant-collapse-header-text {
    max-width: calc(100% - 14px);
  }
`;

const Container = styled.div<{ optColor?: boolean; simple?: boolean }>`
  &&& {
    background: ${(props) => (props.optColor ? "#f2f7fc" : null)};
  }

  cursor: pointer;
  padding-left: ${(props) => (props.simple ? 0 : "2px")};

  &:hover {
    background-color: ${(props) => (props.simple ? "#FFFFFF" : "#f2f7fc80")};
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header {
    padding: 0;
    height: 23px;
    font-weight: 500;
    font-size: 13px;
    color: #333333;
    line-height: 23px;
    user-select: none;
    cursor: pointer;
  }

  .ant-collapse-ghost > .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
    padding: 0;
    font-weight: 500;
    font-size: 13px;
    line-height: 13px;
    padding-left: ${(props) => (props.simple ? 0 : "6px")};
    user-select: none;
  }

  .ant-collapse > .ant-collapse-item > .ant-collapse-header .ant-collapse-arrow {
    margin-right: ${(props) => (props.simple ? 0 : "2px")};
  }
`;

const IconCss = css`
  height: 23px;
  width: 12px;
  cursor: pointer;
`;
const UnFoldIcon = styled(UnFold)`
  ${IconCss}
`;
const FoldedIcon = styled(Folded)`
  ${IconCss}
`;

interface IpanelConfig {
  title: JSX.Element | ReactNode | string;
  data: JSX.Element | ReactNode | string;
  key: number | string;
}

interface Iprops {
  config: Array<IpanelConfig>;
  onChange?: (keys: string[]) => void;
  isSelected?: boolean;
  simple?: boolean; // no nested
  isOpen?: boolean;
  className?: string;
}

export const PadDiv = styled.div`
  padding-left: 16px;
  width: 100%;
`;

const getExpandIcon = ({ isActive }: any) => {
  return isActive ? <FoldedIcon /> : <UnFoldIcon />;
};
/**
 * - actual content area (title in each line of non-Collapse) needs to be written in PadDiv to control the margin.
 * - if there're nested Collapse which all belong to .ant-collapse-content class, there're no good ideas to precisely control them.
 * - there're three Labels with different margins.
 * - when importing them with prefix "Collapse" in label, shorten the code with "as"
 * - commonly used colors: #AF26FF #009D51 #FF9816 #FF3A31 #8B8FA3
 */
export const Collapse = (props: Iprops) => {
  const { config, onChange } = props;
  // const [Color, setColor] = useState("");
  // const handlechange = (e: string | string[]) => {
  //   const keys = Array.isArray(e) ? e : [e];
  //   setColor(keys.length ? "#F2F7FC" : "");
  //   onChange && onChange(keys);
  // };
  return (
    // <Contain $color={props.isSelected || Color!==""}>
    <Container optColor={props.isSelected} simple={props.simple} className={props.className}>
      <AntdCollapse
        ghost
        expandIcon={getExpandIcon}
        defaultActiveKey={props.isOpen ? [props.config[0].key] : []}
        // onChange={handlechange}
      >
        {config && config.length > 0
          ? config.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Panel header={item.title} key={item.key} showArrow={true}>
                    {item.data}
                  </Panel>
                </React.Fragment>
              );
            })
          : null}
      </AntdCollapse>
    </Container>
  );
};
const UnShowDiv = styled.div`
  line-height: 23px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #333333;
  gap: 6px;
  padding-left: 16px;
  font-weight: 600;
`;
export const UnShow = (props: { num: number }) => {
  return (
    <UnShowDiv>
      15
      <Omit />
      {props.num}
    </UnShowDiv>
  );
};

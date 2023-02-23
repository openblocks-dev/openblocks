import styled, { css } from "styled-components";
import { CSSProperties } from "react";

export const labelCss: any = css`
  user-select: none;

  font-size: 13px;
  color: #222222;

  :hover {
    cursor: default;
  }
`;

export const EllipsisTextCss = css`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const TextLabelP = styled.p`
  ${labelCss}
  display: inline-block;
  margin-bottom: 0px;
  min-width: 26px;
  max-width: 90px;
`;
// GrayTitle
const Graylabel: any = styled.p`
  ${labelCss}
  color: #8b8fa3;
  margin-top: ${(props: any) => props.marginTop || "8px"};
  margin-bottom: 8px;
`;
const Blocklabel = styled.p`
  ${labelCss}
  margin-bottom: 0;
  margin-top: 4px;
`;

interface ITextLabel {
  label: string;
}

export const TextLabel = (props: ITextLabel) => {
  const { label } = props;
  return <TextLabelP>{label}</TextLabelP>;
};

interface IGrayLabel {
  label: string;
}

export const BlockGrayLabel = (props: IGrayLabel) => {
  const { label } = props;
  return <Graylabel>{label}</Graylabel>;
};

interface IBlocklabel {
  label: string;
}

export const BlockLabel = (props: IBlocklabel) => {
  const { label } = props;
  return <Blocklabel>{label}</Blocklabel>;
};

// Title text in each line of Collapse
const LeftTitle = styled.span<{
  color?: string;
  line?: number;
  hasChild?: boolean;
}>`
  word-wrap: break-word;
  word-break: break-all;
  white-space: pre-wrap;
  user-select: none;
  font-size: 13px;
  line-height: ${(props) => (props.line ? props.line : 23)}px;
  color: ${(props) => (props.color ? props.color : "#333333")};
  margin-right: 8px;
  font-weight: ${(props) => (props.hasChild ? "600" : "normal")};

  :hover {
    cursor: pointer;
  }
`;

interface ICollapseTitle {
  lineHeight?: number;
  color?: string;
  label: string;
  hasChild?: boolean;
  style?: CSSProperties;
}

export const CollapseTitle = (props: ICollapseTitle) => {
  const { color, label, lineHeight, hasChild } = props;
  return (
    <LeftTitle style={props.style} color={color} line={lineHeight} hasChild={hasChild}>
      {label}
    </LeftTitle>
  );
};

interface ICollapseLabel {
  color?: string;
  label: string;
}

export const CollapseLabel = (props: ICollapseLabel) => {
  const { color, label } = props;
  return (
    <CollapseTitle color={color} label={label} style={{ userSelect: "text" }} lineHeight={21} />
  );
};
export const CollapseLink = (props: ICollapseLabel) => {
  const { color, label } = props;
  return <CollapseTitle color={color} label={label} lineHeight={19} />;
};

export const CommonTextLabel = styled.p`
  font-size: 13px;
  color: #222222;
  line-height: 13px;
  margin: 0;
`;

export const CommonTextLabel2 = styled.p`
  font-size: 14px;
  color: #333333;
  line-height: 14px;
  margin: 0;
`;

export const CommonGrayLabel = styled.p`
  font-size: 13px;
  color: #8b8fa3;
  line-height: 13px;
  margin: 0;
`;

export const CommonErrorLabel = styled.p<{ fontSize?: number }>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : 12)}px;
  line-height: ${(props) => (props.fontSize ? props.fontSize : 12)}px;
  color: #f73131;
  margin: 0;
`;

export const CommonBlueLabel = styled.span`
  ${labelCss}
  :hover {
    cursor: pointer;
  }

  font-size: 12px;
  color: #4965f2;
  margin-left: 4px;
`;

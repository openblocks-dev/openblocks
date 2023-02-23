import styled, { css } from "styled-components";
import { Alert } from "antd";
import { ReactNode } from "react";
import { AlertProps } from "antd/lib/alert";
import { ToolTipLabel } from "./toolTip";
import { DocLink } from "components/ExternalLink";

export const QueryPropertyViewWrapper = styled.div`
  display: flex;
  padding-bottom: 72px;
  gap: 20px;
  flex-wrap: wrap;
`;

const QueryAlertWrapper = styled.div`
  height: 32px;
  width: 100%;
  position: absolute;
  bottom: 0;

  .ant-alert-error {
    border: none;
    background: #fff3f1;
  }

  .ant-alert-icon {
    margin-right: 8px;
    margin-left: 16px;
  }

  .ant-alert {
    padding: 0;
  }

  .ant-alert-message {
    font-size: 13px;
    color: #333333;
    line-height: 32px;
  }
`;

export const QueryAlert = (props: AlertProps) => (
  <QueryAlertWrapper>
    <Alert type={"error"} showIcon={true} {...props} />
  </QueryAlertWrapper>
);

export const QuerySectionWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  width: 100%;
  gap: 8px;
  flex-grow: 1;
`;

export const QueryConfigWrapper = styled.div<{ $width?: string }>`
  display: flex;
  width: ${(props) => props.$width ?? "100%"};
  align-items: flex-start;
  flex-wrap: nowrap;
`;

const QueryConfigLabelWrapper = styled.div`
  width: 112px;
  flex-shrink: 0;
`;

interface QueryConfigLabelProps {
  children?: ReactNode;
  tooltip?: ReactNode;
  labelHeight?: number | string;
}

export const QueryConfigLabel = (props: QueryConfigLabelProps) => (
  <QueryConfigLabelWrapper>
    <ToolTipLabel
      title={props.tooltip}
      label={props.children}
      labelStyle={
        props.labelHeight
          ? { height: props.labelHeight }
          : {
              height: 32,
              lineHeight: "32px",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }
      }
    />
  </QueryConfigLabelWrapper>
);

export const QueryConfigItemWrapper = styled.div<{ direction?: "row" | "column" }>`
  min-width: 0;
  flex-grow: 1;
  ${(props) => {
    if (props.direction === "row") {
      return css`
        min-width: 0;
        display: flex;
        align-items: center;
      `;
    }
  }}
`;

type TutorialStyle = "dropdownRight" | "begin";

const TutorialButtonWrapper = styled.div<{ styleName: TutorialStyle }>`
  height: 100%;
  display: flex;
  align-items: center;
  ${(props) => {
    if (props.styleName === "dropdownRight") {
      return css`
        padding-left: 8px;
        width: 264px;
        flex-grow: 1;
      `;
    }
  }}
`;

export const QueryTutorialButton = ({
  label,
  url,
  styleName,
}: {
  label: string;
  url?: string;
  styleName: "dropdownRight" | "begin";
}) =>
  url ? (
    <TutorialButtonWrapper styleName={styleName}>
      <DocLink href={url}>{label}</DocLink>
    </TutorialButtonWrapper>
  ) : (
    <></>
  );

export const TriggerTypeStyled = styled.div`
  > div > div:nth-of-type(2) {
    > div {
      width: 100%;
    }
    ::after {
      display: none;
    }
  }
`;

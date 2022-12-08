import { Alert, Card } from "antd";
import { CopyTextButton } from "./copyTextButton";
import { CSSProperties, ReactNode, useState } from "react";
import styled from "styled-components";
import { ErrorIcon, SuccessIcon } from "icons";

const StyledCard = styled(Card)<{ backcolor: string }>`
  z-index: 3;
  margin-top: 4px;
  background-color: ${(props) => (props.backcolor ? props.backcolor : "#eff9f6")};
  border-color: #82bf99;
  color: #3b734f;
  border: none;
  position: absolute;
  border-radius: 4px;
  line-height: 14px;
  font-size: 13px;
  word-wrap: break-word;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  vertical-align: baseline;
  width: 100%;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;
const Contain = styled.div`
  position: relative;

  .ant-card-small > .ant-card-head > .ant-card-head-wrapper > .ant-card-extra {
    padding: 0;
  }

  .ant-card-small > .ant-card-head {
    padding: 10px 16px 0px 16px;
    font-weight: normal;
    font-size: 13px;
    color: #333333;
    line-height: 13px;
    border-bottom: none;
    min-height: 31px;
  }

  .ant-card-small > .ant-card-body {
    padding: 0px 0px 10px 0px;

    font-size: 13px;
    color: #333333;
    line-height: 13px;
    overflow: auto;
  }

  .ant-alert {
    padding: 0;
    font-size: 13px;
  }

  .ant-card-small > .ant-card-head > .ant-card-head-wrapper > .ant-card-head-title {
    padding: 0;
  }

  .ant-alert-success {
    background: transparent;
    border: none;
  }

  .ant-alert-error {
    background: transparent;
    border: none;
  }
`;
const Content = styled.div`
  padding-left: 16px;
  font-size: 13px;
  color: #333333;
  line-height: 18px;
  max-height: 108px;
  overflow: auto;
  scrollbar-gutter: stable;
  white-space: pre-line;

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    border: 5px solid transparent;
    background-clip: content-box;
    border-radius: 9999px;
    background-color: rgba(139, 143, 163, 0.2);
    min-height: 30px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 143, 163, 0.36);
  }
`;
const Tips = styled.div`
  margin-top: 4px;
  padding: 4px 0 0 16px;
  border-top: 1px solid #82bf99;
`;

const MAX_CONTENT_LENGTH = 3000;

interface PopupCardProps {
  editorFocus?: boolean;
  title?: string;
  content?: string;
  richContent?: ReactNode;
  tips?: ReactNode;
  hasError?: boolean;
  cardStyle?: CSSProperties;
}

export function PopupCard(props: PopupCardProps) {
  const [isPopupHovered, setPopupHovered] = useState(false);
  return (
    <>
      {(props.editorFocus || isPopupHovered) && (
        <Contain>
          <StyledCard
            style={props.cardStyle}
            backcolor={props.hasError ? "#FFF3F1" : "#EFF9F6"}
            title={
              <Alert
                message={props.title}
                type={props.hasError ? "error" : "success"}
                showIcon
                icon={props.hasError ? <ErrorIcon /> : <SuccessIcon />}
              />
            }
            extra={<CopyTextButton text={props.content ?? ""} />}
            size="small"
            onMouseEnter={() => {
              setPopupHovered(true);
            }}
            onMouseLeave={() => {
              setPopupHovered(false);
            }}
            onClick={() => {
              setPopupHovered(false);
            }}
          >
            <Content>
              {props.richContent ??
                (props.content?.length && props.content?.length > MAX_CONTENT_LENGTH
                  ? props.content?.substring(0, MAX_CONTENT_LENGTH) + "..."
                  : props.content)}
            </Content>
            {props.tips && <Tips>{props.tips}</Tips>}
          </StyledCard>
        </Contain>
      )}
    </>
  );
}

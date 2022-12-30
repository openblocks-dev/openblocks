import {
  EditText,
  labelCss,
  PopupCard,
  QueryAlert,
  ScrollBar,
  TacoButton,
  UnfoldWhiteIcon,
} from "openblocks-design";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { EditorContext } from "../../../comps/editorState";
import _ from "lodash";
import { ReadOnlyMask } from "pages/common/styledComponent";
import { useSelector } from "react-redux";
import { showAppSnapshotSelector } from "redux/selectors/appSnapshotSelector";
import { BottomResTypeEnum } from "types/bottomRes";
import { trans } from "i18n";

const Span = styled.span<{ border: boolean }>`
  ${labelCss};
  font-weight: 500;
  line-height: 40px;
  position: relative;
  display: inline-block;
  z-index: 0;
  color: ${(props) => (props.border ? "#222222" : "#8B8FA3")};

  :hover {
    cursor: pointer;
    color: #222222;
  }

  ::before {
    content: "";
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    height: 0;
    color: ${(props) => (props.border ? "#222222" : "transparent")};
    border: 1px solid ${(props) => (props.border ? "#222222" : "transparent")};
    background-color: ${(props) => (props.border ? "#222222" : "transparent")};
    border-radius: 2px;
  }
`;
const TabDiv = styled.div<{ cursor?: string | number }>`
  height: 40px;
  background-color: #ffffff;
  text-align: center;
  display: inline-block;
  min-width: 26px;
  cursor: ${(props) => (props.cursor ? "pointer" : "default")};
`;
const TabContainer = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 24px;
  background-color: #ffffff;
  .ant-btn-two-chinese-chars > *:not(.anticon) {
    letter-spacing: 0;
    margin-right: 0;
  }

  // remove the shadow after clicking
  [ant-click-animating-without-extra-node="true"]::after,
  .ant-click-animating-node {
    opacity: 0;
  }

  .ant-btn[disabled] {
    background: #dbe1fd;
    border-radius: 4px;
    color: #ffffff;
  }

  .taco-edit-text-wrapper {
    width: auto;
    max-width: 328px;
    color: #222222;
    font-size: 16px;
    margin-left: 0;

    :hover {
      background-color: #f5f5f6;
    }
  }

  .taco-edit-text-body {
    width: auto;
  }

  .taco-edit-text-input {
    width: 328px;
    color: #222222;
    font-size: 16px;
    border: 1px solid #3377ff;
    margin-left: 0;
    background-color: #ffffff;

    :focus {
      border-color: #3377ff;
      box-shadow: 0 0 0 2px #d6e4ff;
    }
  }
`;
const Button = styled(TacoButton)`
  padding: 0 11px;
  flex: 0 0 64px;
  height: 24px;
  border: none;

  :hover {
    padding: 0 11px;
    border: none;
    box-shadow: none;
  }

  :focus {
    padding: 0 11px;
    border: none;
    box-shadow: none;
  }

  :after {
    content: "";
  }
`;
const ButtonLabel = styled.span`
  font-weight: 500;
  font-size: 13px;
  color: #ffffff;
  text-align: center;
  line-height: 24px;
`;
const Icon = styled(UnfoldWhiteIcon)`
  transform: rotate(-90deg);
  display: inline-block;
  padding-right: 2px;
  margin-right: 4px;
`;
const StyleScrollBar = styled(ScrollBar)`
  .simplebar-content-wrapper {
    overflow-x: hidden !important;
  }
`;

type TabsConfigType = readonly {
  readonly key: string;
  readonly title: string;
  readonly children: ReactNode;
}[];
type TabsConfigKeyType<Options extends TabsConfigType> = Options[number]["key"];

export function BottomTabs<T extends TabsConfigType>(props: {
  tabTitle: string;
  tabsConfig: T;
  onRunBtnClick?: () => void;
  type: BottomResTypeEnum;
  btnLoading?: boolean;
  status?: "" | "error";
  message?: string;
  runButtonText?: string;
}) {
  const {
    type,
    tabsConfig,
    tabTitle,
    onRunBtnClick,
    btnLoading = false,
    status,
    message,
    runButtonText = trans("bottomPanel.run"),
  } = props;
  const [key, setKey] = useState<TabsConfigKeyType<typeof tabsConfig>>("general");
  const [error, setError] = useState<string | undefined>(undefined);
  const [editing, setEditing] = useState(false);
  const editorState = useContext(EditorContext);
  const readOnly = useSelector(showAppSnapshotSelector);

  const valueInfoMap = _.fromPairs(tabsConfig.map((c) => [c.key, c]));

  useEffect(() => setKey("general"), [editorState.selectedBottomResName]);

  return (
    <>
      <TabContainer>
        {tabsConfig &&
          tabsConfig.map((item, index) => (
            <React.Fragment key={index}>
              <TabDiv onClick={() => setKey(item.key)} cursor={item.key}>
                <Span key={item.key} border={key === item.key}>
                  {item.title}
                </Span>
              </TabDiv>
            </React.Fragment>
          ))}

        <div style={{ margin: "auto" }}>
          <EditText
            disabled={readOnly}
            text={tabTitle}
            onFinish={(value) => {
              if (editorState.rename(tabTitle, value)) {
                editorState.setSelectedBottomRes(value, type);
                setError(undefined);
              }
            }}
            onChange={(value) => setError(editorState.checkRename(tabTitle, value))}
            onEditStateChange={(editing) => setEditing(editing)}
          />
          <PopupCard
            editorFocus={!!error && editing}
            title={error ? trans("error") : ""}
            content={error}
            hasError={!!error}
          />
        </div>
        {onRunBtnClick && (
          <Button
            onClick={onRunBtnClick}
            loading={btnLoading}
            buttonType="primary"
            disabled={readOnly}
          >
            <Icon />
            <ButtonLabel>{runButtonText}</ButtonLabel>
          </Button>
        )}
      </TabContainer>

      <StyleScrollBar height={"calc(100% - 45px)"}>
        <div style={{ padding: "8px 16px 16px" }}>
          <ReadOnlyMask readOnly={readOnly}>{valueInfoMap[key].children}</ReadOnlyMask>
        </div>
      </StyleScrollBar>

      {status === "error" && message && <QueryAlert message={message} />}
    </>
  );
}

export const EmptyTab = (
  <TabContainer>
    <Button disabled={true} style={{ marginLeft: "auto" }}>
      <Icon></Icon>
      <ButtonLabel>{trans("bottomPanel.run")}</ButtonLabel>
    </Button>
  </TabContainer>
);

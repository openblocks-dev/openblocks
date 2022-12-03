import styled from "styled-components";
import Draggable from "react-draggable";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { EditorContext } from "../comps/editorState";
import { Table as AntdTable } from "antd";
import { isObjectLike, isPlainObject } from "lodash";
import ReactJson from "react-json-view";
import { Layers } from "constants/Layers";
import { BottomResComp, BottomResCompResult } from "types/bottomRes";
import { CloseIcon, ErrorIcon, SuccessIcon, Switch } from "openblocks-design";
import { DarkActiveTextColor, GreyTextColor } from "constants/style";
import { trans } from "i18n";

const Wrapper = styled.div<{ bottom?: number }>`
  right: calc(313px + 4px); // FIXME: don't rely on the width of the right panel
  bottom: ${(props) => (props.bottom ? props.bottom + 4 + "px" : 285 + 4 + "px")};
  position: fixed;
  z-index: ${Layers.queryResultPanel};

  display: flex;
  flex-direction: column;
  width: 592px;
  height: fit-content;
  max-height: 250px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  pointer-events: auto;
  padding-bottom: 16px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px 20px 16px;
  cursor: move;
`;

const IconWrapper = styled.div`
  margin-right: 8px;
  height: 16px;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;

  height: 24px;
  font-size: 13px;
  line-height: 13px;
  color: #222222;
  border-radius: 4px;
  border: none;
  word-break: break-all;
`;

const SwitchWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: baseline;
  margin-right: 24px;
  color: #8b8fa3;
  line-height: 13px;
  margin-left: auto;
`;

const CloseIconWrapper = styled.div`
  margin-left: auto;
  width: 16px;
  height: 16px;
  cursor: pointer;

  color: ${GreyTextColor};

  :hover {
    color: ${DarkActiveTextColor};
  }
`;

const BodyWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding-left: 16px;

  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-thumb {
    border: 4px solid transparent;
    background-clip: content-box;
    border-radius: 9999px;
    background-color: rgba(139, 143, 163, 0.2);
    min-height: 50px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: rgba(139, 143, 163, 0.36);
  }
`;

const Table = styled(AntdTable)`
  .ant-table {
    font-size: 13px;
    border: none;
  }

  .ant-table-thead {
    margin-bottom: 4px;
  }

  .ant-table-thead > tr > th {
    color: #8b8fa3;
    background: #ffffff;
    line-height: 13px;
    padding-bottom: 9px;
    // border-bottom: 1px solid #8b8fa3;
  }

  .ant-table-thead > tr > th::before {
    display: none;
  }

  .ant-table-tbody > tr > td {
    border: none;
  }

  .ant-table-row {
    margin-top: 4px;
  }

  .ant-table-cell {
    height: 22px;
    padding: 0 24px 0 0;
    margin-left: 24px;
    max-width: 184px; // actual width + padding right
  }

  // two-side shadow with scrollbar
  .ant-table-ping-left:not(.ant-table-has-fix-left) .ant-table-container::before {
    box-shadow: none;
  }

  .ant-table-ping-right:not(.ant-table-has-fix-right) .ant-table-container::after {
    box-shadow: none;
  }
`;

const TextResult = styled.pre`
  word-break: break-word;
  white-space: pre-wrap;
`;

interface BottomResultPanelProps {
  bottom: number;
}

export const BottomResultPanel = (props: BottomResultPanelProps) => {
  const { bottom } = props;
  const editorState = useContext(EditorContext);
  const showResultComp = editorState.showResultComp();
  const result = showResultComp?.result();

  const draggableRef = useRef<HTMLDivElement>(null);
  const [unDraggable, setUnDraggable] = useState(true);

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const { header, body } = useResultPanel({
    ...(result ?? { data: "", dataType: "default", success: true }),
    onClose: () => editorState.setShowResultCompName(undefined),
  });

  if (!result) {
    return null;
  }

  return (
    <Draggable
      disabled={unDraggable}
      bounds={bounds}
      onStart={(event, uiData) => {
        const { clientWidth, clientHeight } = window.document.documentElement;
        const targetRect = draggableRef.current?.getBoundingClientRect();
        if (!targetRect) {
          return;
        }
        setBounds({
          left: -targetRect.left + uiData.x,
          right: clientWidth - (targetRect.right - uiData.x),
          top: -targetRect.top + uiData.y,
          bottom: clientHeight - (targetRect.bottom - uiData.y),
        });
      }}
    >
      <Wrapper bottom={bottom} ref={draggableRef}>
        <HeaderWrapper
          onMouseOver={() => setUnDraggable(false)}
          onMouseOut={() => setUnDraggable(true)}
        >
          {header}
        </HeaderWrapper>
        {body}
      </Wrapper>
    </Draggable>
  );
};

const QueryLibraryResultWrapper = styled(Wrapper)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 360px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
`;

export const QueryLibraryResultPanel = (props: { comp: BottomResComp; onClose: () => void }) => {
  const result = props.comp?.result();

  const { header, body } = useResultPanel({
    ...(result ?? { data: "", dataType: "default", success: true }),
    onClose: props.onClose,
  });

  if (!result) {
    return null;
  }

  return (
    <QueryLibraryResultWrapper>
      <HeaderWrapper style={{ cursor: "default" }}>{header}</HeaderWrapper>
      {body}
    </QueryLibraryResultWrapper>
  );
};

const TimeLabel = styled.span`
  color: #b8b9bf;
  margin-left: 8px;
`;

function useResultPanel(params: BottomResCompResult & { onClose: () => void }) {
  const { success, errorMessage, dataType, data, title, runTime } = params;

  const [toJson, setToJson] = useState(false);

  useEffect(() => setToJson(false), [params.data]);

  const [isObjectArray, columns] = useMemo(() => {
    if (dataType !== "default") {
      return [false, []];
    }
    if (Array.isArray(data)) {
      let isObjectArray = true;
      const keys = data.reduce((set, value) => {
        if (value && isPlainObject(value)) {
          Object.keys(value).forEach((key) => set.add(key));
        } else {
          isObjectArray = false;
        }
        return set;
      }, new Set<string>());

      if (isObjectArray) {
        return [
          true,
          Array.from(keys).reduce(
            (result: any[], columnName) => [
              ...result,
              {
                title: columnName,
                dataIndex: columnName,
                ellipsis: true,
                render: (text: any) => (typeof text === "string" ? text : JSON.stringify(text)),
              },
            ],
            []
          ),
        ];
      }
    }
    return [false, []];
  }, [data, dataType]);

  const result = useMemo(() => {
    if (errorMessage) {
      return errorMessage;
    }

    if (toJson) {
      return <ReactJson name={false} src={data} />;
    }

    switch (dataType) {
      case "function":
        return <TextResult>{trans("resultPanel.returnFunction")}</TextResult>;
      case "json":
        if (isObjectLike(data)) {
          return <ReactJson name={false} src={data} />;
        }
        return <TextResult>{data}</TextResult>;
      default:
        if (isObjectArray) {
          return (
            <Table
              tableLayout={"auto"}
              scroll={{ x: "100%" }}
              columns={columns}
              dataSource={data.map((d: Object, i: number) => ({ ...d, key: i }))}
              pagination={false}
            />
          );
        } else if (isObjectLike(data)) {
          return <ReactJson name={false} src={data} />;
        } else {
          return <TextResult>{data}</TextResult>;
        }
    }
  }, [params, toJson]);

  return {
    header: (
      <>
        <HeaderTitle>
          <IconWrapper>{success ? <SuccessIcon /> : <ErrorIcon />}</IconWrapper>
          {title}
          {runTime ? (
            <TimeLabel>
              {trans("resultPanel.cosume", {
                time: millisecondsToHumanReadable(runTime) || "",
              })}
            </TimeLabel>
          ) : null}
          {isObjectArray && (
            <SwitchWrapper>
              <Switch value={toJson} onChange={(value) => setToJson(value)} />
              {trans("resultPanel.JSON")}
            </SwitchWrapper>
          )}
        </HeaderTitle>
        <CloseIconWrapper onClick={params.onClose}>
          <CloseIcon />
        </CloseIconWrapper>
      </>
    ),
    body: <BodyWrapper>{result}</BodyWrapper>,
  };
}

function millisecondsToHumanReadable(value: number) {
  let num = value;
  const units = ["ms", "s", "min", "h"];
  const intervals = [1, 1000, 60, 60];
  for (let i = 0; i < 4; i++) {
    if (num / intervals[i] < 1) {
      return num + units[i - 1];
    }
    num /= intervals[i];
  }
}

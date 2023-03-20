import styled from "styled-components";
import { BottomResCompResult } from "../../types/bottomRes";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { isArray, isObject, isObjectLike, isPlainObject } from "lodash";
import ReactJson from "react-json-view";
import { trans } from "../../i18n";
import { DarkActiveTextColor, GreyTextColor } from "../../constants/style";
import { Table as AntdTable } from "antd";
import { Switch } from "components/Switch";
import { CloseIcon, ErrorIcon, SuccessIcon } from "icons";

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 16px 20px 16px;
  cursor: move;
  background-color: #ffffff;
  border-radius: inherit;
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
  align-items: center;
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
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  scrollbar-gutter: stable;
  padding-left: 16px;
  background-color: #ffffff;

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
const TimeLabel = styled.span`
  color: #b8b9bf;
  margin-left: 8px;
`;
const TypeLabel = TimeLabel;

export function useResultPanel(params: BottomResCompResult & { onClose: () => void }) {
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
        return <TextResult>{String(data)}</TextResult>;
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

  let showType = null;
  if (dataType !== "function") {
    if (isArray(data)) {
      showType = `Array(${data.length})`;
    } else if (isObject(data)) {
      showType = `Object(${Object.keys(data).length} keys)`;
    } else {
      showType = typeof data;
    }
  }

  return {
    header: (
      <>
        <HeaderTitle>
          <IconWrapper>{success ? <SuccessIcon /> : <ErrorIcon />}</IconWrapper>
          {title}
          {runTime ? (
            <TimeLabel>
              {trans("resultPanel.consume", {
                time: millisecondsToHumanReadable(runTime) || "",
              })}
            </TimeLabel>
          ) : null}
          {showType && <TypeLabel>{showType}</TypeLabel>}
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

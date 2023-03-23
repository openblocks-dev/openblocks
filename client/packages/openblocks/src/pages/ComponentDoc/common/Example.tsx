import { Comp } from "openblocks-core";
import { evalAndReduceWithExposing } from "comps/utils";
import _ from "lodash";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ShowBorderIcon, EditIcon } from "openblocks-design";
import propNames from "../propNameText";
import valueTranslate from "../propValueText";
import { AppTypeEnum } from "constants/applicationConstants";
import {
  ExternalEditorContext,
  ExternalEditorContextState,
} from "util/context/ExternalEditorContext";
import { BorderContext } from "./BorderContext";
import { ExampleContext } from "../ExampleContext";
import { trans } from "i18n";
import { EditorContext, EditorState } from "comps/editorState";
import { RootComp } from "comps/comps/rootComp";

const Wrapper = styled.div`
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  .left {
    position: relative;
    flex: 1;
    background-color: #f9f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 160px;
    max-width: 100%;
    padding: 30px 30px;
    &:hover {
      .operations {
        opacity: 1;
      }
    }
  }
  .right {
    flex: 1;
    border-left: 1px solid #d7d9e0;
    overflow: hidden;
    .setting-item {
      border-bottom: 1px solid #f0f0f0;
      padding: 5px 10px;
      display: flex;
      &:last-child {
        border-bottom: 0;
      }
      &.setting-header {
        font-weight: bold;
      }
      .setting-key {
        flex: 1;
      }
      .setting-value {
        flex: 2;
        display: flex;
        flex-wrap: wrap;
        align-content: stretch;
        align-items: center;
        flex-direction: row;
        justify-content: flex-start;
        overflow: hidden;
      }
    }
  }
`;
const ColorLump = styled.div<{ inputColor: string }>`
  background-color: ${(props) => props.inputColor};
  border: 1px;
  border-radius: 5px;
  width: 16px;
  height: 16px;
  margin: 3px 3px;
  margin-left: 0px;
  display: inline-block;
`;

const TextOverflowEllipis = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
`;
interface IBoundProps {
  show: boolean;
}
const Bound = styled.div<IBoundProps>`
  padding: 5px;
  border: ${({ show }) => `1px dashed ${show ? "rgb(51, 119, 255)" : "transparent"}`};
`;

const StyledBorderIcon = styled(ShowBorderIcon)`
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;

const StyledEditIcon = styled(EditIcon)`
  width: 14px;
  height: 14px;
  margin-right: 5px;
`;

const OperationWrapper = styled.div`
  position: absolute;
  left: 15px;
  bottom: 12px;
  display: flex;
  opacity: 0;
  align-items: center;
  justify-content: center;
  transition: opacity 200ms ease-in-out;
`;

const OperationBtn = styled.a<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  line-height: 1;
  margin-right: 16px;
  color: ${({ active }) => (active ? "rgb(51, 119, 255)" : "#8B8FA3")};
  cursor: pointer;
`;

interface IProps {
  title: string;
  config: any;
  compFactory?: new (...args: any[]) => Comp;
  width?: number | string;
  height?: number | string;
  hideSettings?: boolean; // don't need config value
  nameMap?: Record<string, string>;
  blackListConfig?: string[];
}

function propertiesListFromConfig(
  config: any,
  nameMap?: Record<string, string>,
  blackListConfig?: string[]
) {
  const result: Record<string, ReactNode> = {};
  const walk = (subConfig: any, path: string[]) => {
    Object.entries(subConfig).forEach(([key, value]) => {
      const curPath = [...path, key];
      if (_.isPlainObject(value)) {
        walk(value, curPath);
        return;
      }
      const propPath = curPath.join(".");

      const propName = (nameMap && nameMap[propPath]) || propNames[propPath] || propPath;
      if (blackListConfig && blackListConfig.includes(propName)) return;
      result[propName] = valueTranslate[propPath]?.[String(value)] || String(value);
    });
  };
  walk(config, []);
  return result;
}
function Regex(value: ReactNode, reExpression: RegExp): Boolean {
  if (String(value).search(reExpression) === 0) return true;
  return false;
}
function SettingValue(props: { value: React.ReactNode }) {
  const { value } = props;

  let content: ReactNode = value;

  if (Regex(content, /#[0-9a-zA-Z]{6,6}/)) {
    content = (
      <>
        <ColorLump inputColor={String(value)} />
        <div> {String(value)}</div>
      </>
    );
  }

  if (Regex(content, /data.*/)) {
    content = <TextOverflowEllipis>{String(value)}</TextOverflowEllipis>;
  }

  return <div className="setting-value">{content}</div>;
}

const externalState: ExternalEditorContextState = {
  applicationId: "",
  appType: AppTypeEnum.Application,
};

const editorState = new EditorState(new RootComp({ value: {} }), () => {});

export default function Example(props: IProps) {
  const {
    config,
    compFactory,
    width = "60%",
    height = "auto",
    hideSettings,
    nameMap,
    blackListConfig,
  } = props;
  const { name } = useContext(ExampleContext);
  const [view, setView] = useState<React.ReactNode>(null);
  const { isBorderShow, showBorder } = useContext(BorderContext);
  const properties = propertiesListFromConfig(config, nameMap, blackListConfig);

  useEffect(() => {
    if (compFactory) {
      let ins: Comp | null = null;

      const update = (comp: Comp) => {
        ins = evalAndReduceWithExposing(comp);
        setView(ins.getView());
      };

      const dispatch = (v: any) => {
        if (!ins) {
          return;
        }
        update(ins.reduce(v));
      };
      update(new compFactory({ value: config, dispatch }));
    }
  }, [compFactory, config]);

  return (
    <Wrapper>
      <ExternalEditorContext.Provider value={externalState}>
        <div className="left">
          <OperationWrapper className="operations">
            <OperationBtn
              active={isBorderShow}
              onClick={(e) => {
                e.preventDefault();
                showBorder((i: any) => !i);
              }}
            >
              <StyledBorderIcon />
              {trans("componentDoc.showBorder")}
            </OperationBtn>
            <OperationBtn
              target="_blank"
              href={`/playground/${name}/${encodeURIComponent(JSON.stringify(config))}`}
            >
              <StyledEditIcon />
              {trans("componentDoc.haveTry")}
            </OperationBtn>
          </OperationWrapper>
          <Bound show={isBorderShow} style={{ width, height }}>
            <EditorContext.Provider value={editorState}>{view}</EditorContext.Provider>
          </Bound>
        </div>
        {!hideSettings && (
          <div className="right">
            <div className="setting-item setting-header">
              <div className="setting-key">{trans("componentDoc.settings")}</div>
              <div className="setting-value">{trans("componentDoc.settingValues")}</div>
            </div>
            {Object.entries(properties).map(([key, value]) => (
              <div key={key} className="setting-item">
                <div className="setting-key">{key}</div>
                <SettingValue value={value} />
              </div>
            ))}
          </div>
        )}
      </ExternalEditorContext.Provider>
    </Wrapper>
  );
}

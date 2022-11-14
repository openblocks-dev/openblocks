import { EditorContext } from "comps/editorState";
import {
  Collapse,
  CollapseLabel as Label,
  CollapseTitle as Title,
  PadDiv,
  Section,
  Tooltip,
  UnShow,
} from "openblocks-design";
import React, { ReactNode, useCallback, useContext, useMemo } from "react";
import { hookCompCategory } from "comps/hooks/hookCompTypes";
import _ from "lodash";
import styled from "styled-components";
import { leftCompListClassName } from "pages/tutorials/tutorialsConstant";
import { ScrollBar } from "openblocks-design";
import UIComp from "comps/comps/uiComp";
import { BottomResTypeEnum } from "types/bottomRes";
import { safeJSONStringify } from "util/objectUtils";
import { Tabs, TabTitle } from "components/Tabs";
import { BackgroundColor, TopHeaderHeight } from "constants/style";
import { trans } from "i18n";

const CollapseTitleWrapper = styled.div`
  display: flex;
`;

function getLen(config: string | boolean | number) {
  if (typeof config === "number") {
    return (config + "").toString().length;
  }
  if (typeof config === "string" || typeof config === "boolean") {
    return config.toString().length;
  }
  return 0;
}

function toDataView(value: any, name: string, desc?: ReactNode) {
  const str = typeof value === "function" ? "Function" : safeJSONStringify(value);
  const descRecord: Record<string, ReactNode> = {};
  descRecord[name] = desc;
  if (Array.isArray(value)) {
    const dataChild: Record<string, any> = {};
    value.forEach((valueChild, index) => {
      dataChild[index] = valueChild;
    });
    return (
      <CollapseView name={name} desc={descRecord} data={dataChild} isArray={true} key={name} />
    );
  } else if (_.isPlainObject(value)) {
    return <CollapseView name={name} desc={descRecord} data={value} key={name} />;
  }
  return (
    <PadDiv key={name}>
      <Tooltip title={desc} placement={"right"} popupVisible={!!desc}>
        <Label label={name} />
        &#8203;
        <Label color="#FF9816" label={getLen(str) > 50 ? str.slice(0, 50) + "..." : str} />
      </Tooltip>
    </PadDiv>
  );
}

function sliceArr(arr: string[]) {
  let preArr: string[] = [];
  let afterArr: string[] = [];
  arr.forEach((arrChild, index) => {
    if (index < 15) {
      preArr.push(arrChild);
    }
    if (index >= arr.length - 5 && index < arr.length) {
      afterArr.push(arrChild);
    }
  });
  return { preArr, afterArr } as const;
}

function toData(props: { data: Record<string, any>; desc?: Record<string, ReactNode> }) {
  const totalArr = Object.keys(props.data);
  const sliceFn = sliceArr;
  return (
    <div>
      {totalArr.length < 30 ? (
        totalArr.map((name) => {
          return toDataView(props.data[name], name, props.desc?.[name]);
        })
      ) : (
        <>
          {sliceFn(totalArr).preArr.map((name) => {
            return toDataView(props.data[name], name, props.desc?.[name]);
          })}
          <UnShow num={totalArr.length - 6} />
          {sliceFn(totalArr).afterArr.map((name) => {
            return toDataView(props.data[name], name, props.desc?.[name]);
          })}
        </>
      )}
    </div>
  );
}

const CollapseView = React.memo(
  (props: {
    name: string;
    desc?: Record<string, ReactNode>;
    data: Record<string, any>;
    isArray?: boolean;
    onClick?: (compName: string) => void;
    isSelected?: boolean;
  }) => {
    const { data = {} } = props;
    return (
      <Collapse
        isSelected={props.isSelected}
        config={[
          {
            key: props.name,
            title: (
              <Tooltip
                title={props.desc?.[props.name]}
                placement={"right"}
                popupVisible={!!props.desc?.[props.name]}
              >
                <CollapseTitleWrapper onClick={() => props.onClick && props.onClick(props.name)}>
                  <Title
                    style={{
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                    label={props.name}
                    hasChild={Object.keys(data).length > 0}
                  />
                  <Title
                    style={{ flexShrink: 0 }}
                    color="#8B8FA3"
                    label={`${props.isArray ? "[]" : "{}"} ${trans("leftPanel.propTips", {
                      num: Object.keys(data).length,
                    })}`}
                  />
                </CollapseTitleWrapper>
              </Tooltip>
            ),
            data: toData({ data, desc: props.desc }),
          },
        ]}
      />
    );
  }
);

interface LeftContentProps {
  uiComp: InstanceType<typeof UIComp>;
}

enum LeftTabKey {
  State = "state",
  ModuleSetting = "module-setting",
}

const LeftContentTabs = styled(Tabs)`
  .ant-tabs-nav {
    background-color: ${BackgroundColor};
    height: 40px;
    padding: 0 16px;
    margin: 0;
    .ant-tabs-tab {
      padding: 0;
      font-weight: 500;
    }
  }
  .ant-tabs-tabpane {
    height: calc(100vh - ${TopHeaderHeight} - 40px);
  }
`;
const LeftContentWrapper = styled.div`
  height: calc(100vh - ${TopHeaderHeight});
`;

export const LeftContent = (props: LeftContentProps) => {
  const { uiComp } = props;
  const editorState = useContext(EditorContext);

  const uiCollapseClick = useCallback(
    (compName: string) => {
      editorState.setSelectedCompNames(new Set([compName]), "leftPanel");
    },
    [editorState]
  );

  const handleBottomResItemClick = useCallback(
    (type: BottomResTypeEnum, name: string) => {
      editorState.setSelectedBottomRes(name, type);
    },
    [editorState]
  );

  const uiCollapse = useMemo(() => {
    const uiCompInfos = _.sortBy(editorState.uiCompInfoList(), [(x) => x.name]);
    return uiCompInfos.map((item) => (
      <CollapseView
        key={item.name}
        name={item.name}
        desc={item.dataDesc}
        data={item.data}
        isSelected={
          editorState.selectedCompNames.size <= 1 && editorState.selectedCompNames.has(item.name)
        }
        onClick={uiCollapseClick}
      />
    ));
  }, [editorState, uiCollapseClick]);

  const bottomResCollapse = useMemo(() => {
    return editorState
      .bottomResComInfoList()
      .map((item) => (
        <CollapseView
          key={item.name}
          name={item.name}
          desc={item.dataDesc}
          data={item.data}
          isSelected={editorState.selectedBottomResName === item.name}
          onClick={() => handleBottomResItemClick(item.type as BottomResTypeEnum, item.name)}
        />
      ));
  }, [editorState, handleBottomResItemClick]);

  const hookCompsCollapse = useMemo(() => {
    return _.sortBy(
      editorState.hooksCompInfoList().filter((info) => hookCompCategory(info.type) === "hook"),
      [(x) => x.name]
    ).map((item) => (
      <CollapseView
        key={item.name}
        name={item.name}
        desc={item.dataDesc}
        data={item.data}
        isSelected={false}
        onClick={_.noop}
      />
    ));
  }, [editorState]);

  const moduleLayoutComp = uiComp.getModuleLayoutComp();
  const stateContent = (
    <ScrollBar>
      <div style={{ paddingBottom: 80 }}>
        <Section name={trans("leftPanel.queries")} width={288} noMargin>
          <span>{bottomResCollapse}</span>
        </Section>
        <Section name={trans("leftPanel.components")} width={288} noMargin>
          <span className={leftCompListClassName}>{uiCollapse}</span>
        </Section>
        <Section name={trans("leftPanel.globals")} width={288} noMargin>
          <span>{hookCompsCollapse}</span>
        </Section>
      </div>
    </ScrollBar>
  );

  if (!moduleLayoutComp) {
    return <LeftContentWrapper className="cypress-left-content">{stateContent}</LeftContentWrapper>;
  }

  return (
    <LeftContentWrapper className="cypress-left-content">
      <LeftContentTabs defaultActiveKey={LeftTabKey.ModuleSetting}>
        <Tabs.TabPane key={LeftTabKey.State} tab={<TabTitle text={trans("leftPanel.stateTab")} />}>
          {stateContent}
        </Tabs.TabPane>
        <Tabs.TabPane
          key={LeftTabKey.ModuleSetting}
          tab={<TabTitle text={trans("leftPanel.settingsTab")} />}
        >
          <ScrollBar>
            <div style={{ paddingBottom: 80, paddingTop: 16 }}>
              <Section width={288} noMargin>
                <span>{moduleLayoutComp.getConfigView()}</span>
              </Section>
            </div>
          </ScrollBar>
        </Tabs.TabPane>
      </LeftContentTabs>
    </LeftContentWrapper>
  );
};

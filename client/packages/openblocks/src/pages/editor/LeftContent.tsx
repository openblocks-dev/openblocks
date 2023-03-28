import { CompInfo, EditorContext } from "comps/editorState";
import {
  BaseSection,
  Collapse,
  CollapseLabel as Label,
  CollapseTitle as Title,
  CopyTextButton,
  FoldedIcon,
  LeftClose,
  LeftCommon,
  LeftOpen,
  PadDiv,
  ScrollBar,
  Tooltip,
  UnfoldIcon,
  UnShow,
} from "openblocks-design";
import React, { ReactNode, useCallback, useContext, useMemo, useState } from "react";
import { hookCompCategory } from "comps/hooks/hookCompTypes";
import _ from "lodash";
import styled from "styled-components";
import { leftCompListClassName } from "pages/tutorials/tutorialsConstant";
import UIComp from "comps/comps/uiComp";
import { BottomResTypeEnum } from "types/bottomRes";
import { getParentNodeKeysByKey, getTreeNodeByKey, safeJSONStringify } from "util/objectUtils";
import { Tabs, TabTitle } from "components/Tabs";
import { BackgroundColor, TopHeaderHeight } from "constants/style";
import { trans } from "i18n";
import { CompTree } from "comps/comps/containerBase";
import { CompStateIcon } from "./editorConstants";
import { UICompType } from "comps/uiCompRegistry";
import { CollapseWrapper, DirectoryTreeStyle, Node } from "./styledComponents";
import { DataNode, EventDataNode } from "antd/lib/tree";
import { isAggregationApp } from "util/appUtils";

const CollapseTitleWrapper = styled.div`
  display: flex;
  width: fit-content;
  max-width: calc(100% - 8px);
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
      </Tooltip>

      <Tooltip
        title={
          getLen(str) > 50 ? (
            <div style={{ display: "flex", wordBreak: "break-all" }}>
              {getLen(str) > 300 ? str.slice(0, 300) + "..." : str}
              <CopyTextButton text={value} style={{ color: "#fff", margin: "4px 0 0 6px" }} />
            </div>
          ) : null
        }
        placement={"right"}
      >
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
    isOpen?: boolean;
  }) => {
    const { data = {} } = props;
    const onlyOne = Object.keys(data).length === 1;
    return (
      <Collapse
        isSelected={props.isSelected}
        isOpen={props.isOpen}
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
                    label={`${props.isArray ? "[]" : "{}"} ${trans(
                      props.isArray
                        ? onlyOne
                          ? "leftPanel.propTipArr"
                          : "leftPanel.propTipsArr"
                        : onlyOne
                        ? "leftPanel.propTip"
                        : "leftPanel.propTips",
                      {
                        num: Object.keys(data).length,
                      }
                    )}`}
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

enum TreeUIKey {
  Components = "components",
  Modals = "modals",
}

type NodeItem = {
  key: string;
  title: string;
  type?: UICompType;
  children: NodeItem[];
};

type NodeInfo = {
  key: string;
  show: boolean;
  clientX?: number;
};

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
  const [expandedKeys, setExpandedKeys] = useState<Array<string | number>>([]);
  const [showData, setShowData] = useState<NodeInfo[]>([]);

  const getTree = (tree: CompTree, result: NodeItem[], key?: string) => {
    const { items, children } = tree;
    if (Object.keys(items).length) {
      for (const i in items) {
        const info = {
          title: items[i].children.name.getView(),
          type: items[i].children.compType.getView() as UICompType,
          key: i,
          children: [],
        };
        if (key) {
          const parent = getTreeNodeByKey(result, key);
          parent?.children.push(info);
        } else {
          result.push(info);
        }
      }
      result = _.sortBy(result, [(x) => x.title]);
    }
    if (Object.keys(children).length) {
      for (const i in children) {
        getTree(children[i], result, i);
      }
    }
    return result;
  };

  const handleNodeClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    node: EventDataNode<DataNode>,
    uiCompInfos: CompInfo[]
  ) => {
    uiCollapseClick(node.title + "");
    const data = uiCompInfos.find((item) => item.name === node.title);
    if (!node.children?.length && data && Object.keys(data.data)?.length && node.selected) {
      // leaf and selected node, toggle showData
      const index = showData.findIndex((item) => item.key === node.key);
      let newData: NodeInfo[] = [];
      let clientX = e.currentTarget?.offsetLeft + 20;
      if (index > -1) {
        newData = showData.map((item) => {
          if (item.key === node.key) {
            return {
              key: item.key,
              show: !item.show,
              clientX,
            };
          }
          return item;
        });
      } else {
        newData = [
          ...showData,
          {
            key: node.key + "",
            show: true,
            clientX,
          },
        ];
      }
      setShowData(newData);
    }
  };

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

  const getTreeNode = (node: NodeItem, uiCompInfos: CompInfo[]) => {
    const info = showData.find((item) => item.key === node.key);
    const data = uiCompInfos.find((item) => item.name === node.title);
    return (
      <Node>
        <span>
          <span>{node.title}</span>
          {data &&
            !!Object.keys(data.data)?.length &&
            (info?.show ? (
              <Tooltip
                placement="right"
                title={trans("leftPanel.collapseTip", { component: node.title })}
              >
                <div
                  title=""
                  className="show-data"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newData = showData.map((item) => {
                      if (item.key === node.key) {
                        return {
                          key: item.key,
                          show: false,
                          clientX: undefined,
                        };
                      }
                      return item;
                    });
                    setShowData(newData);
                  }}
                >
                  <LeftOpen />
                </div>
              </Tooltip>
            ) : (
              <Tooltip
                placement="right"
                title={trans("leftPanel.expandTip", { component: node.title })}
              >
                <div
                  title=""
                  className="no-data"
                  onClick={(e) => {
                    e.stopPropagation();
                    const index = showData.findIndex((item) => item.key === node.key);
                    let newData: NodeInfo[] = [];
                    const info = {
                      key: node.key,
                      show: true,
                      clientX: e.currentTarget.parentElement?.offsetLeft,
                    };
                    if (index > -1) {
                      newData = showData.map((item) => {
                        if (item.key === node.key) {
                          return info;
                        }
                        return item;
                      });
                    } else {
                      newData = [...showData, info];
                    }
                    setShowData(newData);
                  }}
                >
                  <LeftClose />
                </div>
              </Tooltip>
            ))}
        </span>
        {info?.show && data && (
          <CollapseWrapper title="" clientX={info?.clientX} onClick={(e) => e.stopPropagation()}>
            <ScrollBar style={{ maxHeight: "400px" }}>
              <CollapseView
                key={data.name}
                name={data.name}
                desc={data.dataDesc}
                data={data.data}
                isOpen={true}
              />
            </ScrollBar>
          </CollapseWrapper>
        )}
      </Node>
    );
  };

  const getTreeUI = (type: TreeUIKey) => {
    const uiCompInfos = _.sortBy(editorState.uiCompInfoList(), [(x) => x.name]);
    const tree =
      type === TreeUIKey.Components
        ? editorState.getUIComp().getTree()
        : editorState.getHooksComp().getUITree();
    const explorerData: NodeItem[] = getTree(tree, []);
    let selectedKeys = [];
    if (editorState.selectedCompNames.size === 1) {
      const key = Object.keys(editorState.selectedComps())[0];
      const parentKeys = getParentNodeKeysByKey(explorerData, key);
      if (parentKeys && parentKeys.length) {
        let needSet = false;
        parentKeys.forEach((key) => {
          if (!expandedKeys.includes(key)) {
            needSet = true;
          }
        });
        needSet && setExpandedKeys(_.union(expandedKeys, parentKeys));
      }
      selectedKeys.push(key);
    }

    return (
      <DirectoryTreeStyle
        treeData={explorerData}
        icon={(props: NodeItem) => props.type && (CompStateIcon[props.type] || <LeftCommon />)}
        switcherIcon={({ expanded }: { expanded: boolean }) =>
          expanded ? <FoldedIcon /> : <UnfoldIcon />
        }
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
        onClick={(e, node) => handleNodeClick(e, node, uiCompInfos)}
        selectedKeys={selectedKeys}
        titleRender={(nodeData) => getTreeNode(nodeData as NodeItem, uiCompInfos)}
      />
    );
  };

  const uiCollapse = useMemo(() => {
    if (isAggregationApp(editorState.getAppType())) {
      return;
    }
    return getTreeUI(TreeUIKey.Components);
  }, [editorState, uiCollapseClick, expandedKeys, showData]);

  const modalsCollapse = useMemo(() => {
    if (isAggregationApp(editorState.getAppType())) {
      return;
    }
    return getTreeUI(TreeUIKey.Modals);
  }, [editorState, uiCollapseClick, expandedKeys, showData]);

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
        <BaseSection name={trans("leftPanel.components")} width={288} noMargin>
          <span className={leftCompListClassName}>{uiCollapse}</span>
        </BaseSection>
        <BaseSection name={trans("leftPanel.modals")} width={288} noMargin>
          <span>{modalsCollapse}</span>
        </BaseSection>
        <BaseSection name={trans("leftPanel.queries")} width={288} noMargin>
          <span>{bottomResCollapse}</span>
        </BaseSection>
        <BaseSection name={trans("leftPanel.globals")} width={288} noMargin>
          <span>{hookCompsCollapse}</span>
        </BaseSection>
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
              <BaseSection width={288} noMargin>
                <span>{moduleLayoutComp.getConfigView()}</span>
              </BaseSection>
            </div>
          </ScrollBar>
        </Tabs.TabPane>
      </LeftContentTabs>
    </LeftContentWrapper>
  );
};

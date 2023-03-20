import { DataNode } from "antd/lib/tree";
import { CopyTextButton, CustomTree, labelCss, PackUpIcon, Search } from "openblocks-design";
import _ from "lodash";
import { Drawer as AntdDrawer } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDatasourceStructure } from "redux/reduxActions/datasourceActions";
import styled from "styled-components";
import {
  getDataSourceStructures,
  getDataSourceTypesMap,
} from "redux/selectors/datasourceSelectors";
import { EmptyContent } from "components/EmptyContent";
import { trans } from "i18n";
import { DatasourceType } from "@openblocks-ee/constants/queryConstants";

const TreeTitle = styled.div`
  height: 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;

  svg g g {
    fill: #8b8fa3;
  }
`;

const TitleSpan = styled.span`
  ${labelCss};
  font-weight: 500;
  color: #222222;
  line-height: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 210px;
`;

const TreeContent = styled.div`
  height: 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 8px;
  cursor: default;
`;

const ColumnName = styled.span`
  ${labelCss};
  color: #333333;
`;

const ColumnType = styled.span`
  ${labelCss};
  color: #8b8fa3;
`;

const AllData = styled.span`
  ${labelCss};
  color: #8b8fa3;
  line-height: 13px;
  display: block;
  margin: 0 0 7px 8px;
`;

const DrawerIcon = styled(PackUpIcon)<{ deg: string }>`
  transform: ${(props) => props.deg};
`;

const DrawerTitle = styled.div`
  color: #222222;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 500;

  :hover {
    cursor: pointer;

    svg g path {
      fill: #315efb;
    }
  }
`;

const headerWrapperStyle: CSSProperties = {
  borderBottom: "none",
  zIndex: 2,
  height: "40px",
  padding: "9px 16px",
  width: "100%",
};

const Drawer = styled(AntdDrawer)<{ $vis: boolean }>`
  .ant-drawer-content {
    border-radius: 8px 8px 0 0;
    overflow: ${(props) => (props.$vis ? "auto" : "hidden")};
  }

  .ant-drawer-body {
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
  }
`;

const EveryRow = (props: { name: string }) => {
  const [show, setShow] = useState(false);
  return (
    <TreeTitle
      onMouseEnter={() => {
        setShow(true);
      }}
      onMouseLeave={() => {
        setShow(false);
      }}
    >
      <TitleSpan>{props.name}</TitleSpan>
      {show && <CopyTextButton text={props.name} />}
    </TreeTitle>
  );
};

export const DataSourceStructureTree = (props: {
  dataSourceId: string;
  datasourceType: string;
}) => {
  const { dataSourceId, datasourceType } = props;
  const [expandedKeys, setExpandedKeys] = useState<Array<string | number>>([]);
  const [searchValue, setSearchValue] = useState("");
  const [structure, setStructure] = useState<DataNode[]>([]);

  const dispatch = useDispatch();
  const datasourceStructure = useSelector(getDataSourceStructures);
  const datasourceTypeMap = useSelector(getDataSourceTypesMap);

  const originStructure = datasourceStructure[dataSourceId]?.map((item) => ({
    title: <EveryRow name={item.name} />,
    key: item.name,
    children: item.columns.map((column) => ({
      title: (
        <TreeContent>
          <ColumnName>{column.name}</ColumnName>
          <ColumnType>{column.type}</ColumnType>
        </TreeContent>
      ),
      key: item.name + "-" + column.name,
      isLeaf: true,
    })),
  }));

  useEffect(() => {
    setStructure(originStructure);
    setExpandedKeys([originStructure?.[0]?.key]);
  }, [datasourceStructure[dataSourceId]]);

  const hasStructure = datasourceTypeMap[datasourceType as DatasourceType]?.hasStructureInfo;
  useEffect(() => {
    if (hasStructure) {
      dispatch(fetchDatasourceStructure({ datasourceId: dataSourceId }));
    }
  }, [dataSourceId, dispatch, hasStructure, datasourceType]);

  if (!datasourceStructure[dataSourceId]) {
    return <EmptyContent style={{ margin: "0 8px" }} text={trans("bottomPanel.noMetadata")} />;
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#ffffff",
          position: "sticky",
          top: "0px",
          zIndex: 2,
          padding: "8px 0 12px 0",
        }}
      >
        <Search
          style={{
            padding: "0 8px",
            margin: "0",
          }}
          placeholder={trans("bottomPanel.metaSearchPlaceholder")}
          value={searchValue}
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            if (value.length > 0) {
              const newStructure = originStructure
                .map((item) => {
                  const children = item.children?.filter(
                    (child) => child.key.toString().toLowerCase().indexOf(value) !== -1
                  );
                  return item.key.toString().toLowerCase().indexOf(value) !== -1 ||
                    !_.isEmpty(children)
                    ? {
                        ...item,
                        children: children,
                      }
                    : null;
                })
                .filter((item) => item !== null) as DataNode[];

              setStructure(newStructure);
              setExpandedKeys(newStructure.map((item) => item.key));
            } else {
              setStructure(originStructure);
              setExpandedKeys([]);
            }
            setSearchValue(value);
          }}
        />
      </div>
      <AllData>{trans("bottomPanel.allData")}</AllData>
      <CustomTree
        treeData={structure}
        expandedKeys={expandedKeys}
        onExpand={(keys) => setExpandedKeys(keys)}
      />
    </>
  );
};

interface BottomMetaDrawerProps {
  dataSourceId: string;
  queryType: string;
}

export default function BottomMetaDrawer(props: BottomMetaDrawerProps) {
  const { dataSourceId, queryType } = props;
  const [visible, setVisible] = useState(false); // whether to strech the table structure

  const dispatch = useDispatch();
  const datasourceStructure = useSelector(getDataSourceStructures);
  const datasourceTypeMap = useSelector(getDataSourceTypesMap);

  const hasStructure = datasourceTypeMap[queryType as DatasourceType]?.hasStructureInfo;
  useEffect(() => {
    if (hasStructure) {
      dispatch(fetchDatasourceStructure({ datasourceId: dataSourceId }));
    }
  }, [dataSourceId, dispatch, hasStructure, queryType]);

  if (!datasourceStructure[dataSourceId]) {
    return null;
  }

  const DrawerTitleView = (props: { style?: CSSProperties }) => (
    <div style={props.style}>
      <DrawerTitle onClick={() => setVisible(!visible)}>
        {trans("bottomPanel.metaData")}
        <DrawerIcon deg={visible ? "rotate(180deg)" : "rotate(0deg)"} />
      </DrawerTitle>
    </div>
  );

  return (
    <>
      <DrawerTitleView
        style={{
          ...headerWrapperStyle,
          boxShadow: "0 -2px 5px 0 rgba(0, 0, 0, 0.05)",
          borderRadius: "8px 8px 0 0",
        }}
      />
      <Drawer
        $vis={visible}
        mask={false}
        contentWrapperStyle={{
          height: "100%",
          boxShadow: "none",
          borderRadius: "0",
        }}
        style={{
          position: "absolute",
          height: "100%",
          bottom: 0,
          zIndex: 2,
        }}
        title={<DrawerTitleView />}
        headerStyle={headerWrapperStyle}
        bodyStyle={{
          padding: "0 0 0 8px",
          scrollbarGutter: "stable",
          overflowX: "hidden",
        }}
        placement="bottom"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        getContainer={false}
      >
        <DataSourceStructureTree dataSourceId={dataSourceId} datasourceType={queryType} />
      </Drawer>
    </>
  );
}

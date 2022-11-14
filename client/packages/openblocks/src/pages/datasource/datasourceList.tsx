import styled from "styled-components";
import { EditPopover, PointIcon, Search, TacoButton } from "openblocks-design";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataSource, getDataSourceTypesMap } from "../../redux/selectors/datasourceSelectors";
import { deleteDatasource } from "../../redux/reduxActions/datasourceActions";
import { isEmpty } from "lodash";
import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import history from "../../util/history";
import { buildDatasourceCreateUrl, buildDatasourceEditUrl } from "../../constants/routesURL";
import { timestampToHumanReadable } from "../../util/dateTimeUtils";
import { DataSourceModalTitle } from "./datasourceModal";
import StepModal from "../../components/StepModal";
import { PluginPanel } from "./pluginPanel";
import { Table } from "../../components/Table";
import { trans } from "../../i18n";

const DatasourceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 92px;
  padding: 28px 36px;
  width: 100%;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #222222;
  line-height: 18px;
  flex-grow: 1;
`;

const AddBtn = styled(TacoButton)`
  min-width: 96px;
  width: fit-content;
  height: 32px;
`;

const EditBtn = styled(TacoButton)`
  opacity: 0;
  width: 52px;
  height: 24px;
`;

const BodyWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  padding: 0 20px;
`;

const DatasourceName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const OperationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PopoverIcon = styled(PointIcon)`
  cursor: pointer;
  flex-shrink: 0;

  g {
    fill: #8b8fa3;
  }

  :hover {
    background: #eef0f3;
    border-radius: 4px;
    cursor: pointer;

    g {
      fill: #3377ff;
    }
  }
`;

export const DatasourceList = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const [isCreateFormShow, showCreateForm] = useState(false);
  const datasource = useSelector(getDataSource);
  const plugins = useSelector(getDataSourceTypesMap);

  return (
    <DatasourceWrapper>
      <StepModal
        visible={isCreateFormShow}
        onCancel={() => showCreateForm(false)}
        activeStepKey={"type"}
        destroyOnClose={true}
        width="600px"
        steps={[
          {
            key: "type",
            titleRender: () => <DataSourceModalTitle title={trans("home.selectDatasourceType")} />,
            bodyRender: () => (
              <PluginPanel
                onSelect={(typeInfo) => {
                  history.push(buildDatasourceCreateUrl(typeInfo.id));
                  showCreateForm(false);
                }}
              />
            ),
            footerRender: () => null,
          },
        ]}
      />

      <HeaderWrapper>
        <Title>{trans("home.datasource")}</Title>
        <Search
          placeholder={trans("search")}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: "192px", height: "32px", margin: "0 12px 0 0" }}
        />
        <AddBtn buttonType={"primary"} onClick={() => showCreateForm(true)}>
          {trans("home.newDatasource")}
        </AddBtn>
      </HeaderWrapper>
      <BodyWrapper>
        <Table
          tableLayout={"auto"}
          scroll={{ x: "100%" }}
          pagination={false}
          onRow={(record) => ({
            onClick: () => history.push(buildDatasourceEditUrl((record as any).id)),
          })}
          columns={[
            {
              title: trans("home.datasourceName"),
              dataIndex: "name",
              ellipsis: true,
              sorter: (a: any, b: any) => {
                if (a.name === b.name) {
                  return 0;
                }
                return a.name > b.name ? 1 : -1;
              },
            },
            {
              title: trans("home.type"),
              dataIndex: "type",
              ellipsis: true,
              width: "192px",
              sorter: (a: any, b: any) => {
                if (a.type === b.type) {
                  return 0;
                }
                return a.type > b.type ? 1 : -1;
              },
            },
            {
              title: trans("home.databaseName"),
              dataIndex: "database",
              ellipsis: true,
              sorter: (a: any, b: any) => {
                if (a.database === b.database) {
                  return 0;
                }
                return a.database > b.database ? 1 : -1;
              },
              render: (text) =>
                isEmpty(text) ? <span style={{ color: "#8B8FA3" }}>--</span> : text,
            },
            {
              title: trans("home.creator"),
              dataIndex: "creator",
              ellipsis: true,
              width: "192px",
              sorter: (a: any, b: any) => {
                if (a.creator === b.creator) {
                  return 0;
                }
                return a.type > b.type ? 1 : -1;
              },
            },
            {
              title: trans("home.createTime"),
              dataIndex: "createTime",
              ellipsis: true,
              width: "192px",
              sorter: (a: any, b: any) => {
                if (a.createTime === b.createTime) {
                  return 0;
                }
                return a.createTime > b.createTime ? 1 : -1;
              },
              render: (text) => {
                return timestampToHumanReadable(text, 30 * 24 * 60 * 60 * 1000);
              },
            },
            { title: " ", dataIndex: "operation", width: "152px" },
          ]}
          dataSource={datasource
            .filter((info) => {
              if (info.datasource.creationSource === 2) {
                return false;
              }
              if (!isEmpty(searchValue)) {
                return info.datasource.name.includes(searchValue.trim().toLowerCase());
              }
              return true;
            })
            .map((info, i) => ({
              key: i,
              id: info.datasource.id,
              name: (
                <DatasourceName>
                  {getBottomResIcon(info.datasource.type)}
                  {info.datasource.name}
                </DatasourceName>
              ),
              type: plugins[info.datasource.type]?.name,
              database:
                (info.datasource.datasourceConfig as any)?.database ??
                (info.datasource.datasourceConfig as any)?.serviceName,
              createTime: info.datasource.createTime,
              creator: info.creatorName,
              operation: (
                <OperationWrapper>
                  {info.edit && (
                    <EditBtn
                      className={"home-datasource-edit-button"}
                      buttonType={"primary"}
                      onClick={() => history.push(buildDatasourceEditUrl(info.datasource.id))}
                    >
                      {trans("edit")}
                    </EditBtn>
                  )}
                  <EditPopover
                    del={() => {
                      dispatch(deleteDatasource({ datasourceId: info.datasource.id }));
                    }}
                  >
                    <PopoverIcon tabIndex={-1} />
                  </EditPopover>
                </OperationWrapper>
              ),
            }))}
        />
      </BodyWrapper>
    </DatasourceWrapper>
  );
};

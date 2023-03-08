import { Divider, message, Select } from "antd";
import { useSelector } from "react-redux";
import React, { useContext, useMemo, useState } from "react";
import { DataSourceTypeInfo } from "api/datasourceApi";
import styled from "styled-components";
import { CustomSelect, EllipsisTextCss } from "openblocks-design";
import { DatasourceModal } from "pages/datasource/datasourceModal";
import { InputStatus } from "antd/lib/_util/statusUtils";
import { getDataSource, getDataSourceTypes } from "redux/selectors/datasourceSelectors";
import { getUser } from "redux/selectors/usersSelectors";
import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { trans } from "i18n";
import { DatasourceType, ResourceType } from "@openblocks-ee/constants/queryConstants";
import {
  OPENBLOCKS_API_ID,
  OPENBLOCKS_API_INFO,
  QUICK_GRAPHQL_ID,
  QUICK_REST_API_ID,
} from "constants/datasourceConstants";
import {
  apiPluginsForQueryLibrary,
  databasePlugins,
} from "@openblocks-ee/constants/datasourceConstants";
import { QueryContext } from "util/context/QueryContext";

const SelectOptionLabel = styled.div`
  font-size: 13px;
  display: inline-block;
  flex-grow: 1;
  ${EllipsisTextCss};
`;
const SelectOptionContains = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 99%;
`;
const SelectOption = styled(Select.Option)`
  display: flex;
  justify-content: space-between;

  font-size: 13px;
  color: #333333;
  background: #fdfdfd;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
`;
const SelectWrapper = styled.div`
  height: 32px;
  caret-color: transparent;
  width: 100%;
  flex-grow: 0;

  .ant-select .ant-select-selector {
    padding: 0 0 0 8px;
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    font-size: 13px;
    line-height: 13px;
  }

  .ant-select-selection-item {
    height: 30px;
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

interface ResourceOptionValue {
  id: string;
  type: ResourceType;
}

const JSOptionValue: ResourceOptionValue = {
  id: "",
  type: "js",
};

const LibraryQueryOptionValue: ResourceOptionValue = {
  id: "",
  type: "libraryQuery",
};

const QuickRestAPIValue: ResourceOptionValue = {
  id: QUICK_REST_API_ID,
  type: "restApi",
};

const QuickGraphqlValue: ResourceOptionValue = {
  id: QUICK_GRAPHQL_ID,
  type: "graphql",
};

const OpenblocksAPIValue: ResourceOptionValue = {
  id: OPENBLOCKS_API_ID,
  type: "openblocksApi",
};

interface ResourceDropdownProps {
  changeResource: (datasourceId: string, value: string) => void;
  selectedResource: ResourceOptionValue;
  status: InputStatus;
}

export const ResourceDropdown = (props: ResourceDropdownProps) => {
  const [open, setOpen] = useState(false); // control dropdown list open
  const [edit, setEdit] = useState(true); // Controls whether to display the edit button

  const context = useContext(QueryContext);

  const datasourceInfos = useSelector(getDataSource);
  const datasourceTypes = useSelector(getDataSourceTypes);
  const user = useSelector(getUser);
  const dataSourceTypesMap = useMemo(() => {
    return datasourceTypes
      ?.filter((dataSourceType) => !!dataSourceType.id)
      .reduce((map: Partial<Record<DatasourceType, DataSourceTypeInfo>>, dataSourceType) => {
        map[dataSourceType.id] = dataSourceType;
        return map;
      }, {});
  }, [datasourceTypes]);

  const onDropdownVisibleChange = (open: boolean) => {
    setOpen(open);
    setEdit(!open);
  };

  return (
    <SelectWrapper>
      <CustomSelect
        open={open}
        status={props.status}
        style={{
          width: "100%",
          minWidth: "120px",
          maxWidth: "100%",
        }}
        showSearch={true}
        optionFilterProp={"label"}
        maxTagCount={"responsive" as const}
        dropdownMatchSelectWidth={false}
        value={JSON.stringify(props.selectedResource)}
        placeholder={trans("query.chooseResource")}
        onChange={(value: string) => {
          const optionValue: ResourceOptionValue = JSON.parse(value);
          const datasourceId = optionValue.id;
          const datasourceType = optionValue.type;
          if (!datasourceType) {
            message.error("datasource invalid");
            return;
          }
          props.changeResource(datasourceId, datasourceType);
        }}
        onDropdownVisibleChange={onDropdownVisibleChange}
        dropdownRender={
          Object.keys(dataSourceTypesMap).length > 0
            ? (menu) => (
                <DropdownWrapper>
                  {user.orgDev && (
                    <>
                      <DatasourceModal
                        mode={"create"}
                        text={trans("query.createDataSource")}
                        afterMouseDown={() => onDropdownVisibleChange(false)}
                        onDatasourceChange={(datasource) => {
                          props.changeResource(datasource.id, datasource.type); // update query datasource
                        }}
                      />
                      <Divider
                        style={{
                          margin: "3px 14px 8px",
                          display: "block",
                          minWidth: "auto",
                          width: "auto",
                        }}
                      />
                    </>
                  )}
                  {menu}
                </DropdownWrapper>
              )
            : undefined
        }
      >
        {datasourceInfos
          ?.filter((info) => info.datasource.creationSource !== 2)
          .filter((info) => {
            if (context?.placement === "queryLibrary") {
              return (
                info.datasource.pluginDefinition ||
                databasePlugins.includes(info.datasource.type) ||
                apiPluginsForQueryLibrary.includes(info.datasource.type)
              );
            }
            return true;
          })
          .map((info) => {
            const datasourceType = info.datasource.type;
            const value: ResourceOptionValue = {
              id: info.datasource.id,
              type: datasourceType,
            };
            return (
              <SelectOption
                key={JSON.stringify(value)}
                value={JSON.stringify(value)}
                label={info.datasource.name + dataSourceTypesMap[info.datasource.type]?.name}
              >
                <SelectOptionContains>
                  {datasourceType &&
                    getBottomResIcon(
                      datasourceType,
                      "middle",
                      info.datasource.pluginDefinition?.icon
                    )}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexGrow: 1,
                      minWidth: 0,
                      marginRight: "8px",
                    }}
                  >
                    <SelectOptionLabel style={{ flexGrow: 0 }}>
                      {info.datasource.name}
                    </SelectOptionLabel>
                    {`(${dataSourceTypesMap[info.datasource.type]?.name})`}
                  </div>
                  <DatasourceModal
                    datasource={info.datasource}
                    mode={"edit"}
                    text={trans("query.editDataSource")}
                    hidden={!edit || !info.edit || info.datasource.creationSource === 2}
                  />
                </SelectOptionContains>
              </SelectOption>
            );
          })}

        <SelectOption
          key={JSON.stringify(QuickRestAPIValue)}
          label={trans("query.quickRestAPI")}
          value={JSON.stringify(QuickRestAPIValue)}
        >
          <SelectOptionContains>
            {getBottomResIcon("restApi")}
            <SelectOptionLabel>{trans("query.quickRestAPI")} </SelectOptionLabel>
          </SelectOptionContains>
        </SelectOption>

        <SelectOption
          key={JSON.stringify(QuickGraphqlValue)}
          label={trans("query.quickGraphql")}
          value={JSON.stringify(QuickGraphqlValue)}
        >
          <SelectOptionContains>
            {getBottomResIcon("graphql")}
            <SelectOptionLabel>{trans("query.quickGraphql")} </SelectOptionLabel>
          </SelectOptionContains>
        </SelectOption>

        {context?.placement !== "queryLibrary" && (
          <>
            <SelectOption
              key={JSON.stringify(OpenblocksAPIValue)}
              label={OPENBLOCKS_API_INFO.name}
              value={JSON.stringify(OpenblocksAPIValue)}
            >
              <SelectOptionContains>
                {OPENBLOCKS_API_INFO.icon}
                <SelectOptionLabel>{OPENBLOCKS_API_INFO.name} </SelectOptionLabel>
              </SelectOptionContains>
            </SelectOption>

            <SelectOption
              key={JSON.stringify(JSOptionValue)}
              label={trans("query.executeJSCode")}
              value={JSON.stringify(JSOptionValue)}
            >
              <SelectOptionContains>
                {getBottomResIcon("js")}
                <SelectOptionLabel>{trans("query.executeJSCode")} </SelectOptionLabel>
              </SelectOptionContains>
            </SelectOption>

            <SelectOption
              key={JSON.stringify(LibraryQueryOptionValue)}
              label={trans("query.importFromQueryLibrary")}
              value={JSON.stringify(LibraryQueryOptionValue)}
            >
              <SelectOptionContains>
                {getBottomResIcon("libraryQuery")}
                <SelectOptionLabel>{trans("query.importFromQueryLibrary")} </SelectOptionLabel>
              </SelectOptionContains>
            </SelectOption>
          </>
        )}
      </CustomSelect>
    </SelectWrapper>
  );
};

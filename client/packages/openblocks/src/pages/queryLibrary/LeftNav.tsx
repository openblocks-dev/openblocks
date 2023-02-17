import { useState } from "react";
import styled, { css } from "styled-components";
import {
  BluePlusIcon,
  CustomModal,
  EditPopover,
  EllipsisTextCss,
  PointIcon,
  ScrollBar,
  Search,
  TacoButton,
} from "openblocks-design";
import { LibraryQuery } from "../../api/queryLibraryApi";
import { timestampToHumanReadable } from "../../util/dateTimeUtils";
import { useDispatch, useSelector } from "react-redux";
import { getDataSourceTypesMap } from "../../redux/selectors/datasourceSelectors";
import { deleteQueryLibrary } from "../../redux/reduxActions/queryLibraryActions";
import { EmptyContent } from "../../components/EmptyContent";
import { ReadOnlyMask } from "../common/styledComponent";
import { trans } from "i18n";
import { DatasourceType } from "@openblocks-ee/constants/queryConstants";
import { saveAs } from "file-saver";
import DataSourceIcon from "components/DataSourceIcon";

const Wrapper = styled.div<{ readOnly?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 264px;
  height: 100%;
  border-right: 1px solid #e1e3eb;
  ${(props) => {
    if (props.readOnly) {
      return css`
        color: #8b8fa3;
      `;
    }
  }}
`;

const Header = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
  padding: 16px;
  height: 64px;
`;

const AddIcon = styled(BluePlusIcon)`
  height: 12px;
  width: 12px;
  margin-right: 2px;
`;
const CreateBtn = styled(TacoButton)<{ readOnly?: boolean }>`
  height: 32px;
  width: 70px;
  padding: 4px 12px;
  display: flex;
  align-items: center;
  box-shadow: none;
  opacity: ${(props) => (props.readOnly ? 0.5 : 1)};

  &:hover ${AddIcon} g {
    stroke: #315efb;
  }

  :disabled,
  :disabled:hover {
    ${AddIcon} g {
      stroke: #4965f230;
    }
  }
`;

const Body = styled.div`
  height: calc(100% - 80px);
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 13px;
  color: #8b8fa3;
  line-height: 13px;
  padding: 0 16px;
  margin-bottom: 6px;
`;

const SelectListWrapper = styled.div`
  height: calc(100% - 19px);
`;
const SelectItem = styled.div<{ selected: boolean; readOnly?: boolean }>`
  height: 80px;
  padding: 0 16px;
  background-color: ${(props) =>
    props.selected ? (props.readOnly ? "#EFEFF1" : "#F2F7FC") : "unset"};
  cursor: pointer;

  :hover {
    background-color: ${(props) => !props.selected && "#f2f7fc80"};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 8px 0 12px;
  border-bottom: 1px solid #f5f5f6;
`;

const ContentTop = styled.div`
  display: flex;
  height: 20px;
  justify-content: space-between;
  align-items: center;
`;
const QueryType = styled.div`
  display: flex;
  align-items: center;
  color: #8b8fa3;
  font-size: 13px;
`;
const QueryName = styled.div`
  ${EllipsisTextCss};
  font-weight: 500;
  font-size: 13px;
`;
const QueryTime = styled.div`
  color: #b8b9bf;
  font-size: 13px;
  line-height: 13px;
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

export const LeftNav = (props: {
  queryList: LibraryQuery[];
  selectedQuery?: string;
  addQuery: () => void;
  onSelect: (queryId: string) => void;
  readOnly?: boolean;
}) => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const datasourceTypes = useSelector(getDataSourceTypesMap);

  return (
    <ReadOnlyMask readOnly={!!props.readOnly}>
      <Wrapper readOnly={props.readOnly}>
        <Header>
          <Search
            disabled={props.readOnly}
            placeholder={trans("queryLibrary.searchPlaceholder")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: "154px", height: "32px", margin: "0" }}
          />
          <CreateBtn buttonType={"blue"} onClick={props.addQuery} readOnly={props.readOnly}>
            <AddIcon />
            {trans("newItem")}
          </CreateBtn>
        </Header>
        <Body>
          <Title>{trans("queryLibrary.allQuery")}</Title>
          <SelectListWrapper>
            <ScrollBar>
              {props.queryList.length > 0 ? (
                props.queryList
                  .filter((q) => {
                    let datasourceTypeName =
                      datasourceTypes[q.libraryQueryDSL?.query?.compType as DatasourceType]?.name ??
                      "";
                    if (searchValue) {
                      return (
                        q.name.toLowerCase().includes(searchValue) ||
                        datasourceTypeName.toLowerCase().includes(searchValue)
                      );
                    }
                    return true;
                  })
                  .map((q) => (
                    <SelectItem
                      key={q.id}
                      selected={q.id === props.selectedQuery}
                      readOnly={props.readOnly}
                      onClick={() => props.onSelect(q.id)}
                    >
                      <Content>
                        <ContentTop>
                          <QueryType>
                            <DataSourceIcon
                              dataSourceType={q.libraryQueryDSL?.query?.compType}
                              size="large"
                              httpMethod={q.libraryQueryDSL?.query?.comp?.httpMethod}
                            />
                            {
                              datasourceTypes[q.libraryQueryDSL?.query?.compType as DatasourceType]
                                ?.name
                            }
                          </QueryType>
                          <EditPopover
                            items={[
                              {
                                text: trans("queryLibrary.export"),
                                onClick: () => {
                                  const blob = new Blob([JSON.stringify(q.libraryQueryDSL)], {
                                    type: "application/json;charset=utf-16",
                                  });
                                  return saveAs(blob, q.name, { autoBom: true });
                                },
                              },
                              {
                                text: trans("delete"),
                                onClick: () =>
                                  CustomModal.confirm({
                                    title: trans("queryLibrary.deleteQueryTitle"),
                                    content: trans("queryLibrary.deleteQueryContent"),
                                    onConfirm: () =>
                                      dispatch(deleteQueryLibrary({ queryLibraryId: q.id })),
                                    confirmBtnType: "delete",
                                    okText: trans("delete"),
                                  }),
                                type: "delete",
                              },
                            ]}
                          >
                            <PopoverIcon tabIndex={-1} />
                          </EditPopover>
                        </ContentTop>
                        <QueryName>{q.name}</QueryName>
                        <QueryTime>
                          {timestampToHumanReadable(q.createTime, 30 * 24 * 60 * 60 * 1000)}
                        </QueryTime>
                      </Content>
                    </SelectItem>
                  ))
              ) : (
                <EmptyContent
                  style={{ margin: "10px 16px" }}
                  text={
                    <>
                      <div>{trans("query.noQueries")}</div>
                      <span
                        style={{ color: "#4965f2", cursor: "pointer", margin: "0 4px" }}
                        onClick={props.addQuery}
                      >
                        {trans("newItem")}
                      </span>
                    </>
                  }
                />
              )}
            </ScrollBar>
          </SelectListWrapper>
        </Body>
      </Wrapper>
    </ReadOnlyMask>
  );
};

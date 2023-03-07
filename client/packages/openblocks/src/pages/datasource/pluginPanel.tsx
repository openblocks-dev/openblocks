import styled from "styled-components";
import { Button as AntdButton } from "antd";
import { useSelector } from "react-redux";
import { getDataSourceTypes } from "../../redux/selectors/datasourceSelectors";
import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { DataSourceTypeInfo } from "../../api/datasourceApi";
import { useCurrentPage } from "../../util/hooks";
import { trans } from "i18n";
import {
  apiPlugins,
  apiPluginsForQueryLibrary,
  databasePlugins,
} from "@openblocks-ee/constants/datasourceConstants";

export const DataSourceButton = styled(AntdButton)`
  width: 208px;
  height: ${(props) => (props.size === "small" ? "36px" : "44px")};
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  font-weight: 500;
  font-size: 13px;
  color: #333333;
  padding: 12px 10px;
  display: flex;
  align-items: center;

  & > span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    color: #333333;
    border-color: #d7d9e0;
    background-color: #f5f5f6;
  }

  &:focus {
    color: #333333;
    border-color: #d7d9e0;
    background-color: #f5f5f6;
  }
`;

const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const SectionLabel = styled.div`
  font-size: 13px;
  color: #8b8fa3;
  line-height: 13px;
`;
const SectionBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PluginPanel = (props: { onSelect: (t: DataSourceTypeInfo) => void }) => {
  const datasourceTypes = useSelector(getDataSourceTypes);
  const currentPage = useCurrentPage();
  const apiList = currentPage === "queryLibrary" ? apiPluginsForQueryLibrary : apiPlugins;
  return (
    <PanelWrapper>
      <SectionWrapper>
        <SectionLabel>{trans("query.database")}</SectionLabel>
        <SectionBody>
          {datasourceTypes
            .filter((t) => databasePlugins.includes(t.id) || t.definition?.category === "database")
            .map((t) => {
              return (
                <DataSourceButton key={t.id} onClick={() => props.onSelect(t)}>
                  {t.id && getBottomResIcon(t.id, "large", t.definition?.icon)}
                  {t.name}
                </DataSourceButton>
              );
            })}
        </SectionBody>
      </SectionWrapper>
      <SectionWrapper>
        <SectionLabel>APIs</SectionLabel>
        <SectionBody>
          {datasourceTypes
            .filter((t) => apiList.includes(t.id) || t.definition?.category === "api")
            .map((t) => (
              <DataSourceButton key={t.id} onClick={() => props.onSelect(t)}>
                {t.id && getBottomResIcon(t.id, "large", t.definition?.icon)}
                {t.name}
              </DataSourceButton>
            ))}
        </SectionBody>
      </SectionWrapper>
    </PanelWrapper>
  );
};

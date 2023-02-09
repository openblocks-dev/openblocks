import { useSelector } from "react-redux";
import { getDataSource } from "../../../redux/selectors/datasourceSelectors";
import { HttpConfig } from "../../../api/datasourceApi";
import { HttpQuery } from "./httpQuery";
import styled from "styled-components";
import { QueryConfigItemWrapper, QueryConfigLabel, QueryConfigWrapper } from "components/query";
import { GraphqlQuery } from "./graphqlQuery";

const UrlInput = styled.div<{ hasAddonBefore: boolean }>`
  display: flex;
  width: 100%;

  .cm-editor {
    margin-top: 0;
    ${(props) => props.hasAddonBefore && "border-top-left-radius: 0;"}
    ${(props) => props.hasAddonBefore && "border-bottom-left-radius: 0;"};
  }
`;

const UrlInputAddonBefore = styled.div`
  display: flex;
  align-items: center;
  background-color: #f5f5f6;
  border: 1px solid #d7d9e0;
  border-right: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding: 0 8px;
  height: 32px;
  max-width: 60%;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HttpPathPropertyView = (props: {
  comp: InstanceType<typeof HttpQuery | typeof GraphqlQuery>;
  datasourceId: string;
  urlPlaceholder?: string;
}) => {
  const datasource = useSelector(getDataSource).find(
    (info) => info.datasource.id === props.datasourceId
  );
  const httpConfig = datasource?.datasource.datasourceConfig as HttpConfig;
  return (
    <QueryConfigWrapper>
      <QueryConfigLabel>URL</QueryConfigLabel>
      <QueryConfigItemWrapper>
        <UrlInput hasAddonBefore={!!httpConfig?.url}>
          {httpConfig?.url && <UrlInputAddonBefore>{httpConfig?.url}</UrlInputAddonBefore>}

          {props.comp.children.path.propertyView({
            placement: "bottom",
            placeholder:
              props.urlPlaceholder ||
              (httpConfig?.url ? "/v1/test" : "https://example.com/v1/test"),
          })}
        </UrlInput>
      </QueryConfigItemWrapper>
    </QueryConfigWrapper>
  );
};

export const HttpHeaderPropertyView = (props: {
  comp: InstanceType<typeof HttpQuery | typeof GraphqlQuery>;
}) => {
  return (
    <QueryConfigWrapper>
      <QueryConfigLabel>Headers</QueryConfigLabel>
      <QueryConfigItemWrapper>
        {props.comp.children.headers.propertyView({ keyFlexBasics: 184, valueFlexBasics: 232 })}
      </QueryConfigItemWrapper>
    </QueryConfigWrapper>
  );
};

export const HttpParametersPropertyView = (props: {
  comp: InstanceType<typeof HttpQuery | typeof GraphqlQuery>;
}) => {
  return (
    <QueryConfigWrapper>
      <QueryConfigLabel>Parameters</QueryConfigLabel>
      <QueryConfigItemWrapper>
        {props.comp.children.params.propertyView({ keyFlexBasics: 184, valueFlexBasics: 232 })}
      </QueryConfigItemWrapper>
    </QueryConfigWrapper>
  );
};

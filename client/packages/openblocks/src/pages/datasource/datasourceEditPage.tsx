import styled from "styled-components";
import history from "../../util/history";
import { Button } from "antd";
import { useMemo } from "react";
import { CopyTextButton, DocIcon, PackUpIcon, TacoButton } from "openblocks-design";
import { useDatasourceForm } from "./form/useDatasourceForm";
import { useParams } from "react-router-dom";
import { DatasourceFormRegistry } from "@openblocks-ee/pages/datasource/form/datasourceFormRegistry";
import { DATASOURCE_URL } from "../../constants/routesURL";
import { useSelector } from "react-redux";
import { getDataSource, getDataSourceTypes } from "../../redux/selectors/datasourceSelectors";
import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { trans } from "i18n";
import { DatasourceType } from "@openblocks-ee/constants/queryConstants";
import { getDatasourceTutorial } from "@openblocks-ee/util/tutorialUtils";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 600px;
  background-color: #ffffff;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1488px;
  height: 100%;
  padding: 36px 36px 0;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
`;

const BackBtn = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  cursor: pointer;
  height: 24px;

  :hover {
    color: #4965f2;
  }

  svg {
    transform: rotate(-90deg);
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }

  :hover svg g path {
    fill: #4965f2;
  }
`;

const Body = styled.div`
  display: flex;
  gap: 24px;
`;

const FormHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px 0 13px;
  font-size: 18px;
  font-weight: 500;
`;
const FormWrapper = styled.div`
  flex-shrink: 1;
  width: 912px;
`;
const FormFooter = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
  height: 80px;
  padding: 24px 0 80px;
`;

const Whitelist = styled.div`
  flex-shrink: 0;
  height: fit-content;
  width: 192px;
  padding: 16px;
  line-height: 22px;
  border-radius: 6px;
  background-color: #f5f5f6;
`;

const IPWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg g {
    fill: #8b8fa3;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;

  & > div:first-child {
    margin-right: 4px;
  }
`;

const TutorialButton = styled(Button)`
  font-size: 13px;
  color: #333333;
  text-align: center;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #d7d9e0;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;

  :hover {
    background-color: #f5f5f6;
    border: 1px solid #d7d9e0;
    color: #333333;
  }

  :focus {
    background-color: #f5f5f6;
    border: 1px solid #d7d9e0;
    color: #333333;
  }
`;

const TutorialIcon = styled(DocIcon)`
  height: 12px;
  margin-right: 4px;
`;

type DatasourcePathParams = {
  datasourceId: string;
  datasourceType: DatasourceType;
};

export const DatasourceEditPage = () => {
  const { datasourceId, datasourceType } = useParams<DatasourcePathParams>();
  const datasourceList = useSelector(getDataSource);
  const datasourceTypes = useSelector(getDataSourceTypes);

  const datasourceInfo = useMemo(() => {
    if (!datasourceId) {
      return undefined;
    }
    return datasourceList.find((info) => info.datasource.id === datasourceId);
  }, [datasourceId, datasourceList]);

  const selectedPlugin = useMemo(() => {
    if (datasourceId) {
      return undefined;
    }
    return datasourceTypes.find((t) => t.id === datasourceType);
  }, [datasourceId, datasourceTypes, datasourceType]);

  const { testLoading, createLoading, form, genRequest, resolveTest, resolveCreate } =
    useDatasourceForm();

  const tutorial = getDatasourceTutorial((datasourceType || datasourceInfo?.datasource.type)!);

  const formManifest = datasourceInfo
    ? DatasourceFormRegistry[datasourceInfo.datasource.type]
    : DatasourceFormRegistry[datasourceType];
  const DatasourceForm = formManifest?.form;

  return (
    <Wrapper>
      <ContentWrapper>
        <Header>
          <BackBtn onClick={() => history.push(DATASOURCE_URL)}>
            <PackUpIcon />
            {trans("query.returnList")}
          </BackBtn>
        </Header>

        <FormHeader>
          <TitleWrapper>
            {getBottomResIcon((datasourceInfo?.datasource.type ?? selectedPlugin?.id)!, "large")}
            {datasourceInfo?.datasource.name ??
              selectedPlugin?.name ??
              trans("query.chooseDatasourceType")}
          </TitleWrapper>

          {tutorial && (
            <TutorialButton onClick={() => window.open(tutorial, "_blank")}>
              <TutorialIcon />
              {trans("query.viewDocuments")}
            </TutorialButton>
          )}
        </FormHeader>

        <Body>
          <FormWrapper>
            {DatasourceForm && (
              <DatasourceForm
                form={form}
                datasource={datasourceInfo?.datasource!}
                size={"middle"}
              />
            )}

            {formManifest && (
              <FormFooter>
                {(formManifest.enableTest ?? true) && (
                  <TacoButton
                    buttonType="link"
                    loading={testLoading}
                    onClick={() =>
                      resolveTest(
                        genRequest({
                          datasourceId: datasourceId,
                          datasourceType: datasourceType ?? datasourceInfo?.datasource.type,
                        })
                      )
                    }
                  >
                    {!testLoading && trans("query.testConnection")}
                  </TacoButton>
                )}
                <TacoButton
                  style={{ width: "84px" }}
                  buttonType="primary"
                  loading={createLoading}
                  onClick={() =>
                    resolveCreate({
                      datasourceId: datasourceId,
                      request: genRequest({
                        datasourceId: datasourceId,
                        datasourceType: datasourceType ?? datasourceInfo?.datasource.type,
                      }),
                      afterCreate: () => history.push(DATASOURCE_URL),
                    })
                  }
                >
                  {!createLoading && trans("query.save")}
                </TacoButton>
              </FormFooter>
            )}
          </FormWrapper>

          {formManifest?.whitelist && (
            <Whitelist>
              <div style={{ fontWeight: 600, fontSize: "14px" }}>{trans("query.whitelist")}</div>
              <div style={{ fontSize: "14px", color: "#8B8FA3", marginBottom: "12px" }}>
                {trans("query.whitelistTooltip")}
              </div>

              <span>{trans("query.address")}</span>
              <IPWrapper>
                54.149.191.117 <CopyTextButton text={"54.149.191.117"} />
              </IPWrapper>
              <IPWrapper>
                54.149.191.117
                <CopyTextButton text={"54.149.191.117"} />
              </IPWrapper>
            </Whitelist>
          )}
        </Body>
      </ContentWrapper>
    </Wrapper>
  );
};

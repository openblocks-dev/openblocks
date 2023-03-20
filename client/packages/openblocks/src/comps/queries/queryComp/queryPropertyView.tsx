import { OLD_OPENBLOCKS_DATASOURCE } from "@openblocks-ee/constants/datasourceConstants";
import { manualTriggerResource, ResourceType } from "@openblocks-ee/constants/queryConstants";
import { PreparedStatementConfig } from "api/datasourceApi";
import { isCompWithPropertyView } from "comps/utils/propertyUtils";
import {
  OPENBLOCKS_API_ID,
  QUICK_GRAPHQL_ID,
  QUICK_REST_API_ID,
} from "constants/datasourceConstants";
import { PageType } from "constants/pageConstants";
import { trans } from "i18n";
import { includes, mapValues } from "lodash";
import { deferAction, executeQueryAction, wrapActionExtraInfo } from "openblocks-core";
import {
  CustomModal,
  Dropdown,
  QueryConfigItemWrapper,
  QueryConfigLabel,
  QueryConfigWrapper,
  QueryPropertyViewWrapper,
  QuerySectionWrapper,
  TriggerTypeStyled,
} from "openblocks-design";
import { BottomTabs } from "pages/editor/bottom/BottomTabs";
import { useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { getDataSource, getDataSourceTypes } from "redux/selectors/datasourceSelectors";
import { BottomResTypeEnum } from "types/bottomRes";
import { EditorContext } from "../../editorState";
import { QueryComp } from "../queryComp";
import { ResourceDropdown } from "../resourceDropdown";
import { NOT_SUPPORT_GUI_SQL_QUERY, SQLQuery } from "../sqlQuery/SQLQuery";

export function QueryPropertyView(props: { comp: InstanceType<typeof QueryComp> }) {
  const { comp } = props;

  const editorState = useContext(EditorContext);
  const datasource = useSelector(getDataSource);

  const children = comp.children;
  const dispatch = comp.dispatch;
  const datasourceId = children.datasourceId.getView();
  const datasourceType = children.compType.getView();
  const datasourceConfig = datasource.find((d) => d.datasource.id === datasourceId)?.datasource
    .datasourceConfig;

  const datasourceStatus = useDatasourceStatus(datasourceId, datasourceType);

  return (
    <BottomTabs
      type={BottomResTypeEnum.Query}
      tabsConfig={
        [
          {
            key: "general",
            title: trans("query.generalTab"),
            children: <QueryGeneralPropertyView comp={comp} />,
          },
          {
            key: "notification",
            title: trans("query.notificationTab"),
            children: children.notification.propertyView(children.triggerType.getView()),
          },
          {
            key: "advanced",
            title: trans("query.advancedTab"),
            children: (
              <QueryPropertyViewWrapper>
                {datasourceConfig &&
                  (datasourceConfig as PreparedStatementConfig).enableTurnOffPreparedStatement && (
                    <QuerySectionWrapper>
                      <QueryConfigWrapper style={{ alignItems: "center" }}>
                        <QueryConfigLabel>SQL</QueryConfigLabel>
                        <QueryConfigItemWrapper>
                          {(children.comp.children as any).disablePreparedStatement.propertyView({
                            label: trans("query.disablePreparedStatement"),
                            type: "checkbox",
                            tooltip: trans("query.disablePreparedStatementTooltip"),
                          })}
                        </QueryConfigItemWrapper>
                      </QueryConfigWrapper>
                    </QuerySectionWrapper>
                  )}

                {children.triggerType.getView() === "manual" && (
                  <QuerySectionWrapper>
                    {children.confirmationModal.getPropertyView()}
                  </QuerySectionWrapper>
                )}

                <QuerySectionWrapper>
                  {children.timeout.propertyView({
                    label: trans("query.timeout"),
                    placeholder: "10s",
                    tooltip: trans("query.timeoutTooltip", { maxSeconds: 120, defaultSeconds: 10 }),
                    placement: "bottom",
                  })}
                </QuerySectionWrapper>

                <QuerySectionWrapper>
                  {children.triggerType.getView() === "automatic" && (
                    <>
                      {children.periodic.propertyView({
                        label: trans("query.periodic"),
                        type: "checkbox",
                        placement: "bottom",
                      })}
                      {children.periodic.getView() &&
                        children.periodicTime.propertyView({
                          placement: "bottom",
                          label: trans("query.periodicTime"),
                          placeholder: "5s",
                          tooltip: trans("query.periodicTimeTooltip"),
                        })}
                    </>
                  )}
                </QuerySectionWrapper>

                <QuerySectionWrapper>
                  <>
                    {children.cancelPrevious.propertyView({
                      label: trans("query.cancelPrevious"),
                      type: "checkbox",
                      placement: "bottom",
                      tooltip: trans("query.cancelPreviousTooltip"),
                    })}
                  </>
                </QuerySectionWrapper>
              </QueryPropertyViewWrapper>
            ),
          },
        ] as const
      }
      tabTitle={children.name.getView()}
      onRunBtnClick={() =>
        dispatch(
          executeQueryAction({
            afterExecFunc: () => editorState.setShowResultCompName(children.name.getView()),
          })
        )
      }
      btnLoading={children.isFetching.getView()}
      status={datasourceStatus}
      message={datasourceStatus === "error" ? trans("query.dataSourceStatusError") : undefined}
    />
  );
}

export const QueryGeneralPropertyView = (props: {
  comp: InstanceType<typeof QueryComp>;
  placement?: PageType;
}) => {
  const { comp, placement = "editor" } = props;
  const editorState = useContext(EditorContext);
  const datasource = useSelector(getDataSource);

  const children = comp.children;
  const dispatch = comp.dispatch;
  let datasourceId = children.datasourceId.getView();
  let datasourceType = children.compType.getView();
  const datasourceConfig = datasource.find((d) => d.datasource.id === datasourceId)?.datasource
    .datasourceConfig;

  const datasourceStatus = useDatasourceStatus(datasourceId, datasourceType);

  // transfer old quick REST API datasource to new
  const oldQuickRestId = useMemo(
    () =>
      datasource.find((d) => d.datasource.creationSource === 2 && d.datasource.type === "restApi")
        ?.datasource.id,
    [datasource]
  );
  if (datasourceId === oldQuickRestId) {
    datasourceId = QUICK_REST_API_ID;
    comp.children.datasourceId.dispatchChangeValueAction(QUICK_REST_API_ID);
  }

  // transfer old Openblocks API datasource to new
  const oldOpenblocksId = useMemo(
    () =>
      datasource.find(
        (d) =>
          d.datasource.creationSource === 2 && OLD_OPENBLOCKS_DATASOURCE.includes(d.datasource.type)
      )?.datasource.id,
    [datasource]
  );
  if (datasourceId === oldOpenblocksId) {
    datasourceId = OPENBLOCKS_API_ID;
    datasourceType = "openblocksApi";
    dispatch(
      comp.changeValueAction({
        ...comp.toJsonValue(),
        datasourceId: OPENBLOCKS_API_ID,
        compType: "openblocksApi",
      } as any)
    );
  }

  return (
    <QueryPropertyViewWrapper>
      <QuerySectionWrapper>
        <QueryConfigWrapper style={{ alignItems: "center" }}>
          <QueryConfigLabel>{trans("query.chooseDataSource")}</QueryConfigLabel>
          <QueryConfigItemWrapper direction={"row"}>
            <ResourceDropdown
              selectedResource={{ id: datasourceId, type: datasourceType }}
              changeResource={(newDatasourceId: string, newDatasourceType: string) => {
                // brute-force modify json
                dispatch(
                  wrapActionExtraInfo(
                    comp.changeValueAction({
                      ...comp.toJsonValue(),
                      triggerType:
                        newDatasourceType === children.compType.getView()
                          ? children.triggerType.getView() // Switching data sources of the same type retains the original trigger type
                          : includes(manualTriggerResource, newDatasourceType)
                          ? "manual"
                          : "automatic",
                      lastQueryStartTime: children.lastQueryStartTime.getView(),
                      datasourceId: newDatasourceId,
                      compType: newDatasourceType,
                      comp:
                        newDatasourceType === children.compType.getView()
                          ? children.comp.toJsonValue() // The data source type remains unchanged, and the query information is retained
                          : {},
                    } as any),
                    {
                      compInfos: [
                        {
                          type: "modify",
                          compName: children.name.getView(),
                          compType: newDatasourceType,
                        },
                      ],
                    }
                  )
                );

                if (datasourceStatus === "error") {
                  const queries = editorState
                    .getQueriesComp()
                    .getView()
                    .filter(
                      (q) =>
                        q.children.datasourceId.getView() === datasourceId &&
                        q.children.id.getView() !== children.id.getView()
                    );
                  queries.length > 0 &&
                    CustomModal.confirm({
                      title: trans("query.updateExceptionDataSourceTitle"),
                      content: (
                        <>
                          {trans("query.updateExceptionDataSourceContent")}
                          {queries.map((q) => (
                            <div style={{ fontWeight: "600" }}>{q.children.name.getView()}</div>
                          ))}
                        </>
                      ),
                      bodyStyle: { marginTop: "20px" },
                      onConfirm: () => {
                        queries.forEach((q) => {
                          q.dispatch(
                            deferAction(
                              wrapActionExtraInfo(
                                q.changeValueAction({
                                  ...mapValues(q.children, (c) => c.toJsonValue()),
                                  datasourceId: newDatasourceId,
                                  compType: newDatasourceType,
                                } as any),
                                {
                                  compInfos: [
                                    {
                                      type: "modify",
                                      compName: q.children.name.getView(),
                                      compType: newDatasourceType,
                                    },
                                  ],
                                }
                              )
                            )
                          );
                        });
                      },
                      confirmBtnType: "primary",
                      okText: trans("query.update"),
                    });
                }
              }}
              status={datasourceStatus}
            />
            {children.comp instanceof SQLQuery &&
              !NOT_SUPPORT_GUI_SQL_QUERY.includes(children.compType.getView()) && (
                <div style={{ width: "104px", marginLeft: "8px", flexShrink: 0 }}>
                  {/* query comp should not aware of specific queryType  */}
                  {(children.comp.children as any).mode.propertyView({})}
                </div>
              )}
          </QueryConfigItemWrapper>
        </QueryConfigWrapper>

        {placement === "editor" && (
          <TriggerTypeStyled>
            <Dropdown
              placement={"bottom"}
              label={trans("query.triggerType")}
              options={
                [
                  {
                    label:
                      children.compType.getView() === "js"
                        ? trans("query.triggerTypePageLoad")
                        : trans("query.triggerTypeAuto"),
                    value: "automatic",
                  },
                  { label: trans("query.triggerTypeManual"), value: "manual" },
                ] as const
              }
              value={children.triggerType.getView()}
              onChange={(value) => children.triggerType.dispatchChangeValueAction(value)}
            />
          </TriggerTypeStyled>
        )}
      </QuerySectionWrapper>

      <QuerySectionWrapper>
        {isCompWithPropertyView(children.comp)
          ? children.comp.propertyView({
              datasourceId: datasourceId,
            })
          : children.comp.getPropertyView()}
      </QuerySectionWrapper>

      {placement === "queryLibrary" &&
        datasourceConfig &&
        (datasourceConfig as PreparedStatementConfig).enableTurnOffPreparedStatement && (
          <>
            {(children.comp.children as any).disablePreparedStatement.propertyView({
              label: trans("query.disablePreparedStatement"),
              type: "checkbox",
              tooltip: trans("query.disablePreparedStatementTooltip"),
            })}
          </>
        )}

      {placement === "editor" && (
        <QuerySectionWrapper>
          <QueryConfigWrapper>
            <QueryConfigLabel labelHeight="auto">
              {trans("eventHandler.eventHandlers")}
            </QueryConfigLabel>
            {children.onEvent.getPropertyView()}
          </QueryConfigWrapper>
        </QuerySectionWrapper>
      )}
    </QueryPropertyViewWrapper>
  );
};

function useDatasourceStatus(datasourceId: string, datasourceType: ResourceType) {
  const datasource = useSelector(getDataSource);
  const datasourceTypes = useSelector(getDataSourceTypes);

  return useMemo(() => {
    if (
      datasourceType === "js" ||
      datasourceType === "libraryQuery" ||
      datasourceId === QUICK_REST_API_ID ||
      datasourceId === QUICK_GRAPHQL_ID ||
      datasourceId === OPENBLOCKS_API_ID
    ) {
      return "";
    }
    if (
      datasource.find((info) => info.datasource.id === datasourceId) &&
      datasourceTypes.find((type) => type.id === datasourceType)
    ) {
      return "";
    }
    return "error";
  }, [datasource, datasourceTypes, datasourceId, datasourceType]);
}

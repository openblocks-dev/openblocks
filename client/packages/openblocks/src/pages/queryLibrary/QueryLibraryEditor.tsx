import React, { useEffect, useMemo, useState } from "react";
import { fetchDatasource, fetchDataSourceTypes } from "../../redux/reduxActions/datasourceActions";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/selectors/usersSelectors";
import {
  createQueryLibrary,
  createQueryLibraryRecord,
  fetchQueryLibrary,
  fetchQueryLibraryRecord,
  updateQueryLibrary,
} from "../../redux/reduxActions/queryLibraryActions";
import {
  getQueryLibrary,
  getQueryLibraryRecords,
} from "../../redux/selectors/queryLibrarySelectors";
import styled from "styled-components";
import { LeftNav } from "./LeftNav";
import { ResCreatePanel } from "../../components/ResCreatePanel";
import { EmptyQueryWithoutTab } from "../editor/bottom/BottomContent";
import { BottomResTypeEnum } from "../../types/bottomRes";
import { useCompInstance } from "../../comps/utils/useCompInstance";
import { QueryLibraryComp } from "../../comps/comps/queryLibrary/queryLibraryComp";
import { useSearchParam, useThrottle } from "react-use";
import { Comp } from "openblocks-core";
import { LibraryQuery } from "../../api/queryLibraryApi";
import { NameGenerator } from "../../comps/utils";
import { QueryLibraryHistoryView } from "./QueryLibraryHistoryView";
import { Form, message } from "antd";
import {
  CustomModal,
  DatasourceForm,
  FormInputItem,
  FormRadioItem,
  FormSection,
  TacoButton,
} from "openblocks-design";
import { CheckboxOptionType } from "antd/lib/checkbox/Group";
import { trans } from "i18n";
import { getDataSource } from "../../redux/selectors/datasourceSelectors";
import {
  apiPluginsForQueryLibrary,
  databasePlugins,
  Datasource,
} from "@openblocks-ee/constants/datasourceConstants";
import { importQueryLibrary } from "./importQueryLibrary";
import { registryDataSourcePlugin } from "constants/queryConstants";

const Wrapper = styled.div`
  display: flex;
  height: 100%;
`;

const RightContent = styled.div`
  min-width: 0;
  display: flex;
  flex-grow: 1;
  position: relative;
`;

export const QueryLibraryEditor = () => {
  const dispatch = useDispatch();
  const queryLibrary = useSelector(getQueryLibrary);
  const queryLibraryRecords = useSelector(getQueryLibraryRecords);
  const originDatasourceInfo = useSelector(getDataSource);
  const currentUser = useSelector(getUser);
  const orgId = currentUser.currentOrgId;

  const forwardQueryId = useSearchParam("forwardQueryId");

  const [isCreatePanelShow, showCreatePanel] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState<string>(forwardQueryId ?? "");
  const [publishModalVisible, setPublishModalVisible] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isDataSourceReady, setIsDataSourceReady] = useState(false);

  const selectedRecords = queryLibraryRecords[selectedQuery] ?? {};
  const libraryQuery = queryLibrary[selectedQuery];
  const dsl = libraryQuery?.libraryQueryDSL;

  const params = useMemo(
    () => ({
      Comp: QueryLibraryComp,
      initialValue: isDataSourceReady
        ? {
            ...dsl,
            query: {
              ...dsl?.query,
              id: libraryQuery?.id,
              name: libraryQuery?.name,
            },
          }
        : null,
    }),
    [isDataSourceReady, libraryQuery?.id, libraryQuery?.name]
  );
  const [comp, container] = useCompInstance(params);
  useSaveQueryLibrary(libraryQuery, comp);

  useEffect(() => {
    if (orgId) {
      dispatch(fetchQueryLibrary());
      dispatch(fetchDataSourceTypes({ organizationId: orgId }));
      dispatch(
        fetchDatasource({
          organizationId: orgId,
          onSuccess: (dataSources) => {
            dataSources.forEach((di) => {
              const dataSource = di.datasource;
              if (dataSource.pluginDefinition) {
                registryDataSourcePlugin(
                  dataSource.type,
                  dataSource.id,
                  dataSource.pluginDefinition
                );
              }
            });
            setIsDataSourceReady(true);
          },
        })
      );
    }
  }, [dispatch, orgId]);

  useEffect(() => {
    if (!forwardQueryId && !queryLibrary[selectedQuery]) {
      setSelectedQuery(Object.values(queryLibrary)?.[0]?.id);
    }
  }, [dispatch, Object.keys(queryLibrary).length]);

  useEffect(() => {
    Object.values(selectedRecords).length === 0 &&
      selectedQuery &&
      dispatch(fetchQueryLibraryRecord({ libraryQueryId: selectedQuery }));
  }, [selectedQuery]);

  const datasource = originDatasourceInfo
    .filter((t) => {
      return (
        !!t.datasource.pluginDefinition ||
        apiPluginsForQueryLibrary.includes(t.datasource.type) ||
        databasePlugins.includes(t.datasource.type)
      );
    })
    .map((info) => info.datasource);

  const recentlyUsed = Object.values(queryLibrary)
    .map((i) => i.libraryQueryDSL?.query.datasourceId)
    .map((id) => datasource.find((d) => d.id === id))
    .filter((i) => !!i) as Datasource[];

  const nameGenerator = new NameGenerator();
  nameGenerator.init(Object.values(queryLibrary).map((t) => t.name));
  const newName = nameGenerator.genItemName(trans("queryLibrary.unnamed"));

  const handleAdd = (type: BottomResTypeEnum, extraInfo?: any) => {
    dispatch(
      createQueryLibrary(
        {
          name: newName,
          organizationId: orgId,
          libraryQueryDSL: {
            query: {
              triggerType: "manual",
              datasourceId: extraInfo?.dataSourceId,
              compType: extraInfo?.compType,
            },
          },
        },
        (resp) => {
          setSelectedQuery(resp.data.data.id);
        },
        () => {}
      )
    );
    showCreatePanel(false);
  };

  return (
    <Wrapper>
      <LeftNav
        selectedQuery={isCreatePanelShow ? undefined : selectedQuery}
        queryList={Object.values(queryLibrary)}
        addQuery={() => showCreatePanel(true)}
        onSelect={(id) => {
          setSelectedQuery(id);
          showCreatePanel(false);
        }}
        readOnly={showHistory}
      />
      <RightContent>
        {!selectedQuery || !comp?.children.query.children.id.getView() ? (
          EmptyQueryWithoutTab
        ) : showHistory ? (
          <QueryLibraryHistoryView
            libraryQueryId={selectedQuery}
            compContainer={container}
            onClose={() => setShowHistory(false)}
          />
        ) : (
          comp.propertyView({
            onPublish: () => setPublishModalVisible(true),
            onHistoryShow: () => setShowHistory(true),
          })
        )}

        {isCreatePanelShow && (
          <ResCreatePanel
            recentlyUsed={recentlyUsed}
            datasource={datasource.filter((d) => d.creationSource !== 2)}
            onSelect={handleAdd}
            onClose={() => showCreatePanel(false)}
            placement={"queryLibrary"}
            onImport={(options) =>
              importQueryLibrary({
                dispatch: dispatch,
                options: options,
                orgId: orgId,
                onSuccess: (resp) => {
                  setSelectedQuery(resp.data.data.id);
                  showCreatePanel(false);
                },
              })
            }
          />
        )}
      </RightContent>
      <PublishModal
        libraryQueryId={comp?.children.query.children.id.getView() || ""}
        visible={publishModalVisible}
        onClose={() => setPublishModalVisible(false)}
        latestVersion={Object.values(selectedRecords)?.[0]?.tag}
      />
    </Wrapper>
  );
};

const PublishModal = (props: {
  libraryQueryId: string;
  visible: boolean;
  onClose: () => void;
  latestVersion: string;
}) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const versionOptions = getVersionOptions(props.latestVersion);

  return (
    <CustomModal
      visible={props.visible}
      onCancel={props.onClose}
      destroyOnClose={true}
      width="600px"
      title={trans("queryLibrary.publishNewVersion")}
      footer={
        <div style={{ display: "flex", justifyContent: "flex-end", padding: "16px 16px 0" }}>
          <TacoButton
            buttonType="primary"
            loading={loading}
            onClick={() => {
              form.validateFields().then(() => {
                setLoading(true);
                dispatch(
                  createQueryLibraryRecord({
                    libraryQueryId: props.libraryQueryId,
                    request: form.getFieldsValue(),
                    onSuccessCallback: () => {
                      props.onClose();
                      setLoading(false);
                      message.success(trans("queryLibrary.publishSuccess"));
                    },
                    onErrorCallback: () => setLoading(false),
                  })
                );
              });
            }}
          >
            {trans("queryLibrary.publish")}
          </TacoButton>
        </div>
      }
    >
      <DatasourceForm form={form} preserve={false} style={{ gap: "12px" }}>
        <FormSection>
          <FormRadioItem
            name={"tag"}
            label={trans("queryLibrary.version")}
            options={versionOptions}
            initialValue={versionOptions[1].value}
          />
          <FormInputItem name={"commitMessage"} label={trans("queryLibrary.desc")} />
        </FormSection>
      </DatasourceForm>
    </CustomModal>
  );
};

function getVersionOptions(version?: string): Array<CheckboxOptionType> {
  if (!version) {
    return [
      { label: "v1.0.0", value: "v1.0.0" },
      { label: "v0.1.0", value: "v0.1.0" },
    ];
  }
  const [major, minor, patch] = version.slice(1).split(".");
  return [
    {
      label: ["v" + (Number(major) + 1), 0, 0].join("."),
      value: ["v" + (Number(major) + 1), 0, 0].join("."),
    },
    {
      label: ["v" + major, Number(minor) + 1, 0].join("."),
      value: ["v" + major, Number(minor) + 1, 0].join("."),
    },
    {
      label: ["v" + major, minor, Number(patch) + 1].join("."),
      value: ["v" + major, minor, Number(patch) + 1].join("."),
    },
  ];
}

function useSaveQueryLibrary(
  query: LibraryQuery,
  instance: InstanceType<typeof QueryLibraryComp> | null
) {
  // throttle comp change
  const comp = useThrottle(instance, 1000);
  const dispatch = useDispatch();
  const [prevComp, setPrevComp] = useState<Comp>();
  const [prevJsonStr, setPrevJsonStr] = useState<string>();

  useEffect(() => {
    if (!comp || comp === prevComp || !query || !comp?.children.query.children.id.getView()) {
      return;
    }
    const curJson = comp.toJsonValue();
    const curJsonStr = JSON.stringify(curJson);
    if (prevJsonStr === curJsonStr) {
      return;
    }
    // the first time is a normal change, the latter is the manual update
    if (prevComp) {
      query.name = comp.children.query.children.name.getView();
      query.libraryQueryDSL = curJson;
      dispatch(updateQueryLibrary(query));
    }
    setPrevComp(comp);
    setPrevJsonStr(curJsonStr);
  }, [comp, query, prevComp, prevJsonStr, dispatch]);
}

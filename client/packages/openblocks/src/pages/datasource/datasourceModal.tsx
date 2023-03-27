import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { DataSourceTypeInfo } from "../../api/datasourceApi";
import { AddIcon, DocIcon, ModalFooterWrapper, TacoButton } from "openblocks-design";
import styled from "styled-components";
import { Button } from "antd";
import { useDatasourceForm } from "./form/useDatasourceForm";
import { PluginPanel } from "./pluginPanel";
import { DatasourceFormManifest } from "./form/datasourceFormRegistry";
import StepModal, { StepItem, StepModalProps } from "components/StepModal";
import { GreyTextColor } from "constants/style";
import { trans } from "i18n";
import { DatasourceType } from "@openblocks-ee/constants/queryConstants";
import { getDatasourceTutorial } from "@openblocks-ee/util/tutorialUtils";
import { useSelector } from "react-redux";
import { getDataSourceTypesMap } from "../../redux/selectors/datasourceSelectors";
import { getBottomResIcon } from "@openblocks-ee/util/bottomResUtils";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";
import { getDataSourceFormManifest } from "./getDataSourceFormManifest";

const EditButton = styled(Button)`
  font-size: 13px;
  color: #333333;
  text-align: center;
  line-height: 13px;
  background: #f5f5f6;
  border-radius: 4px;
  border: none;
  height: 20px;
  width: 76px;
  margin-right: 12px;
  padding: 4px;

  :hover {
    color: #315efb;
    background-color: #edeff2;
  }

  :focus {
    color: #315efb;
    background-color: #edeff2;
  }
`;

const StyledAddIcon = styled(AddIcon)`
  height: 16px;
  width: 16px;
  margin-right: 4px;
`;

const CreateButton = styled(Button)`
  font-size: 13px;
  color: #333333;
  text-align: left;
  line-height: 13px;
  border: none;
  height: 31px;
  display: flex;
  align-items: center;
  padding: 12px;
  box-shadow: none;
  margin-right: 8px;

  &:hover ${StyledAddIcon} path {
    fill: #315efb;
  }

  :hover {
    color: #333333;
    background-color: #f2f7fc;
    border-color: #c2d6ff;
  }

  :focus {
    color: #333333;
    background-color: #f2f7fc;
    border-color: #c2d6ff;
  }
`;

const TutorialButton = styled(Button)`
  font-size: 13px;
  color: #333333;
  text-align: center;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #d7d9e0;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 7px;
  flex-shrink: 0;

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

const StyleTutorialIcon = styled(DocIcon)`
  height: 12px;
  margin-right: 4px;
`;

const ModalButton = styled(TacoButton)`
  min-width: 76px;
  width: fit-content;
`;

const ModalTitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const DatasourceTypeLabel = styled.div`
  display: flex;
  align-items: center;
`;

interface DataSourceModalTitleProps {
  title: ReactNode;
  dataSourceType?: DatasourceType;
}

export function DataSourceModalTitle(props: DataSourceModalTitleProps) {
  const tutorialUrl = props.dataSourceType && getDatasourceTutorial(props.dataSourceType);
  return (
    <ModalTitleWrapper>
      <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis" }}>
        {props.title}
      </span>
      {tutorialUrl && (
        <TutorialButton onClick={() => window.open(tutorialUrl, "_blank")}>
          <StyleTutorialIcon />
          {trans("query.viewDocuments")}
        </TutorialButton>
      )}
    </ModalTitleWrapper>
  );
}

type ResourceModalMode = "create" | "edit";

type ResourceModalProps = {
  mode: ResourceModalMode;
  text: string;
  hidden?: boolean;

  datasource?: Datasource;
  onDatasourceChange?: (datasource: Datasource) => void;

  afterMouseDown?: (e: React.MouseEvent) => void; // trigger on open the datasource dialog
};

interface DatasourceModalFooterProps {
  dataSourceType?: DatasourceType;
  dataSourceId?: string;
  formManifest?: DatasourceFormManifest;
  onCreated?: (newDataSource: Datasource) => void;
  datasourceForm: ReturnType<typeof useDatasourceForm>;
}

export function DatasourceModalFooter(props: DatasourceModalFooterProps) {
  const { dataSourceType, dataSourceId, formManifest, onCreated, datasourceForm } = props;
  const { testLoading, isReadyToSubmit, createLoading, genRequest, resolveTest, resolveCreate } =
    datasourceForm;
  if (!dataSourceType) {
    return null;
  }
  if (!formManifest) {
    return null;
  }
  return (
    <ModalFooterWrapper>
      {(formManifest.enableTest ?? true) && (
        <ModalButton
          buttonType="link"
          loading={testLoading}
          onClick={() =>
            resolveTest(
              genRequest({
                datasourceId: dataSourceId,
                datasourceType: dataSourceType!,
              })
            )
          }
        >
          {trans("query.testConnection")}
        </ModalButton>
      )}
      <ModalButton
        buttonType="primary"
        loading={createLoading}
        disabled={!isReadyToSubmit}
        onClick={() =>
          resolveCreate({
            datasourceId: dataSourceId,
            request: genRequest({
              datasourceId: dataSourceId,
              datasourceType: dataSourceType,
            }),
            afterCreate: onCreated,
          })
        }
      >
        {!createLoading && trans("query.save")}
      </ModalButton>
    </ModalFooterWrapper>
  );
}

interface UseDataSourceModalStepsParams {
  datasource?: Datasource;
  onCreated: (datasource: Datasource) => void;
}

export function useDataSourceModalSteps(params: UseDataSourceModalStepsParams) {
  const { datasource, onCreated } = params;
  const [selectedPlugin, setSelectedPlugin] = useState<DataSourceTypeInfo | undefined>(undefined);
  const datasourceTypes = useSelector(getDataSourceTypesMap);
  const datasourceForm = useDatasourceForm();
  const datasourceType = datasource?.type ?? selectedPlugin?.id;
  const datasourcePluginDef = datasource?.pluginDefinition || selectedPlugin?.definition;
  const formManifest =
    datasourceType && getDataSourceFormManifest(datasourceType, datasourcePluginDef);
  const DataSourceForm = formManifest?.form;

  const { setIsReadyToSubmit } = datasourceForm;

  useEffect(() => {
    setIsReadyToSubmit(true);
  }, [datasourceType, setIsReadyToSubmit]);

  const steps: StepItem[] = useMemo(
    () => [
      {
        key: "type",
        titleRender: () => {
          return <DataSourceModalTitle title={trans("query.chooseDatasourceType")} />;
        },
        bodyRender: ({ next }) => (
          <PluginPanel
            onSelect={(typeInfo) => {
              setSelectedPlugin(typeInfo);
              next();
            }}
          />
        ),
        footerRender: () => null,
      },
      {
        key: "form",
        canBack: !datasource,
        titleRender: () => {
          return (
            <DataSourceModalTitle
              title={
                (datasourceType && (
                  <DatasourceTypeLabel>
                    {getBottomResIcon(datasourceType, "middle", datasourcePluginDef?.icon)}
                    {datasourceTypes[datasourceType]?.name}
                  </DatasourceTypeLabel>
                )) ||
                datasource?.name
              }
              dataSourceType={datasourceType}
            />
          );
        },
        bodyRender: () => {
          const dataSourceTypeInfo = datasourceType && datasourceTypes[datasourceType];
          if (!dataSourceTypeInfo || !DataSourceForm) {
            return null;
          }
          return (
            <DataSourceForm
              onFormReadyStatusChange={(isReady) => {
                datasourceForm.setIsReadyToSubmit(isReady);
              }}
              dataSourceTypeInfo={dataSourceTypeInfo}
              form={datasourceForm.form}
              datasource={datasource!}
            />
          );
        },
        footerRender: () => (
          <DatasourceModalFooter
            dataSourceId={datasource?.id}
            dataSourceType={datasourceType}
            datasourceForm={datasourceForm}
            formManifest={formManifest}
            onCreated={onCreated}
          />
        ),
      },
    ],
    [
      datasource,
      datasourceType,
      datasourcePluginDef?.icon,
      datasourceTypes,
      DataSourceForm,
      datasourceForm,
      formManifest,
      onCreated,
    ]
  );
  return steps;
}

interface CreateDataSourceModalProps extends Omit<StepModalProps, "steps"> {
  dataSource?: Datasource;
  onCreated: (dataSource: Datasource) => void;
}

export function CreateDataSourceModal(props: CreateDataSourceModalProps) {
  const { dataSource, onCreated, ...otherProps } = props;
  const steps = useDataSourceModalSteps({
    datasource: dataSource,
    onCreated,
  });
  const [activeStepKey, setActiveStepKey] = useState(dataSource?.type || "type");

  useEffect(() => {
    if (dataSource) {
      setActiveStepKey("form");
    }
  });

  return (
    <StepModal
      {...otherProps}
      destroyOnClose={true}
      onStepChange={setActiveStepKey}
      activeStepKey={activeStepKey}
      width="888px"
      steps={steps}
      onCancel={(e) => {
        props.onCancel?.(e);
        setActiveStepKey("type");
      }}
    />
  );
}

export const DatasourceModal = (props: ResourceModalProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {props.mode === "create" ? (
        <CreateButton
          onMouseDown={(e) => {
            setVisible(true);
            if (props.afterMouseDown) {
              props.afterMouseDown(e);
            }
            e.stopPropagation();
          }}
        >
          <StyledAddIcon style={{ color: GreyTextColor }} />
          {props.text}
        </CreateButton>
      ) : (
        <EditButton
          hidden={props.hidden}
          onMouseDown={(e) => {
            setVisible(true);
            if (props.afterMouseDown) {
              props.afterMouseDown(e);
            }
            e.stopPropagation();
          }}
        >
          {props.text}
        </EditButton>
      )}

      <div
        onKeyDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <CreateDataSourceModal
          visible={visible}
          onCancel={() => setVisible(false)}
          dataSource={props.datasource}
          onCreated={(dataSource: Datasource) => {
            setVisible(false);
            props.onDatasourceChange?.(dataSource);
          }}
        />
      </div>
    </>
  );
};

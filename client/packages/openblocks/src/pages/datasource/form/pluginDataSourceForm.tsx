import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  DatasourceForm,
  FormCheckboxItem,
  FormInputItem,
  FormInputPasswordItem,
  FormItemProps,
  FormKeyValueItem,
  FormNumberInputItem,
  FormSection,
  FormSectionLabel,
  FormSelectItem,
  FormSelectItemProps,
  TacoButton,
  TacoMarkDown,
} from "openblocks-design";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import { DatasourceNameFormInputItem, GeneralSettingFormSectionLabel } from "../form";
import {
  DataSourceParamConfig,
  ParamOption,
  DataSourceParamType,
  DataSourcePluginMeta,
  DataSourceExtraConfig,
} from "openblocks-sdk/dataSource";
import styled from "styled-components";
import { trans } from "i18n";
import { Datasource } from "constants/datasourceConstants";
import { DatasourceApi } from "api/datasourceApi";
import { FieldData } from "rc-field-form/es/interface";
import { Alert, Form, Input } from "antd";

const TooltipWrapper = styled.div`
  .markdown-body {
    background-color: transparent;
    margin: 0;
    color: #ffffff;
    font-size: 13px;
  }
`;

const valueTypeToWidget: Record<
  Exclude<DataSourceParamType, "groupTitle">,
  FunctionComponent<any>
> = {
  textInput: FormInputItem,
  numberInput: FormNumberInputItem,
  checkbox: FormCheckboxItem,
  password: FormInputPasswordItem,
  select: FormSelectItem,
  keyValueInput: FormKeyValueItem,
};

function getFieldWidget(
  filedConfig: DataSourceParamConfig,
  isEditing: boolean,
  isExtraParams: boolean
): ReactNode {
  const { updatable = true, type, label, key, rules = [], tooltip, placeholder } = filedConfig;

  let selectOptions: ParamOption[] = [];
  let finalPlaceholder = placeholder;
  let finalRules = [...rules];
  let required = !!finalRules?.find((i) => !!i?.required);

  if (type === "select" && filedConfig.options) {
    selectOptions = [...filedConfig.options];
  }

  if (type === "password" && isEditing) {
    finalPlaceholder = trans("query.encryptedServer");
    finalRules = finalRules.filter((i) => !i?.required);
  }

  if (type === "groupTitle") {
    return <FormSectionLabel>{label}</FormSectionLabel>;
  }

  const Widget: FunctionComponent<FormItemProps | FormSelectItemProps<any>> =
    valueTypeToWidget[type];

  if (!Widget) {
    return null;
  }

  return (
    <Widget
      label={label}
      required={required}
      name={isExtraParams ? ["dynamicParamsConfig", key] : key}
      rules={finalRules}
      options={selectOptions}
      placeholder={finalPlaceholder}
      disabled={isEditing && !updatable}
      help={
        tooltip && (
          <TooltipWrapper>
            <TacoMarkDown>{tooltip}</TacoMarkDown>
          </TooltipWrapper>
        )
      }
    />
  );
}

function getDefaultValues(def: DataSourcePluginMeta, datasource?: Datasource) {
  const ret: any = {};
  if (datasource) {
    return datasource.datasourceConfig;
  }
  def?.dataSourceConfig?.params?.forEach((i) => {
    if (i.defaultValue) {
      ret[i.key] = i.defaultValue;
    }
  });
  return ret;
}

export const PluginDataSourceForm = (props: DatasourceFormProps) => {
  const { form, datasource, dataSourceTypeInfo, onFormReadyStatusChange } = props;
  const [extraParamConfigs, setExtraParamConfigs] = useState<DataSourceParamConfig[]>([]);
  const [isExtraParamsRefreshing, setExtraParamRefreshing] = useState(false);
  const [isExtraParamsRefreshError, setExtraParamRefreshError] = useState(false);
  const pluginDef = dataSourceTypeInfo?.definition || datasource.pluginDefinition;
  const pluginName = dataSourceTypeInfo?.id || datasource.pluginDefinition?.id;
  const isEditing = !!datasource;
  const hasDynamicConfig = !!pluginDef?.dataSourceConfig?.extra;

  const readyStatusCallbackRef = useRef(onFormReadyStatusChange);
  readyStatusCallbackRef.current = onFormReadyStatusChange;

  const handleRefreshExtraParams = useCallback(() => {
    if (!pluginName) {
      return;
    }

    const data = form.getFieldsValue();

    readyStatusCallbackRef.current(false);
    setExtraParamRefreshing(true);
    setExtraParamRefreshError(false);
    DatasourceApi.fetchDynamicPluginConfig<DataSourceExtraConfig>(
      pluginName,
      "$.dataSourceConfig.extra",
      data,
      datasource?.id
    )
      .then((res) => {
        if (res.data.success) {
          const { data, extraParams } = res.data.data?.[0] || {};
          form.setFieldsValue({
            extra: data,
            dynamicParamsDef: extraParams,
          });
          setExtraParamConfigs(extraParams || []);
          readyStatusCallbackRef.current(true);
        } else {
          setExtraParamRefreshError(true);
        }
      })
      .catch(() => {
        setExtraParamRefreshError(true);
      })
      .finally(() => {
        setExtraParamRefreshing(false);
      });
  }, [datasource?.id, form, pluginName]);

  const handleFieldsChange = (changedFields: FieldData[]) => {
    if (!hasDynamicConfig || !pluginDef) {
      return;
    }
    // only no-extra fields change can trigger extra params refresh
    const shouldRefresh = changedFields.some((i) => {
      const name = Array.isArray(i.name) ? i.name[0] : i.name;
      return pluginDef.dataSourceConfig.params.find((j) => j.key === name);
    });
    if (!shouldRefresh) {
      return;
    }
    handleRefreshExtraParams();
  };

  useEffect(() => {
    if (!isEditing || !hasDynamicConfig) {
      return;
    }
    handleRefreshExtraParams();
  }, [handleRefreshExtraParams, hasDynamicConfig, isEditing]);

  if (!pluginDef) {
    return <div />;
  }

  const dataSourceConfig = pluginDef.dataSourceConfig;
  const initialValues = getDefaultValues(pluginDef, datasource);
  const hasGeneralSettings = dataSourceConfig.params?.[0]?.type !== "groupTitle";

  return (
    <DatasourceForm form={form} initialValues={initialValues} onFieldsChange={handleFieldsChange}>
      <Form.Item noStyle name="extra">
        <Input hidden />
      </Form.Item>
      <Form.Item noStyle name="dynamicParamsDef">
        <Input hidden />
      </Form.Item>
      <FormSection size={props.size}>
        <DatasourceNameFormInputItem
          placeholder="My DataSource 1"
          initialValue={datasource?.name}
        />
      </FormSection>

      <FormSection size={props.size}>
        {hasGeneralSettings && <GeneralSettingFormSectionLabel />}
        {(dataSourceConfig.params || []).map((field) => {
          return (
            <React.Fragment key={field.key}>
              {getFieldWidget(field, isEditing, false)}
            </React.Fragment>
          );
        })}
        {extraParamConfigs.map((field) => {
          return (
            <React.Fragment key={field.key}>
              {getFieldWidget(field, isEditing, true)}
            </React.Fragment>
          );
        })}
      </FormSection>
      {isExtraParamsRefreshing && (
        <Alert showIcon type="info" message={trans("query.dynamicDataSourceConfigLoadingText")} />
      )}
      {isExtraParamsRefreshError && (
        <Alert
          showIcon
          type="error"
          message={
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>{trans("query.dynamicDataSourceConfigErrText")}</div>
              <TacoButton size="small" onClick={handleRefreshExtraParams}>
                {trans("query.retry")}
              </TacoButton>
            </div>
          }
        ></Alert>
      )}
    </DatasourceForm>
  );
};

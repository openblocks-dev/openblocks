import React, { FunctionComponent, ReactNode } from "react";
import {
  DatasourceForm,
  FormCheckboxItem,
  FormInputItem,
  FormInputPasswordItem,
  FormItemProps,
  FormNumberInputItem,
  FormSection,
  FormSelectItem,
  FormSelectItemProps,
  TacoMarkDown,
} from "openblocks-design";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import { DatasourceNameFormInputItem, GeneralSettingFormSectionLabel } from "../form";
import {
  DataSourceParamConfig,
  ParamOption,
  DataSourceParamType,
  DataSourcePluginMeta,
} from "openblocks-sdk/dataSource";
import styled from "styled-components";
import { trans } from "i18n";
import { Datasource } from "constants/datasourceConstants";

const TooltipWrapper = styled.div`
  .markdown-body {
    background-color: transparent;
    margin: 0;
    color: #ffffff;
    font-size: 13px;
  }
`;

const valueTypeToWidget: Record<DataSourceParamType, FunctionComponent<any>> = {
  textInput: FormInputItem,
  numberInput: FormNumberInputItem,
  checkbox: FormCheckboxItem,
  password: FormInputPasswordItem,
  select: FormSelectItem,
};

function getFieldWidget(filedConfig: DataSourceParamConfig, isEditing: boolean): ReactNode {
  const { type, label, key, rules = [], tooltip, placeholder } = filedConfig;

  let selectOptions: ParamOption[] = [];
  let finalPlaceholder = placeholder;

  if (type === "select" && filedConfig.options) {
    selectOptions = [...filedConfig.options];
  }

  if (type === "password" && isEditing) {
    finalPlaceholder = trans("query.encryptedServer");
  }

  const Widget: FunctionComponent<FormItemProps | FormSelectItemProps<any>> =
    valueTypeToWidget[type];

  if (!Widget) {
    return null;
  }

  return (
    <Widget
      label={label}
      name={key}
      rules={[...rules]}
      options={selectOptions}
      placeholder={finalPlaceholder}
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
  const { form, datasource, dataSourceTypeInfo } = props;
  const pluginDef = dataSourceTypeInfo?.definition || datasource.pluginDefinition;
  if (!pluginDef) {
    return <div />;
  }

  const isEditing = !!datasource;
  const dataSourceConfig = pluginDef.dataSourceConfig;
  const initialValues = getDefaultValues(pluginDef, datasource);

  return (
    <DatasourceForm form={form} preserve={false} initialValues={initialValues}>
      <FormSection size={props.size}>
        <DatasourceNameFormInputItem
          placeholder="My DataSource 1"
          initialValue={datasource?.name}
        />
      </FormSection>

      <FormSection size={props.size}>
        <GeneralSettingFormSectionLabel />
        {dataSourceConfig?.params?.map((field) => {
          return (
            <React.Fragment key={field.key}>{getFieldWidget(field, isEditing)}</React.Fragment>
          );
        })}
      </FormSection>
    </DatasourceForm>
  );
};

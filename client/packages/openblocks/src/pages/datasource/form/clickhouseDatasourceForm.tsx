import React from "react";
import { DatasourceForm, FormInputItem, FormSection } from "openblocks-design";
import { MysqlConfig } from "../../../api/datasourceApi";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import { useHostCheck } from "./useHostCheck";
import {
  DatabaseFormInputItem,
  GeneralSettingFormSectionLabel,
  HostFormInputItem,
  PasswordFormInputItem,
  PortFormInputItem,
  SSLFormCheckboxItem,
  UserNameFormInputItem,
} from "../form";
import { trans } from "i18n";

export const ClickHouseDatasourceForm = (props: DatasourceFormProps) => {
  const { form, datasource } = props;
  const datasourceConfig = datasource?.datasourceConfig as MysqlConfig;

  const hostRule = useHostCheck();

  return (
    <DatasourceForm form={form} preserve={false} style={{ gap: "12px" }}>
      <FormSection size={props.size}>
        <FormInputItem
          className={"ets"}
          name={"name"}
          label={trans("query.datasourceName")}
          placeholder={"My ClickHouse1"}
          required={true}
          initialValue={datasource?.name}
          rules={[{ required: true, message: trans("query.datasourceNameRuleMessage") }]}
        />
      </FormSection>

      <FormSection size={props.size}>
        <GeneralSettingFormSectionLabel />
        <HostFormInputItem initialValue={datasourceConfig?.host} />
        <PortFormInputItem initialValue={"8123"} port={datasourceConfig?.port} />
        <DatabaseFormInputItem database={datasourceConfig?.database} />
        <UserNameFormInputItem initialValue={datasourceConfig?.username} />
        <PasswordFormInputItem datasource={datasource} />
        <SSLFormCheckboxItem usingSSl={datasourceConfig?.usingSsl} />
      </FormSection>
    </DatasourceForm>
  );
};

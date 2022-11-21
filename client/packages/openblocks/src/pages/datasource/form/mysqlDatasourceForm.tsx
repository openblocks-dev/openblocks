import React from "react";
import { DatasourceForm, FormCheckboxItem, FormInputItem, FormSection } from "openblocks-design";
import { MysqlConfig } from "../../../api/datasourceApi";
import { DatasourceFormProps } from "./datasourceFormRegistry";
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

export const MysqlDatasourceForm = (props: DatasourceFormProps) => {
  const { form, datasource } = props;
  const datasourceConfig = datasource?.datasourceConfig as MysqlConfig;

  return (
    <DatasourceForm form={form} preserve={false} style={{ gap: "12px" }}>
      <FormSection size={props.size}>
        <FormInputItem
          className={"ets"}
          style={{ marginLeft: "32px" }}
          name={"name"}
          label={trans("query.datasourceName")}
          placeholder={"My MySQL1"}
          required={true}
          initialValue={datasource?.name}
          rules={[{ required: true, message: trans("query.datasourceNameRuleMessage") }]}
        />
      </FormSection>

      <FormSection size={props.size}>
        <GeneralSettingFormSectionLabel />
        <HostFormInputItem initialValue={datasourceConfig?.host} />
        <PortFormInputItem initialValue={"3306"} port={datasourceConfig?.port} />
        <DatabaseFormInputItem database={datasourceConfig?.database} />
        <UserNameFormInputItem initialValue={datasourceConfig?.username} />
        <PasswordFormInputItem datasource={datasource} />
        <SSLFormCheckboxItem usingSSl={datasourceConfig?.usingSsl} />

        <FormCheckboxItem
          name={"enableTurnOffPreparedStatement"}
          label={trans("query.enableTurnOffPreparedStatement")}
          tooltip={trans("query.enableTurnOffPreparedStatementTooltip")}
          initialValue={datasourceConfig?.enableTurnOffPreparedStatement}
        />
      </FormSection>
    </DatasourceForm>
  );
};

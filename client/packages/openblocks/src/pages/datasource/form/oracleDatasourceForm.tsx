import React from "react";
import { DatasourceForm, FormCheckboxItem, FormInputItem, FormSection } from "openblocks-design";
import { OracleConfig } from "../../../api/datasourceApi";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import {
  GeneralSettingFormSectionLabel,
  HostFormInputItem,
  PasswordFormInputItem,
  PortFormInputItem,
  SSLFormCheckboxItem,
  UserNameFormInputItem,
} from "../form";
import { trans } from "i18n";

export const OracleDatasourceForm = (props: DatasourceFormProps) => {
  const { form, datasource } = props;
  const datasourceConfig = datasource?.datasourceConfig as OracleConfig;

  return (
    <DatasourceForm form={form} preserve={false} style={{ gap: "12px" }}>
      <FormSection size={props.size}>
        <FormInputItem
          className={"ets"}
          name={"name"}
          label={trans("query.datasourceName")}
          placeholder={"My Oracle1"}
          required={true}
          initialValue={datasource?.name}
          rules={[{ required: true, message: trans("query.datasourceNameRuleMessage") }]}
        />
      </FormSection>

      <FormSection size={props.size}>
        <GeneralSettingFormSectionLabel />
        <HostFormInputItem initialValue={datasourceConfig?.host} />
        <PortFormInputItem initialValue={"1521"} port={datasourceConfig?.port} />
        <FormInputItem
          name={"serviceName"}
          label={trans("query.serviceName")}
          placeholder={"test_service"}
          required={true}
          initialValue={datasourceConfig?.serviceName}
          rules={[{ required: true, message: trans("query.serviceNameRequiredMessage") }]}
        />
        <UserNameFormInputItem initialValue={datasourceConfig?.username} />
        <PasswordFormInputItem datasource={datasource} />

        <SSLFormCheckboxItem usingSSl={datasourceConfig?.usingSsl} />
        <FormCheckboxItem
          name={"usingSid"}
          label={trans("query.useSID")}
          initialValue={datasourceConfig?.usingSid}
        />
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

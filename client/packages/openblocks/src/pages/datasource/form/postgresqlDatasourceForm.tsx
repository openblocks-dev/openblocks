import React from "react";
import { DatasourceForm, FormSection } from "openblocks-design";
import { MysqlConfig } from "../../../api/datasourceApi";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import {
  DatabaseFormInputItem,
  DatasourceNameFormInputItem,
  GeneralSettingFormSectionLabel,
  HostFormInputItem,
  PasswordFormInputItem,
  PortFormInputItem,
  SSLFormCheckboxItem,
  UserNameFormInputItem,
} from "../form";

export const PostgresqlDatasourceForm = (props: DatasourceFormProps) => {
  const { form, datasource } = props;
  const datasourceConfig = datasource?.datasourceConfig as MysqlConfig;

  return (
    <DatasourceForm form={form} preserve={false}>
      <FormSection size={props.size}>
        <DatasourceNameFormInputItem
          placeholder={"My PostgreSQL1"}
          initialValue={datasource?.name}
        />
      </FormSection>

      <FormSection size={props.size}>
        <GeneralSettingFormSectionLabel />
        <HostFormInputItem initialValue={datasourceConfig?.host} />
        <PortFormInputItem initialValue={"5432"} port={datasourceConfig?.port} />
        <DatabaseFormInputItem database={datasourceConfig?.database} />
        <UserNameFormInputItem initialValue={datasourceConfig?.username} />
        <PasswordFormInputItem datasource={datasource} />
        <SSLFormCheckboxItem usingSSl={datasourceConfig?.usingSsl} />
      </FormSection>
    </DatasourceForm>
  );
};

import React from "react";
import { DatasourceForm, FormSection } from "openblocks-design";
import { SQLConfig } from "../../../api/datasourceApi";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import {
  DatasourceNameFormInputItem,
  GeneralSettingFormSectionLabel,
  HostFormInputItem,
  PasswordFormInputItem,
  PortFormInputItem,
  UserNameFormInputItem,
} from "../form";

export const SMTPDatasourceForm = (props: DatasourceFormProps) => {
  const { form, datasource } = props;
  const datasourceConfig = datasource?.datasourceConfig as SQLConfig;

  return (
    <DatasourceForm form={form} preserve={false}>
      <FormSection size={props.size}>
        <DatasourceNameFormInputItem placeholder={"My SMTP1"} initialValue={datasource?.name} />
      </FormSection>

      <FormSection size={props.size}>
        <GeneralSettingFormSectionLabel />
        <HostFormInputItem initialValue={datasourceConfig?.host} />
        <PortFormInputItem initialValue={"25"} port={datasourceConfig?.port} />

        <UserNameFormInputItem initialValue={datasourceConfig?.username} />
        <PasswordFormInputItem datasource={datasource} />
      </FormSection>
    </DatasourceForm>
  );
};

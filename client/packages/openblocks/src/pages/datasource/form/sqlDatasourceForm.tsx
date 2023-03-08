import React from "react";
import { DatasourceForm, FormCheckboxItem, FormSection } from "openblocks-design";
import { SQLConfig } from "api/datasourceApi";
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
import { trans } from "i18n";

export const sqlDatasourceForm =
  (config: {
    placeholder: string;
    port: string;
    supportSSL?: boolean;
    supportDatabase?: boolean;
    supportPreparedStatement?: boolean;
  }) =>
  (props: DatasourceFormProps) => {
    const { form, datasource } = props;
    const { supportDatabase = true, supportSSL = true, supportPreparedStatement = true } = config;
    const datasourceConfig = datasource?.datasourceConfig as SQLConfig;

    return (
      <DatasourceForm form={form} preserve={false}>
        <FormSection size={props.size}>
          <DatasourceNameFormInputItem
            placeholder={config.placeholder}
            initialValue={datasource?.name}
          />
        </FormSection>

        <FormSection size={props.size}>
          <GeneralSettingFormSectionLabel />
          <HostFormInputItem initialValue={datasourceConfig?.host} />
          <PortFormInputItem initialValue={config.port} port={datasourceConfig?.port} />
          {supportDatabase && <DatabaseFormInputItem database={datasourceConfig?.database} />}
          <UserNameFormInputItem initialValue={datasourceConfig?.username} />
          <PasswordFormInputItem datasource={datasource} />
          {supportSSL && <SSLFormCheckboxItem usingSSl={datasourceConfig?.usingSsl} />}
          {supportPreparedStatement && (
            <FormCheckboxItem
              name={"enableTurnOffPreparedStatement"}
              label={trans("query.enableTurnOffPreparedStatement")}
              tooltip={trans("query.enableTurnOffPreparedStatementTooltip")}
              initialValue={datasourceConfig?.enableTurnOffPreparedStatement}
            />
          )}
        </FormSection>
      </DatasourceForm>
    );
  };

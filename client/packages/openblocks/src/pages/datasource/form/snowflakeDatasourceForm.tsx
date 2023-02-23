import React from "react";
import { DatasourceForm, FormInputItem, FormKeyValueItem, FormSection } from "openblocks-design";
import { SnowflakeConfig } from "api/datasourceApi";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import {
  DatabaseFormInputItem,
  DatasourceNameFormInputItem,
  GeneralSettingFormSectionLabel,
  HostFormInputItem,
  PasswordFormInputItem,
  UserNameFormInputItem,
} from "../form";
import { FormInstance } from "antd";
import { fromPairs, omit, pick, toPairs } from "lodash";
import { trans } from "i18n";

const OUTSIDE_EXT_FIELDS = ["schema", "warehouse", "role"];

export const SnowflakeDatasourceForm = (props: DatasourceFormProps) => {
  const { form, datasource } = props;
  const datasourceConfig = datasource?.datasourceConfig as SnowflakeConfig;

  return (
    <DatasourceForm form={form} preserve={false}>
      <FormSection size={props.size}>
        <DatasourceNameFormInputItem
          placeholder={"My Snowflake1"}
          initialValue={datasource?.name}
        />
      </FormSection>

      <FormSection size={props.size}>
        <GeneralSettingFormSectionLabel />
        <HostFormInputItem
          initialValue={datasourceConfig?.host}
          label={<span style={{ whiteSpace: "nowrap" }}>Account Identifier</span>}
          placeholder={"e.g. xy-12345"}
          help={
            <>
              <div style={{ wordBreak: "break-word" }}>
                &lt;account_identifier&gt;.snowflakecomputing.com
              </div>
              {trans("snowflake.accountIdentifierTooltip")}
              <a
                href="https://docs.snowflake.com/en/user-guide/admin-account-identifier"
                target="_blank"
              >
                Account Identifiers
              </a>
            </>
          }
        />
        <DatabaseFormInputItem
          database={datasourceConfig?.database}
          label={"Database"}
          placeholder={"database"}
        />
        <FormInputItem
          name={"schema"}
          label={"Schema"}
          placeholder={"schema"}
          initialValue={datasourceConfig?.extParams?.["schema"]}
        />
        <FormInputItem
          name={"warehouse"}
          label={"Warehouse"}
          placeholder={"warehouse"}
          initialValue={datasourceConfig?.extParams?.["warehouse"]}
        />
        <FormInputItem
          name={"role"}
          label={"User role"}
          placeholder={"PUBLIC"}
          initialValue={datasourceConfig?.extParams?.["role"]}
        />
        <UserNameFormInputItem initialValue={datasourceConfig?.username} />
        <PasswordFormInputItem datasource={datasource} />
        <FormKeyValueItem
          name={"extParams"}
          label={<span style={{ whiteSpace: "nowrap" }}>Extra parameters</span>}
          help={
            <a href="https://docs.snowflake.com/en/user-guide/jdbc-configure" target="_blank">
              {trans("snowflake.extParamsTooltip")}
            </a>
          }
          initialValue={toPairs(omit(datasourceConfig?.extParams, OUTSIDE_EXT_FIELDS)).map((p) => ({
            key: p[0],
            value: p[1],
          }))}
        />
      </FormSection>
    </DatasourceForm>
  );
};

export const getSnowflakeFormParams = (form: FormInstance) => {
  return {
    ...omit(form.getFieldsValue(), ["name", ...OUTSIDE_EXT_FIELDS]),
    extParams: {
      ...fromPairs(
        form
          .getFieldsValue()
          ["extParams"].map((p: { key: string; value: string }) => [p.key, p.value])
      ),
      ...pick(form.getFieldsValue(), OUTSIDE_EXT_FIELDS),
    },
  };
};

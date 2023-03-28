import { Rule } from "antd/lib/form";
import { HttpConfig } from "api/datasourceApi";
import {
  DatasourceForm,
  FormInputItem,
  FormKeyValueItem,
  FormSection,
  FormSectionLabel,
  FormSelectItem,
  ValueFromOption,
} from "openblocks-design";
import { trans } from "i18n";
import React, { useState } from "react";
import {
  AdvancedSettingFormSectionLabel,
  CertValidationFormItem,
  DatasourceNameFormInputItem,
  encryptedPlaceholder,
  ForwardCookiesFormItem,
  GeneralSettingFormSectionLabel,
} from "../form";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import { useHostCheck } from "./useHostCheck";

const AuthTypeOptions = [
  { label: "None", value: "NO_AUTH" },
  { label: "Basic", value: "BASIC_AUTH" },
  { label: "Digest", value: "DIGEST_AUTH" },
] as const;

type AuthType = ValueFromOption<typeof AuthTypeOptions>;

const UrlRules: Rule[] = [
  { required: true, message: trans("query.urlRequiredMessage") },
  {
    pattern: new RegExp("https?:\\/\\/"),
    message: trans("query.httpRequiredMessage"),
  },
  {
    type: "url",
    message: trans("query.urlErrorMessage"),
  },
];

export const GraphqlDatasourceForm = (props: DatasourceFormProps) => {
  const { form, datasource } = props;
  const datasourceConfig = datasource?.datasourceConfig as HttpConfig;

  const [authType, setAuthType] = useState(datasourceConfig?.authConfig?.type);

  const hostRule = useHostCheck();

  const UsernameFormItem = (
    <FormInputItem
      name={"username"}
      label="Username"
      initialValue={(datasourceConfig?.authConfig as any)?.username}
      required={true}
      rules={[{ required: true, message: trans("query.userNameRequiredMessage") }]}
      labelWidth={142}
    />
  );

  const PasswordFormItem = (
    <FormInputItem
      name={"password"}
      label="Password"
      initialValue={(datasourceConfig?.authConfig as any)?.password}
      required={true}
      rules={[{ required: !datasourceConfig, message: trans("query.passwordRequiredMessage") }]}
      labelWidth={142}
      // eslint-disable-next-line only-ascii/only-ascii
      placeholder={props.datasource ? encryptedPlaceholder : "••••••••••••"}
    />
  );

  const showAuthItem = (type: AuthType) => {
    switch (type) {
      case "BASIC_AUTH":
        return (
          <>
            {UsernameFormItem}
            {PasswordFormItem}
          </>
        );
      case "DIGEST_AUTH":
        return (
          <>
            {UsernameFormItem}
            {PasswordFormItem}
          </>
        );
    }
  };

  return (
    <DatasourceForm form={form} preserve={false}>
      <FormSection size={props.size}>
        <DatasourceNameFormInputItem
          placeholder={"My Graphql1"}
          initialValue={datasource?.name}
          labelWidth={142}
        />
      </FormSection>

      <FormSection size={props.size}>
        <GeneralSettingFormSectionLabel />
        <FormInputItem
          name={"url"}
          label="URL"
          required={true}
          placeholder={"https://example.com"}
          initialValue={datasourceConfig?.url}
          rules={[...UrlRules, hostRule]}
          labelWidth={142}
        />
        <FormKeyValueItem
          name={"headers"}
          label={"Headers"}
          initialValue={datasourceConfig?.headers}
          labelWidth={142}
        />
        <FormKeyValueItem
          name={"params"}
          label={"Parameters"}
          initialValue={datasourceConfig?.params}
          labelWidth={142}
        />
      </FormSection>

      <FormSection size={props.size}>
        <FormSectionLabel>{trans("query.authentication")}</FormSectionLabel>
        <FormSelectItem
          name={"authConfigType"}
          label={trans("query.authenticationType")}
          options={AuthTypeOptions}
          initialValue={datasourceConfig?.authConfig?.type ?? "NO_AUTH"}
          afterChange={(value) => setAuthType(value)}
          labelWidth={142}
        />
        {showAuthItem(authType as AuthType)}
      </FormSection>

      <FormSection size={props.size}>
        <AdvancedSettingFormSectionLabel />
        <CertValidationFormItem datasource={props.datasource} />
        <ForwardCookiesFormItem datasource={props.datasource} />
      </FormSection>
    </DatasourceForm>
  );
};

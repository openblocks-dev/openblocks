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
  { label: "OAuth 2.0(Inherit from login)", value: "OAUTH2_INHERIT_FROM_LOGIN" },
  // { label: "OAuth 2.0", value: "oAuth2" },
] as const;

const OAuthGrantTypeOptions = [
  { label: "Authorization Code", value: "authorization_code" },
  { label: "Client Credentials", value: "client_credentials" },
] as const;

export type AuthType = ValueFromOption<typeof AuthTypeOptions>;
export type HttpOAuthGrantType = ValueFromOption<typeof OAuthGrantTypeOptions>;

const UrlRules: Rule[] = [
  {
    pattern: new RegExp("https?:\\/\\/"),
    message: trans("query.httpRequiredMessage"),
  },
];

export const HttpDatasourceForm = (props: DatasourceFormProps) => {
  const { form, datasource } = props;
  const datasourceConfig = datasource?.datasourceConfig as HttpConfig;
  // const oauthConfig = datasourceConfig?.authConfig as OAuthConfig;

  const [authType, setAuthType] = useState(datasourceConfig?.authConfig?.type);
  // const [grantType, setGrantType] = useState(oauthConfig?.grantType ?? "authorization_code");

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
          placeholder={"My RestAPI1"}
          initialValue={datasource?.name}
          labelWidth={142}
        />
      </FormSection>

      <FormSection size={props.size}>
        <GeneralSettingFormSectionLabel />
        <FormInputItem
          name={"url"}
          label="URL"
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
        <FormKeyValueItem
          name={"bodyFormData"}
          label={"Extra body"}
          help={trans("httpQuery.extraBodyTooltip")}
          initialValue={datasourceConfig?.bodyFormData}
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
        {showAuthItem(authType)}
      </FormSection>

      <FormSection size={props.size}>
        <AdvancedSettingFormSectionLabel />
        <CertValidationFormItem datasource={props.datasource} />
        <ForwardCookiesFormItem datasource={props.datasource} />
      </FormSection>

      {/*<KeyValueFormItem label={"Extra body values"} />*/}
    </DatasourceForm>
  );
};

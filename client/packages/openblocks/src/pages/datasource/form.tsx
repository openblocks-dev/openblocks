import {
  FormCheckboxItem,
  FormInputItem,
  FormInputPasswordItem,
  FormSectionLabel,
  FormSelectItem,
  FormTextAreaItem,
} from "openblocks-design";
import { trans } from "i18n";
import { toNumber } from "lodash";
import { useHostCheck } from "./form/useHostCheck";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";
import React, { ReactNode, useState } from "react";
import { HttpConfig, SSLCertVerificationEnum } from "../../api/datasourceApi";

export const GeneralSettingFormSectionLabel = () => {
  return <FormSectionLabel>{trans("query.generalSetting")}</FormSectionLabel>;
};

export const AdvancedSettingFormSectionLabel = () => {
  return <FormSectionLabel>{trans("query.advancedSetting")}</FormSectionLabel>;
};

interface PortProps {
  initialValue: string;
  port: string | undefined;
}

export const PortFormInputItem = (props: PortProps) => {
  return (
    <FormInputItem
      name={"port"}
      label={trans("query.port")}
      required={true}
      initialValue={props?.port ?? props.initialValue}
      rules={[
        { required: true, message: trans("query.portRequiredMessage") },
        {
          transform: (value) => toNumber(value),
          type: "number",
          min: 1,
          message: trans("query.portErrorMessage"),
        },
      ]}
    />
  );
};

interface DatasourceNameProps {
  placeholder: string;
  initialValue: string | undefined;
  labelWidth?: number;
}

export const DatasourceNameFormInputItem = (props: DatasourceNameProps) => {
  return (
    <FormInputItem
      name={"name"}
      label={trans("query.datasourceName")}
      placeholder={props.placeholder}
      required={true}
      initialValue={props?.initialValue}
      rules={[{ required: true, message: trans("query.datasourceNameRuleMessage") }]}
      labelWidth={props.labelWidth || 122}
    />
  );
};

interface HostProps {
  initialValue: string | undefined;
  label?: ReactNode;
  placeholder?: string;
  help?: ReactNode;
}

export const HostFormInputItem = (props: HostProps) => {
  const hostRule = useHostCheck();
  return (
    <FormInputItem
      help={props.help}
      name={"host"}
      label={props.label ?? trans("query.host")}
      placeholder={props.placeholder ?? "myhost.io"}
      required={true}
      initialValue={props.initialValue}
      rules={[{ required: true, message: trans("query.hostRequiredMessage") }, hostRule]}
    />
  );
};

interface UserNameProps {
  initialValue: string | undefined;
}

export const UserNameFormInputItem = (props: UserNameProps) => {
  return (
    <FormInputItem
      name={"username"}
      label={trans("query.userName")}
      placeholder="user"
      initialValue={props.initialValue}
    />
  );
};

interface PasswordProps {
  datasource: Datasource | undefined;
}

export const encryptedPlaceholder = trans("query.encryptedServer");

export const PasswordFormInputItem = (props: PasswordProps) => {
  return (
    <FormInputPasswordItem
      name={"password"}
      label={trans("query.password")}
      placeholder={props.datasource ? encryptedPlaceholder : ""}
      {...props}
    />
  );
};

interface DatabaseProps {
  database: string | undefined;
  label?: string;
  placeholder?: string;
}

export const DatabaseFormInputItem = (props: DatabaseProps) => {
  return (
    <FormInputItem
      name={"database"}
      label={props.label ?? trans("query.databaseName")}
      placeholder={props.placeholder ?? "test_db"}
      required={true}
      initialValue={props.database}
      rules={[{ required: true, message: trans("query.databaseNameRequiredMessage") }]}
    />
  );
};

interface SSLProps {
  usingSSl: boolean | undefined;
}

export const SSLFormCheckboxItem = (props: SSLProps) => {
  return (
    <FormCheckboxItem
      name={"usingSsl"}
      label={trans("query.useSSL")}
      initialValue={props.usingSSl}
    />
  );
};

export const CertValidationFormItem = (props: { datasource: Datasource }) => {
  const datasourceConfig = props.datasource?.datasourceConfig as HttpConfig;

  const [authType, setAuthType] = useState(datasourceConfig?.sslConfig?.sslCertVerificationType);

  return (
    <>
      <FormSelectItem
        name={"sslCertVerificationType"}
        label={trans("query.sslCertVerificationType")}
        options={
          [
            {
              label: trans("query.sslCertVerificationTypeDefault"),
              value: SSLCertVerificationEnum.VERIFY_CA_CERT,
            },
            {
              label: trans("query.sslCertVerificationTypeSelf"),
              value: SSLCertVerificationEnum.VERIFY_SELF_SIGNED_CERT,
            },
            {
              label: trans("query.sslCertVerificationTypeDisabled"),
              value: SSLCertVerificationEnum.DISABLED,
            },
          ] as const
        }
        initialValue={
          datasourceConfig?.sslConfig?.sslCertVerificationType ??
          SSLCertVerificationEnum.VERIFY_CA_CERT
        }
        afterChange={(value) => setAuthType(value)}
        labelWidth={142}
      />
      {authType === SSLCertVerificationEnum.VERIFY_SELF_SIGNED_CERT && (
        <FormTextAreaItem
          name={"selfSignedCert"}
          label={trans("query.selfSignedCert")}
          required={true}
          placeholder={
            datasourceConfig?.sslConfig?.sslCertVerificationType ===
            SSLCertVerificationEnum.VERIFY_SELF_SIGNED_CERT
              ? trans("query.encryptedServer")
              : "-----BEGIN CERTIFICATE-----\n" + "YOUR CERTIFICATE\n" + "-----END CERTIFICATE-----"
          }
          rules={[
            {
              required:
                datasourceConfig?.sslConfig?.sslCertVerificationType !==
                SSLCertVerificationEnum.VERIFY_SELF_SIGNED_CERT,
              message: trans("query.selfSignedCertRequireMsg"),
            },
          ]}
          labelWidth={142}
          autoSize={{ minRows: 2, maxRows: 6 }}
        />
      )}
    </>
  );
};

export const ForwardCookiesFormItem = (props: { datasource: Datasource }) => {
  const datasourceConfig = props.datasource?.datasourceConfig as HttpConfig;

  return (
    <>
      <FormSelectItem
        open={false}
        mode={"tags"}
        name={"forwardCookies"}
        label={trans("httpQuery.forwardCookies")}
        options={[]}
        initialValue={datasourceConfig?.forwardCookies}
        labelWidth={142}
      />
      <FormCheckboxItem
        name={"forwardAllCookies"}
        label={trans("httpQuery.forwardAllCookies")}
        initialValue={datasourceConfig?.forwardAllCookies}
        labelWidth={142}
      />
    </>
  );
};

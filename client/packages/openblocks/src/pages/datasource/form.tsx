import {
  FormCheckboxItem,
  FormInputItem,
  FormInputPasswordItem,
  FormSectionLabel,
} from "openblocks-design";
import { trans } from "i18n";
import { toNumber } from "lodash";
import { useHostCheck } from "./form/useHostCheck";
import { Datasource } from "@openblocks-ee/constants/datasourceConstants";

export const GeneralSettingFormSectionLabel = () => {
  return <FormSectionLabel>{trans("query.generalSetting")}</FormSectionLabel>;
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
}
export const HostFormInputItem = (props: HostProps) => {
  const hostRule = useHostCheck();
  return (
    <FormInputItem
      name={"host"}
      label={trans("query.host")}
      placeholder={"myhost.io"}
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
      placeholder={props.datasource ? encryptedPlaceholder : "••••••••••••"}
    />
  );
};

interface DatabaseProps {
  database: string | undefined;
}

export const DatabaseFormInputItem = (props: DatabaseProps) => {
  return (
    <FormInputItem
      name={"database"}
      label={trans("query.databaseName")}
      placeholder={"test_db"}
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

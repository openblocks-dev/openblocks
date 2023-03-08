import { trans } from "i18n";

export enum AuthType {
  Form = "FORM",
  Google = "GOOGLE",
  Github = "GITHUB",
}

export const IdSource = [AuthType.Google, AuthType.Github, AuthType.Form];

export const validatorOptions = [
  {
    label: "CAS_30_SERVICE_TICKET_VALIDATOR",
    value: "CAS_30_SERVICE_TICKET_VALIDATOR",
  },
  {
    label: "CAS_30_JSON_SERVICE_TICKET_VALIDATOR",
    value: "CAS_30_JSON_SERVICE_TICKET_VALIDATOR",
  },
  {
    label: "CAS_20_SERVICE_TICKET_VALIDATOR",
    value: "CAS_20_SERVICE_TICKET_VALIDATOR",
  },
  {
    label: "CAS_10_TICKET_VALIDATOR",
    value: "CAS_10_TICKET_VALIDATOR",
  },
];

export const clientIdandSecretConfig = {
  clientId: "Client ID",
  clientSecret: "Client secret",
};

export const authConfig = {
  [AuthType.Form]: {
    sourceName: trans("idSource.form"),
    form: {},
  },
  [AuthType.Github]: {
    sourceName: "GitHub",
    form: clientIdandSecretConfig,
  },
  [AuthType.Google]: {
    sourceName: "Google",
    form: clientIdandSecretConfig,
  },
} as { [key: string]: { sourceName: string; form: { [k: string]: string } } };

export const FreeTypes = [AuthType.Google, AuthType.Github, AuthType.Form];

export const authTypeDisabled = (type: AuthType, enableEnterpriseLogin?: boolean) => {
  return !FreeTypes.includes(type);
};

export const ManualSyncTypes: Array<AuthType> = [];

import { ThirdPartyConfigType } from "constants/authConstants";
import { QR_CODE_OAUTH_URL } from "constants/routesURL";
import { UserConnectionSource } from "@openblocks-ee/constants/userConstants";
import { GeneralLoginIcon } from "assets/icons";
import {
  isRouteLink,
  ServerAuthType,
  ServerAuthTypeInfo,
} from "@openblocks-ee/constants/authConstants";

interface FeatureFlag {
  enableCustomBranding: boolean;
  enableEnterpriseLogin: boolean;
  enableAuditLog: boolean;
}

export interface BrandingConfig {
  logo?: string;
  favicon?: string;
  brandName?: string;
  headerColor?: string;
}

export type ConfigBaseInfo = {
  selfDomain: boolean;
  cloudHosting: boolean;
  workspaceMode: "SAAS" | "ENTERPRISE";
  warning?: string;
  featureFlag: FeatureFlag;
  branding?: BrandingConfig;
};

type OAuthConfig = {
  authorizeUrl: string;
  authType: ServerAuthType;
  source: string;
  sourceName: string;
  agentId?: string;
  clientId?: string;
  id?: string;
};

export type FormConfig = {
  enableRegister?: boolean;
  enable?: boolean;
  authType: ServerAuthType;
  source: string;
  sourceName: string;
  id?: string;
};

export type AuthConfigType = OAuthConfig | FormConfig;

export type ConfigResponseData = {
  authConfigs?: AuthConfigType[];
} & ConfigBaseInfo;

function isOAuthConfig(config: AuthConfigType): config is OAuthConfig {
  return !!ServerAuthTypeInfo[config.authType]?.isOAuth2;
}

export type SystemConfig = {
  form: {
    enableRegister: boolean;
    enableLogin: boolean;
    id?: string;
    type: "EMAIL" | "PHONE";
  };
  authConfigs: ThirdPartyConfigType[];
} & ConfigBaseInfo;

export const transToSystemConfig = (responseData: ConfigResponseData): SystemConfig => {
  const thirdPartyAuthConfigs: ThirdPartyConfigType[] = [];
  responseData.authConfigs?.forEach((authConfig) => {
    const logo = ServerAuthTypeInfo[authConfig.authType]?.logo || GeneralLoginIcon;
    if (isOAuthConfig(authConfig)) {
      const routeLinkConf: Partial<ThirdPartyConfigType> = isRouteLink(authConfig.authType)
        ? {
            url: QR_CODE_OAUTH_URL,
            routeLink: true,
          }
        : {};
      thirdPartyAuthConfigs.push({
        logo: logo,
        name: authConfig.sourceName,
        url: authConfig.authorizeUrl,
        sourceType: authConfig.source,
        authType: "OAUTH2",
        clientId: authConfig.clientId,
        agentId: authConfig.agentId,
        id: authConfig.id,
        ...routeLinkConf,
      });
    }
  });
  const emailConfig = responseData.authConfigs?.find(
    (c) => c.source === UserConnectionSource.email
  ) as FormConfig | undefined;

  return {
    ...responseData,
    form: {
      enableRegister: !!emailConfig?.enableRegister,
      enableLogin: !!emailConfig?.enable,
      id: emailConfig?.id,
      type: "EMAIL",
    },
    authConfigs: thirdPartyAuthConfigs,
  };
};

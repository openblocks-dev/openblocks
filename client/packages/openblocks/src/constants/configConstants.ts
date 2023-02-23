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

export type ConfigResponseData = {
  authConfigs: {
    enableRegister?: boolean;
    enableLogin?: boolean;
    source: string;
    sourceName: string;
    id?: string;
  }[];
} & ConfigBaseInfo;

export type SystemConfig = {
  email: {
    enableRegister: boolean;
    enableLogin: boolean;
    id?: string;
  };
} & ConfigBaseInfo;

export const transToSystemConfig = (responseData: ConfigResponseData): SystemConfig => {
  const emailConfig = responseData.authConfigs?.find((c) => c.source === "EMAIL");
  return {
    ...responseData,
    email: {
      enableRegister: !!emailConfig?.enableRegister,
      enableLogin: !!emailConfig?.enableLogin,
      id: emailConfig?.id,
    },
  };
};

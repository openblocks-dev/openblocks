export type ConfigBaseInfo = {
  cloudHosting: boolean;
  needUpdate: boolean;
  workspaceMode: "SAAS" | "ENTERPRISE";
};

export type ConfigResponseData = {
  authConfigs: {
    enableRegister?: boolean;
    enableLogin?: boolean;
    source: string;
    sourceName: string;
  }[];
} & ConfigBaseInfo;

export type SystemConfig = {
  email: {
    enableRegister: boolean;
    enableLogin: boolean;
  };
} & ConfigBaseInfo;

export const transToSystemConfig = (responseData: ConfigResponseData): SystemConfig => {
  const emailConfig = responseData.authConfigs?.find((c) => c.source === "EMAIL");
  return {
    ...responseData,
    email: {
      enableRegister: !!emailConfig?.enableRegister,
      enableLogin: !!emailConfig?.enableLogin,
    },
  };
};

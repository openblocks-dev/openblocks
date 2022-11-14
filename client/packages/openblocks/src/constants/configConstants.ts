export type ConfigResponseData = {
  cloudHosting: boolean;
  needUpdate: boolean;
  authConfigs: {
    enableRegister?: boolean;
    enableLogin?: boolean;
    source: string;
    sourceName: string;
  }[];
};

export type SystemConfig = {
  cloudHosting: boolean;
  needUpdate: boolean;
  email: {
    enableRegister: boolean;
    enableLogin: boolean;
  };
};

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

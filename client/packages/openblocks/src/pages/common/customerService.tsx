import { User } from "constants/userConstants";
import { isSaasMode } from "util/envUtils";
import { SystemConfig } from "constants/configConstants";

export const customerService: ((onPanelClose?: () => void) => React.ReactNode) | undefined =
  undefined;

export function showCustomerServicePanel() {}

export const showSwitchOrg = (user: User, config?: SystemConfig) => {
  return isSaasMode(config);
};

export const showHelpDropdown = (isEdit: boolean) => {
  return isEdit;
};

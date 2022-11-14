import { User } from "constants/userConstants";

export const customerService: ((onPanelClose?: () => void) => React.ReactNode) | undefined =
  undefined;

export function showCustomerServicePanel() {}

export const showSwitchOrg = (user: User) => {
  return true;
};

export const showHelpDropdown = (isEdit: boolean) => {
  return isEdit;
};

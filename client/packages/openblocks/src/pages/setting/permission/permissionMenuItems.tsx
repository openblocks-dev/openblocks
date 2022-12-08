import { OrgGroup } from "constants/orgConstants";

export function usePermissionMenuItems(orgId: string) {
  return {
    nameSuffixFunc: (group?: OrgGroup) => <></>,
    menuItemsFunc: undefined as Function | undefined,
    menuExtraView: undefined,
  };
}

import {
  ORGANIZATION_SETTING,
  PERMISSION_SETTING,
  ADVANCED_SETTING,
  THEME_SETTING,
  BASE_URL,
  AUDIT_SETTING,
} from "constants/routesURL";
import OrganizationSetting from "./organization";
import PermissionSetting from "./permission";
import { ThemeHome } from "./theme";
import { CommonLayout } from "pages/common/commonLayout";
import { AdvancedSetting } from "./advanced/AdvancedSetting";
import { useSelector } from "react-redux";
import { getCurrentUser } from "redux/selectors/usersSelectors";
import { currentOrgAdmin, currentOrgAdminOrDev } from "util/permissionUtils";
import history from "util/history";
import { trans } from "i18n";
import AuditSetting from "@openblocks-ee/pages/setting/audit";
import { isEE } from "util/envUtils";

export function Setting() {
  const user = useSelector(getCurrentUser);
  if (!currentOrgAdminOrDev(user)) {
    history.push(BASE_URL);
  }

  return (
    <CommonLayout
      sidebarTitle={trans("settings.title")}
      sidebarItems={[
        {
          name: trans("settings.member"),
          routePath: PERMISSION_SETTING,
          routeComp: PermissionSetting,
        },
        {
          name: trans("settings.organization"),
          routePath: ORGANIZATION_SETTING,
          routeComp: OrganizationSetting,
        },
        {
          name: trans("settings.audit"),
          routePath: AUDIT_SETTING,
          routeComp: AuditSetting,
          visible: ({ user }) => {
            return isEE() && currentOrgAdmin(user);
          },
        },
        {
          name: trans("settings.theme"),
          routePath: THEME_SETTING,
          routePathExact: false,
          routeComp: ThemeHome,
        },
        {
          name: trans("settings.advanced"),
          routePath: ADVANCED_SETTING,
          routeComp: AdvancedSetting,
          visible: ({ user }) => {
            return currentOrgAdmin(user);
          },
        },
      ]}
    />
  );
}

export default Setting;

import { Organization } from "./organization";
import PermissionSetting from "./permission";
import { ThemeHome } from "./theme";
import { AdvancedSetting } from "./advanced/AdvancedSetting";
import { currentOrgAdmin } from "util/permissionUtils";
import { trans } from "i18n";
import AuditSetting from "@openblocks-ee/pages/setting/audit";
import { isEE } from "util/envUtils";
import { TwoColumnSettingPageContent } from "./styled";
import SubSideBar from "components/layout/SubSideBar";
import { Menu } from "openblocks-design";
import { useSelector } from "react-redux";
import { getCurrentUser } from "redux/selectors/usersSelectors";
import history from "util/history";
import { useParams } from "react-router-dom";

enum SettingPageEnum {
  Member = "permission",
  Organization = "organization",
  Audit = "audit",
  Theme = "theme",
  Advanced = "advanced",
}

export function SettingHome() {
  const user = useSelector(getCurrentUser);
  const selectKey = useParams<{ setting: string }>().setting || SettingPageEnum.Member

  const items = [
    {
      key: SettingPageEnum.Member,
      label: trans("settings.member"),
    },
    {
      key: SettingPageEnum.Organization,
      label: trans("settings.organization"),
    },
    ...(isEE() && currentOrgAdmin(user)
      ? [
          {
            key: SettingPageEnum.Audit,
            label: trans("settings.audit"),
          },
        ]
      : []),
    {
      key: SettingPageEnum.Theme,
      label: trans("settings.theme"),
    },
    {
      key: SettingPageEnum.Advanced,
      label: trans("settings.advanced"),
    },
  ];

  return (
    <TwoColumnSettingPageContent>
      <SubSideBar title={trans("settings.title")}>
        <Menu
          mode="inline"
          selectedKeys={[selectKey]}
          onClick={(value) => {
            history.push("/setting/" + value.key);
          }}
          items={items}
        />
      </SubSideBar>
      {selectKey === SettingPageEnum.Member && <PermissionSetting />}
      {selectKey === SettingPageEnum.Organization && <Organization />}
      {selectKey === SettingPageEnum.Audit && <AuditSetting />}
      {selectKey === SettingPageEnum.Theme && <ThemeHome />}
      {selectKey === SettingPageEnum.Advanced && <AdvancedSetting />}
    </TwoColumnSettingPageContent>
  );
}

export default SettingHome;

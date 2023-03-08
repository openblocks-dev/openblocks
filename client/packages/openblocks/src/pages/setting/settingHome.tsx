import { Organization } from "./organization";
import PermissionSetting from "./permission";
import { ThemeHome } from "./theme";
import { AdvancedSetting } from "./advanced/AdvancedSetting";
import { currentOrgAdmin } from "util/permissionUtils";
import { trans } from "i18n";
import AuditSetting from "@openblocks-ee/pages/setting/audit";
import { developEnv, isEE, isEnterpriseMode, isSelfDomain, showAuditLog } from "util/envUtils";
import { TwoColumnSettingPageContent } from "./styled";
import SubSideBar from "components/layout/SubSideBar";
import { Menu } from "openblocks-design";
import { useSelector } from "react-redux";
import { getUser } from "redux/selectors/usersSelectors";
import history from "util/history";
import { useParams } from "react-router-dom";
import { BrandingSetting } from "@openblocks-ee/pages/setting/branding/BrandingSetting";
import { IdSourceHome } from "@openblocks-ee/pages/setting/idSource";
import { selectSystemConfig } from "redux/selectors/configSelectors";
import { enableCustomBrand } from "util/featureFlagUtils";

enum SettingPageEnum {
  Member = "permission",
  Organization = "organization",
  Audit = "audit",
  Theme = "theme",
  Branding = "branding",
  Advanced = "advanced",
  IdSource = "idsource",
}

export function SettingHome() {
  const user = useSelector(getUser);
  const config = useSelector(selectSystemConfig);
  const selectKey = useParams<{ setting: string }>().setting || SettingPageEnum.Member;

  const items = [
    {
      key: SettingPageEnum.Member,
      label: trans("settings.member"),
    },
    {
      key: SettingPageEnum.Organization,
      label: trans("settings.organization"),
    },
    ...(isEE() && currentOrgAdmin(user) && (isSelfDomain(config) || isEnterpriseMode(config))
      ? [
          {
            key: SettingPageEnum.IdSource,
            label: trans("settings.idSource"),
          },
        ]
      : []),
    ...(showAuditLog(config) && currentOrgAdmin(user)
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
    ...(developEnv() ||
    (isEE() &&
      currentOrgAdmin(user) &&
      enableCustomBrand(config) &&
      (isSelfDomain(config) || isEnterpriseMode(config)))
      ? [
          {
            key: SettingPageEnum.Branding,
            label: trans("settings.branding"),
          },
        ]
      : []),
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
      {selectKey === SettingPageEnum.Branding && <BrandingSetting />}
      {selectKey === SettingPageEnum.Advanced && <AdvancedSetting />}
      {selectKey === SettingPageEnum.IdSource && <IdSourceHome />}
    </TwoColumnSettingPageContent>
  );
}

export default SettingHome;

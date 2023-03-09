import { CommonSettingResponseData } from "api/commonSettingApi";
import { trans } from "i18n";

export const ADMIN_ROLE = "admin";
export const MEMBER_ROLE = "member";
export const NEW_ORG_PREFIX = trans("orgSettings.newOrg");

export const TacoRoles = [ADMIN_ROLE, MEMBER_ROLE] as const;
export type RoleIdType = typeof TacoRoles[number];
type RoleInfoType = Record<RoleIdType, { name: string; desc: string }>;

export const GroupRoleInfo: RoleInfoType = {
  admin: { name: trans("memberSettings.admin"), desc: trans("memberSettings.adminGroupRoleInfo") },
  member: {
    name: trans("memberSettings.member"),
    desc: trans("memberSettings.memberGroupRoleInfo"),
  },
};

export const OrgRoleInfo: RoleInfoType = {
  admin: { name: trans("memberSettings.admin"), desc: trans("memberSettings.adminOrgRoleInfo") },
  member: { name: trans("memberSettings.member"), desc: trans("memberSettings.memberOrgRoleInfo") },
};

export type OrgGroup = {
  groupId: string;
  groupName: string;
  // the backend create user groups by default, not displayed in some conditions
  allUsersGroup?: boolean;
  devGroup?: boolean;
  createTime?: string;
  visitorRole?: string;
  dynamicRule?: string;
  syncDelete?: boolean;
  syncGroup?: boolean;
};

// user info in group
export type GroupUser = {
  groupId: string;
  orgId: string;
  userId: string;
  userName: string;
  role: string;
  avatarUrl?: string;
  joinTime: number;
};

export type Org = {
  id: string;
  name: string;
  logoUrl?: string;
  createdBy: string;
  commonSettings: CommonSettingResponseData;
  createTime?: string;
};

export type OrgAndRole = {
  org: Org;
  role: string;
};

// user info in org
export type OrgUser = {
  userId: string;
  name: string;
  role: string;
  avatarUrl?: string;
  joinTime: number;
};

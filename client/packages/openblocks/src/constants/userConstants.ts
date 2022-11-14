import { Org, RoleIdType } from "./orgConstants";

export const ANONYMOUS_USERNAME = "anonymous";

// official support auth source, user custom auth source is dynamic string
export const UserConnectionSource = {
  phone: "PHONE",
  email: "EMAIL",
  wechat: "WECHAT",
  feishu: "FEISHU",
  wecom: "WECOM",
  dingTalk: "DING_TALK",
  google: "GOOGLE",
  github: "GITHUB",
};

export type UserConnection = {
  source: string;
  name: string;
};

export type BaseUserInfo = {
  id: string;
  username: string;
  currentOrgId: string;
  connections?: UserConnection[];
  isAnonymous: boolean;
  avatarUrl?: string;
  hasPassword: boolean;
  hasSetNickname?: boolean;
  orgDev: boolean; // is the org's developer?
  createdTimeMs: number;
  userStatus: {
    newUserGuidance: boolean;
    olderUserNonDevPopup: boolean;
  };
};

export type User = {
  orgs: Org[];
  orgRoleMap: Map<string, RoleIdType>; // key: orgId, value: roleId
} & BaseUserInfo;

export const DefaultCurrentUserDetails: User = {
  orgs: [],
  orgRoleMap: new Map(),
  username: ANONYMOUS_USERNAME,
  currentOrgId: "",
  id: "",
  hasPassword: false,
  isAnonymous: true,
  orgDev: false,
  createdTimeMs: 0,
  userStatus: {
    newUserGuidance: true,
    olderUserNonDevPopup: true,
  },
};

export type UserStatusType = keyof BaseUserInfo["userStatus"];

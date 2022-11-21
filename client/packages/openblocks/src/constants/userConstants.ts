import { Org, RoleIdType } from "./orgConstants";
import { JSONObject, JSONValue } from "util/jsonTypes";

export const ANONYMOUS_USERNAME = "anonymous";

// official support auth source, user custom auth source is dynamic string
export const UserConnectionSource = {
  email: "EMAIL",
  google: "GOOGLE",
  github: "GITHUB",
};

export type UserConnection = {
  source: string;
  name: string;
  rawUserInfo?: JSONObject;
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
  ip?: string;
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

export const getUserConnectionInfo = (user: User) => {
  const connectionInfo: JSONObject = {};
  user.connections?.forEach((c) => {
    // filter email
    if (c.source !== UserConnectionSource.email) {
      connectionInfo[c.source] = c.rawUserInfo ? c.rawUserInfo : {};
    }
  });
  return connectionInfo;
};

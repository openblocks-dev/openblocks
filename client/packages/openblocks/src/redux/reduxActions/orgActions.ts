import { GroupUser, NEW_ORG_PREFIX, Org, OrgGroup, OrgUser } from "constants/orgConstants";
import { ReduxActionTypes } from "constants/reduxActionConstants";
import { getNextEntityName } from "util/stringUtils";

export type OrgUsersPayload = {
  members: OrgUser[];
  visitorRole: string;
};

export type GroupUsersPayload = {
  members: GroupUser[];
  visitorRole: string;
};

export type UpdateGroupActionPayload = {
  groupId: string;
  updates: Record<string, string>;
  orgId: string;
};
export const updateGroupAction = (
  groupId: string,
  updates: Record<string, string>,
  orgId: string
) => ({
  type: ReduxActionTypes.UPDATE_GROUP_INFO,
  payload: {
    groupId,
    updates,
    orgId,
  },
});

export const fetchGroupsAction = (orgId: string) => ({
  type: ReduxActionTypes.FETCH_ORG_GROUPS,
  payload: {
    orgId,
  },
});

export type UpdateUserOrgRolePayload = {
  role: string;
  userId: string;
  orgId: string;
};
export const updateUserOrgRoleAction = (payload: UpdateUserOrgRolePayload) => ({
  type: ReduxActionTypes.UPDATE_USER_ORG_ROLE,
  payload: payload,
});

export type UpdateUserGroupRolePayload = {
  role: string;
  userId: string;
  groupId: string;
};
export const updateUserGroupRoleAction = (payload: UpdateUserGroupRolePayload) => ({
  type: ReduxActionTypes.UPDATE_USER_GROUP_ROLE,
  payload: payload,
});

export type FetchUsersActionPayload = {
  groupId: string;
};
export const fetchGroupUsersAction = (payload: FetchUsersActionPayload) => ({
  type: ReduxActionTypes.FETCH_GROUP_USERS,
  payload: payload,
});

export const fetchOrgUsersAction = (orgId: string) => ({
  type: ReduxActionTypes.FETCH_ORG_ALL_USERS,
  payload: {
    orgId,
  },
});

export type RemoveGroupUserPayload = {
  groupId: string;
  userId: string;
};
export const deleteGroupUserAction = (payload: RemoveGroupUserPayload) => ({
  type: ReduxActionTypes.DELETE_GROUP_USER,
  payload: payload,
});

export type AddGroupUserPayload = {
  role: string;
  groupId: string;
  userId: string;
};
export const addGroupUserAction = (payload: AddGroupUserPayload) => ({
  type: ReduxActionTypes.ADD_GROUP_USER,
  payload: payload,
});

export type DeleteOrgUserPayload = {
  orgId: string;
  userId: string;
};
export const deleteOrgUserAction = (payload: DeleteOrgUserPayload) => ({
  type: ReduxActionTypes.DELETE_ORG_USER,
  payload: payload,
});

export const quitGroupAction = (payload: RemoveGroupUserPayload) => ({
  type: ReduxActionTypes.QUIT_GROUP,
  payload: payload,
});

export const quitOrgAction = (orgId: string) => ({
  type: ReduxActionTypes.QUIT_ORG,
  payload: { orgId },
});

export const switchOrg = (orgId: string) => ({
  type: ReduxActionTypes.SWITCH_ORG,
  payload: { orgId },
});

export const createOrgAction = (orgs: Org[]) => {
  let orgName = getNextEntityName(
    NEW_ORG_PREFIX,
    orgs.map((org) => org.name)
  );
  return {
    type: ReduxActionTypes.CREATE_ORG,
    payload: { orgName },
  };
};

export const deleteOrgAction = (orgId: string) => {
  return {
    type: ReduxActionTypes.DELETE_ORG,
    payload: { orgId },
  };
};

export type UpdateOrgPayload = {
  id: string;
  orgName?: string;
  logoUrl?: string;
};
export const updateOrgAction = (payload: UpdateOrgPayload) => {
  return {
    type: ReduxActionTypes.UPDATE_ORG,
    payload: payload,
  };
};

export const updateOrgSuccess = (payload: UpdateOrgPayload) => {
  return {
    type: ReduxActionTypes.UPDATE_ORG_SUCCESS,
    payload: payload,
  };
};

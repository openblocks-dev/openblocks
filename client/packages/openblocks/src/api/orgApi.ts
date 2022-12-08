import Api from "api/api";
import { AxiosPromise } from "axios";
import { GroupUser, OrgGroup, OrgUser } from "constants/orgConstants";
import {
  AddGroupUserPayload,
  RemoveGroupUserPayload,
  DeleteOrgUserPayload,
  UpdateOrgPayload,
  UpdateUserGroupRolePayload,
  UpdateUserOrgRolePayload,
} from "redux/reduxActions/orgActions";
import { ApiResponse, GenericApiResponse } from "./apiResponses";

export interface GroupUsersResponse extends ApiResponse {
  data: {
    members: GroupUser[];
    visitorRole: string;
  };
}

export interface OrgUsersResponse extends ApiResponse {
  data: {
    members: OrgUser[];
    visitorRole: string;
  };
}

export interface CreateOrgResponse extends ApiResponse {
  data: { orgId: string };
}

export class OrgApi extends Api {
  static createGroupURL = "/v1/groups";
  static updateGroupURL = (groupId: string) => `/v1/groups/${groupId}/update`;
  static fetchGroupURL = "/v1/groups/list";
  static fetchGroupUsersURL = (groupId: string) => `/v1/groups/${groupId}/members`;
  static deleteGroupURL = (groupId: string) => `/v1/groups/${groupId}`;
  static fetchOrgUsersURL = (orgId: string) => `/v1/organizations/${orgId}/members`;
  static deleteOrgUsersURL = (orgId: string) => `/v1/organizations/${orgId}/remove`;
  static deleteGroupUserURL = (groupId: string) => `/v1/groups/${groupId}/remove`;
  static addGroupUserURL = (groupId: string) => `/v1/groups/${groupId}/addMember`;
  static updateUserOrgRoleURL = (orgId: string) => `/v1/organizations/${orgId}/role`;
  static updateUserGroupRoleURL = (groupId: string) => `/v1/groups/${groupId}/role`;
  static quitOrgURL = (orgId: string) => `/v1/organizations/${orgId}/leave`;
  static quitGroupURL = (groupId: string) => `/v1/groups/${groupId}/leave`;
  static switchOrgURL = (orgId: string) => `/v1/organizations/switchOrganization/${orgId}`;
  static createOrgURL = "/v1/organizations";
  static deleteOrgURL = (orgId: string) => `/v1/organizations/${orgId}`;
  static updateOrgURL = (orgId: string) => `/v1/organizations/${orgId}/update`;

  static createGroup(request: { name: string }): AxiosPromise<GenericApiResponse<OrgGroup>> {
    return Api.post(OrgApi.createGroupURL, request);
  }

  static updateGroup(groupId: string, updates: Record<string, string>): AxiosPromise<ApiResponse> {
    return Api.put(OrgApi.updateGroupURL(groupId), updates);
  }

  static fetchGroup(): AxiosPromise<GenericApiResponse<OrgGroup[]>> {
    return Api.get(OrgApi.fetchGroupURL);
  }

  static deleteGroup(groupId: string): AxiosPromise<ApiResponse> {
    return Api.delete(OrgApi.deleteGroupURL(groupId));
  }

  static updateUserOrgRole(request: UpdateUserOrgRolePayload): AxiosPromise<ApiResponse> {
    return Api.put(OrgApi.updateUserOrgRoleURL(request.orgId), {
      userId: request.userId,
      role: request.role,
    });
  }

  static updateUserGroupRole(request: UpdateUserGroupRolePayload): AxiosPromise<ApiResponse> {
    return Api.put(OrgApi.updateUserGroupRoleURL(request.groupId), {
      userId: request.userId,
      role: request.role,
    });
  }

  static fetchOrgUsers(orgId: string): AxiosPromise<OrgUsersResponse> {
    return Api.get(OrgApi.fetchOrgUsersURL(orgId));
  }

  static fetchGroupUsers(groupId: string): AxiosPromise<GroupUsersResponse> {
    return Api.get(OrgApi.fetchGroupUsersURL(groupId));
  }

  static deleteGroupUser(request: RemoveGroupUserPayload): AxiosPromise<ApiResponse> {
    return Api.delete(OrgApi.deleteGroupUserURL(request.groupId), {
      userId: request.userId,
    });
  }

  static addGroupUser(request: AddGroupUserPayload): AxiosPromise<ApiResponse> {
    return Api.post(OrgApi.addGroupUserURL(request.groupId), {
      userId: request.userId,
      role: request.role,
    });
  }

  static deleteOrgUser(request: DeleteOrgUserPayload): AxiosPromise<ApiResponse> {
    const { orgId, ...rest } = request;
    return Api.delete(OrgApi.deleteOrgUsersURL(orgId), rest);
  }

  static quitOrg(orgId: string): AxiosPromise<ApiResponse> {
    return Api.delete(OrgApi.quitOrgURL(orgId));
  }

  static switchOrg(orgId: string): AxiosPromise<ApiResponse> {
    return Api.put(OrgApi.switchOrgURL(orgId));
  }

  static quitGroup(groupId: string): AxiosPromise<ApiResponse> {
    return Api.delete(OrgApi.quitGroupURL(groupId));
  }

  static createOrg(orgName: string): AxiosPromise<CreateOrgResponse> {
    return Api.post(OrgApi.createOrgURL, { name: orgName });
  }

  static deleteOrg(orgId: string): AxiosPromise<ApiResponse> {
    return Api.delete(OrgApi.deleteOrgURL(orgId));
  }

  static updateOrg(request: UpdateOrgPayload): AxiosPromise<ApiResponse> {
    return Api.put(OrgApi.updateOrgURL(request.id), request);
  }
}

export default OrgApi;

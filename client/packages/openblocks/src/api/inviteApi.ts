import Api from "api/api";
import { AxiosPromise } from "axios";
import { GenericApiResponse } from "./apiResponses";

export interface GetInviteRequest {
  orgId: string;
}

export interface InviteRequest {
  invitationId: string;
}

export type InviteInfo = {
  inviteCode: string;
  createUserName: string;
  invitedOrganizationName: string;
};

class InviteApi extends Api {
  static getInviteURL = "/v1/invitation";
  static acceptInviteURL = (invitationId: string) => `/v1/invitation/${invitationId}/invite`;

  // generate invitation
  static getInvite(request: GetInviteRequest): AxiosPromise<GenericApiResponse<InviteInfo>> {
    return Api.post(InviteApi.getInviteURL, undefined, request);
  }

  // get invitation info
  static getInviteInfo(request: InviteRequest): AxiosPromise<GenericApiResponse<InviteInfo>> {
    return Api.get(InviteApi.getInviteURL + "/" + request.invitationId);
  }

  // accept invitation
  static acceptInvite(request: InviteRequest): AxiosPromise<GenericApiResponse<InviteInfo>> {
    // the same api as getInviteInfo, method is by post
    return Api.get(InviteApi.acceptInviteURL(request.invitationId));
  }
}

export default InviteApi;

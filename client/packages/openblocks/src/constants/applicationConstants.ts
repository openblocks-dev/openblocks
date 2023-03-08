import { JSONValue } from "util/jsonTypes";
import { ExtraActionType } from "openblocks-core";
import { CommonSettingResponseData } from "api/commonSettingApi";
import { PermissionItem } from "../components/PermissionDialog/PermissionList";
import { UiLayoutType } from "comps/comps/uiComp";

// To be same with HomeResTypeEnum
export enum AppTypeEnum {
  Application = 1,
  Module = 2,
  NavLayout = 3,
  // 4 folder, 5 mobile
  MobileTabLayout = 6,
}

export const AppUILayoutType: Record<AppTypeEnum, UiLayoutType> = {
  [AppTypeEnum.Application]: "normal",
  [AppTypeEnum.Module]: "module",
  [AppTypeEnum.NavLayout]: "nav",
  [AppTypeEnum.MobileTabLayout]: "mobileTabLayout",
};

export type ApplicationDSLType = "editing" | "published";
export type ApplicationRoleType = "viewer" | "editor" | "owner";
export type ApplicationPermissionType = "USER" | "GROUP" | "ORG_ADMIN";

export interface ApplicationExtra {
  moduleHeight?: number;
  moduleWidth?: number;
}

export interface ApplicationMeta {
  name: string;
  applicationType: AppTypeEnum;
  applicationId: string;
  containerSize?: { height: number; width: number };
  createBy: string;
  createAt: number;
  orgId: string;
  role: ApplicationRoleType;
  extra: ApplicationExtra;
  lastModifyTime: number; // may be 0
  lastViewTime: number;
  folderId: string;
  folder: false;
  applicationStatus: "NORMAL" | "RECYCLED" | "DELETED";
}

export interface FolderMeta {
  folderId: string;
  parentFolderId?: string;
  orgId: string;
  name: string;
  createBy: string;
  createAt: number;
  manageable: boolean;
  lastViewTime: number;
  folder: true;
  subApplications?: ApplicationMeta[];
  subFolders?: FolderMeta[];
}

export interface ApplicationDetail {
  applicationInfoView: ApplicationMeta;
  applicationDSL: JSONValue;
  moduleDSL: Record<string, JSONValue>;
  orgCommonSettings?: CommonSettingResponseData;
  templateId?: string;
}

export type AppInviteInfo = {
  invitationCode: string;
  applicationId: string;
  role: ApplicationRoleType;
};

export interface AppPermissionInfo {
  orgName: string;
  creatorId: string;
  permissions: PermissionItem[];
  invitationCodes: AppInviteInfo[];
  publicToAll: boolean;
}

export type AppViewMode = "edit" | "preview" | "view";

export type AppPathParams = {
  viewMode: AppViewMode;
  applicationId: string;
  appPageId: string;
};

export type AppSnapshotContext = {
  operations: {
    compType?: string;
    compName: string;
    oldName?: string;
    operation: ExtraActionType;
    snapshotCreateTime?: number;
  }[];
};

export type AppSnapshot = {
  snapshotId: string;
  context: AppSnapshotContext;
  userId: string;
  userName: string;
  userAvatar: string;
  createTime: number;
};

export type AppSnapshotList = {
  count: number; // total count
  list: AppSnapshot[];
};

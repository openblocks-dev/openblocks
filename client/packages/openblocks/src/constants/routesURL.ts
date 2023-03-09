import { AppViewMode } from "constants/applicationConstants";
import { LocationDescriptor } from "history";
import { UserGuideLocationState } from "pages/tutorials/tutorialsConstant";
import { DatasourceType } from "@openblocks-ee/constants/queryConstants";

export const BASE_URL = "/";
export const USER_AUTH_URL = "/user/auth";
export const COMPONENT_DOC_URL = "/components";
export const SETTING = "/setting";
export const PERMISSION_SETTING = "/setting/permission";
export const ORGANIZATION_SETTING = "/setting/organization";
export const THEME_SETTING = "/setting/theme";
export const PLUGINS_SETTING = "/setting/plugins";
export const THEME_DETAIL = "/setting/theme/detail";

export const IDSOURCE_SETTING = "/setting/idsource";
export const IDSOURCE_DETAIL = "/setting/idsource/detail";

export const PERMISSION_SETTING_DETAIL = `${PERMISSION_SETTING}/:groupId`;
export const ORGANIZATION_SETTING_DETAIL = `${ORGANIZATION_SETTING}/:orgId`;

export const ALL_APPLICATIONS_URL = "/apps";
export const MODULE_APPLICATIONS_URL = "/apps/module";
export const DATASOURCE_URL = `/datasource`;
export const DATASOURCE_CREATE_URL = `${DATASOURCE_URL}/new/:datasourceType`;
export const DATASOURCE_EDIT_URL = `${DATASOURCE_URL}/:datasourceId`;
export const QUERY_LIBRARY_URL = `/query-library`;
export const FOLDER_URL_PREFIX = `/folder`;
export const FOLDER_URL = `${FOLDER_URL_PREFIX}/:folderId`;
export const FOLDERS_URL = `/folders`;
export const TRASH_URL = `/trash`;
export const IMPORT_APP_FROM_TEMPLATE_URL = `${ALL_APPLICATIONS_URL}/template-import/:templateId`;
export const APP_EDITOR_URL = `${ALL_APPLICATIONS_URL}/:applicationId/:viewMode/:appPageId?`;

export const AUTH_BIND_URL = `${USER_AUTH_URL}/bind`;
export const AUTH_LOGIN_URL = `${USER_AUTH_URL}/login`;
export const AUTH_REGISTER_URL = `${USER_AUTH_URL}/register`;
export const QR_CODE_OAUTH_URL = `${USER_AUTH_URL}/oauth/qrcode`;
export const OAUTH_REDIRECT = `${USER_AUTH_URL}/oauth/redirect`;
export const CAS_AUTH_REDIRECT = `${USER_AUTH_URL}/cas/redirect`;
export const LDAP_AUTH_LOGIN_URL = `${USER_AUTH_URL}/ldap/login`;
export const USER_INFO_COMPLETION = `${USER_AUTH_URL}/completion`;
export const INVITE_LANDING_URL = "/invite/:invitationId";

export const APPLICATION_VIEW_URL = (appId: string, viewMode: AppViewMode) =>
  `${ALL_APPLICATIONS_URL}/${appId}/${viewMode}`;

export const isAuthUnRequired = (pathname: string): boolean => {
  return (
    pathname.startsWith("/invite/") ||
    pathname.startsWith(USER_AUTH_URL) ||
    pathname.startsWith(COMPONENT_DOC_URL)
  );
};

export const buildDatasourceCreateUrl = (datasourceType: DatasourceType) =>
  `${DATASOURCE_URL}/new/${datasourceType}`;
export const buildDatasourceEditUrl = (datasourceId: string) => `${DATASOURCE_URL}/${datasourceId}`;

export const buildFolderUrl = (folderId: string) => `${FOLDER_URL_PREFIX}/${folderId}`;

export const buildAppRouteWithState = (
  appId: string,
  showGuide: boolean
): LocationDescriptor<UserGuideLocationState> => {
  return {
    pathname: APPLICATION_VIEW_URL(appId, "edit"),
    state: {
      showNewUserGuide: showGuide,
    },
  };
};

export function preview(applicationId: string) {
  window.open(APPLICATION_VIEW_URL(applicationId, "preview"));
}

export const buildGroupId = (groupId: string) => `${PERMISSION_SETTING}/${groupId}`;

export const buildOrgId = (orgId: string) => `${ORGANIZATION_SETTING}/${orgId}`;

import { AppPathParams, AppTypeEnum } from "constants/applicationConstants";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { AppSummaryInfo, fetchApplicationInfo } from "redux/reduxActions/applicationActions";
import { fetchDataSourceByApp, fetchDataSourceTypes } from "redux/reduxActions/datasourceActions";
import { getUser } from "redux/selectors/usersSelectors";
import { useUserViewMode } from "util/hooks";
import "comps/uiCompRegistry";
import { AppSnapshot } from "pages/editor/appSnapshot";
import { showAppSnapshotSelector } from "redux/selectors/appSnapshotSelector";
import { setShowAppSnapshot } from "redux/reduxActions/appSnapshotActions";
import { fetchGroupsAction } from "redux/reduxActions/orgActions";
import { getFetchOrgGroupsFinished } from "redux/selectors/orgSelectors";
import { AppEditorInternalView, useRootCompInstance } from "pages/editor/appEditorInternal";
import { getIsCommonSettingFetching } from "redux/selectors/commonSettingSelectors";
import {
  MarkAppDSLLoaded,
  MarkAppEditorFirstRender,
  MarkAppEditorMounted,
  perfClear,
  perfMark,
} from "util/perfUtils";
import { useMount, useUnmount } from "react-use";
import { fetchQueryLibraryDropdown } from "../../redux/reduxActions/queryLibraryActions";
import { clearGlobalSettings, setGlobalSettings } from "comps/utils/globalSettings";
import { fetchFolderElements } from "redux/reduxActions/folderActions";
import { registryDataSourcePlugin } from "@openblocks-ee/constants/queryConstants";

export default function AppEditor() {
  const showAppSnapshot = useSelector(showAppSnapshotSelector);
  const isUserViewMode = useUserViewMode();
  const params = useParams<AppPathParams>();
  const applicationId = params.applicationId;
  const viewMode = params.viewMode === "view" ? "published" : "editing";
  const currentUser = useSelector(getUser);
  const dispatch = useDispatch();
  const fetchOrgGroupsFinished = useSelector(getFetchOrgGroupsFinished);
  const isCommonSettingsFetching = useSelector(getIsCommonSettingFetching);
  const orgId = currentUser.currentOrgId;
  const firstRendered = useRef(false);
  const [isDataSourcePluginRegistered, setIsDataSourcePluginRegistered] = useState(false);

  setGlobalSettings({ applicationId, isViewMode: params.viewMode === "view" });

  if (!firstRendered.current) {
    perfClear();
    perfMark(MarkAppEditorFirstRender);
    firstRendered.current = true;
  }

  useMount(() => {
    perfMark(MarkAppEditorMounted);
  });

  useUnmount(() => {
    clearGlobalSettings();
  });

  // fetch dsl
  const [appInfo, setAppInfo] = useState<AppSummaryInfo>({
    id: "",
    appType: AppTypeEnum.Application,
  });

  const readOnly = isUserViewMode;
  const compInstance = useRootCompInstance(appInfo, readOnly, isDataSourcePluginRegistered);

  // fetch dataSource and plugin
  useEffect(() => {
    dispatch(
      fetchDataSourceTypes({
        organizationId: "fake",
        onSuccess: (dataSourceTypes) => {
          dataSourceTypes.forEach((dataSourceType) => {
            const { definition } = dataSourceType;
            if (!definition) {
              return;
            }
            registryDataSourcePlugin(definition.id, definition);
          });
          setIsDataSourcePluginRegistered(true);
        },
      })
    );
    if (params.viewMode === "edit") {
      dispatch(fetchFolderElements({}));
    }
  }, [dispatch, params.viewMode]);

  useEffect(() => {
    if (applicationId && params.viewMode === "edit") {
      dispatch(fetchDataSourceByApp({ applicationId: applicationId }));
    }
  }, [dispatch, applicationId, params.viewMode]);

  useEffect(() => {
    if (applicationId && params.viewMode === "edit") {
      dispatch(fetchQueryLibraryDropdown());
    }
  }, [dispatch, applicationId, params.viewMode]);

  useEffect(() => {
    dispatch(setShowAppSnapshot(false));
  }, [applicationId, dispatch]);

  useEffect(() => {
    if (!fetchOrgGroupsFinished) {
      dispatch(fetchGroupsAction(orgId));
    }
  }, [dispatch, fetchOrgGroupsFinished, orgId]);

  useEffect(() => {
    dispatch(
      fetchApplicationInfo({
        type: viewMode,
        applicationId: applicationId,
        onSuccess: (info) => {
          perfMark(MarkAppDSLLoaded);
          setGlobalSettings({
            orgCommonSettings: info.orgCommonSettings,
          });
          setAppInfo(info);
        },
      })
    );
  }, [viewMode, applicationId, dispatch]);

  return (
    <>
      {showAppSnapshot ? (
        <AppSnapshot
          currentAppInfo={{
            ...appInfo,
            dsl: compInstance.comp?.toJsonValue() || {},
          }}
        />
      ) : (
        <AppEditorInternalView
          appInfo={appInfo}
          readOnly={readOnly}
          loading={
            !fetchOrgGroupsFinished || !isDataSourcePluginRegistered || isCommonSettingsFetching
          }
          compInstance={compInstance}
        />
      )}
    </>
  );
}

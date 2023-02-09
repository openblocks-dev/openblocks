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
import { registryDataSourcePlugin } from "constants/queryConstants";
import { DatasourceApi } from "api/datasourceApi";

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
    if (!orgId || params.viewMode !== "edit") {
      return;
    }
    dispatch(fetchDataSourceTypes({ organizationId: orgId }));
    dispatch(fetchFolderElements({}));
  }, [dispatch, orgId, params.viewMode]);

  useEffect(() => {
    if (applicationId && params.viewMode === "edit") {
      dispatch(fetchDataSourceByApp({ applicationId: applicationId }));
      dispatch(fetchQueryLibraryDropdown());
    }
  }, [dispatch, applicationId, params.viewMode]);

  useEffect(() => {
    DatasourceApi.fetchJsDatasourceByApp(applicationId).then((res) => {
      res.data.data.forEach((i) => {
        registryDataSourcePlugin(i.type, i.id, i.pluginDefinition);
      });
      setIsDataSourcePluginRegistered(true);
    });
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
          const runJsInHost =
            info.orgCommonSettings?.runJavaScriptInHost ?? !!REACT_APP_DISABLE_JS_SANDBOX;
          setGlobalSettings({
            orgCommonSettings: {
              ...info.orgCommonSettings,
              runJavaScriptInHost: runJsInHost,
            },
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

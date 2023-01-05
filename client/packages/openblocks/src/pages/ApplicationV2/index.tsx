import {
  ALL_APPLICATIONS_URL,
  DATASOURCE_URL,
  FOLDER_URL,
  FOLDER_URL_PREFIX,
  FOLDERS_URL,
  MODULE_APPLICATIONS_URL,
  QUERY_LIBRARY_URL,
  SETTING,
  TRASH_URL,
} from "constants/routesURL";
import { getUser, isFetchingUser } from "redux/selectors/usersSelectors";
import { useDispatch, useSelector } from "react-redux";
import {
  EllipsisTextCss,
  FolderIcon,
  HomeActiveIcon,
  HomeDataSourceActiveIcon,
  HomeDataSourceIcon,
  HomeIcon,
  HomeModuleActiveIcon,
  HomeModuleIcon,
  HomeQueryLibraryActiveIcon,
  HomeQueryLibraryIcon,
  HomeSettingsActiveIcon,
  HomeSettingsIcon,
  InviteUserIcon,
  PlusIcon,
  PointIcon,
  RecyclerActiveIcon,
  RecyclerIcon,
} from "openblocks-design";
import React, { useEffect, useState } from "react";
import { fetchAllApplications, fetchHomeData } from "redux/reduxActions/applicationActions";
import { getHomeOrg, normalAppListSelector } from "redux/selectors/applicationSelector";
import { DatasourceHome } from "../datasource";
import { clearStyleEval, evalStyle } from "openblocks-core";
import { QueryLibraryEditor } from "../queryLibrary/QueryLibraryEditor";
import { ProductLoading } from "components/ProductLoading";
import { Layout } from "../../components/layout/Layout";
import { HomeView } from "./HomeView";
import styled, { css } from "styled-components";
import history from "../../util/history";
import { FolderView } from "./FolderView";
import { TrashView } from "./TrashView";
import { SideBarItemType } from "../../components/layout/SideBarSection";
import { RootFolderListView } from "./RootFolderListView";
import InviteDialog from "../common/inviteDialog";
import { fetchFolderElements } from "../../redux/reduxActions/folderActions";
import { ModuleView } from "./ModuleView";
import { useCreateFolder } from "./useCreateFolder";
import { trans } from "../../i18n";
import { foldersSelector } from "../../redux/selectors/folderSelector";
import Setting from "pages/setting";

const TabLabel = styled.div`
  font-weight: 500;
`;

const FolderSectionLabel = styled.div`
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  padding: 0 12px 0 26px;
  height: 30px;
`;

const FolderCountLabel = styled.span`
  margin-left: 8px;
  font-size: 14px;
  line-height: 14px;
  color: #b8b9bf;
`;

const FolderLabel = styled.div<{ selected: boolean }>`
  max-width: 140px;
  ${EllipsisTextCss};
  ${(props) => {
    if (props.selected) {
      return css`
        font-weight: 500;
      `;
    }
  }}
`;

const PopoverIcon = styled(PointIcon)<{ selected: boolean }>`
  cursor: pointer;
  flex-shrink: 0;

  g {
    fill: ${(props) => (props.selected ? "#4965f2" : "#8b8fa3")};
  }
`;

const InviteUser = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  left: 10px;
  top: calc(100vh - 60px);
  padding: 12px 26px;
  font-size: 14px;
  cursor: pointer;
  width: 219px;

  :hover {
    color: #315efb;

    svg g g {
      stroke: #315efb;
    }
  }
`;

const CreateFolderIcon = styled.div`
  margin-left: auto;
  cursor: pointer;
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  :hover {
    g {
      stroke: #315efb;
    }

    background-color: #e1e3eb;
  }
`;

const DivStyled = styled.div`
  @media screen and (max-width: 500px) {
    .ant-layout-sider {
      visibility: hidden;
      padding: 0;
      max-width: 0 !important;
      min-width: 0 !important;
    }

    > div {
      display: none;
    }

    .ant-layout > div {
      display: none;
    }
  }
`;

export default function ApplicationHome() {
  const dispatch = useDispatch();
  const [isPreloadCompleted, setIsPreloadCompleted] = useState(false);
  const fetchingUser = useSelector(isFetchingUser);
  const allApplications = useSelector(normalAppListSelector);
  const allFolders = useSelector(foldersSelector);
  const user = useSelector(getUser);
  const org = useSelector(getHomeOrg);
  const allAppCount = allApplications.length;
  const allFoldersCount = allFolders.length;
  const orgHomeId = "root";

  const handleFolderCreate = useCreateFolder();

  useEffect(() => {
    dispatch(fetchHomeData({}));
  }, [user.currentOrgId]);

  useEffect(() => {
    if (!org) {
      return;
    }
    const { applyPreloadCSSToHomePage, preloadCSS } = org.commonSettings || {};
    if (applyPreloadCSSToHomePage && preloadCSS) {
      evalStyle(orgHomeId, [preloadCSS]);
    } else {
      clearStyleEval();
    }
    setIsPreloadCompleted(true);
  }, [org, orgHomeId]);

  useEffect(() => {
    if (allAppCount !== 0) {
      return;
    }
    user.currentOrgId && dispatch(fetchAllApplications({}));
  }, [dispatch, allAppCount, user.currentOrgId]);

  useEffect(() => {
    if (allFoldersCount !== 0) {
      return;
    }
    user.currentOrgId && dispatch(fetchFolderElements({}));
  }, [dispatch, allFoldersCount, user.currentOrgId]);

  if (fetchingUser || !isPreloadCompleted) {
    return <ProductLoading />;
  }

  let folderItems: SideBarItemType[] = allFolders
    .sort((a, b) => {
      if (a.createAt === b.createAt) {
        return 0;
      }
      return a.createAt < b.createAt ? 1 : -1;
    })
    .slice(0, 5)
    .map((folder) => {
      const path = FOLDER_URL_PREFIX + `/${folder.folderId}`;
      return {
        onSelected: (_, currentPath) => currentPath === path,
        text: (props: { selected: boolean }) => (
          <FolderLabel selected={props.selected}>{folder.name}</FolderLabel>
        ),
        routePath: FOLDER_URL,
        routePathExact: false,
        routeComp: FolderView,
        icon: FolderIcon,
        size: "small",
        onClick: (currentPath) => currentPath !== path && history.push(path),
      };
    });

  if (allFolders.length > 5) {
    folderItems = [
      ...folderItems,
      {
        text: (props: { selected: boolean }) => (
          <FolderLabel selected={props.selected}>{trans("more")}</FolderLabel>
        ),
        routePath: FOLDERS_URL,
        routeComp: RootFolderListView,
        icon: PopoverIcon,
        size: "small",
      },
    ];
  }

  if (folderItems.length > 0) {
    folderItems[folderItems.length - 1] = {
      ...folderItems[folderItems.length - 1],
      style: { marginBottom: "4px" },
    };
  }

  return (
    <DivStyled>
      <Layout
        sections={[
          {
            items: [
              {
                text: <TabLabel>{trans("home.allApplications")}</TabLabel>,
                routePath: ALL_APPLICATIONS_URL,
                routeComp: HomeView,
                icon: ({ selected, ...otherProps }) =>
                  selected ? <HomeActiveIcon {...otherProps} /> : <HomeIcon {...otherProps} />,
              },
              {
                text: <TabLabel>{trans("home.modules")}</TabLabel>,
                routePath: MODULE_APPLICATIONS_URL,
                routeComp: ModuleView,
                icon: ({ selected, ...otherProps }) =>
                  selected ? (
                    <HomeModuleActiveIcon {...otherProps} />
                  ) : (
                    <HomeModuleIcon {...otherProps} />
                  ),
                visible: ({ user }) => user.orgDev,
              },
              {
                text: <TabLabel>{trans("home.trash")}</TabLabel>,
                routePath: TRASH_URL,
                routeComp: TrashView,
                icon: ({ selected, ...otherProps }) =>
                  selected ? (
                    <RecyclerActiveIcon {...otherProps} />
                  ) : (
                    <RecyclerIcon {...otherProps} />
                  ),
                visible: ({ user }) => user.orgDev,
              },
            ],
          },
          allFolders.length > 0
            ? {
                title: (
                  <FolderSectionLabel>
                    {trans("home.folders")}
                    <FolderCountLabel>{`(${allFolders.length})`}</FolderCountLabel>
                    {user.orgDev && (
                      <CreateFolderIcon onClick={handleFolderCreate}>
                        <PlusIcon />
                      </CreateFolderIcon>
                    )}
                  </FolderSectionLabel>
                ),
                items: folderItems,
                style: { marginTop: "8px" },
              }
            : { items: [] },
          {
            items: [
              {
                text: <TabLabel>{trans("home.queryLibrary")}</TabLabel>,
                routePath: QUERY_LIBRARY_URL,
                routeComp: QueryLibraryEditor,
                icon: ({ selected, ...otherProps }) =>
                  selected ? (
                    <HomeQueryLibraryActiveIcon {...otherProps} />
                  ) : (
                    <HomeQueryLibraryIcon {...otherProps} />
                  ),
                visible: ({ user }) => user.orgDev,
              },
              {
                text: <TabLabel>{trans("home.datasource")}</TabLabel>,
                routePath: DATASOURCE_URL,
                routePathExact: false,
                routeComp: DatasourceHome,
                icon: ({ selected, ...otherProps }) =>
                  selected ? (
                    <HomeDataSourceActiveIcon {...otherProps} />
                  ) : (
                    <HomeDataSourceIcon {...otherProps} />
                  ),
                visible: ({ user }) => user.orgDev,
                onSelected: (_, currentPath) => currentPath.split("/")[1] === "datasource",
              },
              {
                text: <TabLabel>{trans("settings.title")}</TabLabel>,
                routePath: SETTING,
                routePathExact: false,
                routeComp: Setting,
                icon: ({ selected, ...otherProps }) =>
                  selected ? (
                    <HomeSettingsActiveIcon {...otherProps} />
                  ) : (
                    <HomeSettingsIcon {...otherProps} />
                  ),
                visible: ({ user }) => user.orgDev,
                onSelected: (_, currentPath) => currentPath.split("/")[1] === "setting",
              },
            ],
          },
        ]}
      />
      {user.orgDev && (
        <InviteDialog
          trigger={
            <InviteUser>
              <InviteUserIcon style={{ marginRight: "8px" }} />
              {trans("home.inviteUser")}
            </InviteUser>
          }
          style={{ marginLeft: "auto" }}
        />
      )}
    </DivStyled>
  );
}

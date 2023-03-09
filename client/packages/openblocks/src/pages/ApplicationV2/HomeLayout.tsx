import { User } from "constants/userConstants";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ApplicationMeta, FolderMeta } from "constants/applicationConstants";
import { ALL_APPLICATIONS_URL } from "constants/routesURL";
import history from "util/history";
import moment from "moment";
import { Breadcrumb as AntdBreadcrumb, Select, Skeleton } from "antd";
import React, { useEffect, useState } from "react";
import {
  ArrowIcon,
  ArrowSolidIcon,
  HomeCardIcon,
  HomeEmptyIcon,
  HomeListIcon,
  Search,
} from "openblocks-design";
import { canEditApp, canManageApp } from "../../util/permissionUtils";
import { HomeResKey, HomeResTypeEnum, NavigationTypes } from "../../types/homeRes";
import { HomeResInfo } from "../../util/homeResUtils";
import { getUser } from "../../redux/selectors/usersSelectors";
import { useLocation } from "react-use";
import { TrashTableView } from "./TrashTableView";
import { HomepageTourV2 } from "../tutorials/HomeTutorialsV2";
import { HomeCardView } from "./HomeCardView";
import { getHomeLayout, HomeLayoutType, saveHomeLayout } from "../../util/localStorageUtil";
import { HomeTableView } from "./HomeTableView";
import { Layers } from "../../constants/Layers";
import { CreateDropdown } from "./CreateDropdown";
import { trans } from "../../i18n";
import { isFetchingFolderElements } from "../../redux/selectors/folderSelector";
import { checkIsMobile } from "util/commonUtils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const HeaderWrapper = styled.div`
  height: 84px;
  width: 100%;
  display: flex;
  padding: 0 36px;
  align-items: center;
  flex-shrink: 0;
  @media screen and (max-width: 500px) {
    padding: 0 24px;
  }
`;

const OperationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 32px;
  padding: 0 36px;
  margin: 8px 0 20px 0;
  @media screen and (max-width: 500px) {
    padding: 0 24px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
`;

const Breadcrumb = styled(AntdBreadcrumb)`
  font-size: 20px;

  li:not(:last-child) {
    color: #8b8fa3;
  }

  li:last-child {
    font-weight: 500;
    color: #222222;
  }
`;

const OperationRightWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-left: auto;
  @media screen and (max-width: 500px) {
    > Button {
      display: none;
    }
  }
`;

const FilterDropdown = styled(Select)`
  .ant-select-selector {
    padding: 0 11px 0 0 !important;
  }

  .ant-select-selector > .ant-select-selection-item {
    svg {
      display: none;
    }

    font-size: 16px !important;
    font-weight: 500;
  }

  .ant-select-item-option-content {
    font-size: 13px;
    line-height: 13px;
  }

  &:is(.ant-select-open) {
    .ant-select-selection-item {
      color: #315efb;
    }
  }

  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background-color: #f2f7fc;
  }

  .ant-select-dropdown {
    padding: 8px;
    border-radius: 8px;
    width: fit-content !important;
  }

  .ant-select-item {
    height: 29px;
    min-height: 0;
    padding: 0 8px;
    border-radius: 4px;
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    font-weight: 400;
    color: #4965f2;
    background-color: white;
  }
`;

const FilterMenuItem = styled.div`
  display: flex;
  align-items: center;
  height: 29px;
  width: 100%;
`;

const BreadcrumbItem = styled(Breadcrumb.Item)`
  cursor: pointer;
`;

const SkeletonStyle = styled(Skeleton)`
  margin: 80px 36px;

  .ant-skeleton-content .ant-skeleton-paragraph > li {
    width: 504px;
    display: inline-block;

    &:nth-of-type(2n + 1) {
      margin-right: 120px;
    }
  }

  @media screen and (max-width: 500px) {
    .ant-skeleton-content .ant-skeleton-paragraph > li {
      max-width: calc(100vw - 72px);
      min-width: calc(100vw - 72px);
      margin-right: 0;
    }
  }
`;

const EmptyView = styled.div`
  font-size: 14px;
  color: #8b8fa3;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding-top: 120px;
  @media screen and (max-width: 500px) {
    > div,
    > button {
      display: none;
    }
  }
`;

const LayoutSwitcher = styled.div`
  position: absolute;
  right: 36px;
  top: 6px;
  cursor: pointer;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  z-index: ${Layers.homeLayoutSwitcher};
  display: flex;
  align-items: center;
  justify-content: center;

  :hover {
    background-color: #f5f5f6;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }
`;

function showNewUserGuide(user: User) {
  return (
    user.orgDev &&
    !user.userStatus.newUserGuidance &&
    // registered in 7 days
    moment(user.createdTimeMs).add(7, "days").isAfter(moment())
  );
}

export interface HomeRes {
  key: string;
  id: string;
  name: string;
  type: HomeResTypeEnum;
  creator: string;
  lastModifyTime: number;
  isEditable?: boolean;
  isManageable: boolean;
  isDeletable: boolean;
}

export type HomeBreadcrumbType = { text: string; path: string };

export type HomeLayoutMode = "view" | "trash" | "module" | "folder" | "folders";

export interface HomeLayoutProps {
  breadcrumb?: HomeBreadcrumbType[];
  elements: Array<ApplicationMeta | FolderMeta>;
  mode: HomeLayoutMode;
}

export function HomeLayout(props: HomeLayoutProps) {
  const { breadcrumb = [], elements = [], mode } = props;
  const user = useSelector(getUser);
  const isFetching = useSelector(isFetchingFolderElements);

  const [filterBy, setFilterBy] = useState<HomeResKey>("All");
  const [searchValue, setSearchValue] = useState("");
  const [layout, setLayout] = useState<HomeLayoutType>(
    checkIsMobile(window.innerWidth) ? "card" : getHomeLayout()
  );

  useEffect(() => saveHomeLayout(layout), [layout]);

  const currentPath = useLocation().pathname;

  if (!user.currentOrgId) {
    return null;
  }

  const resList: HomeRes[] = elements
    .filter((e) =>
      searchValue
        ? e.name.toLocaleLowerCase().includes(searchValue) ||
          e.createBy.toLocaleLowerCase().includes(searchValue)
        : true
    )
    .filter((e) => {
      if (HomeResTypeEnum[filterBy].valueOf() === HomeResTypeEnum.All) {
        return true;
      }
      if (e.folder) {
        return HomeResTypeEnum[filterBy] === HomeResTypeEnum.Folder;
      } else {
        if (filterBy === "Navigation") {
          return NavigationTypes.map((t) => t.valueOf()).includes(e.applicationType);
        }
        return HomeResTypeEnum[filterBy].valueOf() === e.applicationType;
      }
    })
    .map((e) =>
      e.folder
        ? {
            key: e.folderId,
            id: e.folderId,
            name: e.name,
            type: HomeResTypeEnum.Folder,
            creator: e.createBy,
            lastModifyTime: e.createAt,
            isManageable: e.manageable,
            isDeletable: e.manageable && !e.subApplications?.length && !e.subFolders?.length,
          }
        : {
            key: e.applicationId,
            id: e.applicationId,
            name: e.name,
            type: HomeResTypeEnum[HomeResTypeEnum[e.applicationType] as HomeResKey],
            creator: e.createBy,
            lastModifyTime: e.lastModifyTime,
            isEditable: canEditApp(user, e),
            isManageable: canManageApp(user, e),
            isDeletable: canEditApp(user, e),
          }
    );

  const getFilterMenuItem = (type: HomeResTypeEnum) => {
    const Icon = HomeResInfo[type].icon;
    return {
      label: (
        <FilterMenuItem>
          {Icon && <Icon style={{ width: "16px", height: "16px", marginRight: "4px" }} />}
          {HomeResInfo[type].name}
        </FilterMenuItem>
      ),
      value: HomeResTypeEnum[type],
    };
  };

  return (
    <Wrapper>
      <HeaderWrapper>
        <Breadcrumb separator={<ArrowIcon />}>
          <BreadcrumbItem
            onClick={() =>
              currentPath !== ALL_APPLICATIONS_URL && history.push(ALL_APPLICATIONS_URL)
            }
          >
            {trans("home.home")}
          </BreadcrumbItem>
          {breadcrumb.map((b, i) => (
            <BreadcrumbItem onClick={() => currentPath !== b.path && history.push(b.path)} key={i}>
              {b.text}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </HeaderWrapper>

      {showNewUserGuide(user) && <HomepageTourV2 />}
      {/*<HomepageTourV2 />*/}

      <OperationWrapper>
        {mode !== "folders" && mode !== "module" && (
          <FilterDropdown
            bordered={false}
            value={filterBy}
            onChange={(value) => setFilterBy(value as HomeResKey)}
            options={[
              getFilterMenuItem(HomeResTypeEnum.All),
              getFilterMenuItem(HomeResTypeEnum.Application),
              getFilterMenuItem(HomeResTypeEnum.Module),
              getFilterMenuItem(HomeResTypeEnum.Navigation),
              ...(mode !== "trash" ? [getFilterMenuItem(HomeResTypeEnum.Folder)] : []),
            ]}
            getPopupContainer={(node) => node}
            suffixIcon={<ArrowSolidIcon />}
          />
        )}

        <OperationRightWrapper>
          <Search
            placeholder={trans("search")}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            style={{ width: "192px", height: "32px", margin: "0" }}
          />
          {mode !== "trash" && user.orgDev && (
            <CreateDropdown defaultVisible={showNewUserGuide(user)} mode={mode} />
          )}
        </OperationRightWrapper>
      </OperationWrapper>

      <ContentWrapper>
        {isFetching && resList.length === 0 ? (
          <SkeletonStyle active paragraph={{ rows: 8, width: 648 }} title={false} />
        ) : (
          <>
            {resList.length > 0 ? (
              <>
                {mode === "trash" ? (
                  <TrashTableView resources={resList} />
                ) : (
                  <>
                    <LayoutSwitcher onClick={() => setLayout(layout === "list" ? "card" : "list")}>
                      {layout === "list" ? <HomeCardIcon /> : <HomeListIcon />}
                    </LayoutSwitcher>
                    {layout === "list" ? (
                      <HomeTableView resources={resList} />
                    ) : (
                      <HomeCardView resources={resList} />
                    )}
                  </>
                )}
              </>
            ) : (
              <EmptyView>
                <HomeEmptyIcon style={{ width: "90px", height: "120px" }} />
                <div style={{ marginBottom: "16px" }}>
                  {mode === "trash"
                    ? trans("home.trashEmpty")
                    : user.orgDev
                    ? trans("home.projectEmptyCanAdd")
                    : trans("home.projectEmpty")}
                </div>
                {mode !== "trash" && user.orgDev && <CreateDropdown mode={mode} />}
              </EmptyView>
            )}
          </>
        )}
      </ContentWrapper>
    </Wrapper>
  );
}

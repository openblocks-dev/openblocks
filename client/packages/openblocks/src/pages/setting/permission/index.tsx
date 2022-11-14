import { message } from "antd";
import OrgApi from "api/orgApi";
import { OrgGroup } from "constants/orgConstants";
import { PERMISSION_USERS } from "constants/routesURL";
import { CustomModal, Menu } from "openblocks-design";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { fetchGroupsAction } from "redux/reduxActions/orgActions";
import { getCurrentUser } from "redux/selectors/usersSelectors";
import styled from "styled-components";
import { currentOrgAdmin } from "util/permissionUtils";
import { getNextEntityName } from "util/stringUtils";
import GroupPermission from "./groupUsersPermission";
import UsersPermission from "./orgUsersPermission";
import { validateResponse } from "api/apiUtils";
import SubSideBar from "components/layout/SubSideBar";
import { GroupNameView } from "pages/setting/permission/styledComponents";
import { TwoColumnSettingPageContent } from "../styled";
import { MenuItemWithDelete } from "openblocks-design";
import { trans } from "i18n";
import { getOrgGroups } from "redux/selectors/orgSelectors";

const PermissionContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 2200px;
  min-width: 880px;
  padding: 24px 36px 72px 24px;
  overflow: auto;
`;

const NEW_GROUP_PREFIX = trans("memberSettings.newGroupPrefix");

export default function PermissionSetting() {
  const [selectKey, setSelectKey] = useState(PERMISSION_USERS);
  const user = useSelector(getCurrentUser);
  const orgId = user.currentOrgId;
  const orgGroups = useSelector(getOrgGroups);
  const visibleOrgGroups = orgGroups.filter((g) => !g.allUsersGroup);
  const groupIdMap = new Map(orgGroups.map((group) => [group.groupId, group]));
  const dispatch = useDispatch();
  useEffect(() => {
    if (!orgId) {
      return;
    }
    dispatch(fetchGroupsAction(orgId));
  }, [orgId]);
  if (!orgId) {
    return null;
  }
  const handleGroupCreate = () => {
    OrgApi.createGroup({
      name: getNextEntityName(
        NEW_GROUP_PREFIX,
        visibleOrgGroups.map((org) => org.groupName)
      ),
    })
      .then((resp) => {
        if (validateResponse(resp)) {
          dispatch(fetchGroupsAction(orgId));
          setSelectKey(resp.data.data.groupId);
        }
      })
      .catch((e) => {
        message.error(e.message);
      });
  };
  const handleGroupDelete = (group: OrgGroup) => {
    OrgApi.deleteGroup(group.groupId)
      .then((resp) => {
        if (validateResponse(resp)) {
          dispatch(fetchGroupsAction(orgId));
          // select the previous group of the deleting one
          const prevKey = visibleOrgGroups[visibleOrgGroups.indexOf(group) - 1];
          setSelectKey(prevKey?.groupId || PERMISSION_USERS);
        }
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  const menuItems = [
    {
      key: PERMISSION_USERS,
      label: <GroupNameView name={trans("memberSettings.allMembers")} lock />,
    },
  ];

  visibleOrgGroups.forEach((group) => {
    menuItems.push({
      key: group.groupId,
      label: (
        <MenuItemWithDelete
          showDelete={currentOrgAdmin(user) && !group.devGroup}
          onDelete={() => {
            CustomModal.confirm({
              title: trans("memberSettings.deleteModalTitle"),
              content: trans("memberSettings.deleteModalContent"),
              onConfirm: () => handleGroupDelete(group),
              confirmBtnType: "delete",
              okText: trans("delete"),
            });
          }}
        >
          <GroupNameView name={group.groupName} lock={group.devGroup} />
        </MenuItemWithDelete>
      ),
    });
  });

  return (
    <TwoColumnSettingPageContent>
      <SubSideBar title={trans("memberSettings.title")}>
        <Menu
          mode="inline"
          selectedKeys={[selectKey]}
          onSelect={(e) => {
            setSelectKey(e.key);
          }}
          createBtnConfig={
            currentOrgAdmin(user)
              ? {
                  text: trans("memberSettings.createGroup"),
                  onClick: handleGroupCreate,
                }
              : undefined
          }
          items={menuItems}
        />
      </SubSideBar>
      <PermissionContent key={selectKey}>
        {selectKey === PERMISSION_USERS ? (
          <UsersPermission orgId={orgId} />
        ) : (
          groupIdMap.has(selectKey) && (
            <GroupPermission group={groupIdMap.get(selectKey)!} orgId={orgId} />
          )
        )}
      </PermissionContent>
    </TwoColumnSettingPageContent>
  );
}

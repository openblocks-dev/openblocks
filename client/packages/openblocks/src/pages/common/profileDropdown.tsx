import { Dropdown, Menu } from "antd";
import { Org, OrgRoleInfo } from "constants/orgConstants";
import { ORGANIZATION_SETTING } from "constants/routesURL";
import { User } from "constants/userConstants";
import {
  AddIcon,
  CheckoutIcon,
  CommonGrayLabel,
  CommonTextLabel,
  CommonTextLabel2,
  DropdownMenu,
  DropDownSubMenu,
  EditIcon,
  PackUpIcon,
} from "openblocks-design";
import ProfileSettingModal from "pages/setting/profile";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrgAction, switchOrg } from "redux/reduxActions/orgActions";
import styled from "styled-components";
import history from "util/history";
import ProfileImage from "pages/common/profileImage";
import { isProfileSettingModalVisible } from "redux/selectors/usersSelectors";
import { logoutAction, profileSettingModalVisible } from "redux/reduxActions/userActions";
import { trans } from "i18n";
import { showSwitchOrg } from "@openblocks-ee/pages/common/customerService";
import { checkIsMobile } from "util/commonUtils";
import { selectSystemConfig } from "redux/selectors/configSelectors";

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  padding: 4px 0 12px 0;

  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: keep-all;
  }

  svg {
    visibility: hidden;
  }

  :hover svg {
    visibility: visible;

    g g {
      fill: #3377ff;
    }
  }
`;

const StyledDropdown = styled(Dropdown)`
  display: flex;
  flex-direction: column;
  min-width: 0;
  align-items: end;
`;

const StyledPackUpIcon = styled(PackUpIcon)`
  width: 20px;
  height: 20px;
  transform: rotate(90deg);
`;

const SelectDropMenuItem = styled(Menu.Item)`
  .ant-dropdown-menu-item-icon {
    position: absolute;
    right: 0;
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  .ant-dropdown-menu-title-content {
    color: #4965f2;
    padding-right: 22px;
  }
`;

const StyledDropdownSubMenu = styled(DropDownSubMenu)`
  min-width: 192px;

  .ant-dropdown-menu-item {
    height: 29px;
  }

  .ant-dropdown-menu-item-divider,
  .ant-dropdown-menu-submenu-title-divider {
    background-color: #e1e3eb;
  }
`;

const StyledNameLabel = styled.div`
  width: 160px;
  text-align: center;
  position: relative;
  margin-top: -3px;
  display: flex;
  justify-content: center;

  p {
    font-weight: 500;
    font-size: 14px;
    line-height: 16px;
    color: #222222;
    padding-left: 16px;
  }
`;

const OrgRoleLabel = styled.div`
  font-size: 12px;
  color: #4965f2;
  line-height: 14px;
  border: 1px solid #d6e4ff;
  border-radius: 8px;
  padding: 1px 5px;
`;

type DropDownProps = {
  onClick?: (text: string) => void;
  user: User;
  profileSide: number;
  fontSize?: number;
};
export default function ProfileDropdown(props: DropDownProps) {
  const { avatarUrl, username, orgs, currentOrgId } = props.user;
  const currentOrgRoleId = props.user.orgRoleMap.get(currentOrgId);
  const currentOrg = useMemo(
    () => props.user.orgs.find((o) => o.id === currentOrgId),
    [props.user, currentOrgId]
  );
  const settingModalVisible = useSelector(isProfileSettingModalVisible);
  const sysConfig = useSelector(selectSystemConfig);
  const dispatch = useDispatch();
  const handleClick = (e: any) => {
    if (e.key === "profile") {
      // click the profile, while not close the dropdown
      if (checkIsMobile(window.innerWidth)) {
        return;
      }
      dispatch(profileSettingModalVisible(true));
    } else if (e.key === "logout") {
      // logout
      dispatch(logoutAction({}));
    } else if (e.keyPath.includes("switchOrg")) {
      if (e.key === "newOrganization") {
        // create new organization
        dispatch(createOrgAction(orgs));
        history.push(ORGANIZATION_SETTING);
      } else if (currentOrgId !== e.key) {
        // switch org
        dispatch(switchOrg(e.key));
      }
    }
  };

  const menu = (
    <DropdownMenu
      style={{ width: "192px" }}
      onClick={handleClick}
      expandIcon={<StyledPackUpIcon />}
    >
      <Menu.Item key="profile">
        <ProfileWrapper>
          <ProfileImage source={avatarUrl} userName={username} side={48} />
          <StyledNameLabel>
            <CommonTextLabel2 title={username}>{username}</CommonTextLabel2>
            {!checkIsMobile(window.innerWidth) && <EditIcon />}
          </StyledNameLabel>
          {currentOrg && (
            <CommonGrayLabel
              style={{
                width: "130px",
                textAlign: "center",
                lineHeight: "15px",
              }}
            >
              {currentOrg.name}
            </CommonGrayLabel>
          )}
          {currentOrgRoleId && OrgRoleInfo[currentOrgRoleId] && (
            <OrgRoleLabel>{OrgRoleInfo[currentOrgRoleId].name}</OrgRoleLabel>
          )}
        </ProfileWrapper>
      </Menu.Item>
      {orgs && orgs.length > 0 && showSwitchOrg(props.user, sysConfig) && (
        <StyledDropdownSubMenu
          key="switchOrg"
          title={trans("profile.switchOrg")}
          popupOffset={[4, -12]}
        >
          <CommonTextLabel style={{ margin: "8px", color: "#B8B9BF" }}>
            {trans("profile.joinedOrg")}
          </CommonTextLabel>
          {orgs.map((org: Org) => {
            const MenuItem = currentOrgId === org.id ? SelectDropMenuItem : Menu.Item;
            return (
              <MenuItem key={org.id} icon={currentOrgId === org.id && <CheckoutIcon />}>
                {org.name}
              </MenuItem>
            );
          })}
          {!checkIsMobile(window.innerWidth) && (
            <>
              <Menu.Divider />
              <Menu.Item key="newOrganization" icon={<AddIcon />}>
                {trans("profile.createOrg")}
              </Menu.Item>
            </>
          )}
        </StyledDropdownSubMenu>
      )}
      <Menu.Item key="logout">{trans("profile.logout")}</Menu.Item>
    </DropdownMenu>
  );
  return (
    <>
      <StyledDropdown overlay={menu} trigger={["click"]}>
        <div>
          <ProfileImage
            style={{ cursor: "pointer", userSelect: "none" }}
            source={avatarUrl}
            userName={username}
            side={props.profileSide}
            fontSize={props.fontSize}
          />
        </div>
      </StyledDropdown>
      {settingModalVisible && <ProfileSettingModal />}
    </>
  );
}

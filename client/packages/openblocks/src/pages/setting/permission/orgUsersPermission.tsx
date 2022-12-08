import { ADMIN_ROLE, OrgRoleInfo, OrgUser, TacoRoles } from "constants/orgConstants";
import { User } from "constants/userConstants";
import { ArrowIcon, CustomSelect } from "openblocks-design";
import { MembersIcon } from "openblocks-design";
import { SuperUserIcon } from "openblocks-design";
import { trans } from "i18n";
import InviteDialog from "pages/common/inviteDialog";
import ProfileImage from "pages/common/profileImage";
import React, { useEffect, useMemo } from "react";
import { connect, useDispatch } from "react-redux";
import { AppState } from "redux/reducers";
import {
  deleteOrgUserAction,
  fetchOrgUsersAction,
  quitOrgAction,
  updateUserOrgRoleAction,
} from "redux/reduxActions/orgActions";
import { getUser } from "redux/selectors/usersSelectors";
import styled from "styled-components";
import { formatTimestamp } from "util/dateTimeUtils";
import { currentOrgAdmin } from "util/permissionUtils";
import {
  AddMemberButton,
  HeaderBack,
  LAST_ADMIN_QUIT,
  PermissionHeaderWrapper,
  QuestionTooltip,
  RoleSelectSubTitle,
  RoleSelectTitle,
  TableStyled,
  UserTableCellWrapper,
} from "./styledComponents";
import history from "util/history";
import { PERMISSION_SETTING } from "constants/routesURL";

const StyledMembersIcon = styled(MembersIcon)`
  g g {
    stroke: #ffffff;
  }
`;

type UsersPermissionProp = {
  orgId: string;
  orgUsers: OrgUser[];
  orgUsersFetching: boolean;
  currentUser: User;
};

function OrgUsersPermission(props: UsersPermissionProp) {
  const { Column } = TableStyled;
  const { orgId, orgUsers, orgUsersFetching, currentUser } = props;
  const adminCount = orgUsers.filter((user) => user.role === ADMIN_ROLE).length;
  const dispatch = useDispatch();
  const sortedOrgUsers = useMemo(() => {
    return [...orgUsers].sort((a, b) => {
      if (a.role === ADMIN_ROLE) {
        return -1;
      } else if (b.role === ADMIN_ROLE) {
        return 1;
      } else {
        return b.joinTime - a.joinTime;
      }
    });
  }, [orgUsers]);

  useEffect(() => {
    dispatch(fetchOrgUsersAction(orgId));
  }, [dispatch, orgId]);

  return (
    <>
      <PermissionHeaderWrapper>
        <HeaderBack>
          <span onClick={() => history.push(PERMISSION_SETTING)}>{trans("settings.member")}</span>
          <ArrowIcon />
          <span>{trans("memberSettings.allMembers")}</span>
        </HeaderBack>
        <InviteDialog
          trigger={
            <AddMemberButton buttonType="primary" icon={<StyledMembersIcon />}>
              {trans("memberSettings.inviteUser")}
            </AddMemberButton>
          }
          style={{ marginLeft: "auto" }}
        />
      </PermissionHeaderWrapper>
      <TableStyled
        tableLayout={"auto"}
        scroll={{ x: "100%" }}
        dataSource={sortedOrgUsers}
        rowKey="userId"
        pagination={false}
        loading={orgUsersFetching}
      >
        <Column
          title={trans("memberSettings.nameColumn")}
          dataIndex="name"
          key="name"
          ellipsis
          render={(value, record: OrgUser) => (
            <UserTableCellWrapper>
              <ProfileImage source={record.avatarUrl} userName={record.name} side={34} />
              <span title={record.name}>{record.name}</span>
              {record.role === ADMIN_ROLE && <SuperUserIcon />}
            </UserTableCellWrapper>
          )}
        />
        <Column
          title={trans("memberSettings.joinTimeColumn")}
          dataIndex="joinTime"
          key="joinTime"
          render={(value) => <span>{formatTimestamp(value)}</span>}
          ellipsis
        />
        <Column
          title={trans("memberSettings.roleColumn")}
          dataIndex="role"
          key="role"
          className="role-table-cell"
          render={(value, record: OrgUser) => (
            <CustomSelect
              style={{ width: "96px", height: "32px" }}
              dropdownStyle={{ width: "149px" }}
              defaultValue={record.role}
              key={record.role}
              optionLabelProp="label"
              disabled={!currentOrgAdmin(currentUser) || currentUser.id === record.userId}
              onChange={(val) => {
                dispatch(
                  updateUserOrgRoleAction({
                    role: val,
                    userId: record.userId,
                    orgId: orgId,
                  })
                );
              }}
            >
              {TacoRoles.map((role) => (
                <CustomSelect.Option value={role} key={role} label={OrgRoleInfo[role].name}>
                  <RoleSelectTitle>{OrgRoleInfo[role].name}</RoleSelectTitle>
                  <RoleSelectSubTitle>{OrgRoleInfo[role].desc}</RoleSelectSubTitle>
                </CustomSelect.Option>
              ))}
            </CustomSelect>
          )}
        />
        <Column
          title={trans("memberSettings.actionColumn")}
          key="action"
          render={(value, record: OrgUser) => {
            return (
              <div className="operation-cell-div-wrapper">
                {record.userId === currentUser.id ? (
                  record.role === ADMIN_ROLE && adminCount === 1 ? (
                    <QuestionTooltip title={LAST_ADMIN_QUIT} />
                  ) : (
                    <span
                      onClick={() => {
                        dispatch(quitOrgAction(orgId));
                      }}
                    >
                      {trans("memberSettings.exitOrg")}
                    </span>
                  )
                ) : (
                  currentOrgAdmin(currentUser) && (
                    <span
                      onClick={() => {
                        dispatch(
                          deleteOrgUserAction({
                            userId: record.userId,
                            orgId: orgId,
                          })
                        );
                      }}
                    >
                      {trans("memberSettings.moveOutOrg")}
                    </span>
                  )
                )}
              </div>
            );
          }}
        />
      </TableStyled>
    </>
  );
}

const mapStateToProps = (state: AppState) => {
  return {
    orgUsersFetching: state.ui.org.orgUsersFetching,
    orgUsers: state.ui.org.orgUsers,
    currentUser: getUser(state),
  };
};

export default connect(mapStateToProps)(OrgUsersPermission);

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupsAction } from "redux/reduxActions/orgActions";
import { getUser } from "redux/selectors/usersSelectors";
import styled from "styled-components";
import GroupPermission from "./groupUsersPermission";
import UsersPermission from "./orgUsersPermission";
import { getOrgGroups } from "redux/selectors/orgSelectors";
import { useParams } from "react-router";

const PermissionContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 2200px;
  min-width: 600px;
  padding: 32px 24px 32px 12px;
  overflow: auto;
  width: 100%;
`;

const All_Users = "users";

export default function PermissionSetting() {
  const user = useSelector(getUser);
  const orgId = user.currentOrgId;
  const orgGroups = useSelector(getOrgGroups);
  const groupIdMap = new Map(orgGroups.map((group) => [group.groupId, group]));
  const dispatch = useDispatch();
  const selectKey = useParams<{ groupId: string }>().groupId;
  useEffect(() => {
    if (!orgId) {
      return;
    }
    dispatch(fetchGroupsAction(orgId));
  }, [orgId]);
  if (!orgId) {
    return null;
  }

  return (
    <PermissionContent key={selectKey}>
      {selectKey === All_Users ? (
        <UsersPermission orgId={orgId} />
      ) : (
        groupIdMap.has(selectKey) && (
          <GroupPermission group={groupIdMap.get(selectKey)!} orgId={orgId} />
        )
      )}
    </PermissionContent>
  );
}

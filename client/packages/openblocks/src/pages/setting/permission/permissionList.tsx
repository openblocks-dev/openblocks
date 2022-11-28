import { message, Typography } from "antd";
import OrgApi from "api/orgApi";
import { buildGroupId } from "constants/routesURL";
import { AddIcon, CustomModal, EditPopover } from "openblocks-design";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupsAction, updateGroupAction } from "redux/reduxActions/orgActions";
import { getCurrentUser } from "redux/selectors/usersSelectors";
import { getNextEntityName } from "util/stringUtils";
import { validateResponse } from "api/apiUtils";
import {
  GroupNameView,
  OperationWrapper,
  EditBtn,
  PopoverIcon,
  CreateButton,
} from "./styledComponents";
import { trans } from "i18n";
import { getOrgGroups } from "redux/selectors/orgSelectors";
import { Table } from "components/Table";
import history from "util/history";
import { currentOrgAdmin, isGroupAdmin, timestampToHumanReadable } from "openblocks-sdk";
import { Level1SettingPageContentWithList, Level1SettingPageTitleWithBtn } from "../styled";

const NEW_GROUP_PREFIX = trans("memberSettings.newGroupPrefix");

type DataItemInfo = {
  key: string;
  label: string;
  createTime: string | undefined;
  lock: boolean;
  del: boolean;
  rename: boolean;
};

export default function PermissionSetting() {
  const user = useSelector(getCurrentUser);
  const orgId = user.currentOrgId;
  const orgGroups = useSelector(getOrgGroups);
  const visibleOrgGroups = orgGroups.filter((g) => !g.allUsersGroup);
  const allUsersGroup = orgGroups.find((g) => g.allUsersGroup);
  const dispatch = useDispatch();
  const [needRenameId, setNeedRenameId] = useState<string | undefined>(undefined);
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
          setTimeout(() => {
            dispatch(fetchGroupsAction(orgId));
          }, 200);
        }
      })
      .catch((e) => {
        message.error(e.message);
      });
  };
  const handleGroupDelete = (groupId: string) => {
    OrgApi.deleteGroup(groupId)
      .then((resp) => {
        if (validateResponse(resp)) {
          dispatch(fetchGroupsAction(orgId));
        }
      })
      .catch((e) => {
        message.error(e.message);
      });
  };

  const dataSource: DataItemInfo[] = [
    {
      key: "users",
      label: trans("memberSettings.allMembers"),
      createTime: allUsersGroup?.createTime,
      lock: true,
      del: false,
      rename: false,
    },
  ];

  visibleOrgGroups.forEach((group) => {
    dataSource.push({
      key: group.groupId,
      label: group.groupName,
      createTime: group.createTime,
      lock: group.devGroup || false,
      del: currentOrgAdmin(user) && !group.devGroup,
      rename: isGroupAdmin(group.visitorRole) && !group.devGroup,
    });
  });

  return (
    <Level1SettingPageContentWithList>
      <Level1SettingPageTitleWithBtn>
        {trans("settings.member")}
        {currentOrgAdmin(user) && (
          <CreateButton
            buttonType={"primary"}
            icon={<AddIcon />}
            onClick={() => handleGroupCreate()}
          >
            {trans("memberSettings.createGroup")}
          </CreateButton>
        )}
      </Level1SettingPageTitleWithBtn>
      <div>
        <Table
          tableLayout={"auto"}
          scroll={{ x: "100%" }}
          pagination={false}
          onRow={(record) => ({
            onClick: () => history.push(buildGroupId((record as DataItemInfo).key)),
          })}
          columns={[
            {
              title: trans("memberSettings.groupName"),
              dataIndex: "groupName",
              ellipsis: true,
              render: (_, record: any) => {
                return (
                  <Typography.Text
                    title={record.groupName}
                    style={{ left: 0, margin: 0 }}
                    editable={{
                      enterIcon: null,
                      tooltip: false,
                      editing: record.key === needRenameId,
                      icon: null,
                      triggerType: ["text"],
                      onChange: (value) => {
                        if (!value.trim()) {
                          message.warn(trans("home.nameCheckMessage"));
                          return;
                        }
                        dispatch(
                          updateGroupAction({ groupId: record.key, groupName: value }, orgId)
                        );
                        setNeedRenameId(undefined);
                      },
                    }}
                  >
                    {record.key === needRenameId ? (
                      record.groupName
                    ) : (
                      <GroupNameView name={record.groupName} lock={record.lock} />
                    )}
                  </Typography.Text>
                );
              },
            },
            {
              title: trans("memberSettings.createTime"),
              dataIndex: "createTime",
              ellipsis: true,
              render: (value) => (
                <span style={{ color: "#8B8FA3" }}>{timestampToHumanReadable(value)}</span>
              ),
            },
            { title: " ", dataIndex: "operation", width: "238px" },
          ]}
          dataSource={dataSource.map((item, i) => ({
            key: item.key,
            groupName: item.label,
            createTime: item.createTime,
            lock: item.lock,
            operation: (
              <OperationWrapper>
                <EditBtn
                  className={"home-datasource-edit-button"}
                  buttonType={"primary"}
                  onClick={() => history.push(buildGroupId(item.key))}
                >
                  {trans("memberSettings.manageBtn")}
                </EditBtn>
                {(item.del || item.rename) && (
                  <EditPopover
                    del={
                      item.del
                        ? () => {
                            CustomModal.confirm({
                              title: trans("memberSettings.deleteModalTitle"),
                              content: trans("memberSettings.deleteModalContent"),
                              onConfirm: () => handleGroupDelete(item.key),
                              confirmBtnType: "delete",
                              okText: trans("delete"),
                            });
                          }
                        : undefined
                    }
                    rename={item.rename ? () => setNeedRenameId(item.key) : undefined}
                  >
                    <PopoverIcon tabIndex={-1} />
                  </EditPopover>
                )}
              </OperationWrapper>
            ),
          }))}
        />
      </div>
    </Level1SettingPageContentWithList>
  );
}

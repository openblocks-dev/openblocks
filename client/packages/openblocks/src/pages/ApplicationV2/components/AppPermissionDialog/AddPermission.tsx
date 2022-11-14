import { CommonTextLabel, CustomSelect, TacoButton } from "openblocks-design";
import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ProfileImage from "pages/common/profileImage";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupsAction, fetchOrgUsersAction } from "redux/reduxActions/orgActions";
import { getOrgGroups, getOrgUsers } from "redux/selectors/orgSelectors";
import { OrgGroup, OrgUser } from "constants/orgConstants";
import { getAppPermissionInfo } from "redux/selectors/applicationSelector";
import {
  ApplicationPermissionType,
  ApplicationRoles,
  ApplicationRoleType,
  AppPermissionItem,
} from "constants/applicationConstants";
import {
  AppPermissionModalContext,
  PermissionItemName,
  RoleSelectOption,
  StyledGroupIcon,
  StyledRoleSelect,
} from "./commonComponents";
import { AppPermissionList } from "./AppPermissionList";
import { getInitialsAndColorCode } from "util/stringUtils";
import { CustomTagProps } from "rc-select/lib/BaseSelect";
import { message, Tag } from "antd";
import { CloseIcon } from "openblocks-design";
import { CheckoutIcon } from "openblocks-design";
import { User } from "constants/userConstants";
import { getCurrentUser } from "redux/selectors/usersSelectors";
import { EmptyContent } from "pages/common/styledComponent";
import ApplicationApi from "api/applicationApi";
import { validateResponse } from "api/apiUtils";
import { SHARE_TITLE } from "constants/apiConstants";
import { trans } from "i18n";

const AddAppUserContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const AddPermissionDropDown = styled.div`
  margin: 8px -16px 0 -8px;

  > div {
    position: inherit !important;
  }

  .custom-ant-select-dropdown {
    height: 240px;
    position: inherit !important;
    box-shadow: none;
    border: none;
    padding: 0;

    .ant-select-item {
      width: 424px;
      transition: unset;
      padding: 0;

      .ant-select-item-option-state {
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
    }

    .rc-virtual-list-holder {
      overflow-y: overlay !important;

      ::-webkit-scrollbar {
        width: 16px;
      }

      ::-webkit-scrollbar-thumb {
        border: 5px solid transparent;
        background-clip: content-box;
        border-radius: 9999px;
        background-color: rgba(139, 143, 163, 0.12);
      }

      ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(139, 143, 163, 0.25);
      }
    }
  }
`;

const PermissionSelectWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 4px 8px;
  margin-top: 8px;
  background: #fdfdfd;
  outline: 1px solid #d7d9e0;
  border-radius: 4px;

  .ant-select {
    font-size: 13px;
    line-height: 13px;
  }

  :hover {
    outline: 1px solid #8b8fa3;
  }

  :focus-within {
    outline: 1px solid #315efb;
    border-radius: 4px;
    box-shadow: 0 0 0 3px rgb(24 144 255 / 20%);
  }

  .ant-select-selection-item {
    padding: 0;
    display: flex;
    align-items: center;
  }
`;

const AddPermissionsSelect = styled(CustomSelect)`
  width: 328px;
  max-height: 64px;
  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }

  &&& {
    .ant-select,
    .ant-select .ant-select-selector {
      width: 100%;
      border: none;
      box-shadow: none;
      padding: 0;
    }
  }

  .ant-select-selection-placeholder {
    color: #b8b9bf;
  }
`;
const OptionViewWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 0 8px 8px;
`;

const BottomButton = styled.div`
  margin: 4px 0 0 auto;
  display: flex;

  button {
    width: 76px;
    height: 28px;
  }
`;

const StyledTag = styled(Tag)`
  height: 24px;
  display: flex;
  background: #efeff1;
  border-radius: 12px;
  padding: 0 8px 0 3px;

  margin: 2px 0;

  .ant-tag-close-icon {
    display: flex;
    align-items: center;
    margin-left: 8px;

    :hover svg g line {
      stroke: #222222;
    }
  }
`;

const LabelProfileImage = styled(ProfileImage)`
  && > span {
    font-size: 1px;
    transform: scale(0.5, 0.5);
  }
`;

const AddRoleSelect = styled(StyledRoleSelect)<{ $isVisible: boolean }>`
  .ant-select {
    height: 24px;
  }

  display: ${(props) => (props.$isVisible ? "unset" : "none")};
`;

type AddAppOptionView = {
  type: ApplicationPermissionType;
  id: string;
  name: string;
  avatarUrl?: string;
};

type PermissionAddEntity = {
  id: string;
  type: ApplicationPermissionType;
  key: string;
};

/**
 * compose users and groups's permissions, filter the data
 *
 * @param orgGroups groups
 * @param orgUsers users
 * @param currentUser currentUser
 * @param existItems existedItems
 */
function getPermissionOptionView(
  orgGroups: OrgGroup[],
  orgUsers: OrgUser[],
  currentUser: User,
  existItems?: AppPermissionItem[]
) {
  let permissionViews: AddAppOptionView[] = orgGroups.map((group) => {
    return {
      type: "GROUP",
      id: group.groupId,
      name: group.groupName,
    };
  });
  permissionViews = permissionViews.concat(
    orgUsers.map((user) => {
      return {
        type: "USER",
        id: user.userId,
        name: user.name,
        avatarUrl: user.avatarUrl,
      };
    })
  );
  return existItems
    ? permissionViews
        .filter((v) => !existItems.find((i) => i.id === v.id && i.type === v.type))
        .filter((v) => !(v.type === "USER" && v.id === currentUser.id))
    : permissionViews;
}

function PermissionSelectorOption(props: { optionView: AddAppOptionView }) {
  const { optionView } = props;
  const groupIcon = optionView.type === "GROUP" && (
    <StyledGroupIcon color={getInitialsAndColorCode(optionView.name)[1]} />
  );
  return (
    <OptionViewWrapper>
      <ProfileImage
        userName={optionView.name}
        side={32}
        source={optionView.avatarUrl}
        svg={groupIcon}
      />
      <PermissionItemName title={optionView.name}>{optionView.name}</PermissionItemName>
    </OptionViewWrapper>
  );
}

function PermissionSelectorLabel(props: { view: AddAppOptionView }) {
  const { view } = props;
  const groupIcon = view.type === "GROUP" && (
    <StyledGroupIcon color={getInitialsAndColorCode(view.name)[1]} side={9} />
  );
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <LabelProfileImage userName={view.name} side={18} source={view.avatarUrl} svg={groupIcon} />
      <CommonTextLabel
        style={{
          marginLeft: "4px",
          maxWidth: "240px",
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          lineHeight: "15px",
        }}
      >
        {view.name}
      </CommonTextLabel>
    </div>
  );
}

function PermissionTagRender(props: CustomTagProps) {
  const { label, value, closable, onClose } = props;
  return (
    <StyledTag
      closeIcon={<CloseIcon style={{ width: "12px", height: "12px" }} />}
      color={value}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </StyledTag>
  );
}

function PermissionSelector(props: {
  selectedItems: PermissionAddEntity[];
  setSelectRole: (role: ApplicationRoleType) => void;
  setSelectedItems: (items: PermissionAddEntity[]) => void;
  user: User;
}) {
  const orgGroups = useSelector(getOrgGroups);
  const orgUsers = useSelector(getOrgUsers);
  const appPermissionInfo = useSelector(getAppPermissionInfo);
  const { selectedItems, setSelectRole, setSelectedItems, user } = props;
  const optionViews = getPermissionOptionView(
    orgGroups,
    orgUsers,
    user,
    appPermissionInfo?.permissions
  );
  const [roleSelectVisible, setRoleSelectVisible] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setRoleSelectVisible(selectedItems.length > 0);
    if (selectRef && selectRef.current) {
      selectRef.current.scrollTop = selectRef.current.scrollHeight;
    }
  }, [selectedItems]);
  return (
    <>
      <PermissionSelectWrapper>
        <AddPermissionsSelect
          open
          innerRef={selectRef}
          placeholder={trans("home.addPermissionPlaceholder")}
          mode="multiple"
          getPopupContainer={() => document.getElementById("add-app-user-permission-dropdown")!}
          optionLabelProp="label"
          tagRender={PermissionTagRender}
          listHeight={240}
          menuItemSelectedIcon={<CheckoutIcon />}
          notFoundContent={<EmptyContent style={{ paddingRight: "8px" }} />}
          onSelect={(value: any, option: any) => {
            setSelectedItems(
              selectedItems.concat({
                id: option.entityid,
                type: option.type,
                key: option.key,
              })
            );
          }}
          onDeselect={(value: any, option: any) => {
            setSelectedItems(selectedItems.filter((item) => item.key !== option.key));
          }}
        >
          {optionViews.map((view) => {
            return (
              <CustomSelect.Option
                key={`${view.type}-${view.id}`}
                entityid={view.id}
                type={view.type}
                value={view.name}
                label={<PermissionSelectorLabel view={view} />}
              >
                <PermissionSelectorOption optionView={view} />
              </CustomSelect.Option>
            );
          })}
        </AddPermissionsSelect>
        <AddRoleSelect
          dropdownStyle={{
            width: "100px",
          }}
          $isVisible={roleSelectVisible}
          bordered={false}
          defaultValue={ApplicationRoles[0].key}
          optionLabelProp="label"
          onChange={(value) => setSelectRole(value)}
        >
          {ApplicationRoles.map((role) => (
            <CustomSelect.Option key={role.key} value={role.key} label={role.value}>
              <RoleSelectOption role={role.value} />
            </CustomSelect.Option>
          ))}
        </AddRoleSelect>
      </PermissionSelectWrapper>
      <AddPermissionDropDown id="add-app-user-permission-dropdown" />
    </>
  );
}

export function AddPermission() {
  const dispatch = useDispatch();
  const { changeContent, applicationId } = useContext(AppPermissionModalContext);
  const user = useSelector(getCurrentUser);
  const [selectRole, setSelectRole] = useState<ApplicationRoleType>("viewer");
  const [selectedItems, setSelectedItems] = useState<PermissionAddEntity[]>([]);
  const toPermissionList = () => changeContent(AppPermissionList, false, SHARE_TITLE);
  useEffect(() => {
    dispatch(fetchOrgUsersAction(user.currentOrgId));
    dispatch(fetchGroupsAction(user.currentOrgId));
  }, []);

  return (
    <AddAppUserContent>
      <CommonTextLabel style={{ marginTop: "16px" }}>
        {trans("home.searchMemberOrGroup")}
      </CommonTextLabel>
      <PermissionSelector
        selectedItems={selectedItems}
        setSelectRole={setSelectRole}
        setSelectedItems={setSelectedItems}
        user={user}
      />
      <BottomButton>
        <TacoButton style={{ marginRight: "8px" }} onClick={toPermissionList}>
          {trans("cancel") + " "}
        </TacoButton>
        <TacoButton
          buttonType="primary"
          onClick={() => {
            const uids = selectedItems
              .filter((item) => item.type === "USER")
              .map((item) => item.id);
            const gids = selectedItems
              .filter((item) => item.type === "GROUP")
              .map((item) => item.id);
            if (uids.length === 0 && gids.length === 0) {
              toPermissionList();
              return;
            }
            ApplicationApi.grantAppPermission({
              applicationId: applicationId,
              userIds: uids,
              groupIds: gids,
              role: selectRole,
            })
              .then((resp) => {
                if (validateResponse(resp)) {
                  toPermissionList();
                }
              })
              .catch((e) => {
                message.error(trans("home.addPermissionErrorMessage", { message: e.message }));
              });
          }}
        >
          {trans("finish") + " "}
        </TacoButton>
      </BottomButton>
    </AddAppUserContent>
  );
}

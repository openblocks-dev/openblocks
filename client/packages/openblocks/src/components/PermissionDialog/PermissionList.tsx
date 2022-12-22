import { ASSETS_URI } from "constants/apiConstants";
import { ApplicationPermissionType, ApplicationRoleType } from "constants/applicationConstants";
import {
  CommonErrorLabel,
  CommonGrayLabel,
  CommonTextLabel,
  CustomSelect,
} from "openblocks-design";
import {
  PermissionItemName,
  RoleSelectOption,
  StyledAdminIcon,
  StyledGroupIcon,
  StyledRoleSelect,
} from "./commonComponents";
import ProfileImage from "pages/common/profileImage";
import styled from "styled-components";
import { getInitialsAndColorCode } from "util/stringUtils";
import { trans } from "i18n";
import { PermissionRole } from "./Permission";

const PermissionLi = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 8px;
  width: 424px;

  :hover {
    background: #f2f7fc;
    border-radius: 4px;
  }
`;

const UserPermissionUl = styled.ul<{ height: number }>`
  padding: 0;
  height: ${(props) => props.height}px;
  overflow-y: overlay !important;
  overflow-x: hidden;
  margin: 0 -16px 0 -8px;

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
`;

const CreatorTag = styled.div`
  background: #ffffff;
  border: 1px solid #d6e4ff;
  border-radius: 8px;

  font-size: 12px;
  color: #4965f2;
  line-height: 12px;
  width: fit-content;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  padding: 0 4px;
`;

export interface PermissionItem {
  permissionId: string;
  type: ApplicationPermissionType;
  id: string;
  avatar?: string;
  role: ApplicationRoleType;
  name: string;
}

function PermissionLiItem(props: {
  ownerLabel: string;
  supportRoles: { label: string; value: PermissionRole }[];
  permissionItem: PermissionItem;
  isCreator?: boolean;
  updatePermission: (permissionId: string, role: string) => void;
  deletePermission: (permissionId: string) => void;
}) {
  const { permissionItem, isCreator } = props;
  let SvgIcon;
  if (permissionItem.type === "GROUP") {
    SvgIcon = StyledGroupIcon;
  } else if (permissionItem.type === "ORG_ADMIN") {
    SvgIcon = StyledAdminIcon;
  }
  return (
    <PermissionLi key={permissionItem.permissionId}>
      <ProfileImage
        side={32}
        userName={permissionItem.name}
        source={permissionItem.avatar && ASSETS_URI(permissionItem.avatar)}
        svg={SvgIcon && <SvgIcon color={getInitialsAndColorCode(permissionItem.name)[1]} />}
      />
      <PermissionItemName title={permissionItem.name}>
        {permissionItem.type === "GROUP" && trans("home.groupWithSquareBrackets")}
        {permissionItem.name}
      </PermissionItemName>
      {isCreator && <CreatorTag>{trans("home.creator")}</CreatorTag>}
      {isCreator || permissionItem.type === "ORG_ADMIN" ? (
        <CommonGrayLabel style={{ color: "color: #B8B9BF", margin: "0 24px 0 auto" }}>
          {props.ownerLabel}
        </CommonGrayLabel>
      ) : (
        <StyledRoleSelect
          style={{ marginRight: "4px" }}
          dropdownStyle={{
            width: "100px",
          }}
          defaultValue={permissionItem.role}
          bordered={false}
          optionLabelProp="label"
          onSelect={(value: any, option: any) => {
            if (option.key === "delete") {
              props.deletePermission(option.permissionid);
            } else {
              props.updatePermission(option.permissionid, option.key);
            }
          }}
        >
          {props.supportRoles.map((role) => (
            <CustomSelect.Option
              key={role.value}
              label={role.label}
              value={role.value}
              permissionid={permissionItem.permissionId}
            >
              <RoleSelectOption role={role.label} />
            </CustomSelect.Option>
          ))}
          <CustomSelect.Option
            key="delete"
            label={trans("remove")}
            value="delete"
            permissionid={permissionItem.permissionId}
          >
            <CommonErrorLabel fontSize={13}>{trans("remove")}</CommonErrorLabel>
          </CustomSelect.Option>
        </StyledRoleSelect>
      )}
    </PermissionLi>
  );
}

export type PermissionItemsType = { permissionItem: PermissionItem; isCreator?: boolean }[];
export const PermissionList = (props: {
  ownerLabel: string;
  supportRoles: { label: string; value: PermissionRole }[];
  permissionItems: PermissionItemsType;
  updatePermission: (permissionId: string, role: string) => void;
  deletePermission: (permissionId: string) => void;
}) => (
  <>
    <CommonTextLabel style={{ marginBottom: "4px" }}>
      {trans("home.memberPermissionList")}
    </CommonTextLabel>
    <UserPermissionUl height={201}>
      {props.permissionItems.map((item, index) => (
        <PermissionLiItem
          key={index}
          isCreator={item.isCreator}
          permissionItem={item.permissionItem}
          {...props}
        />
      ))}
    </UserPermissionUl>
  </>
);

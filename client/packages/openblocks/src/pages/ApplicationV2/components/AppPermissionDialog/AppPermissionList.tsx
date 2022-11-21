import { ASSETS_URI } from "constants/apiConstants";
import {
  ApplicationRoles,
  AppPermissionInfo,
  AppPermissionItem,
  AppTypeEnum,
} from "constants/applicationConstants";
import {
  CommonErrorLabel,
  CommonGrayLabel,
  CommonTextLabel,
  CustomSelect,
  TacoButton,
  TacoInput,
} from "openblocks-design";
import { AddPermission } from "./AddPermission";
import {
  AppPermissionModalContext,
  PermissionItemName,
  RoleSelectOption,
  StyledAdminIcon,
  StyledGroupIcon,
  StyledLoading,
  StyledRoleSelect,
} from "./commonComponents";
import ProfileImage from "pages/common/profileImage";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAppPermission,
  fetchApplicationPermissions,
  updateAppPermission,
} from "redux/reduxActions/applicationActions";
import { getAppPermissionInfo } from "redux/selectors/applicationSelector";
import styled from "styled-components";
import { getInitialsAndColorCode } from "util/stringUtils";
import { AddIcon, TacoSwitch } from "openblocks-design";
import { GreyTextColor } from "constants/style";
import ApplicationApi from "api/applicationApi";
import { validateResponse } from "api/apiUtils";
import { APPLICATION_VIEW_URL } from "constants/routesURL";
import { message } from "antd";
import copy from "copy-to-clipboard";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import { trans } from "i18n";

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
  width: 48px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

const BottomWrapper = styled.div`
  margin-top: 12px;
  display: flex;
`;

const AddPermissionButton = styled(TacoButton)`
  &,
  :hover,
  :focus {
    border: none;
    box-shadow: none;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 14px;
    background: #ffffff;
    transition: unset;
  }

  svg {
    margin-right: 4px;
  }

  :hover {
    color: #315efb;

    svg g path {
      fill: #315efb;
    }
  }
`;

const PermissionSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const InviteInputBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;

  button {
    width: 76px;
  }
`;

function PermissionLiItem(props: {
  permissionItem: AppPermissionItem;
  applicationId: string;
  isCreator?: boolean;
}) {
  const { permissionItem, applicationId, isCreator } = props;
  const dispatch = useDispatch();
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
          {trans("home.allPermissions")}
        </CommonGrayLabel>
      ) : (
        <StyledRoleSelect
          dropdownStyle={{
            width: "100px",
          }}
          defaultValue={permissionItem.role}
          bordered={false}
          optionLabelProp="label"
          onSelect={(value: any, option: any) => {
            if (option.key === "delete") {
              dispatch(
                deleteAppPermission({
                  applicationId: applicationId,
                  permissionId: option.permissionid,
                })
              );
            } else {
              dispatch(
                updateAppPermission({
                  applicationId: applicationId,
                  role: option.key,
                  permissionId: option.permissionid,
                })
              );
            }
          }}
        >
          {ApplicationRoles.map((role) => (
            <CustomSelect.Option
              key={role.key}
              label={role.value}
              value={role.key}
              permissionid={permissionItem.permissionId}
            >
              <RoleSelectOption role={role.value} />
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

function AppInviteView(props: { appId: string }) {
  const inviteLink = window.location.origin + APPLICATION_VIEW_URL(props.appId, "view");
  return (
    <>
      <CommonTextLabel style={{ marginTop: "16px" }}>{trans("home.shareLink")}</CommonTextLabel>
      <InviteInputBtn>
        <TacoInput disabled value={inviteLink} />
        <TacoButton
          buttonType="primary"
          onClick={() => {
            if (copy(inviteLink)) {
              message.success(trans("home.copySuccess"));
            } else {
              message.error(trans("home.copyErrorMessage"));
            }
          }}
        >
          {trans("home.copyLink")}
        </TacoButton>
      </InviteInputBtn>
    </>
  );
}

function AppShareView(props: {
  applicationId: string;
  permissionInfo: AppPermissionInfo;
  isModule: boolean;
}) {
  const { applicationId, permissionInfo, isModule } = props;
  const [isPublic, setPublic] = useState(permissionInfo.publicToAll);
  useEffect(() => {
    setPublic(permissionInfo.publicToAll);
  }, [permissionInfo.publicToAll]);
  return (
    <div style={{ marginBottom: "22px" }}>
      <PermissionSwitchWrapper>
        <TacoSwitch
          checked={isPublic}
          onChange={(checked) => {
            setPublic(checked);
            ApplicationApi.publicToAll(applicationId, checked)
              .then((resp) => {
                validateResponse(resp);
              })
              .catch((e) => {
                message.error(e.message);
              });
          }}
          label={isModule ? trans("home.modulePublicMessage") : trans("home.appPublicMessage")}
        />
      </PermissionSwitchWrapper>
      {isPublic && <AppInviteView appId={applicationId} />}
    </div>
  );
}

export function AppPermissionList() {
  const appPermissionInfo = useSelector(getAppPermissionInfo);
  const { applicationId, changeContent, setModalVisible } = useContext(AppPermissionModalContext);
  const { appType } = useContext(ExternalEditorContext);
  const isModule = appType === AppTypeEnum.Module;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchApplicationPermissions({ applicationId: applicationId }));
  }, [applicationId, dispatch]);

  if (!appPermissionInfo) {
    return <StyledLoading size={18} />;
  }
  const creator = appPermissionInfo.permissions.find(
    (p) => p.type === "USER" && p.id === appPermissionInfo.creatorId
  );

  return (
    <>
      <AppShareView
        isModule={isModule}
        applicationId={applicationId}
        permissionInfo={appPermissionInfo}
      />
      <CommonTextLabel style={{ marginBottom: "4px" }}>
        {trans("home.memberPermissionList")}
      </CommonTextLabel>
      <UserPermissionUl height={201}>
        {creator && (
          <PermissionLiItem isCreator permissionItem={creator} applicationId={applicationId} />
        )}
        {
          <PermissionLiItem
            permissionItem={{
              permissionId: "orgAdmin",
              id: "orgAdmin",
              role: "owner",
              name: trans("home.orgName", { orgName: appPermissionInfo.orgName }),
              type: "ORG_ADMIN",
            }}
            applicationId={applicationId}
          />
        }
        {appPermissionInfo.permissions
          .filter((p) => !(p.type === "USER" && p.id === appPermissionInfo.creatorId))
          .map((p) => (
            <PermissionLiItem
              key={p.type + "-" + p.id}
              permissionItem={p}
              applicationId={applicationId}
            />
          ))}
      </UserPermissionUl>
      <BottomWrapper>
        <AddPermissionButton
          style={{ width: 95, height: 28 }}
          icon={<AddIcon style={{ color: GreyTextColor }} />}
          onClick={() => {
            changeContent(AddPermission, true, trans("home.addMember"));
          }}
        >
          {trans("home.addMember")}
        </AddPermissionButton>
        <TacoButton
          buttonType="primary"
          onClick={() => setModalVisible(false)}
          style={{ marginLeft: "auto", width: "76px", height: "28px" }}
        >
          {trans("finish") + " "}
        </TacoButton>
      </BottomWrapper>
    </>
  );
}

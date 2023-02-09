import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppPermissionInfo } from "../../redux/selectors/applicationSelector";
import { ExternalEditorContext } from "../../util/context/ExternalEditorContext";
import {
  ApplicationRoleType,
  AppPermissionInfo,
  AppTypeEnum,
} from "../../constants/applicationConstants";
import {
  deleteAppPermission,
  fetchApplicationPermissions,
  updateAppPermission,
  updateAppPermissionInfo,
} from "../../redux/reduxActions/applicationActions";
import { PermissionItemsType } from "./PermissionList";
import { trans } from "../../i18n";
import ApplicationApi from "../../api/applicationApi";
import { validateResponse } from "../../api/apiUtils";
import { message } from "antd";
import { PermissionDialog } from "./PermissionDialog";
import { TacoSwitch } from "components/Switch";
import styled from "styled-components";
import { APPLICATION_VIEW_URL } from "../../constants/routesURL";
import { CommonTextLabel } from "components/Label";
import { TacoInput } from "components/tacoInput";
import { TacoButton } from "components/button";
import copy from "copy-to-clipboard";
import { StyledLoading } from "./commonComponents";
import { PermissionRole } from "./Permission";
import { SHARE_TITLE } from "../../constants/apiConstants";

export const AppPermissionDialog = (props: {
  applicationId: string;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}) => {
  const { applicationId } = props;
  const dispatch = useDispatch();
  const appPermissionInfo = useSelector(getAppPermissionInfo);

  const { appType } = useContext(ExternalEditorContext);
  const isModule = appType === AppTypeEnum.Module;

  useEffect(() => {
    dispatch(fetchApplicationPermissions({ applicationId: applicationId }));
  }, [applicationId, dispatch]);

  let permissions: PermissionItemsType = [];
  if (appPermissionInfo) {
    const creator = appPermissionInfo.permissions.find(
      (p) => p.type === "USER" && p.id === appPermissionInfo.creatorId
    );

    permissions = [
      {
        permissionItem: {
          permissionId: "orgAdmin",
          id: "orgAdmin",
          role: "owner",
          name: trans("home.orgName", { orgName: appPermissionInfo.orgName }),
          type: "ORG_ADMIN",
        },
      },
      ...appPermissionInfo.permissions
        .filter((p) => !(p.type === "USER" && p.id === appPermissionInfo.creatorId))
        .map((p) => ({
          permissionItem: p,
        })),
    ];
    if (creator) {
      permissions = [
        {
          isCreator: true,
          permissionItem: creator,
        },
        ...permissions,
      ];
    }
  }

  return (
    <PermissionDialog
      {...props}
      title={SHARE_TITLE}
      ownerLabel={trans("home.allPermissions")}
      viewBodyRender={(list) => {
        if (!appPermissionInfo) {
          return <StyledLoading size={18} />;
        }
        return (
          <>
            <AppShareView
              isModule={isModule}
              applicationId={applicationId}
              permissionInfo={appPermissionInfo!}
            />
            {list}
          </>
        );
      }}
      supportRoles={[
        { label: trans("share.viewer"), value: PermissionRole.Viewer },
        {
          label: trans("share.editor"),
          value: PermissionRole.Editor,
        },
        {
          label: trans("share.owner"),
          value: PermissionRole.Owner,
        },
      ]}
      permissionItems={permissions}
      addPermission={(userIds, groupIds, role, onSuccess) =>
        ApplicationApi.grantAppPermission({
          applicationId: applicationId,
          userIds: userIds,
          groupIds: groupIds,
          role: role as any,
        })
          .then((resp) => {
            if (validateResponse(resp)) {
              dispatch(fetchApplicationPermissions({ applicationId: applicationId }));
              onSuccess();
            }
          })
          .catch((e) => {
            message.error(trans("home.addPermissionErrorMessage", { message: e.message }));
          })
      }
      updatePermission={(permissionId, role) =>
        dispatch(
          updateAppPermission({
            applicationId: applicationId,
            role: role as ApplicationRoleType,
            permissionId: permissionId,
          })
        )
      }
      deletePermission={(permissionId) =>
        dispatch(
          deleteAppPermission({
            applicationId: applicationId,
            permissionId: permissionId,
          })
        )
      }
    />
  );
};

const InviteInputBtn = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;

  button {
    width: 76px;
  }
`;

const AppInviteView = (props: { appId: string }) => {
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
              message.success(trans("copySuccess"));
            } else {
              message.error(trans("copyError"));
            }
          }}
        >
          {trans("home.copyLink")}
        </TacoButton>
      </InviteInputBtn>
    </>
  );
};

const PermissionSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

function AppShareView(props: {
  applicationId: string;
  permissionInfo: AppPermissionInfo;
  isModule: boolean;
}) {
  const { applicationId, permissionInfo, isModule } = props;
  const [isPublic, setPublic] = useState(permissionInfo.publicToAll);
  const dispatch = useDispatch();
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
                dispatch(updateAppPermissionInfo({ publicToAll: checked }));
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

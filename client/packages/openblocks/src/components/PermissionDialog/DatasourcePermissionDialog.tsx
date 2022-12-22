import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PermissionItemsType } from "./PermissionList";
import { trans } from "../../i18n";
import { PermissionDialog } from "./PermissionDialog";
import {
  deleteDatasourcePermission,
  fetchDatasourcePermissions,
  grantDatasourcePermission,
  updateDatasourcePermission,
} from "../../redux/reduxActions/datasourcePermissionActions";
import { DatasourceRole } from "../../api/datasourcePermissionApi";
import { getDataSourcePermissionInfo } from "../../redux/selectors/datasourceSelectors";
import { StyledLoading } from "./commonComponents";
import { PermissionRole } from "./Permission";

export const DatasourcePermissionDialog = (props: {
  datasourceId: string;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
}) => {
  const { datasourceId } = props;
  const dispatch = useDispatch();
  const permissionInfo = useSelector(getDataSourcePermissionInfo)[datasourceId];

  useEffect(() => {
    dispatch(fetchDatasourcePermissions({ datasourceId: datasourceId }));
  }, [datasourceId, dispatch]);

  let permissions: PermissionItemsType = [];
  if (permissionInfo) {
    const creator = permissionInfo.userPermissions.find(
      (p) => p.type === "USER" && p.id === permissionInfo.creatorId
    );

    permissions = [
      {
        permissionItem: {
          permissionId: "orgAdmin",
          id: "orgAdmin",
          role: "owner",
          name: trans("home.orgName", { orgName: permissionInfo.orgName }),
          type: "ORG_ADMIN",
        },
      },
      ...permissionInfo.groupPermissions.map((p) => ({
        permissionItem: p,
      })),
      ...permissionInfo.userPermissions
        .filter((p) => !(p.type === "USER" && p.id === permissionInfo.creatorId))
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
      title={trans("accessControl")}
      ownerLabel={trans("share.datasourceOwner")}
      supportRoles={[
        {
          label: trans("share.datasourceViewer"),
          value: PermissionRole.Viewer,
        },
        { label: trans("share.datasourceOwner"), value: PermissionRole.Owner },
      ]}
      permissionItems={permissions}
      viewBodyRender={(list) => {
        if (!permissionInfo) {
          return <StyledLoading size={18} />;
        }
        return list;
      }}
      addPermission={(userIds, groupIds, role, onSuccess) => {
        dispatch(
          grantDatasourcePermission(
            {
              datasourceId: datasourceId,
              userIds: userIds,
              groupIds: groupIds,
              role: role as any,
            },
            () => onSuccess()
          )
        );
      }}
      updatePermission={(permissionId, role) =>
        dispatch(
          updateDatasourcePermission({
            datasourceId: datasourceId,
            role: role as DatasourceRole,
            permissionId: permissionId,
          })
        )
      }
      deletePermission={(permissionId) => {
        dispatch(
          deleteDatasourcePermission({
            datasourceId: datasourceId,
            permissionId: permissionId,
          })
        );
      }}
    />
  );
};

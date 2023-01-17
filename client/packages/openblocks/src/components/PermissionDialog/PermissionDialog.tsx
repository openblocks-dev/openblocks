import React, { ReactNode, useState } from "react";
import { PermissionItemsType, PermissionList } from "./PermissionList";
import StepModal from "../StepModal";
import { trans } from "../../i18n";
import { TacoButton } from "components/button";
import { AddIcon } from "icons";
import { GreyTextColor } from "constants/style";
import { Permission, PermissionRole } from "./Permission";
import styled from "styled-components";

const BottomWrapper = styled.div`
  margin: 12px 16px 0 16px;
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

export const PermissionDialog = (props: {
  title: string;
  ownerLabel: string;
  visible: boolean;
  onVisibleChange: (visible: boolean) => void;
  viewBodyRender?: (list: ReactNode) => ReactNode;
  permissionItems: PermissionItemsType;
  supportRoles: { label: string; value: PermissionRole }[];
  addPermission: (
    userIds: string[],
    groupIds: string[],
    role: string,
    onSuccess: () => void
  ) => void;
  updatePermission: (permissionId: string, role: string) => void;
  deletePermission: (permissionId: string) => void;
}) => {
  const { supportRoles, permissionItems, visible, onVisibleChange, addPermission, viewBodyRender } =
    props;
  const [activeStepKey, setActiveStepKey] = useState("view");

  return (
    <StepModal
      visible={visible}
      destroyOnClose
      onCancel={() => {
        setActiveStepKey("view");
        onVisibleChange(false);
      }}
      showOkButton={false}
      showCancelButton={false}
      width="440px"
      onStepChange={setActiveStepKey}
      activeStepKey={activeStepKey}
      steps={[
        {
          key: "view",
          titleRender: () => props.title,
          bodyRender: () =>
            viewBodyRender ? (
              viewBodyRender(<PermissionList {...props} />)
            ) : (
              <PermissionList {...props} />
            ),
          footerRender: (props) => (
            <BottomWrapper>
              <AddPermissionButton
                style={{ height: 28 }}
                icon={<AddIcon style={{ color: GreyTextColor }} />}
                onClick={() => {
                  props.next();
                }}
              >
                {trans("home.addMember")}
              </AddPermissionButton>
              <TacoButton
                buttonType="primary"
                onClick={() => onVisibleChange(false)}
                style={{ marginLeft: "auto", width: "76px", height: "28px" }}
              >
                {trans("finish") + " "}
              </TacoButton>
            </BottomWrapper>
          ),
        },
        {
          key: "add",
          titleRender: () => trans("home.addMember"),
          bodyRender: (props) => (
            <Permission
              supportRoles={supportRoles}
              filterItems={permissionItems.map((i) => i.permissionItem)}
              onCancel={props.back}
              addPermission={(userIds, groupIds, role) =>
                addPermission(userIds, groupIds, role, props.back)
              }
            />
          ),
          footerRender: (props) => null,
        },
      ]}
    />
  );
};

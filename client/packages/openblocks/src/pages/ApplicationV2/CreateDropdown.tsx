import { HomeResTypeEnum } from "../../types/homeRes";
import { AppImport } from "./components/AppImport";
import { ImportIconV2, PackUpIcon, TacoButton } from "openblocks-design";
import React, { useState } from "react";
import { ItemType } from "antd/lib/menu/hooks/useItems";
import { HomeResInfo } from "../../util/homeResUtils";
import { createAppItemClass } from "../tutorials/HomeTutorialsV2";
import styled from "styled-components";
import { Dropdown as AntdDropdown, Menu as AntdMenu } from "antd";
import { HomeLayoutMode } from "./HomeLayout";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/selectors/usersSelectors";
import { useCreateHomeRes } from "./useCreateHomeRes";
import { trans } from "../../i18n";

const Dropdown = styled(AntdDropdown)`
  &:not(.ant-dropdown-open) > svg {
    transform: rotate(-180deg);
  }
`;

const CreateDropdownMenu = styled(AntdMenu)`
  width: fit-content;
  min-width: 110px;
  padding: 8px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  .ant-dropdown-menu-item,
  .ant-dropdown-menu-submenu-title {
    padding: 8px;
    display: flex;
    align-items: center;
  }

  .ant-dropdown-menu-item:hover,
  .ant-dropdown-menu-submenu-title:hover {
    background: #f2f7fc;
    border-radius: 4px;
  }

  .ant-dropdown-menu-title-content {
    font-size: 13px;
    color: #333333;
    line-height: 13px;
  }
`;

const CreateMenuItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 13px;
  line-height: 13px;
  height: 16px;
`;

const CreateBtn = styled(TacoButton)`
  width: 96px;
  height: 32px;
  padding: 0;
  margin-left: 12px;

  & > svg {
    width: 16px;
    height: 16px;

    path {
      fill: white;
    }
  }
`;

export const CreateDropdown = (props: { defaultVisible?: boolean; mode: HomeLayoutMode }) => {
  const { defaultVisible, mode } = props;
  const [createDropdownVisible, setCreateDropdownVisible] = useState(false);

  const user = useSelector(getUser);

  const [handleCreate, isCreating] = useCreateHomeRes();

  const getCreateMenuItem = (type: HomeResTypeEnum, mode?: HomeLayoutMode): ItemType => {
    if (
      (type === HomeResTypeEnum.Application ||
        type === HomeResTypeEnum.NavLayout ||
        type === HomeResTypeEnum.Module) &&
      !(mode === "view" || mode === "module" || mode === "folder")
    ) {
      return null;
    }

    if (
      type === HomeResTypeEnum.Folder &&
      !(mode === "view" || mode === "module" || mode === "folders")
    ) {
      return null;
    }

    const Icon = HomeResInfo[type].icon;
    return {
      label: (
        <CreateMenuItem
          className={type === HomeResTypeEnum.Application ? createAppItemClass : undefined}
        >
          {Icon && <Icon style={{ width: "16px", height: "16px", marginRight: "4px" }} />}
          {HomeResInfo[type].name}
        </CreateMenuItem>
      ),
      key: type,
      onClick: () => handleCreate(type),
    };
  };

  return (
    <Dropdown
      visible={createDropdownVisible || defaultVisible}
      trigger={["hover"]}
      getPopupContainer={(node) => node}
      onVisibleChange={() => setCreateDropdownVisible(!createDropdownVisible)}
      overlay={
        <CreateDropdownMenu
          items={[
            getCreateMenuItem(HomeResTypeEnum.Application, mode),
            getCreateMenuItem(HomeResTypeEnum.Module, mode),
            getCreateMenuItem(HomeResTypeEnum.NavLayout, mode),
            getCreateMenuItem(HomeResTypeEnum.Folder, mode),
            mode === "view" || mode === "module" || mode === "folder"
              ? {
                  label: (
                    <AppImport orgId={user.currentOrgId}>
                      <CreateMenuItem>
                        <ImportIconV2 width="16px" height="16px" style={{ marginRight: "4px" }} />
                        {trans("home.import")}
                      </CreateMenuItem>
                    </AppImport>
                  ),
                  key: "import",
                  style: { height: "32px" },
                }
              : null,
          ]}
        />
      }
    >
      <CreateBtn buttonType={"primary"}>
        {isCreating ? trans("home.creating") : trans("newItem")}
        <PackUpIcon />
      </CreateBtn>
    </Dropdown>
  );
};

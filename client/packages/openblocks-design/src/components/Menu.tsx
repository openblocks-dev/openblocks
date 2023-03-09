import { Menu as AntdMenu, MenuProps, SubMenuProps } from "antd";
import { NormalMenuIconColor, TabActiveColor } from "constants/style";
import { ReactComponent as AddIcon } from "icons/icon-add.svg";
import { ReactComponent as RecycleBinIcon } from "icons/icon-recycle-bin.svg";
import styled from "styled-components";

const MenuItemWrapper = styled.div`
  width: 100%;
  display: flex;

  .menu-recycle-bin-icon {
    display: none;
    width: 16px;
    height: 16px;
    position: absolute;
    right: 12px;
  }

  .menu-recycle-bin-icon:hover g g {
    stroke: #315efb;
  }
`;

const StyledAntdMenu = styled(AntdMenu)`
  border-right: none;

  .ant-menu-item {
    & > svg {
      color: ${NormalMenuIconColor};
    }

    .ant-menu-title-content {
      display: flex;
      align-items: center;
    }

    height: fit-content;

    font-size: 14px;
    color: #222222;
    line-height: 16px;
    padding: 10px 12px !important;
  }

  .ant-menu-item:active:hover {
    background: none;
  }

  .ant-menu-item:hover {
    color: #222222;
    background: #f5f5f6;
    border-radius: 8px;

    .menu-recycle-bin-icon {
      display: inline;
    }

    & > svg {
      color: ${TabActiveColor};
    }
  }

  .ant-menu-item-selected {
    border-radius: 8px;
    font-weight: 500;
    background-color: #f5f5f6 !important;

    & > svg {
      color: ${TabActiveColor};
    }
  }

  .ant-menu-item-selected::after {
    display: none;
  }

  .ant-menu-item:focus-visible {
    box-shadow: unset;
  }

  .ant-menu-item-disabled .text {
    color: #b8b9bf;
    & + span {
      opacity: 0.4;
    }
  }
`;

const MenuItemContentWrapper = styled.div`
  width: calc(100% - 22px);
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StyledCreateBtn = styled.button`
  display: flex;
  align-items: center;

  font-size: 14px;
  color: #8b8fa3;
  line-height: 14px;
  background: #ffffff;
  border: none;
  margin-left: 12px;
  padding: 0;
  cursor: pointer;
  height: 40px;

  :hover {
    color: #315efb;

    svg g path {
      fill: #315efb;
    }
  }
`;

const DropDownMenuItemCss = `
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
    svg g path {
      fill: #315efb;
    }
  }
  .ant-dropdown-menu-title-content {
    
    font-size: 13px;
    color: #333333;
    line-height: 13px;
  }
`;

const DropdownMenu = styled(AntdMenu)`
  padding: 8px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  ${DropDownMenuItemCss}
`;
const StyleableDropDownSubMenu = (props: { className?: string } & SubMenuProps) => {
  const { className, ...restProps } = props;
  return <AntdMenu.SubMenu popupClassName={className} {...restProps} />;
};

const DropDownSubMenu = styled(StyleableDropDownSubMenu)`
  .ant-dropdown-menu.ant-dropdown-menu-sub {
    margin-right: 8px;
    padding: 8px;
    background: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  .ant-dropdown-menu-item-icon {
    margin-right: 4px;
  }

  ${DropDownMenuItemCss}
`;

type CustomMenuProps = {
  createBtnConfig?: {
    text: string;
    onClick: () => void;
  };
};

/**
 * set delete button when hover for antd Menu
 */
function Menu(props: MenuProps & CustomMenuProps) {
  const { createBtnConfig, ...restProps } = props;
  return (
    <>
      <StyledAntdMenu theme="light" {...restProps} />
      {createBtnConfig && (
        <StyledCreateBtn onClick={createBtnConfig.onClick}>
          {createBtnConfig.text}
          <AddIcon style={{ marginLeft: "4px" }} />
        </StyledCreateBtn>
      )}
    </>
  );
}

export function MenuItemWithDelete(props: {
  showDelete?: boolean;
  onDelete?: () => void;
  children?: JSX.Element | React.ReactNode;
}) {
  const { showDelete, onDelete, children } = props;
  return (
    <MenuItemWrapper>
      <MenuItemContentWrapper>{children}</MenuItemContentWrapper>
      {showDelete && <RecycleBinIcon className="menu-recycle-bin-icon" onClick={onDelete} />}
    </MenuItemWrapper>
  );
}

export { Menu, DropdownMenu, DropDownSubMenu };

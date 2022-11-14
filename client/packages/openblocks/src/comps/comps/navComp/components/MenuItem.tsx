import { ActiveTextColor, GreyTextColor } from "constants/style";
import { EditPopover, SimplePopover } from "openblocks-design";
import { PointIcon } from "openblocks-design";
import React, { HTMLAttributes, useState } from "react";
import styled from "styled-components";
import DraggableItem from "./DraggableItem";
import { NavCompType } from "comps/comps/navComp/components/types";
import { trans } from "i18n";

export interface ICommonItemProps {
  path: number[];
  item: NavCompType;
  dropInAsSub?: boolean;
  onDelete?: (path: number[]) => void;
  onAddSubMenu?: (path: number[], value?: any) => void;
}

interface IMenuItemProps extends ICommonItemProps, Omit<HTMLAttributes<HTMLDivElement>, "id"> {
  isOver?: boolean;
  dragging?: boolean;
  dragListeners?: Record<string, Function>;
}

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MenuItemContent = styled.div`
  width: 100%;
`;

const StyledPointIcon = styled(PointIcon)`
  color: ${GreyTextColor};

  &:hover {
    color: ${ActiveTextColor};
  }
`;

const MenuItem = React.forwardRef((props: IMenuItemProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    path,
    item,
    isOver,
    dragging,
    dragListeners,
    dropInAsSub = true,
    onDelete,
    onAddSubMenu,
    ...divProps
  } = props;

  const [isConfigPopShow, showConfigPop] = useState(false);

  const handleDel = () => {
    onDelete?.(path);
  };

  const handleAddSubMenu = () => {
    onAddSubMenu?.(path);
  };

  const content = <MenuItemWrapper>{item.getPropertyView()}</MenuItemWrapper>;

  return (
    <DraggableItem
      {...divProps}
      id={path.join("_")}
      ref={ref}
      isOver={isOver}
      dragging={dragging}
      dropInAsSub={dropInAsSub}
      dragListeners={dragListeners}
      content={
        <SimplePopover
          title={trans("edit")}
          content={content}
          visible={isConfigPopShow}
          setVisible={showConfigPop}
        >
          <MenuItemContent>{item.children.label.getView()}</MenuItemContent>
        </SimplePopover>
      }
      extra={
        <EditPopover
          del={handleDel}
          add={onAddSubMenu && handleAddSubMenu}
          addText={trans("navigation.addText")}
        >
          <StyledPointIcon />
        </EditPopover>
      }
    />
  );
});

export default MenuItem;

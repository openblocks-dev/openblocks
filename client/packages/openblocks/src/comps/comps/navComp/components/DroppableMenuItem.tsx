import { useDraggable, useDroppable } from "@dnd-kit/core";
import { trans } from "i18n";
import { Fragment } from "react";
import styled from "styled-components";
import DroppablePlaceholder from "./DroppablePlaceHolder";
import MenuItem, { ICommonItemProps } from "./MenuItem";
import { IDragData, IDropData } from "./types";

const DraggableMenuItemWrapper = styled.div`
  position: relative;
`;

interface IDraggableMenuItemProps extends ICommonItemProps {
  level: number;
  active?: boolean;
  disabled?: boolean;
  disableDropIn?: boolean;
  parentDragging?: boolean;
}

export default function DraggableMenuItem(props: IDraggableMenuItemProps) {
  const {
    item,
    path,
    active,
    disabled,
    parentDragging,
    disableDropIn,
    dropInAsSub = true,
    onAddSubMenu,
    onDelete,
  } = props;

  const id = path.join("_");
  const items = item.getView().items;

  const handleAddSubMenu = (path: number[]) => {
    onAddSubMenu?.(path, {
      label: trans("droppadbleMenuItem.subMenu", { number: items.length + 1 }),
    });
  };

  const dragData: IDragData = {
    path,
    item,
  };
  const {
    listeners: dragListeners,
    setNodeRef: setDragNodeRef,
    isDragging,
  } = useDraggable({
    id,
    data: dragData,
  });

  const dropData: IDropData = {
    targetListSize: items.length,
    targetPath: dropInAsSub ? [...path, 0] : [...path.slice(0, -1), path[path.length - 1] + 1],
    dropInAsSub,
  };
  const { setNodeRef: setDropNodeRef, isOver } = useDroppable({
    id,
    disabled: isDragging || disabled || disableDropIn,
    data: dropData,
  });
  return (
    <>
      <DraggableMenuItemWrapper>
        {active && (
          <DroppablePlaceholder
            path={path}
            targetListSize={items.length}
            disabled={isDragging || disabled}
          />
        )}
        <MenuItem
          path={path}
          item={item}
          ref={(node) => {
            setDragNodeRef(node);
            setDropNodeRef(node);
          }}
          isOver={isOver}
          dropInAsSub={dropInAsSub}
          dragging={isDragging || parentDragging}
          dragListeners={{ ...dragListeners }}
          onAddSubMenu={onAddSubMenu && handleAddSubMenu}
          onDelete={onDelete}
        />
      </DraggableMenuItemWrapper>
      {items.length > 0 && (
        <div className="sub-menu-list">
          {items.map((subItem, i) => (
            <Fragment key={i}>
              <DraggableMenuItem
                path={[...path, i]}
                active={!!active}
                dropInAsSub={false}
                item={subItem}
                level={0}
                disabled={disabled || isDragging || disableDropIn}
                // onAddSubMenu={onAddSubMenu}
                onDelete={onDelete}
                parentDragging={isDragging}
              />
            </Fragment>
          ))}
        </div>
      )}
    </>
  );
}

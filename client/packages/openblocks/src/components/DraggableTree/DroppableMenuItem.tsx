import { useDraggable, useDroppable } from "@dnd-kit/core";
import { Fragment, useContext } from "react";
import styled from "styled-components";
import DraggableItem from "./DraggableItem";
import { DraggableTreeContext } from "./DraggableTreeContext";
import DroppablePlaceholder from "./DroppablePlaceHolder";
import { DraggableTreeNode, DraggableTreeNodeItemRenderProps, IDragData, IDropData } from "./types";
import { checkDroppableFlag } from "./util";

const DraggableMenuItemWrapper = styled.div`
  position: relative;
`;

interface IDraggableMenuItemProps {
  path: number[];
  item: DraggableTreeNode;
  forceFold?: boolean;
  dropInAsSub?: boolean;
  activeNode?: DraggableTreeNode;
  disabled?: boolean;
  // current item is used as overlay or not
  isOverlay?: boolean;
  disableDropIn?: boolean;
  parentDragging?: boolean;
  onDelete?: (path: number[]) => void;
  onAddSubMenu?: (path: number[], value?: any) => void;
  renderContent?: (params: DraggableTreeNodeItemRenderProps) => React.ReactNode;
}

export default function DraggableMenuItem(props: IDraggableMenuItemProps) {
  const {
    item,
    path,
    activeNode,
    disabled,
    parentDragging,
    disableDropIn,
    forceFold = false,
    dropInAsSub = true,
    isOverlay = false,
    // onAddSubMenu,
    onDelete,
    renderContent,
  } = props;

  const id = item.id ?? path.join("_");
  const items = item.items;
  const context = useContext(DraggableTreeContext);
  const isFold = (forceFold || context.foldedStatus[id]) && !context.unfoldAll;

  const dragData: IDragData = {
    path,
    node: item,
  };
  const {
    listeners: dragListeners,
    setNodeRef: setDragNodeRef,
    isDragging,
  } = useDraggable({
    id,
    data: dragData,
    disabled: context.disable ?? false,
  });

  const canDropIn = checkDroppableFlag(item.canDropIn, activeNode?.data);
  const canDropBefore = checkDroppableFlag(item.canDropBefore, activeNode?.data);
  const canDropAfter = checkDroppableFlag(item.canDropAfter, activeNode?.data);

  const dropData: IDropData = {
    targetListSize: items.length,
    targetPath: dropInAsSub ? [...path, 0] : [...path.slice(0, -1), path[path.length - 1] + 1],
    dropInAsSub,
  };

  const { setNodeRef: setDropNodeRef, isOver } = useDroppable({
    id,
    disabled: isDragging || disabled || disableDropIn || (!dropInAsSub && canDropAfter === false),
    data: dropData,
  });

  return (
    <>
      <DraggableMenuItemWrapper>
        {activeNode && canDropBefore && (
          <DroppablePlaceholder
            path={path}
            targetListSize={items.length}
            disabled={isDragging || disabled}
          />
        )}
        <DraggableItem
          path={path}
          id={id}
          dropInAsSub={dropInAsSub && canDropIn !== false}
          isOver={isOver}
          ref={(node) => {
            setDragNodeRef(node);
            setDropNodeRef(node);
          }}
          {...dragListeners}
        >
          {renderContent?.({
            node: item,
            isOver,
            path,
            isOverlay,
            hasChildren: items.length > 0,
            dragging: !!(isDragging || parentDragging),
            isFolded: isFold,
            onDelete: () => onDelete?.(path),
            onToggleFold: () => context.toggleFold(id),
          }) || null}
        </DraggableItem>
      </DraggableMenuItemWrapper>
      {items.length > 0 && !isFold && (
        <div className="sub-menu-list">
          {items.map((subItem, i) => (
            <Fragment key={i}>
              <DraggableMenuItem
                path={[...path, i]}
                activeNode={activeNode}
                dropInAsSub={false}
                item={subItem}
                // disableDropIn={subItem.canDropIn !== true}
                renderContent={renderContent}
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

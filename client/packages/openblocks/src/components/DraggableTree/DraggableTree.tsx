import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import _ from "lodash";
import { useContext, useMemo, useState } from "react";
import styled from "styled-components";
import { DraggableTreeContext, DraggableTreeContextValue } from "./DraggableTreeContext";
import DraggableMenuItem from "./DroppableMenuItem";
import DroppablePlaceholder from "./DroppablePlaceHolder";
import { IDragData, IDropData, DraggableTreeNode, DraggableTreeNodeItemRenderProps } from "./types";
import { checkDroppableFlag } from "./util";

const Wrapper = styled.div`
  .menu-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .menu-list {
    margin-top: 8px;
    position: relative;
  }
`;

interface IMenuItemListProps {
  node: DraggableTreeNode;
  onAddItem: (path: number[], value?: any) => number;
  onDeleteItem: (path: number[]) => void;
  onAddSubItem: (path: number[], value: any, unshift?: boolean) => number;
  onMoveItem: (path: number[], from: number, to: number) => void;
  renderItemContent?: (params: DraggableTreeNodeItemRenderProps) => React.ReactNode;
}

function MenuItemList(props: IMenuItemListProps) {
  const { node, onAddItem, onDeleteItem, onMoveItem, onAddSubItem, renderItemContent } = props;
  const contextValue = useContext(DraggableTreeContext);
  const [active, setActive] = useState<IDragData | null>(null);
  const isDraggingWithSub = active && active.node.items.length > 0;

  function handleDragStart(event: DragStartEvent) {
    setActive(event.active.data.current as IDragData);
  }

  function handleDragEnd(e: DragEndEvent) {
    const activeData = e.active.data.current as IDragData;
    const overData = e.over?.data.current as IDropData;

    if (overData) {
      const sourcePath = activeData.path;
      const targetPath = overData.targetPath;

      if (
        sourcePath.length === targetPath.length &&
        _.isEqual(sourcePath.slice(0, -1), targetPath.slice(0, -1))
      ) {
        // same level move
        const from = sourcePath[sourcePath.length - 1];
        let to = targetPath[targetPath.length - 1];
        if (from < to) {
          to -= 1;
        }
        onMoveItem(targetPath, from, to);
      } else {
        // cross level move
        let targetIndex = targetPath[targetPath.length - 1];
        let targetListPath = targetPath;
        let size = 0;

        onDeleteItem(sourcePath);

        if (overData.dropInAsSub) {
          targetListPath = targetListPath.slice(0, -1);
          size = onAddSubItem(targetListPath, activeData.node.data);
        } else {
          size = onAddItem(targetListPath, activeData.node.data);
        }

        if (overData.targetListSize !== -1) {
          onMoveItem(targetPath, size, targetIndex);
        }
      }
    }

    setActive(null);
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const lastChildNode = node.items[node.items.length - 1];
  const canDropAfterLastNode = checkDroppableFlag(lastChildNode?.canDropAfter, active?.node.data);

  return (
    <Wrapper>
      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {node.items.map((i, idx) => {
          const canDropIn = checkDroppableFlag(i.canDropIn, active?.node.data);
          return (
            <DraggableMenuItem
              activeNode={active?.node}
              dropInAsSub={!isDraggingWithSub && canDropIn !== false}
              disableDropIn={!!isDraggingWithSub || canDropIn === false}
              renderContent={renderItemContent}
              onAddSubMenu={onAddSubItem}
              onDelete={onDeleteItem}
              path={[idx]}
              item={i}
              key={idx}
            />
          );
        })}
        {canDropAfterLastNode && (
          <div style={{ position: "relative" }}>
            {active && <DroppablePlaceholder targetListSize={-1} path={[node.items.length]} />}
          </div>
        )}
        <DragOverlay dropAnimation={null}>
          {active && (
            <DraggableMenuItem
              isOverlay
              forceFold={contextValue.showSubInDragOverlay === false}
              path={[]}
              item={active.node}
              renderContent={renderItemContent}
            />
          )}
        </DragOverlay>
      </DndContext>
    </Wrapper>
  );
}

interface DraggableTreeProps<T = any>
  extends Omit<DraggableTreeContextValue, "foldedStatus" | "toggleFold"> {
  node: DraggableTreeNode<T>;
  renderItemContent: (params: DraggableTreeNodeItemRenderProps<T>) => React.ReactNode;
}

export function DraggableTree<T = any>(props: DraggableTreeProps<T>) {
  const { node, renderItemContent, ...otherProps } = props;
  const [foldedStatus, setFoldedState] = useState<Record<string, boolean>>({});

  const getItemByPath = (path: number[], scope?: DraggableTreeNode[]): DraggableTreeNode => {
    if (!scope) {
      scope = node.items;
    }
    if (path.length === 1) {
      return scope[path[0]];
    }
    return getItemByPath(path.slice(1), scope[path[0]].items);
  };

  const getItemListByPath = (path: number[], root?: DraggableTreeNode): DraggableTreeNode => {
    if (!root) {
      root = props.node;
    }
    if (path.length === 1) {
      return root;
    }
    return getItemListByPath(path.slice(1), root.items[path[0]]);
  };

  const toggleFold = (id: string) => {
    // toggle setFoldedState by id in foldedStatus
    setFoldedState((prev) => {
      const newFoldedStatus: Record<string, boolean> = { ...prev };
      newFoldedStatus[id] = !newFoldedStatus[id];
      return newFoldedStatus;
    });
  };

  const contextValue = useMemo<DraggableTreeContextValue>(
    () => ({
      ...otherProps,
      toggleFold,
      foldedStatus,
    }),
    [foldedStatus, otherProps]
  );

  return (
    <DraggableTreeContext.Provider value={contextValue}>
      <MenuItemList
        node={node}
        renderItemContent={renderItemContent}
        onAddItem={(path: number[], value: any) => {
          const treeNode = getItemListByPath(path);
          treeNode.addItem(value);
          return treeNode.items.length;
        }}
        onDeleteItem={(path: number[]) => {
          getItemListByPath(path).deleteItem(path[path.length - 1]);
        }}
        onAddSubItem={(path: number[], value: any) => {
          const treeNode = getItemByPath(path);
          treeNode.addSubItem(value);
          return treeNode.items.length;
        }}
        onMoveItem={(path: number[], from: number, to: number) => {
          getItemListByPath(path).moveItem(from, to);
        }}
      />
    </DraggableTreeContext.Provider>
  );
}

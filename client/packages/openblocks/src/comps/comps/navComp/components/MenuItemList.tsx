import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import LinkPlusButton from "components/LinkPlusButton";
import { BluePlusIcon, controlItem } from "openblocks-design";
import { trans } from "i18n";
import _ from "lodash";
import { useState } from "react";
import styled from "styled-components";
import DraggableMenuItem from "./DroppableMenuItem";
import DroppablePlaceholder from "./DroppablePlaceHolder";
import MenuItem from "./MenuItem";
import { IDragData, IDropData, NavCompType, NavListCompType } from "./types";

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

  .sub-menu-list {
    padding-left: 16px;
  }
`;

interface IMenuItemListProps {
  items: NavCompType[];
  onAddItem: (path: number[], value?: any) => number;
  onDeleteItem: (path: number[]) => void;
  onAddSubItem: (path: number[], value: any, unshift?: boolean) => number;
  onMoveItem: (path: number[], from: number, to: number) => void;
}

const menuItemLabel = trans("menuItem");

function MenuItemList(props: IMenuItemListProps) {
  const { items, onAddItem, onDeleteItem, onMoveItem, onAddSubItem } = props;

  const [active, setActive] = useState<IDragData | null>(null);
  const isDraggingWithSub = active && active.item.children.items.getView().length > 0;

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
          size = onAddSubItem(targetListPath, activeData.item.toJsonValue());
        } else {
          size = onAddItem(targetListPath, activeData.item.toJsonValue());
        }

        if (overData.targetListSize !== -1) {
          onMoveItem(targetListPath, size, targetIndex);
        }
      }
    }

    setActive(null);
  }

  return (
    <Wrapper>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="menu-title">
          <div>{menuItemLabel}</div>
          <LinkPlusButton onClick={() => onAddItem([0])} icon={<BluePlusIcon />}>
            {trans("newItem")}
          </LinkPlusButton>
        </div>
        <div className="menu-list">
          {items.map((i, idx) => {
            return (
              <DraggableMenuItem
                active={!!active}
                dropInAsSub={!isDraggingWithSub}
                disableDropIn={!!isDraggingWithSub}
                onAddSubMenu={onAddSubItem}
                onDelete={onDeleteItem}
                path={[idx]}
                item={i}
                key={idx}
                level={0}
              />
            );
          })}
          <div style={{ position: "relative" }}>
            {active && <DroppablePlaceholder targetListSize={-1} path={[items.length]} />}
          </div>
        </div>
        <DragOverlay dropAnimation={null}>
          {active && <MenuItem path={[]} item={active.item} />}
        </DragOverlay>
      </DndContext>
    </Wrapper>
  );
}

export function menuPropertyView(itemsComp: NavListCompType) {
  const items = itemsComp.getView();
  const getItemByPath = (path: number[], scope?: NavCompType[]): NavCompType => {
    if (!scope) {
      scope = items;
    }
    if (path.length === 1) {
      return scope[path[0]];
    }
    return getItemByPath(path.slice(1), scope[path[0]].children.items.getView());
  };

  const getItemListByPath = (path: number[], root?: NavListCompType): NavListCompType => {
    if (!root) {
      root = itemsComp;
    }
    if (path.length === 1) {
      return root;
    }
    return getItemListByPath(path.slice(1), root.getView()[path[0]].children.items);
  };

  return controlItem(
    { filterText: menuItemLabel },
    <MenuItemList
      items={items}
      onAddItem={(path: number[], value: any) => {
        const itemList = getItemListByPath(path);
        itemList.addItem(value);
        return itemList.getView().length;
      }}
      onDeleteItem={(path: number[]) => {
        getItemListByPath(path).deleteItem(path[path.length - 1]);
      }}
      onAddSubItem={(path: number[], value: any) => {
        const item = getItemByPath(path);
        item.addSubItem(value);
        return item.children.items.getView().length;
      }}
      onMoveItem={(path: number[], from: number, to: number) => {
        getItemListByPath(path).moveItem(from, to);
      }}
    />
  );
}

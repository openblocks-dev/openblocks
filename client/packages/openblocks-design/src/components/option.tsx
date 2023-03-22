import styled, { css } from "styled-components";
import { DragIcon, PointIcon } from "icons";
import { EllipsisTextCss, labelCss } from "./Label";
import { EditPopover, SimplePopover } from "./popover";
import { ToolTipLabel } from "./toolTip";
import { AddLine } from "./eventHandler";
import React, { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ConstructorToComp, MultiCompConstructor } from "openblocks-core";
import { ReactComponent as WarnIcon } from "icons/icon-warning-white.svg";
import { DndContext } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { ActiveTextColor, GreyTextColor } from "constants/style";
import { trans } from "i18n/design";

const OptionDiv = styled.div`
  width: 100%;
  border: 1px solid #d7d9e0;
  border-radius: 6px;
  overflow: hidden;
`;

const RowText = styled.span`
  ${labelCss};
  ${EllipsisTextCss};
  line-height: 32px;
  color: #333333;
  display: inline-block;
  vertical-align: top;
  margin-left: 4px;
  max-width: calc(100% - 56px);

  :hover {
    cursor: pointer;
  }
`;

const OptionRow = styled.div<{ selected?: boolean }>`
  color: #ffffff;
  width: 100%;
  height: 32px;
  border-bottom: 1px solid #d7d9e0;
  display: flex;

  :hover {
    background-color: #fafafa;
    cursor: pointer;
  }

  ${(props) => {
    if (props.selected) {
      return css`
        background-color: #fafafa;

        ${RowText} {
          color: #4965f2;
        }
      `;
    }
  }}
  :last-child {
    border-bottom: none;
    height: 31px;
  }
`;

const OptionHeaderRowWrapper = styled.div`
  > ${OptionRow}, .ant-select .ant-select-selector {
    background-color: #fafafa;
    color: ${GreyTextColor};
  }
`;

const IconCss = css`
  height: 16px;
  width: 16px;

  :hover {
    cursor: pointer;
  }
`;

const EmptyOptionDiv = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  background: #ffffff;
  border: 1px dashed #d7d9e0;
  border-radius: 4px;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  padding-left: 12px;
`;

const EmptyOptionSpan = styled.span`
  ${labelCss};
  color: #b8b9bf;

  &:hover {
    cursor: pointer;
  }
`;

const StyledDragIcon = styled(DragIcon)`
  ${IconCss};
  margin-top: 8px;
  margin-left: 8px;
  color: #8b8fa3;

  :hover {
    cursor: grab;
    outline: none;
  }

  :focus {
    cursor: grab;
    outline: none;
  }
`;

const StyledPointIcon = styled(PointIcon)`
  ${IconCss};
  color: ${GreyTextColor};

  &:hover {
    color: ${ActiveTextColor};
  }
`;

const StyledWarnIcon = styled(WarnIcon)`
  ${IconCss};
  float: right;
  margin-right: 12px;
`;

const OptionItemExtraWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: auto;

  > * {
    margin-right: 8px;
  }
`;

const OptionItem = (props: {
  content?: React.ReactNode;
  title: string | JSX.Element;
  config: { dataIndex: string };
  popoverTitle?: string;
  draggable?: boolean;
  optionExtra?: React.ReactNode;
}) => {
  const { content, config, title, popoverTitle, draggable = true, optionExtra } = props;
  const [visible, setVisible] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: config.dataIndex,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const optionRow = (
    <OptionRow ref={setNodeRef} style={style} selected={visible}>
      {draggable && <StyledDragIcon {...attributes} {...listeners} />}
      <RowText>{title}</RowText>
      <OptionItemExtraWrapper>{optionExtra}</OptionItemExtraWrapper>
    </OptionRow>
  );
  if (!content) {
    return optionRow;
  }
  return (
    <SimplePopover
      content={content}
      title={popoverTitle || ""}
      key={config.dataIndex}
      visible={visible}
      setVisible={(vis) => {
        setVisible(vis);
      }}
    >
      {optionRow}
    </SimplePopover>
  );
};

function Option<T extends ConstructorToComp<MultiCompConstructor>>(props: {
  items: Array<T>;
  onAdd: () => void;
  onDel?: (i: number) => void;
  onCopy?: (comp: T) => void;
  onMove: (fromIndex: number, toIndex: number) => void;
  content: (comp: T, index: number) => React.ReactNode | JSX.Element;
  itemTitle: (comp: T) => JSX.Element | string;
  popoverTitle: (comp: T) => string;
  dataIndex: (comp: T) => string;
  // unique value for deduplication
  uniqVal?: (comp: T) => string;
  title?: string;
  optionToolbar?: React.ReactNode;
  headerItem?: React.ReactNode;
  itemExtra?: (comp: T) => React.ReactNode;
}) {
  const { items, uniqVal, headerItem, optionToolbar, itemExtra } = props;
  const itemsDistinctValCount = uniqVal
    ? items.reduce((prev, cur) => {
        const val = uniqVal(cur);
        return prev.set(val, prev.get(val) ? prev.get(val)! + 1 : 1);
        // stat empyt string with Map
      }, new Map<string, number>())
    : new Map();

  const findIndex = (id: string) => {
    for (let i = 0; i < items.length; i++) {
      if (props.dataIndex(items[i]) === id) {
        return i;
      }
    }
    return -1;
  };
  const handleDragEnd = (e: { active: { id: string }; over: { id: string } | null }) => {
    if (!e.over) {
      return;
    }
    const fromIndex = findIndex(e.active.id);
    const toIndex = findIndex(e.over.id);
    if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) {
      return;
    }
    props.onMove(fromIndex, toIndex);
  };

  return (
    <>
      {optionToolbar ? (
        optionToolbar
      ) : (
        <AddLine title={props.title} add={props.onAdd} />
      )}
      {items.length > 0 || headerItem ? (
        <OptionDiv>
          <OptionHeaderRowWrapper>{headerItem}</OptionHeaderRowWrapper>
          <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={items.map((item, index) => props.dataIndex(item))}
            >
              {items.map((item, index: number) => {
                const dataIndex = props.dataIndex(item);
                const value = uniqVal && uniqVal(item);
                const errorMsg =
                  itemsDistinctValCount.get(value) > 1 &&
                  trans("optionsControl.optionItemErrorMSg", { value: value ?? "" });
                const optionExtra = (
                  <>
                    {errorMsg && (
                      <ToolTipLabel title={errorMsg}>
                        <StyledWarnIcon />
                      </ToolTipLabel>
                    )}
                    {itemExtra ? (
                      itemExtra(item)
                    ) : (
                      <EditPopover
                        copy={props.onCopy ? () => props.onCopy!(item) : undefined}
                        del={props.onDel ? () => props.onDel!(index) : undefined}
                      >
                        <StyledPointIcon
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      </EditPopover>
                    )}
                  </>
                );
                return (
                  <OptionItem
                    key={dataIndex}
                    popoverTitle={props.popoverTitle(item)}
                    content={props.content(item, index)}
                    title={props.itemTitle(item)}
                    config={{ dataIndex: dataIndex }}
                    optionExtra={optionExtra}
                  />
                );
              })}
            </SortableContext>
          </DndContext>
        </OptionDiv>
      ) : (
        <EmptyOptionDiv onClick={() => props.onAdd()}>
          <EmptyOptionSpan>{trans("optionsControl.emptyList")}</EmptyOptionSpan>
        </EmptyOptionDiv>
      )}
    </>
  );
}

const AutoArea = styled.div`
  background: #fafafa;
  border: 1px solid #d7d9e0;
  border-radius: 4px;
  padding: 16px 16px 12px 16px;
  display: flex;
  gap: 8px;
  flex-direction: column;
`;
export {
  OptionDiv,
  OptionRow,
  RowText,
  IconCss,
  StyledDragIcon as DragOptionIcon,
  OptionItem,
  Option,
  AutoArea,
};

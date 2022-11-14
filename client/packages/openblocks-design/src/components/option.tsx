import styled, { css } from "styled-components";
import { DragIcon, PointIcon } from "icons";
import { EllipsisTextCss, labelCss } from "./Label";
import { EditPopover, SimplePopover } from "./popover";
import { ToolTipLabel } from "./toolTip";
import { AddLine } from "./eventHandler";
import { useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { ReactComponent as CloseEye } from "icons/icon-closeEye.svg";
import { ReactComponent as OpenEye } from "icons/icon-openEye.svg";
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
  max-width: calc(100% - 56px);
  line-height: 32px;
  color: #333333;
  display: inline-block;
  vertical-align: top;
  margin-left: 4px;

  :hover {
    cursor: pointer;
  }
`;

const OptionRow = styled.div<{ selected?: boolean }>`
  color: #ffffff;
  width: 100%;
  height: 32px;
  border-bottom: 1px solid #d7d9e0;

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

const IconCss = css`
  height: 16px;
  width: 16px;
  margin-top: 8px;

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
  float: right;
  margin-right: 8px;
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

const HideIcon = ({
  hide,
  setHide,
  className,
}: {
  hide: boolean;
  setHide: (hide: boolean) => void;
  className?: string;
}) => {
  const Eye = hide ? CloseEye : OpenEye;
  return (
    <Eye
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        setHide(!hide);
      }}
    />
  );
};

const StyledHideIcon = styled(HideIcon)`
  height: 16px;
  width: 16px;
  margin-top: 8px;
  float: right;
  margin-right: 8px;
  display: inline-block;

  :hover {
    cursor: pointer;
  }

  &:hover path {
    fill: #315efb;
  }
`;
const OptionItem = (props: {
  content: JSX.Element | React.ReactNode;
  title: string;
  config: { dataIndex: string };
  hide?: boolean;
  onHide?: (hide: boolean) => void;
  onDel?: () => void;
  onCopy?: () => void;
  errorMsg?: string | false;
  popoverTitle: string;
}) => {
  const { content, config, title, hide, onHide, onDel, onCopy, popoverTitle } = props;
  const [visible, setVisible] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: config.dataIndex,
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <SimplePopover
      content={content}
      title={popoverTitle}
      key={config.dataIndex}
      visible={visible}
      setVisible={(vis) => {
        setVisible(vis);
      }}
    >
      <OptionRow ref={setNodeRef} style={style} selected={visible}>
        <StyledDragIcon {...attributes} {...listeners} />
        <RowText>{title}</RowText>
        {onHide ? (
          <StyledHideIcon
            hide={!!hide}
            setHide={(hide) => {
              onHide(hide);
            }}
          />
        ) : (
          <>
            <EditPopover copy={onCopy} del={onDel}>
              <StyledPointIcon
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </EditPopover>
          </>
        )}
        {props.errorMsg && (
          <ToolTipLabel title={props.errorMsg}>
            <StyledWarnIcon />
          </ToolTipLabel>
        )}
      </OptionRow>
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
  itemTitle: (comp: T) => string;
  popoverTitle: (comp: T) => string;
  dataIndex: (comp: T) => string;
  // unique value for deduplication
  uniqVal?: (comp: T) => string;
  title?: string;
  hide?: (comp: T) => boolean;
  onHide?: (comp: T, hide: boolean) => void;
  optionHeader?: React.ReactNode;
}) {
  const { items, uniqVal } = props;
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
      {props.optionHeader ? (
        props.optionHeader
      ) : (
        <AddLine title={props.title || trans("optionsControl.optionList")} add={props.onAdd} />
      )}
      {items.length > 0 ? (
        <OptionDiv>
          <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd}>
            <SortableContext
              strategy={verticalListSortingStrategy}
              items={items.map((item, index) => props.dataIndex(item))}
            >
              {items.map((item, index: number) => {
                const dataIndex = props.dataIndex(item);
                const value = uniqVal && uniqVal(item);
                return (
                  <OptionItem
                    key={dataIndex}
                    popoverTitle={props.popoverTitle(item)}
                    content={props.content(item, index)}
                    title={props.itemTitle(item)}
                    config={{ dataIndex: dataIndex }}
                    onDel={props.onDel ? () => props.onDel!(index) : undefined}
                    onCopy={props.onCopy ? () => props.onCopy!(item) : undefined}
                    hide={props.hide && props.hide(item)}
                    onHide={props.onHide ? (hide) => props.onHide!(item, hide) : undefined}
                    errorMsg={
                      itemsDistinctValCount.get(value) > 1 &&
                      trans("optionsControl.optionItemErrorMSg", { value: value ?? "" })
                    }
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

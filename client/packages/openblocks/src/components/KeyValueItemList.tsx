import {
  ActiveTextColor,
  BackgroundColor,
  BorderColor,
  BorderRadiusLarge,
  GreyTextColor,
  ItemHoverBackgroundColor,
} from "constants/style";
import {
  BluePlusIcon,
  EditPopover,
  EditPopoverProps,
  PointIcon,
  SimplePopover,
} from "openblocks-design";
import { trans } from "i18n";
import { Children, PropsWithChildren, ReactNode, useState } from "react";
import styled from "styled-components";
import EmptyItem from "./EmptyItem";
import LinkPlusButton from "./LinkPlusButton";

const col1Width = "108px";

const ListWrapper = styled.div`
  .list-header {
    display: flex;
    font-size: 13px;
    line-height: 1;
    margin-bottom: 8px;
    align-items: center;
    justify-content: space-between;
  }

  .list-content {
    overflow: hidden;
    border: 1px solid ${BorderColor};
    border-radius: ${BorderRadiusLarge};
  }

  .title {
    height: 32px;
    font-size: 13px;
    padding-left: 12px;
    background-color: ${BackgroundColor};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${GreyTextColor};

    .title1 {
      width: ${col1Width};
    }

    .title2 {
      flex: 1;
    }
  }
`;

const ItemWrapper = styled.div<{ popover: boolean; active: boolean; hasValue: boolean }>`
  height: 32px;
  font-size: 13px;
  padding-left: 12px;
  display: flex;
  background-color: ${(props) => (props.active ? ItemHoverBackgroundColor : "inherit")};

  cursor: ${(props) => (props.popover ? "pointer" : "default")};

  &:hover {
    background-color: ${ItemHoverBackgroundColor};
  }

  &:last-child {
    border-bottom: 0;
  }

  .col1 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 8px;
    width: ${(props) => (props.hasValue ? col1Width : "auto")};
    ${(props) => (props.active ? `color: ${ActiveTextColor}` : "")}
  }

  .col2 {
    flex: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    color: ${GreyTextColor};
  }

  .item-content {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: hidden;
  }

  .item-op-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    cursor: pointer;
  }
`;

const StyledPointIcon = styled(PointIcon)`
  color: ${GreyTextColor};

  &:hover {
    color: ${ActiveTextColor};
  }
`;

interface KeyValueItemProps extends Omit<EditPopoverProps, "children"> {
  name: string;
  value?: string;
  clickPopoverContent?: ReactNode;
  defaultShowPopover: boolean;
}

export function KeyValueItem(props: KeyValueItemProps) {
  const { name, value, clickPopoverContent, ...editPopoverProps } = props;
  const [isPopShow, showPop] = useState(props.defaultShowPopover);

  const itemContent = (
    <div className="item-content">
      <div className="col1" title={name}>
        {name}
      </div>
      {value && (
        <div className="col2" title={value}>
          {value}
        </div>
      )}
    </div>
  );

  const content = (
    <SimplePopover
      visible={isPopShow}
      setVisible={showPop}
      content={clickPopoverContent}
      title={trans("edit")}
    >
      {itemContent}
    </SimplePopover>
  );

  return (
    <ItemWrapper active={isPopShow} popover={!!clickPopoverContent} hasValue={!!value}>
      {clickPopoverContent ? content : itemContent}
      <div className="item-op-btn">
        <EditPopover {...editPopoverProps}>
          <StyledPointIcon />
        </EditPopover>
      </div>
    </ItemWrapper>
  );
}

interface ItemListProps {
  title?: string;
  extra?: ReactNode;
  keyTitle?: string;
  valueTitle?: string;
  emptyText?: string;
  onEmptyClick?: () => void;
}

export default function KeyValueItemList(props: PropsWithChildren<ItemListProps>) {
  const {
    children,
    title,
    extra,
    keyTitle,
    valueTitle,
    emptyText = trans("module.emptyText"),
    onEmptyClick,
  } = props;
  const count = Children.count(children);
  return (
    <ListWrapper>
      {(title || extra) && (
        <div className="list-header">
          <div className="list-title">{title}</div>
          <div className="list-header-extra">{extra}</div>
        </div>
      )}
      {count > 0 ? (
        <div className="list-content">
          <div className="title">
            <div className="title1">{keyTitle}</div>
            <div className="title2">{valueTitle}</div>
          </div>
          {children}
        </div>
      ) : (
        <EmptyItem onClick={onEmptyClick}>{emptyText}</EmptyItem>
      )}
    </ListWrapper>
  );
}

export function KeyValueItemListWithNewCreateState(
  props: Omit<ItemListProps, "onEmptyClick" | "extra"> & {
    children: (newCreateIdx: number | undefined) => ReactNode;
    onAdd: () => void;
  }
) {
  const [newIdx, setNewIdx] = useState<number | undefined>(undefined);
  const children = props.children(newIdx);
  const count = Children.count(children);
  const handleAdd = () => {
    props.onAdd();
    setNewIdx(count);
  };

  return (
    <KeyValueItemList
      {...props}
      onEmptyClick={handleAdd}
      extra={
        <LinkPlusButton icon={<BluePlusIcon />} onClick={handleAdd}>
          {trans("addItem")}
        </LinkPlusButton>
      }
    >
      {children}
    </KeyValueItemList>
  );
}

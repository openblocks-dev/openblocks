import { SuspensionBox } from "./SuspensionBox";
import { Popover, PopoverProps } from "antd";
import { Children, cloneElement, MouseEvent, ReactNode, useState } from "react";
import styled from "styled-components";
import { ActiveTextColor, GreyTextColor } from "constants/style";
import { trans } from "i18n/design";
import { PointIcon } from "icons";

const Wedge = styled.div`
  height: 8px;
  /* width: 88px; */
  min-width: 110px;
`;
const HandleText = styled.span<{ color?: string }>`
  font-size: 13px;
  color: ${(props) => (props.color ? props.color : "#333333")};
  line-height: 13px;
  display: block;
`;
const Handle = styled.div`
  min-width: 72px;
  height: 29px;
  margin: 0 8px;
  background-color: #ffffff;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 8px;
  cursor: pointer;

  :hover {
    background-color: #f2f7fc;
    border-radius: 4px;
    cursor: pointer;
  }
`;

const StyledPointIcon = styled(PointIcon)`
  cursor: pointer;
  color: ${GreyTextColor};

  &:hover {
    color: ${ActiveTextColor};
  }
`;

const SimplePopover = (props: {
  title: string;
  visible?: boolean;
  setVisible?: (vis: boolean) => void;
  children: JSX.Element | React.ReactNode;
  content: JSX.Element | React.ReactNode;
}) => {
  const { visible, setVisible } = props;
  const contentWithBox = (
    <SuspensionBox
      title={props.title}
      onClose={() => setVisible?.(false)}
      content={props.content}
    />
  );
  return (
    <Popover
      align={{
        offset: [-12, 0, 0, 0],
      }}
      destroyTooltipOnHide
      content={contentWithBox}
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
      placement="left"
      overlayStyle={{ width: "310px" }}
    >
      {props.children}
    </Popover>
  );
};

// popover with own state
const CustomPopover = (props: {
  title: string;
  type?: "query";
  children: JSX.Element | React.ReactNode;
  content: JSX.Element | React.ReactNode;
  defaultVisible: boolean;
  scrollable?: boolean;
}) => {
  const [visible, setVisible] = useState(props.defaultVisible);
  const contentWithBox = (
    <SuspensionBox
      title={props.title}
      onClose={() => setVisible(false)}
      content={props.content}
      scrollable={props.scrollable}
    />
  );
  return (
    <Popover
      content={contentWithBox}
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
      placement={props.type === "query" ? "top" : "left"}
      overlayStyle={{ width: "310px" }}
      align={{
        offset: [-12, 0, 0, 0],
      }}
    >
      {props.children}
    </Popover>
  );
};

export type EditPopoverItemType = { text: ReactNode; onClick: () => void; type?: "delete" };

export interface EditPopoverProps extends PopoverProps {
  children?: React.ReactElement;
  items?: EditPopoverItemType[]; // FIXME: refactor props below into this structure
  addText?: string;
  add?: () => void;
  rename?: () => void;
  copy?: () => void;
  del?: () => void;
}

// paste deleted popover
const EditPopover = (props: EditPopoverProps) => {
  const {
    children = <StyledPointIcon tabIndex={-1} />,
    items,
    addText,
    add,
    rename,
    copy,
    del,
    ...popoverProps
  } = props;
  const [visible, setVisible] = useState(false);
  const hide = () => {
    setVisible(false);
  };

  const onlyChildren = Children.only(children);
  const { style, ...otherProps } = onlyChildren.props;
  const newStyle = {
    ...style,
  };
  if (visible) {
    newStyle.color = ActiveTextColor;
  }
  const newChildren = cloneElement(onlyChildren, {
    ...otherProps,
    style: newStyle,
    onClick: (e: MouseEvent) => {
      e.stopPropagation();
    },
  });

  return (
    <Popover
      content={() => (
        <>
          <Wedge />
          {items?.map((item, idx) => (
            <Handle
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                item.onClick();
                hide();
              }}
            >
              <HandleText color={item.type === "delete" ? "#F73131" : "#333333"}>
                {item.text}
              </HandleText>
            </Handle>
          ))}
          {add && (
            <Handle
              onClick={(e) => {
                e.stopPropagation();
                add?.();
                hide();
              }}
            >
              <HandleText>{addText || trans("addItem")}</HandleText>
            </Handle>
          )}
          {copy && (
            <Handle
              onClick={(e) => {
                e.stopPropagation();
                copy!();
                hide();
              }}
            >
              <HandleText>{trans("duplicate")}</HandleText>
            </Handle>
          )}
          {rename && (
            <Handle
              onClick={(e) => {
                e.stopPropagation();
                rename!();
                hide();
              }}
            >
              <HandleText>{trans("rename")}</HandleText>
            </Handle>
          )}
          {del && (
            <Handle
              onClick={(e) => {
                e.stopPropagation();
                del!();
                hide();
              }}
            >
              <HandleText color={"#F73131"}>{trans("delete")}</HandleText>
            </Handle>
          )}
          <Wedge />
        </>
      )}
      trigger="click"
      visible={visible}
      onVisibleChange={setVisible}
      placement="bottomRight"
      // overlayStyle={{ width: "88px" }}
      align={{
        offset: [8, -8, 0, 0],
      }}
      {...popoverProps}
    >
      {newChildren}
    </Popover>
  );
};
export { SimplePopover, CustomPopover, EditPopover };

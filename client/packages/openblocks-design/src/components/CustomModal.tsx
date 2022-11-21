import { ButtonProps, Modal as AntdModal } from "antd";
import { ModalFuncProps, ModalProps as AntdModalProps } from "antd/lib/modal";
import { ReactComponent as PackUpIcon } from "icons/icon-Pack-up.svg";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { TacoButtonType, TacoButton } from "components/button";
import Draggable from "react-draggable";
import { DarkActiveTextColor, GreyTextColor } from "constants/style";
import { CloseIcon } from "icons";
import { trans } from "i18n/design";

type ModalWrapperProps = {
  width?: string | number;
};

const ModalWrapper = styled.div<ModalWrapperProps>`
  display: flex;
  flex-direction: column;
  width: ${(props) => (props.width ? props.width : "368px")};
  height: fit-content;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 0 0 16px;
  pointer-events: auto;
  will-change: transform;
`;

const ModalHeaderWrapper = styled.div`
  cursor: move;
  display: flex;
  align-items: center;
  padding: 16px;
`;

const ModalHeaderTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #222222;
  flex-grow: 1;
  min-width: 0;
`;

const ModalCloseIcon = styled.div`
  margin-left: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  color: ${GreyTextColor};

  :hover svg g line {
    color: ${DarkActiveTextColor};
  }
`;

const ModalHeaderBackBtn = styled.button`
  height: 16px;
  padding: 0;
  border: none;
  display: flex;
  align-items: center;
  margin-right: 4px;

  font-size: 16px;
  color: #4965f2;
  line-height: 16px;
  background: none;
  cursor: pointer;

  svg {
    transform: rotate(-90deg);
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }

  :hover svg g path {
    fill: #4965f2;
  }
`;

export const ModalFooterWrapper = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 16px;

  button {
    height: 28px;
    margin-top: 12px;
    margin-left: 8px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

function ModalHeader(props: {
  title?: React.ReactNode;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  showBackLink?: boolean;
  onBack?: (e: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <>
      {props.showBackLink && (
        <ModalHeaderBackBtn onClick={props.onBack}>
          <PackUpIcon />
        </ModalHeaderBackBtn>
      )}
      <ModalHeaderTitle>{props.title}</ModalHeaderTitle>
      <ModalCloseIcon onClick={props.onCancel}>
        <CloseIcon />
      </ModalCloseIcon>
    </>
  );
}

function ModalFooter(props: {
  okText?: ReactNode;
  cancelText?: ReactNode;
  showCancelButton?: boolean;
  showOkButton?: boolean;
  onCancel?: (e: React.MouseEvent<HTMLElement>) => void;
  onOk?: (e: React.MouseEvent<HTMLElement>) => void;
  okButtonType?: TacoButtonType;
  autoFocusButton?: null | "ok" | "cancel";
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
}) {
  const {
    showOkButton,
    showCancelButton,
    okText,
    cancelText,
    onOk,
    onCancel,
    okButtonType,
    autoFocusButton,
    okButtonProps,
    cancelButtonProps,
  } = props;

  return (
    <>
      {showCancelButton && (
        <TacoButton
          style={{ minWidth: "64px" }}
          onClick={onCancel}
          autoFocus={autoFocusButton === "cancel"}
          {...cancelButtonProps}
        >
          {cancelText ?? trans("cancel")}
        </TacoButton>
      )}
      {showOkButton && (
        <TacoButton
          style={{ minWidth: "64px" }}
          onClick={onOk}
          autoFocus={autoFocusButton === "ok"}
          buttonType={okButtonType ?? "primary"}
          {...okButtonProps}
        >
          {okText ?? trans("ok")}
        </TacoButton>
      )}
    </>
  );
}

export type CustomModalProps = {
  draggable?: boolean;
  showBackLink?: boolean; // display the "back" button on the top-left
  onBack?: (e: React.MouseEvent<HTMLElement>) => void;
  showOkButton?: boolean;
  showCancelButton?: boolean;
  children?: JSX.Element | React.ReactNode;
  okButtonType?: TacoButtonType;
} & AntdModalProps;

const DEFAULT_PROPS = {
  showOkButton: true,
  showCancelButton: true,
  showBackLink: false,
  autoFocusButton: "ok",
} as const;

function CustomModalRender(props: CustomModalProps & ModalFuncProps) {
  return (
    <Draggable handle=".handle" disabled={!props.draggable}>
      <ModalWrapper width={props.width}>
        <ModalHeaderWrapper className="handle">
          <ModalHeader
            title={props.title}
            onCancel={props.onCancel}
            showBackLink={props.showBackLink}
            onBack={props.onBack}
          />
        </ModalHeaderWrapper>

        <div style={{ padding: "0 16px", ...props.bodyStyle }}>{props.children}</div>

        {"footer" in props ? (
          props.footer
        ) : (
          <ModalFooterWrapper>
            <ModalFooter {...props} />
          </ModalFooterWrapper>
        )}
      </ModalWrapper>
    </Draggable>
  );
}

/**
 * an antd modal capsulation
 */
function CustomModal(props: CustomModalProps) {
  return (
    <AntdModal
      {...props}
      width="fit-content"
      modalRender={() => <CustomModalRender {...DEFAULT_PROPS} {...props} />}
    />
  );
}

CustomModal.confirm = (props: {
  title?: string;
  content?: ReactNode;
  onConfirm: (e: React.MouseEvent<HTMLElement>) => Promise<any> | any;
  onCancel?: () => void;
  confirmBtnType?: TacoButtonType;
  okText?: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
}): any => {
  const defaultConfirmProps: ModalFuncProps = {
    ...DEFAULT_PROPS,
    okText: trans("ok"),
    cancelText: trans("cancel"),
    bodyStyle: {
      fontFamily: "PingFangSC-Regular",
      fontSize: "14px",
      color: "#333333",
      lineHeight: "22px",
      minHeight: "72px",
      marginTop: "24px",
    },
  };
  // create model
  const model = AntdModal.confirm({
    width: "fit-content",
    style: props.style,
    zIndex: 2000,
    centered: true,
    onCancel: () => {
      model.destroy();
      props.onCancel?.();
    },
  });
  model.update({
    maskClosable: true,
    modalRender: () => (
      <CustomModalRender
        {...defaultConfirmProps}
        onCancel={() => {
          model.destroy();
          props.onCancel?.();
        }}
        children={props.content}
        onOk={(e: React.MouseEvent<HTMLElement>) => {
          const result = props.onConfirm(e);
          if (result && !!result.then) {
            return result.then(model.destroy);
          }
          model.destroy();
        }}
        title={props.title}
        okButtonType={props.confirmBtnType}
        okText={props.okText}
        bodyStyle={{ ...defaultConfirmProps.bodyStyle, ...props.bodyStyle }}
      />
    ),
  });
  return model;
};

export { CustomModal };

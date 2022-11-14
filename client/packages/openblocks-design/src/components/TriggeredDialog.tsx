import React, { ReactNode, useState } from "react";
import { CustomModal } from "./CustomModal";

export const TriggeredDialogContext = React.createContext<{
  changeContent: (Content: ReactNode, showBack: boolean, title: ReactNode) => void;
  setModalVisible: (visible: boolean) => void;
}>(undefined as any);

/**
 * a modal triggered by the `trigger` ReactNode.
 * @remarks
 * this modal allows one-level sub-modal
 */
export function TriggeredDialog(props: {
  trigger: ReactNode;
  initialTitle?: ReactNode;
  children?: ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [showBackLink, setShowBackLink] = useState(false);
  const [modalTitle, setModalTitle] = useState(props.initialTitle);
  const [modalContent, setModalContent] = useState(props.children);
  const changeContent = (Content: ReactNode, showBack: boolean, title: ReactNode) => {
    setModalContent(Content);
    setShowBackLink(showBack);
    setModalTitle(title);
  };

  return (
    <>
      {props.trigger && (
        <div
          onClick={() => {
            setVisible(true);
          }}
        >
          {props.trigger}
        </div>
      )}
      <CustomModal
        visible={visible}
        title={modalTitle}
        destroyOnClose
        onCancel={() => setVisible(false)}
        showOkButton={false}
        showCancelButton={false}
        width="440px"
        showBackLink={showBackLink}
        onBack={() => {
          changeContent(props.children, false, props.initialTitle);
        }}
      >
        <TriggeredDialogContext.Provider
          value={{
            changeContent: changeContent,
            setModalVisible: setVisible,
          }}
        >
          {modalContent}
        </TriggeredDialogContext.Provider>
      </CustomModal>
    </>
  );
}

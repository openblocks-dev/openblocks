import { SHARE_TITLE } from "constants/apiConstants";
import { CustomModal } from "openblocks-design";
import { ReactNode, useState } from "react";
import { AppPermissionList } from "./AppPermissionList";
import { AppPermissionModalContext } from "./commonComponents";

function AppPermissionDialog(props: { applicationId: string; trigger: ReactNode }) {
  const [visible, setVisible] = useState(false);
  const [showBackLink, setShowBackLink] = useState(false);
  const [modalTitle, setModalTitle] = useState(SHARE_TITLE);
  const { applicationId } = props;

  const changeContent = (Content: () => JSX.Element, showBack: boolean, title: string) => {
    setModalContent(<Content />);
    setShowBackLink(showBack);
    setModalTitle(title);
  };
  const [modalContent, setModalContent] = useState(<AppPermissionList />);

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
          changeContent(AppPermissionList, false, SHARE_TITLE);
        }}
      >
        <AppPermissionModalContext.Provider
          value={{
            changeContent: changeContent,
            applicationId: applicationId,
            setModalVisible: setVisible,
          }}
        >
          {modalContent}
        </AppPermissionModalContext.Provider>
      </CustomModal>
    </>
  );
}

export default AppPermissionDialog;

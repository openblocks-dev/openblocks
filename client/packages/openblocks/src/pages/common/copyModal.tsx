import { message } from "antd";
import { APPLICATION_VIEW_URL } from "constants/routesURL";
import { CustomModal, CustomSelect, TacoInput } from "openblocks-design";
import { trans } from "i18n";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUser } from "redux/selectors/usersSelectors";
import ApplicationApi, { EditingApplicationDSL } from "api/applicationApi";
import { validateResponse } from "api/apiUtils";
import { foldersSelector } from "redux/selectors/folderSelector";
import { AppTypeEnum } from "constants/applicationConstants";
import { TypeName } from "./headerStartDropdown";

type CopyModalProps = {
  visible: boolean;
  name: string;
  id: string;
  type: AppTypeEnum;
  close: () => void;
};

export function CopyModal(props: CopyModalProps) {
  const [copyName, setCopyName] = useState("");
  const user = useSelector(getUser);
  const folders = useSelector(foldersSelector);
  const [folderId, setFolderId] = useState(
    folders.find(
      (folder) =>
        folder.subApplications?.length &&
        folder.subApplications?.findIndex((app) => app?.applicationId === props.id) > -1
    )?.folderId || ""
  );
  const { visible, close, name, type, id } = props;

  return (
    <CustomModal
      title={trans("home.copyModalTitle", { name })}
      visible={visible}
      okButtonProps={{ disabled: !copyName }}
      destroyOnClose={true}
      onCancel={close}
      onOk={async () => {
        let dsl = null;
        await ApplicationApi.getApplicationDetail({ applicationId: id, type: "editing" }).then(
          async (response) => {
            if (validateResponse(response) && response.data.data) {
              dsl = response.data.data.applicationDSL as unknown as EditingApplicationDSL;
            }
          }
        );
        if (dsl) {
          await ApplicationApi.createApplicationWithDSL({
            name: copyName,
            orgId: user.currentOrgId,
            applicationType: type,
            editingApplicationDSL: dsl || {},
            folderId,
          })
            .then(async (response) => {
              if (validateResponse(response) && response.data.data) {
                window.open(
                  APPLICATION_VIEW_URL(response.data.data.applicationInfoView.applicationId, "edit")
                );
                window.location.reload();
                return response.data.data;
              }
            })
            .catch((e) => {
              message.error(trans("copyError"));
            });
        }
      }}
    >
      <>
        <span style={{ display: "block", marginBottom: "4px" }}>
          {trans("home.copyNameLabel", { type: TypeName[type] })}
        </span>
        <TacoInput
          placeholder={trans("home.copyNamePlaceholder", {
            type: TypeName[type]?.toLowerCase(),
          })}
          onChange={(e) => {
            setCopyName(e.target.value);
          }}
        />
        {!!folders.length && (
          <>
            <span style={{ display: "block", margin: "15px 0 4px" }}>
              {trans("home.copyModalfolderLabel")}
            </span>
            <CustomSelect
              defaultValue={folderId}
              style={{ width: "100%" }}
              onChange={(value: string) => setFolderId(value)}
              options={[
                {
                  label: trans("home.rootFolder"),
                  value: "",
                },
                ...folders.map((f) => ({
                  label: f.name,
                  value: f.folderId,
                })),
              ]}
              filterOption={(input, option) => (option?.label as string).includes(input)}
            />
          </>
        )}
      </>
    </CustomModal>
  );
}

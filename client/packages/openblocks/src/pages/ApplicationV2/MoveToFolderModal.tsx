import { HomeRes } from "./HomeLayout";
import { Form } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  CustomModal,
  DatasourceForm,
  FolderIcon,
  FormSection,
  FormSelectItem,
  TacoButton,
} from "openblocks-design";
import { moveToFolder } from "../../redux/reduxActions/folderActions";
import styled from "styled-components";
import { trans } from "../../i18n";
import { foldersSelector } from "../../redux/selectors/folderSelector";

const MoveLabel = styled.div`
  font-size: 13px;
  color: #333333;
  line-height: 13px;
  margin-bottom: 8px;
`;

const MoveButton = styled(TacoButton)`
  width: 76px;
  height: 28px;
`;

const FolderSelectLabel = styled.div`
  display: flex;
  align-items: center;
`;

const MoveModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 16px 0;
  gap: 8px;
`;

export const MoveToFolderModal = (props: { source?: HomeRes; onClose: () => void }) => {
  const [form] = Form.useForm();

  const [loading, setLoading] = useState<boolean>(false);

  const folders = useSelector(foldersSelector);

  const dispatch = useDispatch();

  const { folderId } = useParams<{ folderId: string }>();

  return (
    <CustomModal
      visible={!!props.source}
      onCancel={props.onClose}
      destroyOnClose={true}
      width="408px"
      centered={true}
      title={trans("home.moveToFolder")}
      footer={
        <MoveModalFooter>
          <MoveButton onClick={props.onClose}>{trans("cancel")}</MoveButton>
          <MoveButton
            autoFocus={true}
            buttonType="primary"
            loading={loading}
            onClick={() => {
              form.validateFields().then(() => {
                setLoading(true);
                dispatch(
                  moveToFolder(
                    {
                      sourceFolderId: folderId,
                      sourceId: props.source?.id!,
                      folderId: form.getFieldValue("folder"),
                    },
                    () => {
                      props.onClose();
                      setLoading(false);
                    },
                    () => setLoading(false)
                  )
                );
              });
            }}
          >
            {trans("move")}
          </MoveButton>
        </MoveModalFooter>
      }
    >
      <DatasourceForm form={form} preserve={false} style={{ gap: "12px" }}>
        <FormSection>
          <MoveLabel>
            {trans("home.moveToFolderSubTitle", { name: props.source?.name ?? "" })}
          </MoveLabel>
          <FormSelectItem
            name={"folder"}
            initialValue={
              folderId ? "" : folders.filter((f) => f.folderId !== folderId)[0]?.folderId
            }
            options={[
              ...(folderId
                ? [
                    {
                      label: (
                        <FolderSelectLabel>
                          <FolderIcon style={{ marginRight: "8px", flexShrink: 0 }} />
                          {trans("home.rootFolder")}
                        </FolderSelectLabel>
                      ),
                      value: "",
                    },
                  ]
                : []),
              ...folders
                .filter((f) => f.folderId !== folderId)
                .map((f) => ({
                  label: (
                    <FolderSelectLabel>
                      <FolderIcon style={{ marginRight: "8px", flexShrink: 0 }} />
                      {f.name}
                    </FolderSelectLabel>
                  ),
                  value: f.folderId,
                })),
            ]}
          />
        </FormSection>
      </DatasourceForm>
    </CustomModal>
  );
};

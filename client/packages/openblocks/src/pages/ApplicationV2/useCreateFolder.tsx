import { CustomModal } from "openblocks-design";
import { DatasourceForm, FormInputItem, FormSection } from "openblocks-design";
import { RuleObject, StoreValue } from "rc-field-form/lib/interface";
import { createFolder } from "../../redux/reduxActions/folderActions";
import React, { useCallback, useMemo } from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getCurrentUser } from "../../redux/selectors/usersSelectors";
import { trans } from "../../i18n";
import { foldersSelector } from "../../redux/selectors/folderSelector";

const CreateFolderLabel = styled.div`
  font-size: 13px;
  color: #333333;
  line-height: 13px;
  margin-bottom: 8px;
`;

export function useCreateFolder() {
  const dispatch = useDispatch();
  const user = useSelector(getCurrentUser);
  const allFolders = useSelector(foldersSelector);
  const folderNames = useMemo(() => allFolders.map((f) => f.name), [allFolders]);

  const [form] = Form.useForm();

  return useCallback(
    () =>
      CustomModal.confirm({
        title: trans("home.createFolder"),
        content: (
          <DatasourceForm form={form} preserve={false} style={{ gap: "12px" }}>
            <FormSection>
              <CreateFolderLabel>{trans("home.createFolderSubTitle")}</CreateFolderLabel>
              <FormInputItem
                autoFocus={true}
                name={"name"}
                rules={[
                  {
                    message: trans("home.folderAlreadyExists"),
                    warningOnly: false,
                    validator: (_: RuleObject, value: StoreValue) => {
                      if (value && folderNames.includes(value)) {
                        return Promise.reject();
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              />
            </FormSection>
          </DatasourceForm>
        ),
        onConfirm: () =>
          form.validateFields().then(() => {
            return new Promise((resolve, reject) => {
              dispatch(
                createFolder(
                  {
                    name: form.getFieldValue("name"),
                    orgId: user.currentOrgId,
                  },
                  () => resolve(true),
                  () => reject(false)
                )
              );
            });
          }),
        okText: trans("create"),
      }),
    [user, allFolders, form, dispatch]
  );
}

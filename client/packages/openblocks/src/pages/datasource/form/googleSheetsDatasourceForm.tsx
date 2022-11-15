import React from "react";
import { GoogleSheetsConfig } from "../../../api/datasourceApi";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import { DatasourceNameFormInputItem, GeneralSettingFormSectionLabel } from "../form";
import { trans } from "i18n";
import { DatasourceForm, FormInputPasswordItem, FormSection } from "openblocks-design";

/**
 * todo check service account
 */
export const GoogleSheetsDatasourceForm = (props: DatasourceFormProps) => {
  const { form, datasource } = props;
  const datasourceConfig = datasource?.datasourceConfig as GoogleSheetsConfig;

  return (
    <DatasourceForm form={form} preserve={false}>
      <FormSection size={props.size}>
        <DatasourceNameFormInputItem
          placeholder={"My GoogleSheets1"}
          initialValue={datasource?.name}
        />
      </FormSection>

      <FormSection size={props.size}>
        <GeneralSettingFormSectionLabel />
        <FormInputPasswordItem
          name={"serviceAccount"}
          label="Service Account"
          required={true}
          placeholder={datasource ? trans("query.encryptedServer") : "••••••••••••"}
          rules={[
            {
              required: !datasourceConfig,
              message: trans("googleSheets.serviceAccountRequireMessage"),
            },
          ]}
        />
      </FormSection>
    </DatasourceForm>
  );
};

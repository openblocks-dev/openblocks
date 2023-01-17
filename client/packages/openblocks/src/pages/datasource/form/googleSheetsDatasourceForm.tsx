import React from "react";
import { GoogleSheetsConfig } from "../../../api/datasourceApi";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import { DatasourceNameFormInputItem, GeneralSettingFormSectionLabel } from "../form";
import { trans } from "i18n";
import { DatasourceForm, FormSection, FormTextAreaItem } from "openblocks-design";

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
        <FormTextAreaItem
          name={"serviceAccount"}
          label="Service Account"
          required={true}
          autoSize={{ minRows: 9, maxRows: 9 }}
          placeholder={
            datasource
              ? trans("query.encryptedServer")
              : "{\n" +
                '  "type": "service_account",\n' +
                '  "project_id": "yourProjectId",\n' +
                '  "private_key_id": "yourPrivateKeyId",\n' +
                '  "private_key": "-----BEGIN PRIVATE KEY-----\n' +
                "YOUR PRIVATE KEY\n" +
                '-----END PRIVATE KEY-----",\n' +
                '  "client_email": "yourClientEmail",\n' +
                '  "client_id": "yourClientId",\n' +
                '  "auth_uri": "https://accounts.google.com/o/oauth2/auth",\n' +
                '  "token_uri": "https://oauth2.googleapis.com/token",\n' +
                '  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",\n' +
                '  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/googlesheetsxxx.iam.gserviceaccount.com"\n' +
                "}"
          }
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

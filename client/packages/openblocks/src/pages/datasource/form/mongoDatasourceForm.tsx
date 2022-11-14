import React, { useState } from "react";
import { DatasourceForm, FormInputItem, FormSection, FormSelectItem } from "openblocks-design";
import { MongoConfig } from "../../../api/datasourceApi";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import { useHostCheck } from "./useHostCheck";
import { trans } from "i18n";
import {
  DatabaseFormInputItem,
  DatasourceNameFormInputItem,
  encryptedPlaceholder,
  HostFormInputItem,
  PasswordFormInputItem,
  PortFormInputItem,
  SSLFormCheckboxItem,
  UserNameFormInputItem,
} from "../form";

export const MongoDatasourceForm = (props: DatasourceFormProps) => {
  const { form, datasource } = props;
  const datasourceConfig = datasource?.datasourceConfig as MongoConfig;

  const [usingUri, setUsingUri] = useState(datasourceConfig?.usingUri);

  const hostRule = useHostCheck();

  return (
    <DatasourceForm form={form} preserve={false}>
      <FormSection size={props.size}>
        <DatasourceNameFormInputItem placeholder={"My MongoDB1"} initialValue={datasource?.name} />
        <FormSelectItem
          name={"usingUri"}
          label={trans("query.connectionType")}
          options={[
            { label: trans("query.regular"), value: "regular" },
            { label: "URI", value: "uri" },
          ]}
          initialValue={datasourceConfig?.usingUri ? "uri" : "regular"}
          afterChange={(value) => setUsingUri(value === "uri")}
        />

        {usingUri ? (
          <FormInputItem
            name={"uri"}
            label="URI"
            required={true}
            placeholder={datasourceConfig?.usingUri ? encryptedPlaceholder : ""}
            rules={[
              {
                required: !datasourceConfig?.usingUri && true,
                message: trans("query.uriRequiredMessage"),
              },
              {
                pattern: new RegExp(
                  "^(mongodb(?:\\+srv)?://)(?:(.+):(.+)@)?([^/?]+)/?([^?]+)?\\??(.+)?$"
                ),
                message: trans("query.uriErrorMessage"),
              },
              hostRule,
            ]}
          />
        ) : (
          <>
            <HostFormInputItem initialValue={datasourceConfig?.host} />
            <PortFormInputItem initialValue={"27017"} port={datasourceConfig?.port} />
            <DatabaseFormInputItem database={datasourceConfig?.database} />
            <UserNameFormInputItem initialValue={datasourceConfig?.username} />
            <PasswordFormInputItem datasource={datasource} />
            <SSLFormCheckboxItem usingSSl={datasourceConfig?.usingSsl} />
          </>
        )}
      </FormSection>
    </DatasourceForm>
  );
};

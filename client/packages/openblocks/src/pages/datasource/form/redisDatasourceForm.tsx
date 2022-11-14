import React, { useState } from "react";
import { DatasourceForm, FormInputItem, FormSection, FormSelectItem } from "openblocks-design";
import { MongoConfig } from "../../../api/datasourceApi";
import { DatasourceFormProps } from "./datasourceFormRegistry";
import { useHostCheck } from "./useHostCheck";
import {
  PortFormInputItem,
  DatasourceNameFormInputItem,
  HostFormInputItem,
  UserNameFormInputItem,
  encryptedPlaceholder,
} from "../form";
import { trans } from "i18n";
import { PasswordFormInputItem } from "../form";

export const RedisDatasourceForm = (props: DatasourceFormProps) => {
  const { form, datasource } = props;
  const datasourceConfig = datasource?.datasourceConfig as MongoConfig;

  const [usingUri, setUsingUri] = useState(datasourceConfig?.usingUri);

  const hostRule = useHostCheck();

  return (
    <DatasourceForm form={form} preserve={false}>
      <FormSection size={props.size}>
        <DatasourceNameFormInputItem placeholder={"My Redis1"} initialValue={datasource?.name} />
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
            placeholder={
              datasourceConfig?.usingUri
                ? encryptedPlaceholder
                : "redis://username:password@my-redis.com:6379"
            }
            rules={[
              {
                required: !datasourceConfig?.usingUri && true,
                message: trans("query.uriRequiredMessage"),
              },
              hostRule,
            ]}
          />
        ) : (
          <>
            <HostFormInputItem initialValue={datasourceConfig?.host} />
            <PortFormInputItem initialValue={"6379"} port={datasourceConfig?.port} />
            <UserNameFormInputItem initialValue={datasourceConfig?.username} />
            <PasswordFormInputItem datasource={datasource} />
          </>
        )}
      </FormSection>
    </DatasourceForm>
  );
};

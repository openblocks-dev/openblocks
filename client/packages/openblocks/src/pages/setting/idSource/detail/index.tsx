import React, { useState } from "react";
import { trans } from "i18n";
import IdSourceApi, { ConfigItem } from "api/idSourceApi";
import { DetailContainer } from "pages/setting/theme/styledComponents";
import { HeaderBack } from "pages/setting/permission/styledComponents";
import { ArrowIcon, CustomSelect, LockIcon } from "openblocks-design";
import history from "util/history";
import { IDSOURCE_SETTING } from "constants/routesURL";
import {
  authConfig,
  AuthType,
  ManualSyncTypes,
} from "@openblocks-ee/pages/setting/idSource/idSourceConstants";
import { Manual } from "pages/setting/idSource/detail/manual";
import { DeleteConfig } from "pages/setting/idSource/detail/deleteConfig";
import { Divider, Form, Input, message } from "antd";
import {
  SaveButton,
  CheckboxStyled,
  FormStyled,
  PasswordLabel,
  Content,
  Header,
} from "pages/setting/idSource/styledComponents";
import { validateResponse } from "api/apiUtils";
import { cloneDeep } from "lodash";
import { validatorOptions } from "pages/setting/idSource/idSourceConstants";

type IdSourceDetailProps = {
  location: Location & { state: ConfigItem };
};

export const IdSourceDetail = (props: IdSourceDetailProps) => {
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveDisable, setSaveDisable] = useState(() => {
    const config = props.location.state;
    if (
      (config.authType === AuthType.Form && !config.enable) ||
      (!config.ifLocal && !config.enable)
    ) {
      return false;
    } else {
      return true;
    }
  });
  const configDetail = props.location.state;
  const goList = () => {
    history.push(IDSOURCE_SETTING);
  };
  if (!configDetail) {
    goList();
  }
  const handleSuccess = (values: ConfigItem) => {
    setSaveLoading(true);
    const params = {
      ...values,
      ...(configDetail.ifLocal ? null : { id: configDetail.id }),
      authType: configDetail.authType,
    };
    IdSourceApi.saveConfig(params)
      .then((resp) => {
        if (validateResponse(resp)) {
          message.success(trans("idSource.saveSuccess"), 0.8, goList);
        }
      })
      .catch((e) => message.error(e.message))
      .finally(() => setSaveLoading(false));
  };

  const handleChange = (allValues: { [key: string]: string }) => {
    let ifChange = false;
    let ifError = false;
    for (const key in allValues) {
      const item = configDetail[key as keyof ConfigItem];
      if (allValues[key] !== item && (allValues[key] || item)) {
        ifChange = true;
      }
    }
    const requiredValues = cloneDeep(allValues);
    requiredValues.source !== undefined && delete requiredValues.source;
    requiredValues.sourceName !== undefined && delete requiredValues.sourceName;
    if (configDetail.ifLocal) {
      ifError =
        Object.values(requiredValues).findIndex((item) => item === "" || item === undefined) >= 0;
    } else {
      for (const key in requiredValues) {
        const value = requiredValues[key as string];
        if (
          key !== "clientSecret" &&
          key !== "publicKey" &&
          (value === "" || value === undefined)
        ) {
          ifError = true;
        }
      }
    }
    if (
      (configDetail.authType === AuthType.Form && !configDetail.enable) ||
      (!configDetail.ifLocal && !configDetail.enable && !ifError) ||
      (ifChange && !ifError)
    ) {
      setSaveDisable(false);
    } else {
      setSaveDisable(true);
    }
  };
  return (
    <DetailContainer>
      <Header>
        <HeaderBack>
          <span onClick={() => goList()}>{trans("idSource.title")}</span>
          <ArrowIcon />
          <span>{authConfig[configDetail.authType].sourceName}</span>
        </HeaderBack>
      </Header>
      <Content>
        <FormStyled
          name="basic"
          layout="vertical"
          style={{ maxWidth: 440 }}
          initialValues={configDetail}
          onFinish={(values) => handleSuccess(values as ConfigItem)}
          autoComplete="off"
          onValuesChange={(changedValues, allValues) =>
            handleChange(allValues as { [key: string]: string })
          }
        >
          {Object.keys(authConfig[configDetail.authType].form).map((item) => {
            const label = authConfig[configDetail.authType].form[item];
            return (
              <Form.Item
                key={item}
                name={item}
                rules={[
                  {
                    required:
                      item !== "source" &&
                      item !== "sourceName" &&
                      (configDetail.ifLocal || (item !== "clientSecret" && item !== "publicKey")),
                    message:
                      item === "validator"
                        ? trans("idSource.formSelectPlaceholder", {
                            form: label,
                          })
                        : trans("idSource.formPlaceholder", {
                            form: label,
                          }),
                  },
                ]}
                label={
                  item === "clientSecret" || item === "publicKey" ? (
                    <PasswordLabel>
                      <span>{label}:</span>
                      <LockIcon />
                    </PasswordLabel>
                  ) : (
                    <span>{label}:</span>
                  )
                }
              >
                {item === "clientSecret" || item === "publicKey" ? (
                  <Input
                    type={"password"}
                    placeholder={
                      configDetail.ifLocal
                        ? trans("idSource.formPlaceholder", {
                            form: label,
                          })
                        : trans("idSource.encryptedServer")
                    }
                    autoComplete={"one-time-code"}
                  />
                ) : item === "validator" ? (
                  <CustomSelect
                    options={validatorOptions}
                    placeholder={trans("idSource.formSelectPlaceholder", {
                      form: label,
                    })}
                  />
                ) : (
                  <Input
                    placeholder={trans("idSource.formPlaceholder", {
                      form: label,
                    })}
                  />
                )}
              </Form.Item>
            );
          })}
          <Form.Item className="register" name="enableRegister" valuePropName="checked">
            <CheckboxStyled>{trans("idSource.enableRegister")}</CheckboxStyled>
          </Form.Item>

          <Form.Item>
            <SaveButton loading={saveLoading} disabled={saveDisable} htmlType="submit">
              {configDetail.enable ? trans("idSource.save") : trans("idSource.saveBtn")}
            </SaveButton>
          </Form.Item>
        </FormStyled>
        {ManualSyncTypes.includes(configDetail.authType) && (
          <>
            <Divider />
            <Manual type={configDetail.authType} />
          </>
        )}
        {configDetail.enable && (
          <>
            <Divider />
            <DeleteConfig id={configDetail.id} />
          </>
        )}
      </Content>
    </DetailContainer>
  );
};

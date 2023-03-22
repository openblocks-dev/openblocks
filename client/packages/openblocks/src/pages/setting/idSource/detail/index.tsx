import React, { useState } from "react";
import { trans, transToNode } from "i18n";
import IdSourceApi, { ConfigItem } from "api/idSourceApi";
import { DetailContainer } from "pages/setting/theme/styledComponents";
import { HeaderBack } from "pages/setting/permission/styledComponents";
import {
  ArrowIcon,
  CustomModal,
  CustomSelect,
  LockIcon,
  UnLockIcon,
  CloseEyeIcon,
} from "openblocks-design";
import history from "util/history";
import { IDSOURCE_SETTING } from "constants/routesURL";
import {
  authConfig,
  AuthType,
  ManualSyncTypes,
} from "@openblocks-ee/pages/setting/idSource/idSourceConstants";
import { Manual } from "pages/setting/idSource/detail/manual";
import { DeleteConfig } from "pages/setting/idSource/detail/deleteConfig";
import { Divider, Form, Input, message, Tooltip } from "antd";
import {
  SaveButton,
  CheckboxStyled,
  FormStyled,
  PasswordLabel,
  Content,
  Header,
} from "pages/setting/idSource/styledComponents";
import { validateResponse } from "api/apiUtils";
import { ItemType } from "pages/setting/idSource/idSourceConstants";
import { useForm } from "antd/es/form/Form";
import _ from "lodash";

type IdSourceDetailProps = {
  location: Location & { state: ConfigItem };
};

export const IdSourceDetail = (props: IdSourceDetailProps) => {
  const [form] = useForm();
  const [lock, setLock] = useState(() => {
    const config = props.location.state;
    return !config.ifLocal;
  });
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
    const requiredValues = {} as { [key: string]: string };
    Object.entries(authConfig[configDetail.authType].form).forEach(([key, value]) => {
      if (typeof value === "string" || value.isRequire !== false) {
        key in allValues && (requiredValues[key] = allValues[key]);
      }
    });
    if (configDetail.ifLocal) {
      ifError =
        Object.values(requiredValues).findIndex((item) => item === "" || item === undefined) >= 0;
    } else {
      for (const key in requiredValues) {
        const value = requiredValues[key as string];
        if (
          key !== "clientSecret" &&
          key !== "publicKey" &&
          (value === "" || value === undefined || value === null)
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

  const handleLockClick = () => {
    CustomModal.confirm({
      title: trans("idSource.disableTip"),
      content: trans("idSource.lockModalContent"),
      onConfirm: () => setLock(false),
    });
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
          form={form}
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
          {Object.entries(authConfig[configDetail.authType].form).map(([key, value]) => {
            const valueObject = _.isObject(value) ? (value as ItemType) : false;
            let required = configDetail.ifLocal || (key !== "clientSecret" && key !== "publicKey");
            required = valueObject ? valueObject.isRequire ?? required : required;
            const hasLock = valueObject && valueObject?.hasLock;
            const tip = valueObject && valueObject.tip;
            const label = valueObject ? valueObject.label : value;
            const isList = valueObject && valueObject.isList;
            const isPassword = valueObject && valueObject.isPassword;
            return (
              <div key={key}>
                <Form.Item
                  key={key}
                  name={key}
                  className={hasLock && lock ? "lock" : ""}
                  rules={[
                    {
                      required,
                      message: isList
                        ? trans("idSource.formSelectPlaceholder", {
                            label,
                          })
                        : trans("idSource.formPlaceholder", {
                            label,
                          }),
                    },
                  ]}
                  label={
                    isPassword ? (
                      <PasswordLabel>
                        <span>{label}:</span>
                        <CloseEyeIcon />
                      </PasswordLabel>
                    ) : (
                      <Tooltip title={tip}>
                        <span className={tip ? "has-tip" : ""}>{label}</span>:
                      </Tooltip>
                    )
                  }
                >
                  {isPassword ? (
                    <Input
                      type={"password"}
                      placeholder={
                        configDetail.ifLocal
                          ? trans("idSource.formPlaceholder", {
                              label,
                            })
                          : trans("idSource.encryptedServer")
                      }
                      autoComplete={"one-time-code"}
                    />
                  ) : !isPassword && !isList ? (
                    <Input
                      placeholder={trans("idSource.formPlaceholder", {
                        label,
                      })}
                      disabled={hasLock && lock}
                      prefix={
                        hasLock &&
                        (lock ? <LockIcon onClick={() => handleLockClick()} /> : <UnLockIcon />)
                      }
                    />
                  ) : (
                    <CustomSelect
                      options={(value as ItemType).options}
                      placeholder={trans("idSource.formSelectPlaceholder", {
                        label,
                      })}
                    />
                  )}
                </Form.Item>
                {hasLock && lock && (
                  <span className="lock-tip">
                    {transToNode("idSource.lockTip", { icon: <LockIcon /> })}
                  </span>
                )}
              </div>
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

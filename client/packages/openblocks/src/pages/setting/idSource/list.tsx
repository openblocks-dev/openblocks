import React, { useEffect, useState } from "react";
import { trans } from "i18n";
import {
  Level1SettingPageContentWithList,
  Level1SettingPageTitleWithBtn,
} from "pages/setting/styled";
import Column from "antd/lib/table/Column";
import { useSelector } from "react-redux";
import { getUser } from "redux/selectors/usersSelectors";
import IdSourceApi, { ConfigItem } from "api/idSourceApi";
import {
  authConfig,
  AuthType,
  authTypeDisabled,
  IdSource,
} from "@openblocks-ee/pages/setting/idSource/idSourceConstants";
import { SpanStyled, StatusSpan, TableStyled } from "pages/setting/idSource/styledComponents";
import { genQueryId } from "comps/utils/idGenerator";
import FreeLimitTag from "pages/common/freeLimitTag";
import history from "util/history";
import { IDSOURCE_DETAIL } from "constants/routesURL";
import { selectSystemConfig } from "redux/selectors/configSelectors";
import { isEnterpriseMode, isSelfDomain } from "util/envUtils";
import { Badge, message } from "antd";
import { validateResponse } from "api/apiUtils";
import { ServerAuthTypeInfo } from "@openblocks-ee/constants/authConstants";
import { GeneralLoginIcon } from "assets/icons";
import { FreeTypes } from "pages/setting/idSource/idSourceConstants";

export const IdSourceList = () => {
  const user = useSelector(getUser);
  const config = useSelector(selectSystemConfig);
  const orgId = user.currentOrgId;
  const [configs, setConfigs] = useState<ConfigItem[]>();
  const [fetching, setFetching] = useState(false);
  const enableEnterpriseLogin = useSelector(selectSystemConfig)?.featureFlag?.enableEnterpriseLogin;
  useEffect(() => {
    if (!orgId || (!isSelfDomain(config) && !isEnterpriseMode(config))) {
      return;
    }
    getConfigs();
  }, [orgId]);
  if (!orgId || (!isSelfDomain(config) && !isEnterpriseMode(config))) {
    return null;
  }

  const getConfigs = () => {
    setFetching(true);
    IdSourceApi.getConfigs()
      .then((resp) => {
        if (validateResponse(resp)) {
          const res: ConfigItem[] = resp.data.data.filter((item: ConfigItem) =>
            IdSource.includes(item.authType)
          );
          const data = IdSource.map((item: AuthType) => {
            const config = res.find((config) => config.authType === item);
            if (config) {
              return config;
            } else {
              const form: { [key: string]: string | undefined } = {};
              Object.keys(authConfig[item].form).forEach((key: string) => {
                form[key] =
                  key === "source" || key === "sourceName"
                    ? item
                    : key === "authServerId"
                    ? "default"
                    : undefined;
              });
              return {
                authType: item,
                enable: false,
                ifLocal: true,
                id: genQueryId(),
                enableRegister: true,
                ...form,
              };
            }
          });
          setConfigs(data);
        }
      })
      .catch((e) => {
        message.error(e.message);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  return (
    <Level1SettingPageContentWithList>
      <Level1SettingPageTitleWithBtn>{trans("idSource.title")}</Level1SettingPageTitleWithBtn>
      <TableStyled
        tableLayout={"auto"}
        scroll={{ x: "100%" }}
        pagination={false}
        rowKey="id"
        loading={fetching}
        dataSource={configs}
        rowClassName={(record, index) => {
          return authTypeDisabled((record as ConfigItem).authType, enableEnterpriseLogin)
            ? "row-disabled"
            : "";
        }}
        onRow={(record) => ({
          onClick: () => {
            if (authTypeDisabled((record as ConfigItem).authType, enableEnterpriseLogin)) {
              return;
            }
            history.push({
              pathname: IDSOURCE_DETAIL,
              state: record,
            });
          },
        })}
      >
        <Column
          title={trans("idSource.loginType")}
          dataIndex="authType"
          key="authType"
          render={(value, record: ConfigItem) => (
            <SpanStyled disabled={authTypeDisabled(value, enableEnterpriseLogin)}>
              {
                <img
                  src={ServerAuthTypeInfo[value as AuthType]?.logo || GeneralLoginIcon}
                  alt={value}
                />
              }
              <span>{authConfig[value as AuthType].sourceName}</span>
              {!FreeTypes.includes(value) && (
                <FreeLimitTag
                  text={
                    enableEnterpriseLogin ? trans("idSource.payUserTag") : trans("idSource.pay")
                  }
                />
              )}
            </SpanStyled>
          )}
        />
        <Column
          title={trans("idSource.status")}
          dataIndex="enable"
          key="enable"
          render={(value, record: ConfigItem) => (
            <StatusSpan>
              {value ? (
                <Badge status="success" text={trans("idSource.enable")} />
              ) : (
                <Badge status="default" text={trans("idSource.unEnable")} />
              )}
            </StatusSpan>
          )}
        />
      </TableStyled>
    </Level1SettingPageContentWithList>
  );
};

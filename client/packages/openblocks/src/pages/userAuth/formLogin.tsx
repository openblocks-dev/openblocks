import { FormInput, PasswordInput } from "openblocks-design";
import {
  AuthBottomView,
  ConfirmButton,
  FormWrapperMobile,
  LoginCardTitle,
  StyledRouteLink,
} from "pages/userAuth/authComponents";
import React, { useContext, useState } from "react";
import { message } from "antd";
import styled from "styled-components";
import UserApi from "api/userApi";
import { useRedirectUrl } from "util/hooks";
import { checkEmailValid, checkPhoneValid } from "util/stringUtils";
import { UserConnectionSource } from "@openblocks-ee/constants/userConstants";
import { trans } from "i18n";
import { AuthContext, authRespValidate } from "pages/userAuth/authUtils";
import { ThirdPartyAuth } from "pages/userAuth/thirdParty/thirdPartyAuth";
import { AUTH_REGISTER_URL } from "constants/routesURL";
import { useLocation } from "react-router-dom";

const AccountLoginWrapper = styled(FormWrapperMobile)`
  display: flex;
  flex-direction: column;
  margin-bottom: 106px;
`;

const onSubmit = (
  account: string,
  password: string,
  redirectUrl: string | null,
  invitationId?: string,
  authId?: string
) => {
  UserApi.formLogin({
    register: false,
    loginId: account,
    password: password,
    invitationId: invitationId,
    source: UserConnectionSource.email,
    authId,
  })
    .then((resp) => {
      authRespValidate(resp, false, redirectUrl);
    })
    .catch((e) => {
      message.error(e.message);
    });
};

export default function FormLogin() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const redirectUrl = useRedirectUrl();
  const { systemConfig, inviteInfo } = useContext(AuthContext);
  const invitationId = inviteInfo?.invitationId;
  const authId = systemConfig?.form.id;
  const location = useLocation();

  return (
    <>
      <LoginCardTitle>{trans("userAuth.login")}</LoginCardTitle>
      <AccountLoginWrapper>
        <FormInput
          className="form-input"
          label={trans("userAuth.email")}
          onChange={(value, valid) => setAccount(valid ? value : "")}
          placeholder={trans("userAuth.inputEmail")}
          checkRule={{
            check: (value) => checkPhoneValid(value) || checkEmailValid(value),
            errorMsg: trans("userAuth.inputValidEmail"),
          }}
        />
        <PasswordInput
          className="form-input"
          onChange={(value) => setPassword(value)}
          valueCheck={() => [true, ""]}
        />
        <ConfirmButton
          disabled={!account || !password}
          onClick={() => onSubmit(account, password, redirectUrl, invitationId, authId)}
        >
          {trans("userAuth.login")}
        </ConfirmButton>
      </AccountLoginWrapper>
      <AuthBottomView>
        <ThirdPartyAuth invitationId={invitationId} authGoal="login" />
        {systemConfig.form.enableRegister && (
          <StyledRouteLink to={{ pathname: AUTH_REGISTER_URL, state: location.state }}>
            {trans("userAuth.register")}
          </StyledRouteLink>
        )}
      </AuthBottomView>
    </>
  );
}

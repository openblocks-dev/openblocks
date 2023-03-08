import { FormInput, PasswordInput } from "openblocks-design";
import { ConfirmButton, FormWrapperMobile, LoginCardTitle } from "pages/userAuth/authComponents";
import React, { useState } from "react";
import { message } from "antd";
import styled from "styled-components";
import UserApi from "api/userApi";
import { useRedirectUrl } from "util/hooks";
import { checkEmailValid, checkPhoneValid } from "util/stringUtils";
import { UserConnectionSource } from "@openblocks-ee/constants/userConstants";
import { trans } from "i18n";
import { authRespValidate } from "pages/userAuth/authUtils";
import { requiresUnAuth } from "pages/userAuth/authHOC";
import { useSelector } from "react-redux";
import { selectSystemConfig } from "redux/selectors/configSelectors";

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
  authId?: string,
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

function AccountPassLogin(props: { invitationId?: string }) {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const redirectUrl = useRedirectUrl();
  const config = useSelector(selectSystemConfig);
  const authId = config?.email.id;
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
          onClick={() => onSubmit(account, password, redirectUrl, props.invitationId, authId)}
        >
          {trans("userAuth.login")}
        </ConfirmButton>
      </AccountLoginWrapper>
    </>
  );
}

export default requiresUnAuth(AccountPassLogin);

import React, { useContext, useState } from "react";
import {
  AuthContainer,
  ConfirmButton,
  FormWrapperMobile,
  LoginCardTitle,
  StyledRouteLinkLogin,
  TermsAndPrivacyInfo,
} from "pages/userAuth/authComponents";
import { FormInput, PasswordInput } from "openblocks-design";
import { AUTH_LOGIN_URL } from "constants/routesURL";
import UserApi from "api/userApi";
import { useRedirectUrl } from "util/hooks";
import { checkEmailValid } from "util/stringUtils";
import styled from "styled-components";
import { requiresUnAuth } from "./authHOC";
import { useLocation } from "react-router-dom";
import { UserConnectionSource } from "@openblocks-ee/constants/userConstants";
import { trans } from "i18n";
import { AuthContext, checkPassWithMsg, useAuthSubmit } from "pages/userAuth/authUtils";

const StyledFormInput = styled(FormInput)`
  margin-bottom: 16px;
`;

const StyledPasswordInput = styled(PasswordInput)`
  margin-bottom: 16px;
`;

const RegisterContent = styled(FormWrapperMobile)`
  display: flex;
  flex-direction: column;

  button {
    margin: 20px 0 16px 0;
  }
`;

const TermsAndPrivacyInfoWrapper = styled.div`
  margin-bottom: 80px;
  @media screen and (max-width: 640px) {
    margin: 10px 0 64px 0;
  }
`;

function UserRegister() {
  const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const redirectUrl = useRedirectUrl();
  const location = useLocation();
  const { systemConfig, inviteInfo } = useContext(AuthContext);
  const authId = systemConfig.form.id;
  const { loading, onSubmit } = useAuthSubmit(
    () =>
      UserApi.formLogin({
        register: true,
        loginId: account,
        password: password,
        invitationId: inviteInfo?.invitationId,
        source: UserConnectionSource.email,
        authId,
      }),
    false,
    redirectUrl
  );
  if (!systemConfig || !systemConfig.form.enableRegister) {
    return null;
  }

  return (
    <AuthContainer title={trans("userAuth.register")} type="large">
      <RegisterContent>
        <LoginCardTitle>{trans("userAuth.registerByEmail")}</LoginCardTitle>
        <StyledFormInput
          className="form-input"
          label={trans("userAuth.email")}
          onChange={(value, valid) => setAccount(valid ? value : "")}
          placeholder={trans("userAuth.inputEmail")}
          checkRule={{
            check: checkEmailValid,
            errorMsg: trans("userAuth.inputValidEmail"),
          }}
        />
        <StyledPasswordInput
          className="form-input"
          valueCheck={checkPassWithMsg}
          onChange={(value, valid) => setPassword(valid ? value : "")}
          doubleCheck
        />
        <ConfirmButton
          disabled={!account || !password || submitBtnDisable}
          onClick={onSubmit}
          loading={loading}
        >
          {trans("userAuth.register")}
        </ConfirmButton>
        <TermsAndPrivacyInfoWrapper>
          <TermsAndPrivacyInfo onCheckChange={(e) => setSubmitBtnDisable(!e.target.checked)} />
        </TermsAndPrivacyInfoWrapper>
        <StyledRouteLinkLogin to={{ pathname: AUTH_LOGIN_URL, state: location.state }}>
          {trans("userAuth.userLogin")}
        </StyledRouteLinkLogin>
      </RegisterContent>
    </AuthContainer>
  );
}

export default requiresUnAuth(UserRegister);

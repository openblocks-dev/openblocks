import { useLocation } from "react-router-dom";
import { AuthSearchParams } from "constants/authConstants";
import { CommonTextLabel } from "components/Label";
import { trans } from "i18n";
import { ThirdPartyAuth } from "pages/userAuth/thirdParty/thirdPartyAuth";
import FormLogin from "@openblocks-ee/pages/userAuth/formLogin";
import { AuthContainer } from "pages/userAuth/authComponents";
import React, { useContext } from "react";
import { AuthContext, getLoginTitle } from "pages/userAuth/authUtils";
import styled from "styled-components";
import { requiresUnAuth } from "pages/userAuth/authHOC";

const ThirdAuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-height: 100px;

  > button,
  > button:focus {
    margin-top: 20px;
    background: #fdfdfd;
    border: 1.07px solid #d7d9e0;
    border-radius: 4px;
    width: 408px;
    height: 48px;
    display: flex;
    justify-content: flex-start;
    padding-left: 104px;

    .auth-label {
      font-weight: 500;
      font-size: 16px;
      color: #333333;
      line-height: 16px;
    }
  }

  .only-third-auth-label {
    font-size: 20px;
    font-weight: 500;
    margin: 16px 0 16px 0;
  }

  @media screen and (max-width: 640px) {
    .only-third-auth-label {
      margin: 8px 0 8px 0;
    }

    > button,
    > button:focus {
      width: calc(100vw - 104px);
      padding-left: 48px;
    }
  }
`;

const thirdPartyLoginLabel = (name: string) => trans("userAuth.signInLabel", { name: name });

export const ThirdPartyBindCard = () => {
  const { systemConfig } = useContext(AuthContext);
  return (
    <AuthContainer title={trans("userAuth.bindAccount")}>
      <ThirdAuthWrapper>
        <ThirdPartyAuth
          authGoal="bind"
          autoJumpSource={
            systemConfig.authConfigs.length === 1
              ? systemConfig.authConfigs[0].sourceType
              : undefined
          }
          labelFormatter={thirdPartyLoginLabel}
        />
      </ThirdAuthWrapper>
    </AuthContainer>
  );
};

function Login() {
  const { inviteInfo, systemConfig, thirdPartyAuthError } = useContext(AuthContext);
  const invitationId = inviteInfo?.invitationId;
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const loginType = systemConfig.authConfigs.find(
    (config) => config.sourceType === queryParams.get(AuthSearchParams.loginType)
  )?.sourceType;
  let autoJumpSource: string | undefined;
  if (loginType) {
    autoJumpSource = loginType;
  } else if (!thirdPartyAuthError && systemConfig?.authConfigs.length === 1) {
    // auto jump third party login page when only one source
    autoJumpSource = systemConfig.authConfigs[0].sourceType;
  }

  const thirdPartyLoginView = (
    <ThirdAuthWrapper>
      {!autoJumpSource && (
        <CommonTextLabel className="only-third-auth-label">
          {trans("userAuth.chooseAccount")}
        </CommonTextLabel>
      )}
      <ThirdPartyAuth
        invitationId={invitationId}
        autoJumpSource={autoJumpSource}
        authGoal="login"
        labelFormatter={thirdPartyLoginLabel}
      />
    </ThirdAuthWrapper>
  );

  let loginCardView;
  if (loginType) {
    loginCardView = thirdPartyLoginView;
    // Specify the login type with query param
  } else if (systemConfig.form.enableLogin) {
    loginCardView = <FormLogin />;
  } else {
    loginCardView = thirdPartyLoginView;
  }

  return (
    <AuthContainer
      title={getLoginTitle(inviteInfo?.createUserName, systemConfig.branding?.brandName)}
    >
      {loginCardView}
    </AuthContainer>
  );
}

export default requiresUnAuth(Login);

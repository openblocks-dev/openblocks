import { AUTH_LOGIN_URL, AUTH_REGISTER_URL, USER_AUTH_URL } from "constants/routesURL";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import { AuthBottomView, AuthContainer, StyledRouteLink } from "pages/userAuth/authComponents";
import { InviteInfo } from "api/inviteApi";
import { trans } from "i18n";
import AccountPassLogin from "pages/userAuth/accountPassLogin";
import UserRegister from "pages/userAuth/register";
import { useSelector } from "react-redux";
import { selectSystemConfig } from "redux/selectors/configSelectors";
import { WhiteLoading } from "openblocks-design";
import { getLoginTitle } from "pages/userAuth/authUtils";

type AuthInviteInfo = InviteInfo & { invitationId: string };
export type AuthLocationState = { inviteInfo?: AuthInviteInfo };

export function UserAuth() {
  const location = useLocation<AuthLocationState>();
  const inviteInfo = location.state?.inviteInfo;
  const systemConfig = useSelector(selectSystemConfig);
  if (!systemConfig) {
    return <WhiteLoading />;
  }

  return (
    <Switch location={location}>
      <Redirect exact from={USER_AUTH_URL} to={AUTH_LOGIN_URL} />
      <Route
        exact
        path={AUTH_LOGIN_URL}
        component={() => (
          <AuthContainer title={getLoginTitle(inviteInfo?.createUserName)}>
            <AccountPassLogin invitationId={inviteInfo?.invitationId} />
            <AuthBottomView>
              {systemConfig.email.enableRegister && (
                <StyledRouteLink to={{ pathname: AUTH_REGISTER_URL, state: location.state }}>
                  {trans("userAuth.register")}
                </StyledRouteLink>
              )}
            </AuthBottomView>
          </AuthContainer>
        )}
      />
      <Route
        exact
        path={AUTH_REGISTER_URL}
        component={() => (
          <AuthContainer title={trans("userAuth.register")} type="large">
            <UserRegister invitationId={inviteInfo?.invitationId} />
          </AuthContainer>
        )}
      />
    </Switch>
  );
}

export default UserAuth;

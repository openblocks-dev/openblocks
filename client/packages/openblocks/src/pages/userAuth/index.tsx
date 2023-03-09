import { AUTH_LOGIN_URL, USER_AUTH_URL } from "constants/routesURL";
import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { selectSystemConfig } from "redux/selectors/configSelectors";
import { AuthContext } from "pages/userAuth/authUtils";
import { AuthRoutes } from "@openblocks-ee/constants/authConstants";
import { AuthLocationState } from "constants/authConstants";
import { ProductLoading } from "components/ProductLoading";

export default function UserAuth() {
  const location = useLocation<AuthLocationState>();
  const systemConfig = useSelector(selectSystemConfig);
  if (!systemConfig) {
    return <ProductLoading hideHeader />;
  }
  return (
    <AuthContext.Provider
      value={{
        systemConfig: systemConfig,
        inviteInfo: location.state?.inviteInfo,
        thirdPartyAuthError: location.state?.thirdPartyAuthError,
      }}
    >
      <Switch location={location}>
        <Redirect exact from={USER_AUTH_URL} to={AUTH_LOGIN_URL} />
        {AuthRoutes.map((route) => (
          <Route key={route.path} exact path={route.path} component={route.component} />
        ))}
      </Switch>
    </AuthContext.Provider>
  );
}

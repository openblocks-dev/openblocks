import { AUTH_LOGIN_URL, BASE_URL } from "constants/routesURL";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUser, isFetchUserFinished } from "redux/selectors/usersSelectors";

export const requiresUnAuth = <Props extends {}>(Component: React.ComponentType<Props>) => {
  function Wrapped(props: Props) {
    const user = useSelector(getUser);
    if (!user.isAnonymous) {
      return <Redirect to={BASE_URL} />;
    }
    return <Component {...props} />;
  }

  return Wrapped;
};

export const requiresAuth = <Props extends {}>(Component: React.ComponentType<Props>) => {
  return function Wrapped(props: Props) {
    const user = useSelector(getUser);
    const fetchUserFinished = useSelector(isFetchUserFinished);
    if (!fetchUserFinished) {
      return null;
    }
    if (!user.isAnonymous) {
      return <Component {...props} />;
    }
    return <Redirect to={AUTH_LOGIN_URL} />;
  };
};

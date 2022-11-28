import { BASE_URL, SETTING } from "constants/routesURL";
import { useSelector } from "react-redux";
import { getCurrentUser } from "redux/selectors/usersSelectors";
import { currentOrgAdminOrDev } from "util/permissionUtils";
import history from "util/history";
import { Route, Switch } from "react-router-dom";
import SettingHome from "./settingHome";

export function Setting() {
  const user = useSelector(getCurrentUser);
  if (!currentOrgAdminOrDev(user)) {
    history.push(BASE_URL);
  }

  return (
    <Switch>
      <Route path={[`${SETTING}/:setting`, SETTING]} component={SettingHome} />
    </Switch>
  );
}

export default Setting;

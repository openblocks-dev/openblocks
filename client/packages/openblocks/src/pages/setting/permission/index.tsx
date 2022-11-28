import { Route, Switch } from "react-router";
import PermissionList from "./permissionList";
import PermissionDetail from "./permissionDetail";
import { PERMISSION_SETTING, PERMISSION_SETTING_DETAIL, SETTING } from "constants/routesURL";

export default () => {
  return (
    <Switch>
      <Route path={[SETTING, PERMISSION_SETTING]} component={PermissionList} exact />
      <Route path={PERMISSION_SETTING_DETAIL} component={PermissionDetail} />
    </Switch>
  );
};

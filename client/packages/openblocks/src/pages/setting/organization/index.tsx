import { Route, Switch } from "react-router";
import { ORGANIZATION_SETTING, ORGANIZATION_SETTING_DETAIL } from "constants/routesURL";
import { OrgList } from "./orgList";
import OrgSettingContent from "./orgSettingContent";

export const Organization = () => {
  return (
    <Switch>
      <Route path={ORGANIZATION_SETTING} component={OrgList} exact />
      <Route path={ORGANIZATION_SETTING_DETAIL} component={OrgSettingContent} exact />
    </Switch>
  );
};

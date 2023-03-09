import { Route, Switch } from "react-router";
import { IdSourceList } from "pages/setting/idSource/list";
import { IdSourceDetail } from "pages/setting/idSource/detail";
import { IDSOURCE_SETTING, IDSOURCE_DETAIL } from "constants/routesURL";

export const IdSourceHome = () => {
  return (
    <Switch>
      <Route path={IDSOURCE_SETTING} component={IdSourceList} exact />
      <Route path={IDSOURCE_DETAIL} component={IdSourceDetail} exact />
    </Switch>
  );
};

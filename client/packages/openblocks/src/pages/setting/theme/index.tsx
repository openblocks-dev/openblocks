import { Route, Switch } from "react-router";
import ThemePage from "./themePage";
import ThemeDetailPage from "./detail";
import { THEME_DETAIL, THEME_SETTING } from "constants/routesURL";

export const ThemeHome = () => {
  return (
    <Switch>
      <Route path={THEME_SETTING} component={ThemePage} exact />
      <Route path={THEME_DETAIL} component={ThemeDetailPage} exact />
    </Switch>
  );
};

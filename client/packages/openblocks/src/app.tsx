import { ConfigProvider } from "antd";
import {
  ALL_APPLICATIONS_URL,
  APP_EDITOR_URL,
  APPLICATION_VIEW_URL,
  BASE_URL,
  DATASOURCE_CREATE_URL,
  DATASOURCE_EDIT_URL,
  DATASOURCE_URL,
  FOLDER_URL,
  FOLDERS_URL,
  IMPORT_APP_FROM_TEMPLATE_URL,
  INVITE_LANDING_URL,
  QUERY_LIBRARY_URL,
  SETTING,
  TRASH_URL,
  USER_AUTH_URL,
  isAuthUnRequired,
  COMPONENT_DOC_URL,
} from "constants/routesURL";
import React from "react";
import ReactDOM from "react-dom";
import { Helmet } from "react-helmet";
import { connect, Provider } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { AppState } from "redux/reducers";
import { fetchConfigAction } from "redux/reduxActions/configActions";
import { getCurrentUser } from "redux/reduxActions/userActions";
import { reduxStore } from "redux/store/store";
import { developEnv } from "util/envUtils";
import history from "util/history";
import LazyRoute from "components/LazyRoute";
import AppFromTemplate from "pages/ApplicationV2/AppFromTemplate";
import AppEditor from "pages/editor/AppEditor";
import { getAntdLocale } from "i18n/antdLocale";
import { CodeEditorTooltipContainer } from "base/codeEditor/codeEditor";
import { ProductLoading } from "components/ProductLoading";
import { language, trans } from "i18n";
import { loadComps } from "comps";
import { fetchHomeData } from "redux/reduxActions/applicationActions";
import { initApp } from "util/commonUtils";
import ApplicationHome from "./pages/ApplicationV2";
import { favicon } from "@openblocks-ee/assets/images";
import { hasQueryParam } from "util/urlUtils";

const Wrapper = (props: { children: React.ReactNode }) => {
  return <ConfigProvider locale={getAntdLocale(language)}>{props.children}</ConfigProvider>;
};

type AppIndexProps = {
  isFetchUserFinished: boolean;
  isFetchHomeFinished: boolean;
  orgDev: boolean;
  defaultHomePage: string | null | undefined;
  fetchConfig: () => void;
  getCurrentUser: () => void;
  fetchHome: () => void;
};

class AppIndex extends React.Component<AppIndexProps, any> {
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.fetchConfig();
    if (history.location.pathname === BASE_URL) {
      this.props.fetchHome();
    }
  }

  componentDidUpdate() {
    if (history.location.pathname === BASE_URL) {
      this.props.fetchHome();
    }
  }

  render() {
    const isTemplate = hasQueryParam("template");
    const pathname = history.location.pathname;
    // make sure all users in this app have checked login info
    if (
      !this.props.isFetchUserFinished ||
      (pathname === BASE_URL && !this.props.isFetchHomeFinished)
    ) {
      const hideLoadingHeader = isTemplate || isAuthUnRequired(pathname);
      return <ProductLoading hideHeader={hideLoadingHeader} />;
    }
    return (
      <Wrapper>
        <Helmet>
          <title>{trans("productName")}</title>
          <link rel="icon" href={favicon} />
          <meta name="description" content={trans("productDesc")} />
        </Helmet>
        <Router history={history}>
          <Switch>
            {!this.props.orgDev && !!this.props.defaultHomePage ? (
              <Redirect
                exact
                from={BASE_URL}
                to={APPLICATION_VIEW_URL(this.props.defaultHomePage, "view")}
              />
            ) : (
              <Redirect exact from={BASE_URL} to={ALL_APPLICATIONS_URL} />
            )}
            <Route exact path={IMPORT_APP_FROM_TEMPLATE_URL} component={AppFromTemplate} />
            <Route path={APP_EDITOR_URL} component={AppEditor} />
            <Route
              path={[
                ALL_APPLICATIONS_URL,
                DATASOURCE_CREATE_URL,
                DATASOURCE_EDIT_URL,
                DATASOURCE_URL,
                QUERY_LIBRARY_URL,
                FOLDERS_URL,
                FOLDER_URL,
                TRASH_URL,
                SETTING,
              ]}
              // component={ApplicationListPage}
              component={ApplicationHome}
            />
            <LazyRoute path={USER_AUTH_URL} load={() => import("@openblocks-ee/pages/userAuth")} />
            <LazyRoute
              path={INVITE_LANDING_URL}
              load={() => import("pages/common/inviteLanding")}
            />

            <LazyRoute
              path={`${COMPONENT_DOC_URL}/:name`}
              load={() => import("@openblocks-ee/pages/ComponentDoc")}
            />
            <Redirect to={`${COMPONENT_DOC_URL}/input`} path="/components" />

            {developEnv() && (
              <>
                <LazyRoute path="/debug_comp/:name" load={() => import("./debug")} />
                <LazyRoute exact path="/debug_comp" load={() => import("./debug")} />
                <Route path="/debug_editor" component={AppEditor} />
                <LazyRoute path="/debug_new" load={() => import("./debugNew")} />
              </>
            )}
          </Switch>
        </Router>
        <CodeEditorTooltipContainer />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isFetchUserFinished: state.ui.users.loadingStates.fetchUserFinished,
  orgDev: state.ui.users.currentUser.orgDev,
  defaultHomePage: state.ui.application.homeOrg?.commonSettings.defaultHomePage,
  isFetchHomeFinished: state.ui.application.loadingStatus.fetchHomeDataFinished,
});

const mapDispatchToProps = (dispatch: any) => ({
  getCurrentUser: () => {
    dispatch(getCurrentUser());
  },
  fetchConfig: () => dispatch(fetchConfigAction()),
  fetchHome: () => dispatch(fetchHomeData({})),
});

const AppIndexWithProps = connect(mapStateToProps, mapDispatchToProps)(AppIndex);

export function bootstrap() {
  initApp();
  loadComps();
  ReactDOM.render(
    <Provider store={reduxStore}>
      <AppIndexWithProps />
    </Provider>,
    document.getElementById("root")
  );
}

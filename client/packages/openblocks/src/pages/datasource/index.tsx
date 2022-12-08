import { Route, Switch } from "react-router-dom";
import { DatasourceEditPage } from "./datasourceEditPage";
import { DatasourceList } from "./datasourceList";
import {
  DATASOURCE_CREATE_URL,
  DATASOURCE_EDIT_URL,
  DATASOURCE_URL,
} from "../../constants/routesURL";
import React, { useEffect } from "react";
import { isEmpty } from "lodash";
import { fetchDatasource, fetchDataSourceTypes } from "../../redux/reduxActions/datasourceActions";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/selectors/usersSelectors";
import { getDataSource, getDataSourceTypes } from "../../redux/selectors/datasourceSelectors";

export const DatasourceHome = () => {
  const dispatch = useDispatch();

  const datasourceList = useSelector(getDataSource);
  const datasourceTypes = useSelector(getDataSourceTypes);

  const currentUser = useSelector(getUser);
  const orgId = currentUser.currentOrgId;

  useEffect(() => {
    if (isEmpty(orgId) || datasourceList.length !== 0) {
      return;
    }
    dispatch(fetchDatasource({ organizationId: orgId }));
  }, [dispatch, datasourceList.length, orgId]);

  useEffect(() => {
    if (isEmpty(orgId) || datasourceTypes.length !== 0) {
      return;
    }
    dispatch(fetchDataSourceTypes({ organizationId: orgId }));
  }, [dispatch, orgId, datasourceTypes.length]);

  return (
    <Switch>
      <Route path={[DATASOURCE_CREATE_URL, DATASOURCE_EDIT_URL]} component={DatasourceEditPage} />
      <Route path={[DATASOURCE_URL]} component={DatasourceList} />
    </Switch>
  );
};

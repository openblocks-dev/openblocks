import PageSkeleton from "./PageSkeleton";
import { useSelector } from "react-redux";
import { getUser } from "../redux/selectors/usersSelectors";
import { matchPath } from "react-router";
import { AppPathParams } from "../constants/applicationConstants";
import { APP_EDITOR_URL } from "../constants/routesURL";

interface ProductLoadingProps {
  hideHeader?: boolean;
}

export function ProductLoading(props: ProductLoadingProps) {
  const user = useSelector(getUser);
  const viewMode = matchPath<AppPathParams>(window.location.pathname, APP_EDITOR_URL)?.params
    .viewMode;
  return (
    <PageSkeleton
      hideSideBar
      hideContent
      hideHeader={props.hideHeader}
      headStyle={
        user.orgDev && viewMode !== "view" && viewMode !== "preview"
          ? { backgroundColor: "#2c2c2c" }
          : {}
      }
    />
  );
}

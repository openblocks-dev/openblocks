import { HomeLayout } from "./HomeLayout";
import { useDispatch, useSelector } from "react-redux";
import { recycleListSelector } from "../../redux/selectors/applicationSelector";
import { TRASH_URL } from "../../constants/routesURL";
import { useEffect } from "react";
import { fetchApplicationRecycleList } from "../../redux/reduxActions/applicationActions";
import { trans } from "../../i18n";

export function TrashView() {
  const dispatch = useDispatch();
  const recycleList = useSelector(recycleListSelector);

  useEffect(() => {
    dispatch(fetchApplicationRecycleList());
  }, [dispatch]);

  return (
    <HomeLayout
      elements={recycleList}
      breadcrumb={[{ text: trans("home.trash"), path: TRASH_URL }]}
      mode={"trash"}
    />
  );
}

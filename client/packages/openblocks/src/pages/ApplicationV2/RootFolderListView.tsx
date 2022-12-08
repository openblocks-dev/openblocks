import { useSelector } from "react-redux";
import { HomeLayout } from "./HomeLayout";
import { getUser } from "../../redux/selectors/usersSelectors";
import { FOLDERS_URL } from "../../constants/routesURL";
import { trans } from "../../i18n";
import { foldersSelector } from "../../redux/selectors/folderSelector";

export function RootFolderListView() {
  const user = useSelector(getUser);
  const allFolders = useSelector(foldersSelector);

  if (!user.currentOrgId) {
    return null;
  }

  return (
    <HomeLayout
      elements={allFolders}
      mode={"folders"}
      breadcrumb={[{ text: trans("home.allFolders"), path: FOLDERS_URL }]}
    />
  );
}

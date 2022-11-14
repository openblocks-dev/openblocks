import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { HomeBreadcrumbType, HomeLayout } from "./HomeLayout";
import { useEffect } from "react";
import { fetchFolderElements } from "../../redux/reduxActions/folderActions";
import { FolderMeta } from "../../constants/applicationConstants";
import { buildFolderUrl } from "../../constants/routesURL";
import { folderElementsSelector, foldersSelector } from "../../redux/selectors/folderSelector";

function getBreadcrumbs(
  folder: FolderMeta,
  allFolders: FolderMeta[],
  breadcrumb: HomeBreadcrumbType[]
): HomeBreadcrumbType[] {
  if (folder.parentFolderId) {
    return getBreadcrumbs(
      allFolders.filter((f) => f.folderId === folder.parentFolderId)[0],
      allFolders,
      [
        {
          text: folder.name,
          path: buildFolderUrl(folder.folderId),
        },
        ...breadcrumb,
      ]
    );
  }
  return breadcrumb;
}

export function FolderView() {
  const { folderId } = useParams<{ folderId: string }>();

  const dispatch = useDispatch();

  const elements = useSelector(folderElementsSelector);
  const allFolders = useSelector(foldersSelector);

  const folder = allFolders.filter((f) => f.folderId === folderId)[0];
  const breadcrumbs = getBreadcrumbs(folder, allFolders, [
    {
      text: folder.name,
      path: buildFolderUrl(folder.folderId),
    },
  ]);

  useEffect(() => {
    dispatch(fetchFolderElements({ folderId: folderId }));
  }, [folderId]);

  return <HomeLayout elements={elements[folderId]} mode={"folder"} breadcrumb={breadcrumbs} />;
}

import {
  AllTypesIcon,
  ApplicationDocIcon,
  FolderIcon,
  ModuleDocIcon,
  NavDocIcon,
} from "openblocks-design";
import { HomeResTypeEnum } from "../types/homeRes";
import { APPLICATION_VIEW_URL, buildFolderUrl } from "../constants/routesURL";
import history from "./history";
import { trans } from "../i18n";

export const HomeResInfo = {
  [HomeResTypeEnum.All]: {
    name: trans("home.all"),
    icon: AllTypesIcon,
  },
  [HomeResTypeEnum.Application]: {
    name: trans("home.app"),
    icon: ApplicationDocIcon,
  },
  [HomeResTypeEnum.Module]: {
    name: trans("home.module"),
    icon: ModuleDocIcon,
  },
  [HomeResTypeEnum.NavLayout]: {
    name: trans("home.navLayout"),
    icon: NavDocIcon,
  },
  [HomeResTypeEnum.Folder]: {
    name: trans("home.folder"),
    icon: FolderIcon,
  },
};

export const handleAppEditClick = (e: any, id: string): void => {
  if (e?.metaKey) {
    window.open(APPLICATION_VIEW_URL(id, "edit"));
  } else {
    history.push(APPLICATION_VIEW_URL(id, "edit"));
  }
};

export const handleAppViewClick = (id: string) => window.open(APPLICATION_VIEW_URL(id, "view"));

export const handleFolderViewClick = (id: string) => history.push(buildFolderUrl(id));

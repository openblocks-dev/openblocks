import { ApplicationDetail, AppTypeEnum } from "constants/applicationConstants";
import { ActiveTextColor, LightActiveTextColor } from "constants/style";
import { User } from "constants/userConstants";
import _ from "lodash";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "redux/reducers";
import { createApplication } from "redux/reduxActions/applicationActions";
import styled from "styled-components";
import { getNextEntityName } from "util/stringUtils";
import { ApplicationDocIcon, ModuleDocIcon, NavDocIcon } from "openblocks-design";
import { trans } from "i18n";
import { normalAppListSelector } from "../redux/selectors/applicationSelector";

const CreateSpan = styled.span`
  margin: 0 8px;
  cursor: pointer;
  color: ${LightActiveTextColor};

  :hover {
    color: ${ActiveTextColor};
  }
`;

interface SelectedState {
  currentUser: User;
  isCreating: boolean;
}

export const AppTypeInfo = {
  [AppTypeEnum.Application]: {
    name: trans("createAppButton.app"),
    icon: <ApplicationDocIcon />,
  },
  [AppTypeEnum.Module]: {
    name: trans("createAppButton.module"),
    icon: <ModuleDocIcon />,
  },
  [AppTypeEnum.NavLayout]: {
    name: trans("createAppButton.navLayout"),
    icon: <NavDocIcon />,
  },
};

const newAppPrefix = (userName: string, appType: AppTypeEnum = AppTypeEnum.Application) => {
  if (appType === AppTypeEnum.NavLayout) {
    return trans("createAppButton.newNavLayoutPrefix", {
      userName: userName,
      appName: AppTypeInfo[appType].name,
    });
  }
  return trans("createAppButton.newAppPrefix", {
    userName: userName,
    appName: AppTypeInfo[appType].name,
  });
};

export function useCreateApp(type: AppTypeEnum, onSuccess?: (app: ApplicationDetail) => void) {
  const dispatch = useDispatch();
  const { currentUser, isCreating } = useSelector<AppState, SelectedState>((state) => ({
    currentUser: state.ui.users.currentUser,
    isCreating: state.ui.application.loadingStatus.isApplicationCreating,
  }));
  const allApplications = useSelector(normalAppListSelector);
  const typeDisplayName = AppTypeInfo[type].name;
  const handleCreate = useCallback(() => {
    if (isCreating) {
      return;
    }
    const applicationList = allApplications.filter((i) => !type || type === i.applicationType);
    const names = applicationList.map((i) => i.name);
    const nextNewApplicationName = getNextEntityName(
      newAppPrefix(currentUser.username, type),
      names
    );

    let dsl = {};

    if (type === AppTypeEnum.Module) {
      dsl = {
        ui: {
          compType: "module",
          comp: {},
        },
      };
    } else if (type === AppTypeEnum.NavLayout) {
      dsl = {
        ui: {
          compType: "nav",
          comp: {},
        },
      };
    }

    dispatch(
      createApplication({
        applicationType: type || AppTypeEnum.Application,
        applicationName: nextNewApplicationName,
        orgId: currentUser.currentOrgId,
        dsl,
        onSuccess: onSuccess || _.noop,
      })
    );
  }, [
    allApplications,
    currentUser.currentOrgId,
    currentUser.username,
    dispatch,
    isCreating,
    onSuccess,
    type,
  ]);

  return [handleCreate, isCreating, typeDisplayName] as const;
}

interface IProps {
  type: AppTypeEnum;
  onSuccess?: (app: ApplicationDetail) => void;
}

export default function CreateAppButton(props: IProps) {
  const { type, onSuccess } = props;
  const [handleCreate, isCreating, typeDisplayName] = useCreateApp(type, onSuccess);
  return (
    <CreateSpan onClick={handleCreate}>
      {isCreating
        ? trans("createAppButton.creating")
        : trans("createAppButton.created", { name: typeDisplayName })}
    </CreateSpan>
  );
}

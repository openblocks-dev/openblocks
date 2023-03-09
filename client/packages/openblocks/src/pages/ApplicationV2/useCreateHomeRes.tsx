import {
  ApplicationDetail,
  AppTypeEnum,
  AppUILayoutType,
} from "../../constants/applicationConstants";
import { useDispatch, useSelector } from "react-redux";
import React, { useCallback } from "react";
import { HomeResTypeEnum } from "../../types/homeRes";
import { getNextEntityName } from "../../util/stringUtils";
import { createApplication } from "../../redux/reduxActions/applicationActions";
import { useParams } from "react-router-dom";
import { getUser } from "../../redux/selectors/usersSelectors";
import {
  isApplicationCreating,
  normalAppListSelector,
} from "../../redux/selectors/applicationSelector";
import history from "../../util/history";
import { buildAppRouteWithState } from "../../constants/routesURL";
import { useCreateFolder } from "./useCreateFolder";
import { trans } from "i18n";
import { HomeResInfo } from "util/homeResUtils";
import { toLower } from "lodash";

export const newAppPrefix = (userName: string, appType: AppTypeEnum = AppTypeEnum.Application) => {
  if (appType === AppTypeEnum.NavLayout) {
    return trans("home.newNavLayout", {
      userName: userName,
      name: toLower(HomeResInfo[appType].name),
    });
  }
  return trans("home.newApp", { userName: userName, name: toLower(HomeResInfo[appType].name) });
};

export function useCreateHomeRes() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const allApplications = useSelector(normalAppListSelector);
  const isCreating = useSelector(isApplicationCreating);

  const { folderId } = useParams<{ folderId: string }>();

  const handleFolderCreate = useCreateFolder();

  const handleCreate = useCallback(
    (type: HomeResTypeEnum) => {
      if (isCreating) {
        return;
      }
      if (type === HomeResTypeEnum.Folder) {
        handleFolderCreate();
      } else {
        const applicationType = AppTypeEnum[AppTypeEnum[type] as keyof typeof AppTypeEnum];
        const applicationList = allApplications.filter(
          (i) => !type || applicationType === i.applicationType
        );
        const names = applicationList.map((i) => i.name);
        const nextNewApplicationName = getNextEntityName(
          newAppPrefix(user.username, applicationType),
          names
        );
        const dsl = {
          ui: {
            compType: AppUILayoutType[applicationType],
            comp: {},
          },
        };

        dispatch(
          createApplication({
            applicationType: applicationType || AppTypeEnum.Application,
            applicationName: nextNewApplicationName,
            orgId: user.currentOrgId,
            dsl,
            folderId: folderId,
            onSuccess: (app: ApplicationDetail) => {
              history.push(
                buildAppRouteWithState(
                  app.applicationInfoView.applicationId,
                  !user.userStatus.newUserGuidance
                )
              );
            },
          })
        );
      }
    },
    [
      allApplications,
      user.userStatus.newUserGuidance,
      user.currentOrgId,
      user.username,
      dispatch,
      isCreating,
      handleFolderCreate,
    ]
  );

  return [handleCreate, isCreating] as const;
}

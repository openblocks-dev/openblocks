import { message, Upload } from "antd";
import React from "react";
import ApplicationApi from "api/applicationApi";
import { validateResponse } from "api/apiUtils";
import { APPLICATION_VIEW_URL } from "constants/routesURL";
import history from "util/history";
import { AppTypeEnum } from "constants/applicationConstants";
import { trans } from "i18n";
import { useParams } from "react-router-dom";
import { put } from "redux-saga/effects";
import { ReduxActionTypes } from "../../../constants/reduxActionConstants";
import { UiLayoutType } from "comps/comps/uiComp";

export const exportApplicationAsJSONFile = (applicationId: string) => {
  const id = `t--export-app-link`;
  const existingLink = document.getElementById(id);
  existingLink && existingLink.remove();
  const link = document.createElement("a");

  ApplicationApi.getApplicationDetail({
    applicationId: applicationId,
    type: "editing",
  })
    .then((resp) => {
      if (validateResponse(resp)) {
        const respseData = resp.data.data;
        const applicationName = respseData.applicationInfoView.name;
        const exportObj = {
          applicationInfo: {
            name: applicationName,
            createAt: respseData.applicationInfoView.createAt,
            createBy: respseData.applicationInfoView.createBy,
            applicationId: respseData.applicationInfoView.applicationId,
            applicationType: respseData.applicationInfoView.applicationType,
          },
          applicationDSL: respseData.applicationDSL,
        };
        const blob = new Blob([JSON.stringify(exportObj)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = applicationName + ".json";
        link.id = id;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
        return;
      }
    })
    .catch((e) => message.error(trans("home.exportError", { message: e.message })));
};

function getAppType(applicationData: any): AppTypeEnum {
  const type = applicationData?.applicationInfo?.applicationType;
  if (type) {
    return type;
  }

  const uiCompType: UiLayoutType = applicationData?.applicationDSL?.ui?.compType;
  switch (uiCompType) {
    case "module":
      return AppTypeEnum.Module;
    case "nav":
      return AppTypeEnum.NavLayout;
    default:
      return AppTypeEnum.Application;
  }
}

const importApplication = async (options: any, orgId: string, folderId?: string) => {
  const { onSuccess, onError, file } = options;
  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = (e) => {
    try {
      if (!e.target?.result) {
        throw new Error(trans("home.fileUploadError"));
      }
      const application = JSON.parse(e.target.result.toString());
      if (!application || !application.applicationDSL) {
        throw new Error(trans("home.fileFormatError"));
      }
      ApplicationApi.createApplicationWithDSL({
        name: file.name?.split(".").slice(0, -1).join(".") || application.applicationInfo.name,
        orgId: orgId,
        applicationType: getAppType(application),
        editingApplicationDSL: application.applicationDSL,
        folderId: folderId,
      })
        .then(async (resp) => {
          if (validateResponse(resp)) {
            message.success(trans("home.importSuccess"));
            onSuccess(trans("success"));

            await put({
              type: ReduxActionTypes.CREATE_APPLICATION_SUCCESS,
              payload: { ...resp.data.data },
            });

            return resp.data.data;
          }
        })
        .then((createdAppInfo) => {
          if (createdAppInfo) {
            history.push(
              APPLICATION_VIEW_URL(createdAppInfo.applicationInfoView.applicationId, "edit")
            );
          }
        })
        .catch((e) => message.error(trans("home.importError", { message: e.message })));
    } catch (error: any) {
      onError(error);
      message.error(trans("home.importError", { message: error.message }));
    }
  };
};

export function AppImport(props: {
  children: React.ReactNode;
  orgId: string;
  appType?: AppTypeEnum;
}) {
  const { folderId } = useParams<{ folderId: string }>();

  return (
    <Upload
      accept=".json"
      showUploadList={false}
      customRequest={(options) => {
        importApplication(options, props.orgId, folderId);
      }}
      multiple={false}
    >
      {props.children}
    </Upload>
  );
}

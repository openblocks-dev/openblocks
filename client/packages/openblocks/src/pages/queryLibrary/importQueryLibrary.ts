import { trans } from "../../i18n";
import { createQueryLibrary } from "../../redux/reduxActions/queryLibraryActions";
import { message } from "antd";
import { Dispatch } from "redux";

export const importQueryLibrary = (params: {
  dispatch: Dispatch;
  options: any;
  orgId: string;
  onSuccess: (resp: any) => void;
}) => {
  const { onSuccess, onError, file } = params.options;
  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = (e) => {
    try {
      if (!e.target?.result) {
        onError(new Error(trans("home.fileUploadError")));
        message.error(trans("home.fileUploadError"));
        return;
      }
      const dsl = JSON.parse(e.target.result.toString());
      if (!dsl || !dsl.query || !dsl.query.compType) {
        onError(new Error(trans("home.fileFormatError")));
        message.error(trans("home.fileFormatError"));
        return;
      }
      params.dispatch(
        createQueryLibrary(
          {
            name: file.name?.split(".").slice(0, -1).join(".") || dsl.query.name,
            organizationId: params.orgId,
            libraryQueryDSL: dsl,
          },
          (resp) => {
            message.success(trans("home.importSuccess"));
            onSuccess(trans("success"));
            params.onSuccess(resp);
          },
          () => {
            onError(new Error(trans("home.fileUploadError")));
            message.error(trans("home.fileUploadError"));
          }
        )
      );
    } catch (e: any) {
      onError(e);
      message.error(trans("home.importError", { message: e.message }));
    }
  };
};

import { Button, message } from "antd";
import { DeleteWrapper } from "pages/setting/idSource/styledComponents";
import { trans } from "i18n";
import { useState } from "react";
import { validateResponse } from "api/apiUtils";
import IdSourceApi from "api/idSourceApi";
import { DangerIcon, CustomModal } from "openblocks-design";
import history from "util/history";
import { IDSOURCE_SETTING } from "constants/routesURL";

export const DeleteConfig = (props: { id: string }) => {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const handleDelete = () => {
    CustomModal.confirm({
      title: trans("idSource.disableTip"),
      content: trans("idSource.disableContent"),
      onConfirm: () => {
        setDeleteLoading(true);
        IdSourceApi.deleteConfig(props.id)
          .then((resp) => {
            if (validateResponse(resp)) {
              message.success(trans("idSource.disableSuccess"), 0.8, () =>
                history.push(IDSOURCE_SETTING)
              );
            }
          })
          .catch((e) => message.error(e.message))
          .finally(() => setDeleteLoading(false));
      },
    });
  };
  return (
    <DeleteWrapper>
      <div>{trans("idSource.dangerLabel")}</div>
      <div className="danger-tip">
        <DangerIcon />
        {trans("idSource.dangerTip")}
      </div>
      <Button loading={deleteLoading} onClick={() => handleDelete()}>
        {trans("idSource.disable")}
      </Button>
    </DeleteWrapper>
  );
};

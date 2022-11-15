import { HomeRes } from "./HomeLayout";
import { HomeResTypeEnum } from "../../types/homeRes";
import { exportApplicationAsJSONFile } from "./components/AppImport";
import { CustomModal, EditPopover } from "openblocks-design";
import { HomeResInfo } from "../../util/homeResUtils";
import { recycleApplication } from "../../redux/reduxActions/applicationActions";
import { deleteFolder } from "../../redux/reduxActions/folderActions";
import { EditPopoverItemType } from "openblocks-design";
import { useDispatch } from "react-redux";
import React from "react";
import styled from "styled-components";
import { PointIcon } from "openblocks-design";
import { message } from "antd";
import { trans } from "../../i18n";
import { useParams } from "react-router-dom";

const PopoverIcon = styled(PointIcon)`
  cursor: pointer;
  flex-shrink: 0;

  g {
    fill: #8b8fa3;
  }

  :hover {
    background-color: #e1e3eb;
    border-radius: 4px;
    cursor: pointer;

    g {
      fill: #3377ff;
    }
  }
`;

export const HomeResOptions = (props: {
  res: HomeRes;
  onRename: (res: HomeRes) => void;
  onMove: (res: HomeRes) => void;
}) => {
  const { res, onRename, onMove } = props;
  const dispatch = useDispatch();

  const { folderId } = useParams<{ folderId: string }>();

  let options: EditPopoverItemType[] = [];

  if (res.type !== HomeResTypeEnum.Folder) {
    if (res.isEditable) {
      options = [
        ...options,
        { text: trans("rename"), onClick: () => onRename(res) },
        { text: trans("home.export"), onClick: () => exportApplicationAsJSONFile(res.id) },
      ];
    }
    if (res.isManageable) {
      options = [...options, { text: trans("home.moveToFolder"), onClick: () => onMove(res) }];
    }
    if (res.isDeletable) {
      options = [
        ...options,
        {
          text: trans("delete"),
          type: "delete",
          onClick: () => {
            CustomModal.confirm({
              title: trans("home.deleteElementTitle", { name: HomeResInfo[res.type].name }),
              content: trans("home.moveToTrashSubTitle", { name: HomeResInfo[res.type].name }),
              onConfirm: () =>
                new Promise((resolve, reject) => {
                  dispatch(
                    recycleApplication(
                      { applicationId: res.id, folderId: folderId },
                      () => {
                        message.success(trans("home.deleteSuccessMsg"));
                        resolve(true);
                      },
                      () => reject()
                    )
                  );
                }),
              confirmBtnType: "delete",
              okText: trans("delete"),
            });
          },
        },
      ];
    }
  } else if (res.type === HomeResTypeEnum.Folder) {
    if (res.isManageable) {
      options = [...options, { text: trans("rename"), onClick: () => onRename(res) }];
    }
    if (res.isDeletable) {
      options = [
        ...options,
        {
          text: trans("delete"),
          type: "delete",
          onClick: () => {
            CustomModal.confirm({
              title: trans("home.deleteElementTitle", { name: HomeResInfo[res.type].name }),
              content: trans("home.deleteElementSubTitle", { name: HomeResInfo[res.type].name }),
              onConfirm: () =>
                new Promise((resolve, reject) => {
                  dispatch(
                    deleteFolder(
                      { folderId: res.id, parentFolderId: folderId },
                      () => {
                        message.success(trans("home.deleteSuccessMsg"));
                        resolve(true);
                      },
                      () => reject()
                    )
                  );
                }),
              confirmBtnType: "delete",
              okText: trans("delete"),
            });
          },
        },
      ];
    }
  }

  return options.length > 0 ? (
    <EditPopover items={options}>
      <PopoverIcon tabIndex={-1} />
    </EditPopover>
  ) : null;
};

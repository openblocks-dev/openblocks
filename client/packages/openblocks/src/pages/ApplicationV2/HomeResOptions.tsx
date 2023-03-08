import { HomeRes } from "./HomeLayout";
import { HomeResTypeEnum } from "../../types/homeRes";
import { exportApplicationAsJSONFile } from "./components/AppImport";
import { CustomModal, EditPopover, EditPopoverItemType, PointIcon } from "openblocks-design";
import { HomeResInfo } from "../../util/homeResUtils";
import { recycleApplication } from "../../redux/reduxActions/applicationActions";
import { deleteFolder } from "../../redux/reduxActions/folderActions";
import { useDispatch } from "react-redux";
import React, { useState } from "react";
import styled from "styled-components";
import { message } from "antd";
import { trans, transToNode } from "../../i18n";
import { useParams } from "react-router-dom";
import { AppTypeEnum } from "constants/applicationConstants";
import { CopyModal } from "pages/common/copyModal";

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
  onDuplicate?: (res: HomeRes | undefined) => void;
  onRename: (res: HomeRes) => void;
  onMove: (res: HomeRes) => void;
}) => {
  const { res, onDuplicate, onRename, onMove } = props;
  const dispatch = useDispatch();
  const [showCopyModal, setShowCopyModal] = useState(false);

  const { folderId } = useParams<{ folderId: string }>();

  let options: EditPopoverItemType[] = [];

  if (res.type !== HomeResTypeEnum.Folder && res.type !== HomeResTypeEnum.All) {
    if (res.isEditable) {
      options = [
        ...options,
        { text: trans("rename"), onClick: () => onRename(res) },
        {
          text: trans("header.duplicate", { type: HomeResInfo[res.type].name.toLowerCase() }),
          onClick: () => {
            onDuplicate?.(res);
            setShowCopyModal(true);
          },
        },
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
          text: trans("home.moveToTrash"),
          type: "delete",
          onClick: () => {
            CustomModal.confirm({
              title: trans("home.moveToTrash"),
              content: transToNode("home.moveToTrashSubTitle", {
                type: HomeResInfo[res.type].name,
                name: <b>{res.name}</b>,
              }),
              onConfirm: () =>
                new Promise((resolve, reject) => {
                  dispatch(
                    recycleApplication(
                      { applicationId: res.id, folderId: folderId },
                      () => {
                        message.success(trans("success"));
                        resolve(true);
                      },
                      () => reject()
                    )
                  );
                }),
              confirmBtnType: "delete",
              okText: trans("home.moveToTrash"),
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
              title: trans("home.deleteElementTitle"),
              content: transToNode("home.deleteElementSubTitle", {
                type: HomeResInfo[res.type].name.toLowerCase(),
                name: <b>{res.name}</b>,
              }),
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
    <>
      <EditPopover items={options}>
        <PopoverIcon tabIndex={-1} />
      </EditPopover>
      <CopyModal
        name={res.name}
        id={res.id}
        visible={showCopyModal}
        type={res.type as unknown as AppTypeEnum}
        close={() => {
          onDuplicate?.(undefined);
          setShowCopyModal(false);
        }}
      />
    </>
  ) : null;
};

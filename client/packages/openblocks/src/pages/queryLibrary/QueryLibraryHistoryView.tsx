import styled from "styled-components";
import { CustomModal, TacoButton } from "openblocks-design";
import { QueryLibraryEditorView } from "./queryLibraryEditorView";
import { ReadOnlyMask } from "../common/styledComponent";
import { useDispatch, useSelector } from "react-redux";
import { fetchQueryLibraryRecordDSL } from "../../redux/reduxActions/queryLibraryActions";
import {
  getQueryLibraryRecords,
  getQueryLibraryRecordsDSL,
} from "../../redux/selectors/queryLibrarySelectors";
import React, { useEffect, useMemo, useState } from "react";
import { getCompContainer, useCompInstance } from "../../comps/utils/useCompInstance";
import { QueryLibraryComp } from "../../comps/comps/queryLibrary/queryLibraryComp";
import { SnapshotList } from "../../components/SnapshotList";
import { timestampToHumanReadable } from "../../util/dateTimeUtils";
import { ScrollBar } from "openblocks-design";
import QueryLibrarySkeletonView from "./QueryLibrarySkeletonView";
import { ReadonlyTag } from "../common/freeLimitTag";
import { trans } from "i18n";

const RevertButton = styled(TacoButton)`
  padding: 0 11px;
  height: 32px;
  border: none;

  :hover {
    padding: 0 11px;
    border: none;
    box-shadow: none;
  }

  :focus {
    padding: 0 11px;
    border: none;
    box-shadow: none;
  }

  :after {
    content: "";
  }
`;

const ExitButton = styled(TacoButton)`
  padding: 0;
  width: 80px;
  height: 32px;

  :hover {
    padding: 0;
    box-shadow: none;
  }

  :focus {
    padding: 0;
    box-shadow: none;
  }

  :after {
    content: "";
  }
`;
const QueryName = styled.div`
  width: 252px;
  color: #222222;
  font-size: 18px;
  font-weight: 500;
  margin-left: -8px;
  padding: 0 8px;
  display: flex;
  align-items: center;
`;

export const QueryLibraryHistoryView = (props: {
  libraryQueryId: string;
  compContainer: ReturnType<typeof getCompContainer>;
  onClose: () => void;
}) => {
  const { libraryQueryId, compContainer, onClose } = props;
  const dispatch = useDispatch();
  const queryLibraryRecords = useSelector(getQueryLibraryRecords);
  const queryLibraryRecordsDSL = useSelector(getQueryLibraryRecordsDSL);

  const selectedRecord = queryLibraryRecords[libraryQueryId] ?? {};
  const firstRecordId = Object.values(selectedRecord)[0]?.id;

  const [selectedRecordId, setSelectedRecordId] = useState<string>(firstRecordId ?? "latest");

  const dsl = selectedRecordId && queryLibraryRecordsDSL[libraryQueryId]?.[selectedRecordId];

  const params = useMemo(
    () => ({
      Comp: QueryLibraryComp,
      initialValue: dsl,
    }),
    [dsl]
  );
  const [comp] = useCompInstance(params);

  useEffect(() => {
    ((selectedRecordId &&
      selectedRecordId !== "latest" &&
      !queryLibraryRecordsDSL[libraryQueryId]?.[selectedRecordId]) ||
      selectedRecordId === "latest") &&
      dispatch(
        fetchQueryLibraryRecordDSL({
          libraryQueryId: libraryQueryId,
          libraryQueryRecordId: selectedRecordId,
        })
      );
  }, [libraryQueryId, selectedRecordId]);

  if (!comp) {
    return <QueryLibrarySkeletonView />;
  }

  let snapshotItems = Object.values(selectedRecord).map((record) => ({
    selected: selectedRecordId === record.id,
    title: record.tag,
    timeInfo: timestampToHumanReadable(record.createTime),
    userName: record.creatorName,
    onClick: () => setSelectedRecordId(record.id),
  }));

  if (snapshotItems.length === 0) {
    snapshotItems = [
      {
        selected: true,
        title: "latest",
        timeInfo: timestampToHumanReadable(selectedRecord["latest"]?.createTime),
        userName: selectedRecord["latest"]?.creatorName,
        onClick: () => setSelectedRecordId("latest"),
      },
    ];
  }
  return (
    <QueryLibraryEditorView
      comp={comp}
      title={
        <QueryName>
          <span
            style={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {comp.children.query.children.name.getView()}
          </span>
          <ReadonlyTag />
        </QueryName>
      }
      subTitle={<span>{selectedRecord[selectedRecordId]?.commitMessage}</span>}
      headerRight={
        <>
          <RevertButton
            buttonType={"primary"}
            disabled={selectedRecordId === "latest"}
            onClick={() => {
              CustomModal.confirm({
                title: trans("header.recoverAppSnapshotTitle"),
                content: trans("queryLibrary.recoverAppSnapshotContent", {
                  version: selectedRecord[selectedRecordId]?.tag,
                }),
                onConfirm: () => {
                  compContainer?.setComp(comp);
                  onClose();
                },
              });
            }}
          >
            {trans("header.recoverAppSnapshotMessage")}
          </RevertButton>
          <ExitButton onClick={onClose}>{trans("queryLibrary.exit")}</ExitButton>
        </>
      }
      bodyLeft={<ReadOnlyMask readOnly={true}>{comp.getQueryPropertyView()}</ReadOnlyMask>}
      bodyRight={
        <>
          <SnapshotHeader>{trans("queryLibrary.historyVersion")}</SnapshotHeader>
          <ScrollBar height={"calc(100% - 45px)"}>
            <div
              style={{
                padding: "0 8px 80px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <SnapshotList items={snapshotItems} />
            </div>
          </ScrollBar>
        </>
      }
    />
  );
};

const SnapshotHeader = styled.div`
  width: 100%;
  height: 45px;
  color: #8b8fa3;
  flex-shrink: 0;
  padding: 16px;
  line-height: 13px;
`;

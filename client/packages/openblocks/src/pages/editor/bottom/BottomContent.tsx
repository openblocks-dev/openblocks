import { useContext, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { NofileIcon } from "openblocks-design";
import { EmptyTab } from "./BottomTabs";
import { CompNameContext, EditorContext } from "comps/editorState";
import { BottomSidebar } from "./BottomSidebar";
import { useSelector } from "react-redux";
import { MetaDataContext } from "base/codeEditor/codeEditorTypes";
import { editorBottomClassName } from "pages/tutorials/tutorialsConstant";
import BottomMetaDrawer from "./BottomMetaDrawer";
import { BottomResComp, BottomResTypeEnum } from "types/bottomRes";
import { ResCreatePanel } from "components/ResCreatePanel";
import { trans } from "i18n";
import { getDataSource } from "redux/selectors/datasourceSelectors";
import { useMetaData } from "util/hooks";
import { message } from "antd";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
`;

const Left = styled.div`
  position: relative;
  width: calc(30% - 1px);
  min-width: 248px;
  max-width: 296px;
  height: 100%;
  float: left;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;
const Drag = styled.div`
  width: 1px;
  height: 100%;
  background-color: #e1e3eb;
  position: relative;
  flex-shrink: 0;
`;
const Right = styled.div`
  position: relative;
  min-width: 0;
  height: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  flex-grow: 1;
`;

export function BottomSkeleton() {
  return (
    <Container>
      <Left></Left>
      <Drag />
      <Right></Right>
    </Container>
  );
}

export const BottomContent = () => {
  const editorState = useContext(EditorContext);
  const datasourceInfos = useSelector(getDataSource);
  const selectedComp = editorState.selectedBottomResComp();
  const [isCreatePanelShow, showCreatePanel] = useState(false);

  const queryItems = editorState.getQueriesComp().getView();
  const tempStateItems = editorState.getTempStatesComp().getView();
  const transformerItems = editorState.getTransformersComp().getView();
  const folderItems = editorState.getFoldersComp().getView();
  const dataResponderItems = editorState.getDataRespondersComp().getView();
  const isFolderSelected = editorState.selectedBottomResType === BottomResTypeEnum.Folder;
  const refTreeComp = editorState.rootComp.children.refTree;

  const bottomResItems = [
    ...queryItems,
    ...tempStateItems,
    ...transformerItems,
    ...folderItems,
    ...dataResponderItems,
  ] as unknown as BottomResComp[];

  const recentlyUsed = bottomResItems.reverse().map((i) => {
    if (i.type() === BottomResTypeEnum.Query) {
      const dsi = datasourceInfos.find(
        (info) => info.datasource.id === (i as any).children.datasourceId?.getView()
      );
      return dsi?.datasource || (i as any).children.compType?.getView();
    }
    return i.type();
  });

  const handleAdd = (type: BottomResTypeEnum, extraInfo?: any) => {
    const listComp = editorState.getBottomResListComp(type);
    const id = listComp.add(editorState, extraInfo);
    showCreatePanel(false);

    const isFolder = type === BottomResTypeEnum.Folder;
    const parent = isFolderSelected && !isFolder ? editorState.selectedBottomResName : "";
    const index = isFolder ? folderItems.length : undefined;
    editorState.rootComp.children.refTree.appendRef(parent, id, index);
  };

  const handleCopy = (type: BottomResTypeEnum, name: string) => {
    const listComp = editorState.getBottomResListComp(type);
    listComp.copy(editorState, name);
  };

  const handleDelete = (type: BottomResTypeEnum, name: string) => {
    const listComp = editorState.getBottomResListComp(type);
    if (type === BottomResTypeEnum.Folder && refTreeComp.hasChildren(name)) {
      message.error(trans("query.folderNotEmpty"));
      return false;
    }
    listComp.delete(name);
    return true;
  };

  const handleSelect = (type: BottomResTypeEnum, name: string) => {
    const listComp = editorState.getBottomResListComp(type);
    listComp.select(editorState, name);
  };

  useEffect(() => {
    editorState.selectedBottomResName && showCreatePanel(false);
  }, [editorState.selectedBottomResName, showCreatePanel]);

  // keep reference unchanged when metaData unchange, avoid re-configure when auto-completion changes
  const selectedDatasourceId =
    editorState.selectedQueryComp()?.children.datasourceId.getView() || "";
  const metaData = useMetaData(selectedDatasourceId);
  return (
    <Container className={editorBottomClassName}>
      <Left>
        <BottomLeft
          items={bottomResItems}
          onOpenCreatePanel={() => showCreatePanel(true)}
          onDelete={handleDelete}
          onCopy={handleCopy}
          onSelect={handleSelect}
        />
      </Left>
      <Drag />
      <Right>
        <div style={{ width: "100%", height: "100%", minWidth: "480px" }}>
          <MetaDataContext.Provider value={metaData}>
            <CompNameContext.Provider
              value={editorState.selectedQueryComp()?.children.name.getView() || ""}
            >
              {selectedComp ? selectedComp.getPropertyView() : EmptyQuery}
            </CompNameContext.Provider>
          </MetaDataContext.Provider>
          {(isCreatePanelShow || isFolderSelected) && (
            <ResCreatePanel
              recentlyUsed={recentlyUsed}
              datasource={datasourceInfos
                .map((i) => i.datasource)
                .filter((d) => d.creationSource !== 2)}
              onSelect={handleAdd}
              onClose={() => showCreatePanel(false)}
            />
          )}
        </div>
      </Right>
    </Container>
  );
};

interface BottomLeftProps {
  onOpenCreatePanel: () => void;
  onCopy: (type: BottomResTypeEnum, name: string) => void;
  onDelete: (type: BottomResTypeEnum, name: string) => boolean;
  onSelect: (type: BottomResTypeEnum, name: string) => void;
  items: BottomResComp[];
}

function BottomLeft(props: BottomLeftProps) {
  const { items, onOpenCreatePanel, onCopy, onSelect, onDelete } = props;
  const editorState = useContext(EditorContext);
  const selectedDataSourceId = editorState.selectedQueryComp()?.children.datasourceId.getView();
  const selectedQueryType = editorState.selectedQueryComp()?.children.compType.getView();

  return (
    <>
      <BottomSidebar
        refTreeComp={editorState.rootComp.children.refTree}
        dataSourceId={selectedDataSourceId}
        items={items}
        onCopy={onCopy}
        onDelete={onDelete}
        onSelect={onSelect}
        onOpenCreatePanel={onOpenCreatePanel}
      />
      {selectedDataSourceId && selectedQueryType && (
        <BottomMetaDrawer dataSourceId={selectedDataSourceId} queryType={selectedQueryType} />
      )}
    </>
  );
}

const labelCss: any = css`
  user-select: text;

  font-size: 13px;
  line-height: 13px;
  cursor: text;
`;

const PicDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  transform: translateY(-48px);
`;
const EmptyLabel = styled.span`
  ${labelCss};
  display: block;
  margin-top: 10px;
  color: #b8b9bf;
  text-align: center;
`;
const EmptyDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const EmptyQuery = (
  <>
    {EmptyTab}
    <EmptyDiv>
      <PicDiv>
        <NofileIcon />
        <EmptyLabel>{trans("bottomPanel.noSelectedQuery")}</EmptyLabel>
      </PicDiv>
    </EmptyDiv>
  </>
);

export const EmptyQueryWithoutTab = (
  <EmptyDiv>
    <PicDiv>
      <NofileIcon />
      <EmptyLabel>{trans("bottomPanel.noSelectedQuery")}</EmptyLabel>
    </PicDiv>
  </EmptyDiv>
);

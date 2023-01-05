import { useContext, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import { NofileIcon } from "openblocks-design";
import { EmptyTab } from "./BottomTabs";
import { CompNameContext, EditorContext } from "../../../comps/editorState";
import { BottomSidebar } from "./BottomSidebar";
import { AppState } from "../../../redux/reducers";
import { useSelector } from "react-redux";
import { DatasourceStructure } from "../../../api/datasourceApi";
import { MetaDataContext } from "base/codeEditor/codeEditorTypes";
import { editorBottomClassName } from "pages/tutorials/tutorialsConstant";
import BottomMetaDrawer from "./BottomMetaDrawer";
import { BottomResComp, BottomResTypeEnum } from "types/bottomRes";
import { ResCreatePanel } from "../../../components/ResCreatePanel";
import { trans } from "i18n";
import { getDataSource } from "../../../redux/selectors/datasourceSelectors";

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
  const datasourceStructure = useSelector((state: AppState) => state.entities.datasource.structure);
  const datasourceInfos = useSelector(getDataSource);
  const selectedComp = editorState.selectedBottomResComp();
  const [isCreatePanelShow, showCreatePanel] = useState(false);

  const queryItems = editorState.getQueriesComp().getView();
  const tempStateItems = editorState.getTempStatesComp().getView();
  const transformerItems = editorState.getTransformersComp().getView();

  const bottomResItems = [
    ...queryItems,
    ...tempStateItems,
    ...transformerItems,
  ] as unknown as BottomResComp[];

  bottomResItems.sort((a, b) => a.order() - b.order());
  const recentlyUsed = bottomResItems
    .reverse()
    .map((i) => {
      if (i.type() === BottomResTypeEnum.Query) {
        const dsi = datasourceInfos.find(
          (info) => info.datasource.id === (i as any).children.datasourceId?.getView()
        );
        return dsi?.datasource || (i as any).children.compType?.getView();
      }
      return i.type();
    })
    .filter((i) => !!i);

  const handleAdd = (type: BottomResTypeEnum, extraInfo?: any) => {
    const listComp = editorState.getBottomResListComp(type);
    listComp.add(editorState, extraInfo);
    showCreatePanel(false);
  };

  const handleCopy = (type: BottomResTypeEnum, name: string) => {
    const listComp = editorState.getBottomResListComp(type);
    listComp.copy(editorState, name);
  };

  const handleDelete = (type: BottomResTypeEnum, name: string) => {
    const listComp = editorState.getBottomResListComp(type);
    listComp.delete(name);
  };

  useEffect(() => {
    editorState.selectedBottomResName && showCreatePanel(false);
  }, [editorState.selectedBottomResName]);
  // keep reference unchanged when metaData unchange, avoid re-configure when auto-completion changes
  const selectedDatasourceId =
    editorState.selectedQueryComp()?.children.datasourceId.getView() || "";
  const metaData = useMemo(
    () => getMetaData(datasourceStructure, selectedDatasourceId),
    [datasourceStructure, selectedDatasourceId]
  );
  return (
    <Container className={editorBottomClassName}>
      <Left>
        <BottomLeft
          onOpenCreatePanel={() => showCreatePanel(true)}
          onDelete={handleDelete}
          onCopy={handleCopy}
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
          {isCreatePanelShow && (
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

function getMetaData(
  datasourceStructure: Record<string, DatasourceStructure[]>,
  selectedDatasourceId: string
): Record<string, string> {
  let ret: Record<string, string> = {};
  datasourceStructure[selectedDatasourceId]?.forEach((table) => {
    ret[table.name] = "table";
    table.columns?.forEach((c) => {
      ret[c.name] = c.type;
    });
  });
  return ret;
}

interface BottomLeftProps {
  onOpenCreatePanel: () => void;
  onCopy: (type: BottomResTypeEnum, name: string) => void;
  onDelete: (type: BottomResTypeEnum, name: string) => void;
}

function BottomLeft(props: BottomLeftProps) {
  const { onOpenCreatePanel, onCopy, onDelete } = props;
  const editorState = useContext(EditorContext);
  const selectedDataSourceId = editorState.selectedQueryComp()?.children.datasourceId.getView();
  const selectedQueryType = editorState.selectedQueryComp()?.children.compType.getView();

  const queryItems = editorState.getQueriesComp().getView();
  const tempStateItems = editorState.getTempStatesComp().getView();
  const transformerItems = editorState.getTransformersComp().getView();

  const bottomResItems = [
    ...queryItems,
    ...tempStateItems,
    ...transformerItems,
  ] as unknown as BottomResComp[];

  bottomResItems.sort((a, b) => a.order() - b.order());

  return (
    <>
      <BottomSidebar
        dataSourceId={selectedDataSourceId}
        items={bottomResItems}
        onCopy={onCopy}
        onDelete={onDelete}
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

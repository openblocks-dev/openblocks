import styled from "styled-components";
import {
  BluePlusIcon,
  EditPopover,
  EditText,
  FoldedIcon,
  PointIcon,
  PopupCard,
  ScrollBar,
  Search,
  SearchIcon,
  TacoButton,
  UnfoldIcon,
} from "openblocks-design";
import { CSSProperties, useContext, useEffect, useState } from "react";
import { EditorContext } from "comps/editorState";
import { useSelector } from "react-redux";
import { showAppSnapshotSelector } from "redux/selectors/appSnapshotSelector";
import { BottomResComp, BottomResTypeEnum } from "types/bottomRes";
import { trans } from "i18n";
import { DraggableTree } from "components/DraggableTree/DraggableTree";
import {
  DraggableTreeNode,
  DraggableTreeNodeItemRenderProps,
} from "components/DraggableTree/types";
import RefTreeComp from "comps/comps/refTreeComp";
import { ActiveTextColor, BorderActiveColor, NormalMenuIconColor } from "constants/style";

const Contain = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  width: 100%;
  background-color: #ffffff;
`;
const Title = styled.div`
  flex-shrink: 0;
  height: 40px;
  width: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TitleSpan = styled.span`
  font-weight: 500;
  font-size: 13px;
  color: #222222;
  line-height: 20px;
  display: inline-block;
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: none;
`;
const TitleRight = styled.div`
  display: flex;
  align-items: center;
`;
const SearchWrapper = styled.div`
  height: 28px;
  padding: 0 16px;
  margin-bottom: 4px;
  .ant-input-affix-wrapper {
    height: 28px;
  }
`;
const SearchIconBtn = styled(SearchIcon)`
  height: 16px;
  width: 16px;
  margin-right: 16px;
  color: #9195a3;
  cursor: pointer;
  &:hover {
    color: ${ActiveTextColor};
  }
`;
const AddIcon = styled(BluePlusIcon)`
  height: 12px;
  width: 12px;
  margin-right: 2px;
`;
const AddBtn = styled(TacoButton)`
  height: 24px;
  width: 64px;
  padding: 4px 12px;
  background-color: #fafbff;
  color: #4965f2;
  border-color: #c9d1fc;
  display: flex;
  align-items: center;
  box-shadow: none;

  :hover {
    color: #315efb;
    background-color: #f5faff;
    border-color: #c2d6ff;
  }

  :focus {
    color: #315efb;
    background-color: #f5faff;
    border-color: #c2d6ff;
  }

  &:hover ${AddIcon} g {
    stroke: #315efb;
  }

  :disabled,
  :disabled:hover {
    background: #f9fbff;
    border: 1px solid #dee9ff;
    border-radius: 4px;

    ${AddIcon} g {
      stroke: #4965f230;
    }
  }
`;

type RefTreeCompType = InstanceType<typeof RefTreeComp>;

interface BottomSidebarProps {
  style?: CSSProperties;
  dataSourceId?: string;
  refTreeComp: RefTreeCompType;
  items: BottomResComp[];
  onCopy: (type: BottomResTypeEnum, name: string) => void;
  onDelete: (type: BottomResTypeEnum, name: string) => boolean;
  onSelect: (type: BottomResTypeEnum, name: string) => void;
  onOpenCreatePanel: () => void;
}

export function BottomSidebar(props: BottomSidebarProps) {
  const { items, refTreeComp, onOpenCreatePanel, onSelect, onCopy, onDelete } = props;
  const readOnly = useSelector(showAppSnapshotSelector);
  const [isSearchShow, showSearch] = useState(false);
  const [search, setSearch] = useState("");
  const getById = (id: string) => items.find((i) => i.id() === id);

  const convertRefTree = (refTreeComp: InstanceType<typeof RefTreeComp>) => {
    const bottomResComp = getById(refTreeComp.children.value.getView());
    const currentNodeType = bottomResComp?.type();
    const childrenItems = refTreeComp.children.items
      ?.getView()
      .map((i) => convertRefTree(i as InstanceType<typeof RefTreeComp>))
      .filter((i): i is DraggableTreeNode<BottomResComp> => !!i);
    const node: DraggableTreeNode<BottomResComp> = {
      id: bottomResComp?.id(),
      canDropBefore: (source) => {
        if (currentNodeType === BottomResTypeEnum.Folder) {
          return source?.type() === BottomResTypeEnum.Folder;
        }

        return source?.type() !== BottomResTypeEnum.Folder;
      },
      canDropAfter: (source) => {
        if (
          currentNodeType !== BottomResTypeEnum.Folder &&
          source?.type() === BottomResTypeEnum.Folder
        ) {
          return false;
        }
        return true;
      },
      canDropIn: (source) => {
        if (currentNodeType !== BottomResTypeEnum.Folder) {
          return false;
        }
        if (!source) {
          return true;
        }
        if (source.type() === BottomResTypeEnum.Folder) {
          return false;
        }
        return true;
      },
      items: childrenItems,
      data: bottomResComp,
      addSubItem(value) {
        const pushAction = refTreeComp.children.items.pushAction({ value: value.id() });
        refTreeComp.children.items.dispatch(pushAction);
      },
      deleteItem(index) {
        const deleteAction = refTreeComp.children.items.deleteAction(index);
        refTreeComp.children.items.dispatch(deleteAction);
      },
      addItem(value) {
        const pushAction = refTreeComp.children.items.pushAction({ value: value.id() });
        refTreeComp.children.items.dispatch(pushAction);
      },
      moveItem(from, to) {
        const moveAction = refTreeComp.children.items.arrayMoveAction(from, to);
        refTreeComp.children.items.dispatch(moveAction);
      },
    };

    if (
      search &&
      bottomResComp &&
      !bottomResComp.name().toLowerCase().includes(search.toLowerCase()) &&
      childrenItems.length === 0
    ) {
      return;
    }
    return node;
  };

  const node = convertRefTree(refTreeComp);
  const idsInTree = refTreeComp.getAllValuesInTree();
  const itemsNotInTree = items.filter((i) => !idsInTree.includes(i.id())).map((i) => i.id());

  useEffect(() => {
    if (itemsNotInTree.length > 0) {
      itemsNotInTree.forEach((i) => {
        const pushAction = refTreeComp.children.items.pushAction({
          value: i,
          items: [],
        });
        refTreeComp.children.items.dispatch(pushAction);
      });
    }
  }, [itemsNotInTree, refTreeComp.children.items]);

  return (
    <Contain style={props.style}>
      <Title>
        <TitleSpan>
          {trans("bottomPanel.title")} ({items.length})
        </TitleSpan>
        <TitleRight>
          <SearchIconBtn
            onClick={() => {
              showSearch(!isSearchShow);
              setSearch("");
            }}
          />
          <AddBtn
            disabled={readOnly}
            onClick={() => {
              onOpenCreatePanel();
            }}
          >
            <AddIcon />
            {trans("newItem")}
          </AddBtn>
        </TitleRight>
      </Title>
      {isSearchShow && (
        <SearchWrapper>
          <Search
            autoFocus
            allowClear
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginTop: 0, height: 28 }}
          />
        </SearchWrapper>
      )}
      <ScrollBar>
        {items.length > 0 && node ? (
          <div style={{ paddingTop: 4, paddingBottom: 100, overflow: "hidden" }}>
            <DraggableTree<BottomResComp>
              node={node}
              disable={!!search}
              unfoldAll={!!search}
              showSubInDragOverlay={false}
              showDropInPositionLine={false}
              showPositionLineDot
              positionLineDotDiameter={4}
              positionLineHeight={1}
              itemHeight={25}
              positionLineIndent={(path, dropInAsSub) => {
                const indent = 2 + (path.length - 1) * 30;
                if (dropInAsSub) {
                  return indent + 12;
                }
                return indent;
              }}
              renderItemContent={(params) => {
                const { node, onToggleFold, onDelete: onDeleteTreeItem, ...otherParams } = params;
                const resComp = node.data;
                if (!resComp) {
                  return null;
                }
                const id = resComp.id();
                const type = resComp.type();
                return (
                  <BottomSidebarItem
                    id={id}
                    key={id}
                    node={node}
                    resComp={resComp}
                    onToggleFold={onToggleFold}
                    onCopy={() => onCopy(type, id)}
                    onSelect={() => onSelect(type, id)}
                    onDelete={() => {
                      if (onDelete(type, id)) {
                        onDeleteTreeItem();
                      }
                    }}
                    {...otherParams}
                  />
                );
              }}
            />
          </div>
        ) : (
          !readOnly && <EmptyQueryList newColumn={onOpenCreatePanel} />
        )}
      </ScrollBar>
    </Contain>
  );
}

const HighlightBorder = styled.div<{ active: boolean; foldable: boolean; level: number }>`
  flex: 1;
  display: flex;
  padding-left: ${(props) => props.level * 20 + (props.foldable ? 0 : 14)}px;
  border-radius: 4px;
  border: 1px solid ${(props) => (props.active ? BorderActiveColor : "transparent")};
  align-items: center;
  justify-content: center;
`;

interface ColumnDivProps {
  $color?: boolean;
  isOverlay: boolean;
}

const ColumnDiv = styled.div<ColumnDivProps>`
  width: 100%;
  height: 25px;
  display: flex;
  user-select: none;
  padding-left: 2px;
  padding-right: 15px;
  /* background-color: #ffffff; */
  /* margin: 2px 0; */
  background-color: ${(props) => (props.isOverlay ? "rgba(255, 255, 255, 0.11)" : "")};

  &&& {
    background-color: ${(props) => (props.$color && !props.isOverlay ? "#f2f7fc" : null)};
  }

  :hover {
    background-color: #f2f7fc80;
    cursor: pointer;
  }

  .taco-edit-text-wrapper {
    width: 100%;
    height: 21px;
    line-height: 21px;
    color: #222222;
    margin-left: 0;
    font-size: 13px;
    padding-left: 0;

    :hover {
      background-color: transparent;
    }
  }

  .taco-edit-text-input {
    width: 100%;
    height: 21px;
    line-height: 21px;
    color: #222222;
    margin-left: 0;
    font-size: 13px;
    background-color: #fdfdfd;
    border: 1px solid #3377ff;
    border-radius: 2px;

    :focus {
      border-color: #3377ff;
      box-shadow: 0 0 0 2px #d6e4ff;
    }
  }
`;
const Icon = styled(PointIcon)`
  width: 16px;
  height: 16px;
  cursor: pointer;
  flex-shrink: 0;
  color: ${NormalMenuIconColor};

  &:hover {
    color: #315efb;
  }
`;

const FoldIconBtn = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  margin-right: 2px;
`;

interface BottomSidebarItemProps extends DraggableTreeNodeItemRenderProps {
  id: string;
  resComp: BottomResComp;
  onCopy: () => void;
  onSelect: () => void;
  onDelete: () => void;
  onToggleFold: () => void;
}

function BottomSidebarItem(props: BottomSidebarItemProps) {
  const {
    id,
    resComp,
    isOver,
    isOverlay,
    path,
    isFolded,
    onDelete,
    onCopy,
    onSelect,
    onToggleFold,
  } = props;
  const [error, setError] = useState<string | undefined>(undefined);
  const [editing, setEditing] = useState(false);
  const editorState = useContext(EditorContext);
  const readOnly = useSelector(showAppSnapshotSelector);
  const { selectedBottomResName, selectedBottomResType } = editorState;
  const level = path.length - 1;
  const type = resComp.type();
  const name = resComp.name();
  const icon = resComp.icon();
  const isSelected = type === selectedBottomResType && id === selectedBottomResName;
  const isFolder = type === BottomResTypeEnum.Folder;

  const handleFinishRename = (value: string) => {
    let success = false;
    let compId = name;
    if (resComp.rename) {
      compId = resComp.rename(value);
      success = !!compId;
    } else {
      compId = name;
      success = editorState.rename(name, value);
    }
    if (success) {
      editorState.setSelectedBottomRes(compId, type);
      setError(undefined);
    }
  };

  const handleNameChange = (value: string) => {
    let err = "";
    if (resComp.checkName) {
      err = resComp.checkName(value);
    } else {
      err = editorState.checkRename(name, value);
    }
    setError(err);
  };

  const handleClickItem = () => {
    if (isFolder) {
      onToggleFold();
    }
    onSelect();
  };

  return (
    <ColumnDiv onClick={handleClickItem} $color={isSelected} isOverlay={isOverlay}>
      <HighlightBorder active={isOver && isFolder} level={level} foldable={isFolder}>
        {isFolder && <FoldIconBtn>{!isFolded ? <FoldedIcon /> : <UnfoldIcon />}</FoldIconBtn>}
        {icon}
        <div style={{ flexGrow: 1, marginRight: "8px", width: "calc(100% - 62px)" }}>
          <EditText
            text={name}
            forceClickIcon={isFolder}
            disabled={!isSelected || readOnly || isOverlay}
            onFinish={handleFinishRename}
            onChange={handleNameChange}
            onEditStateChange={(editing) => setEditing(editing)}
          />
          <PopupCard
            editorFocus={!!error && editing}
            title={error ? trans("error") : ""}
            content={error}
            hasError={!!error}
          />
        </div>
        {!readOnly && !isOverlay && (
          <EditPopover copy={!isFolder ? onCopy : undefined} del={onDelete}>
            <Icon tabIndex={-1} />
          </EditPopover>
        )}
      </HighlightBorder>
    </ColumnDiv>
  );
}

/* Empty list */
const NolistDiv = styled.div`
  margin: 16px 16px 0 16px;
  width: 100%;
  min-height: 68px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px dashed #d7d9e0;
  border-radius: 4px;
  overflow: auto;
  min-width: 140px;
`;

export const EmptyQueryList = (props: { newColumn: () => void }) => (
  <div style={{ display: "flex" }}>
    <NolistDiv>
      <div style={{ color: "#b8b9bf" }}>{trans("query.noQueries")}</div>
      <span
        style={{ color: "#4965f2", cursor: "pointer", margin: "0 4px" }}
        onClick={props.newColumn}
      >
        {trans("newItem")}
      </span>
    </NolistDiv>
  </div>
);

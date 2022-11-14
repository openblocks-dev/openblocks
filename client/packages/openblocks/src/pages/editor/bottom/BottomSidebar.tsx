import styled from "styled-components";
import { TacoButton } from "openblocks-design";
import { BluePlusIcon, PointIcon } from "openblocks-design";
import { CSSProperties, ReactNode, useContext, useState } from "react";
import { EditPopover } from "openblocks-design";
import { PopupCard } from "openblocks-design";
import { EditorContext } from "comps/editorState";
import { EditText } from "openblocks-design";
import { useSelector } from "react-redux";
import { showAppSnapshotSelector } from "redux/selectors/appSnapshotSelector";
import { ScrollBar } from "openblocks-design";
import { BottomResComp, BottomResTypeEnum } from "types/bottomRes";
import { trans } from "i18n";

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
const AddIcon = styled(BluePlusIcon)`
  height: 12px;
  width: 12px;
  margin-right: 2px;
`;
const Rightbtn = styled(TacoButton)`
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

interface BottomSidebarProps {
  style?: CSSProperties;
  dataSourceId?: string;
  items: BottomResComp[];
  onCopy: (type: BottomResTypeEnum, name: string) => void;
  onDelete: (type: BottomResTypeEnum, name: string) => void;
  onOpenCreatePanel: () => void;
}

export function BottomSidebar(props: BottomSidebarProps) {
  const { items, onOpenCreatePanel, onCopy, onDelete } = props;
  const readOnly = useSelector(showAppSnapshotSelector);
  const editorState = useContext(EditorContext);

  return (
    <Contain style={props.style}>
      <Title>
        <TitleSpan>
          {trans("bottomPanel.title")} ({items.length})
        </TitleSpan>
        <Rightbtn
          disabled={readOnly}
          onClick={() => {
            onOpenCreatePanel();
            editorState.setSelectedBottomRes("", undefined);
          }}
        >
          <AddIcon />
          {trans("newItem")}
        </Rightbtn>
      </Title>
      <ScrollBar>
        {items.length > 0 ? (
          <div style={{ padding: "0 8px" }}>
            {items.map((item, index) => {
              const type = item.type();
              const name = item.name();
              const icon = item.icon();
              return (
                <BottomSidebarItem
                  type={type}
                  icon={icon}
                  key={name}
                  name={name}
                  onCopy={() => onCopy(type, name)}
                  onDelete={() => onDelete(type, name)}
                />
              );
            })}
          </div>
        ) : (
          !readOnly && <EmptyQueryList newColumn={onOpenCreatePanel} />
        )}
      </ScrollBar>
    </Contain>
  );
}

const ColumnDiv = styled.div<{ $color?: boolean }>`
  width: 100%;
  height: 25px;
  display: flex;

  &&& {
    background-color: ${(props) => (props.$color ? "#f2f7fc" : null)};
  }

  border-radius: 4px;
  align-items: center;
  padding: 0 8px 0 8px;

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

    :focus {
      border-color: #3377ff;
      box-shadow: 0 0 0 2px #d6e4ff;
    }
  }
`;
const Icon = styled(PointIcon)`
  cursor: pointer;
  flex-shrink: 0;

  &:hover g {
    fill: #222222;
  }
`;

interface BottomSidebarItemProps {
  name: string;
  type: BottomResTypeEnum;
  icon: ReactNode;
  onCopy: () => void;
  onDelete: () => void;
}

function BottomSidebarItem(props: BottomSidebarItemProps) {
  const { name, type, icon, onDelete, onCopy } = props;
  const [error, setError] = useState<string | undefined>(undefined);
  const [editing, setEditing] = useState(false);
  const editorState = useContext(EditorContext);
  const readOnly = useSelector(showAppSnapshotSelector);
  const { selectedBottomResName, selectedBottomResType } = editorState;
  const isSelected = type === selectedBottomResType && name === selectedBottomResName;
  return (
    <ColumnDiv
      onClick={() => {
        editorState.setSelectedBottomRes(name, type);
      }}
      $color={isSelected}
    >
      {/* {switchIcon(props.type)} */}
      {icon}
      <div style={{ flexGrow: 1, marginRight: "8px", width: "calc(100% - 52px)" }}>
        <EditText
          text={name}
          disabled={!isSelected || readOnly}
          onFinish={(value) => {
            if (editorState.rename(props.name, value)) {
              editorState.setSelectedBottomRes(value, type);
              setError(undefined);
            }
          }}
          onChange={(value) => setError(editorState.checkRename(props.name, value))}
          onEditStateChange={(editing) => setEditing(editing)}
        />
        <PopupCard
          editorFocus={!!error && editing}
          title={error ? trans("error") : ""}
          content={error}
          hasError={!!error}
        />
      </div>
      {!readOnly && (
        <EditPopover
          // rename={() => setRenameData({ show: true, value: value })}
          copy={onCopy}
          del={onDelete}
        >
          <Icon tabIndex={-1} />
        </EditPopover>
      )}
    </ColumnDiv>
  );
}

/* Empty list */
const NolistDiv = styled.div`
  margin: 16px 16px 0 16px;
  width: 100%;
  min-height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px dashed #d7d9e0;
  border-radius: 4px;
  overflow: auto;
  min-width: 140px;
`;
const NolistSpan = styled.p`
  font-size: 14px;
  color: #b8b9bf;
  text-align: center;
  line-height: 17px;
  display: inline-block;
  margin-bottom: 0;
  max-height: 54px;
`;
const Blue = styled(NolistSpan)`
  color: #4965f2;
  cursor: pointer;
`;
export const EmptyQueryList = (props: { newColumn: () => void }) => (
  <div style={{ display: "flex" }}>
    <NolistDiv>
      <div style={{ width: "130px" }}>
        <NolistSpan>
          {trans("bottomPanel.noQueries")}
          <Blue as={"span"} style={{ margin: "0 4px" }} onClick={props.newColumn}>
            {trans("bottomPanel.createNew")}
          </Blue>
        </NolistSpan>
      </div>
    </NolistDiv>
  </div>
);

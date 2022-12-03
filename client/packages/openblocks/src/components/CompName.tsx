import { useContext, useState } from "react";
import styled from "styled-components";
import { EditPopoverItemType, PointIcon } from "openblocks-design";
import { EditPopover } from "openblocks-design";
import { EditorContext } from "comps/editorState";
import { GridCompOperator } from "comps/utils/gridCompOperator";
import { PopupCard } from "openblocks-design";
import { EditText } from "openblocks-design";
import { values } from "lodash";
import { GreyTextColor } from "constants/style";
import { UICompType } from "comps/uiCompRegistry";
import { trans } from "i18n";
import { getComponentDocUrl } from "comps/utils/compDocUtil";
import { parseCompType } from "comps/utils/remote";

const CompDiv = styled.div<{ width?: number }>`
  width: ${(props) => (props.width ? props.width : 312)}px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #ffffff;
  border-bottom: 1px solid #e1e3eb;

  .taco-edit-text-wrapper {
    width: 252px;
    color: #222222;
    font-size: 16px;
    margin-left: 8px;

    :hover {
      background-color: #f5f5f6;
    }
  }

  .taco-edit-text-input {
    width: 252px;
    color: #222222;
    font-size: 16px;
    background-color: #f5f5f6;
    border: 1px solid #3377ff;
    margin-left: 8px;

    :focus {
      border-color: #3377ff;
      box-shadow: 0 0 0 2px #d6e4ff;
    }
  }
`;
const Icon = styled(PointIcon)`
  margin-right: 16px;
  cursor: pointer;
  color: ${GreyTextColor};

  &:hover {
    color: #222222;
  }
`;

interface Iprops {
  name: string;
  width?: number;
}

export const CompName = (props: Iprops) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [editing, setEditing] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const editorState = useContext(EditorContext);
  const selectedComp = values(editorState.selectedComps())[0];
  const compType = selectedComp.children.compType.getView() as UICompType;
  const compInfo = parseCompType(compType);
  const docUrl = getComponentDocUrl(compType);

  const items: EditPopoverItemType[] = [];

  const handleUpgrade = async () => {
    if (upgrading) {
      return;
    }
    setUpgrading(true);
    await GridCompOperator.upgradeCurrentComp(editorState);
    setUpgrading(false);
  };

  if (docUrl) {
    items.push({
      text: trans("comp.menuViewDocs"),
      onClick: () => {
        window.open(docUrl, "_blank");
      },
    });
  }

  if (compInfo.isRemote) {
    items.push({
      text: trans("comp.menuUpgradeToLatest"),
      onClick: () => {
        handleUpgrade();
      },
    });
  }

  return (
    <CompDiv width={props.width}>
      <div>
        <EditText
          text={props.name}
          onFinish={(value) => {
            if (editorState.rename(props.name, value)) {
              editorState.setSelectedCompNames(new Set([value]));
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

      <EditPopover
        items={items}
        del={() => GridCompOperator.deleteComp(editorState, editorState.selectedComps())}
      >
        <Icon tabIndex={-1} />
      </EditPopover>
    </CompDiv>
  );
};

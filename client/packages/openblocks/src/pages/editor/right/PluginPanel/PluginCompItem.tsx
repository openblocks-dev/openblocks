import {
  BorderActiveShadowColor,
  ActiveTextColor,
  BorderColor,
  GreyTextColor,
} from "constants/style";
import { draggingUtils } from "layout";
import { ModuleDocIcon } from "openblocks-design";
import styled from "styled-components";
import { getRemoteCompType } from "comps/utils/remote";
import { OpenblocksCompMeta } from "types/remoteComp";
import { TransparentImg } from "util/commonUtils";
import { useContext } from "react";
import { RightContext } from "../rightContext";

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    cursor: grab;
    .module-icon {
      box-shadow: 0 0 5px 0 rgba(49, 94, 251, 0.15);
      border-color: ${BorderActiveShadowColor};
      transform: scale(1.2);
    }
    .module-name {
      color: ${ActiveTextColor};
    }
  }
  .module-icon {
    transition: all 200ms linear;
    margin-right: 8px;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${BorderColor};
    border-radius: 4px;
  }
  .module-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }
  .module-name {
    line-height: 1;
    font-size: 13px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .module-desc {
    line-height: 1;
    font-size: 12px;
    color: ${GreyTextColor};
  }
`;

interface PluginCompItemProps {
  packageName: string;
  packageVersion: string;
  compName: string;
  compMeta: OpenblocksCompMeta;
}

export function PluginCompItem(props: PluginCompItemProps) {
  const { packageName, packageVersion, compName, compMeta } = props;
  const compType = getRemoteCompType("npm", packageName, packageVersion, compName);
  const { onDrag } = useContext(RightContext);

  return (
    <ItemWrapper
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("compType", compType);
        e.dataTransfer.setDragImage(TransparentImg, 0, 0);
        draggingUtils.setData("compType", compType);
        draggingUtils.setData("compLayout", compMeta.layoutInfo);
        onDrag(compType);
      }}
    >
      <div className="module-icon">
        <ModuleDocIcon width="19px" />
      </div>
      <div className="module-content">
        <div className="module-name">{compMeta.name}</div>
        <div className="module-desc">{compMeta.description || "No description."}</div>
      </div>
    </ItemWrapper>
  );
}

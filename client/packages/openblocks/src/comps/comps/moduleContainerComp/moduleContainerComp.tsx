import { defaultTheme } from "comps/controls/styleControlConstants";
import { ThemeContext } from "comps/utils/themeContext";
import { BorderColor } from "constants/style";
import { HintPlaceHolder } from "openblocks-design";
import _ from "lodash";
import { useContext, useRef } from "react";
import styled from "styled-components";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import { getAllCompItems } from "../containerBase";
import { SimpleContainerComp } from "../containerBase/simpleContainerComp";
import {
  ContainerBaseProps,
  gridItemCompToGridItems,
  InnerGrid,
} from "../containerComp/containerView";

const StyledInnerGrid = styled(InnerGrid)<ContainerBaseProps & { bordered: boolean }>`
  border: ${(props) => (!props.bordered ? "0px" : `1px solid ${BorderColor}`)};
  height: 100%;
`;

function ModuleContainerView(props: ContainerBaseProps) {
  const { onRowCountChange: onRowHeightChange, ...otherProps } = props;
  const { readOnly } = useContext(ExternalEditorContext);
  const rowHeightChangeRef = useRef(
    _.debounce((rowHeight: number) => {
      onRowHeightChange?.(rowHeight);
    }, 50)
  );
  const bgColor = useContext(ThemeContext || defaultTheme)?.theme?.canvas;
  return (
    <StyledInnerGrid
      onRowCountChange={rowHeightChangeRef.current}
      {...otherProps}
      emptyRows={5}
      overflow="hidden"
      containerPadding={readOnly ? [0, 0] : [4, 4]}
      hintPlaceholder={HintPlaceHolder}
      bordered={!readOnly}
      isDraggable={!readOnly}
      isDroppable={!readOnly}
      isSelectable={!readOnly}
      bgColor={bgColor}
      radius={readOnly ? "0px" : "4px"}
    />
  );
}

interface ContainerViewProps {
  rowCount: number;
  isRowCountLocked: boolean;
  onRowCountChange: (rowCount: number) => void;
}

export class ModuleContainerComp extends SimpleContainerComp {
  containerView(props: ContainerViewProps) {
    const { items: containerItems, ...otherContainerProps } = super.getView();
    return (
      <ModuleContainerView
        {...otherContainerProps}
        {...props}
        items={gridItemCompToGridItems(containerItems)}
      />
    );
  }

  getAllCompItems() {
    return getAllCompItems(this.getCompTree());
  }
}

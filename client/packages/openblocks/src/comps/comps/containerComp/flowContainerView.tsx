import { DispatchType } from "openblocks-core";
import { GridItemsType } from "comps/comps/containerComp/containerView";
import _ from "lodash";
import { FlowLayout } from "layout/utils";
import { CompSelectionWrapper } from "layout/compSelectionWrapper";
import { useContext } from "react";
import { EditorContext } from "comps/editorState";
import { ThemeContext } from "comps/utils/themeContext";
import { defaultTheme } from "comps/controls/styleControlConstants";
import styled from "styled-components";

const FlowContainerWrapper = styled.div<{ bgColor: string; maxWidth?: number; minHeight: string }>`
  background-color: ${(props) => props.bgColor};
  max-width: ${(props) => props.maxWidth}px;
  min-height: ${(props) => props.minHeight};
  display: flex;
  flex-direction: column;

  > div {
    margin-bottom: 2px;
  }
`;

const CompItem = styled.div`
  position: relative;
`;

export type FlowContainerProps = {
  layout: FlowLayout;
  items: GridItemsType;
  dispatch: DispatchType;
};

export function FlowContainerView(
  props: FlowContainerProps & { minHeight: string; selectable: boolean; maxWidth: number }
) {
  const layouts = props.layout;
  const { selectable, minHeight, maxWidth } = props;
  const editorState = useContext(EditorContext);
  const bgColor = (useContext(ThemeContext)?.theme || defaultTheme).canvas;

  return (
    <FlowContainerWrapper bgColor={bgColor} maxWidth={maxWidth} minHeight={minHeight}>
      {layouts.map((layout, index) => {
        const comp = props.items[layout.i];
        if (!comp) {
          return null;
        }
        return (
          <CompItem key={comp.name}>
            <CompSelectionWrapper
              compType={comp.compType}
              isSelectable={selectable}
              isDraggable={false}
              isResizable={false}
              resizeIconSize="normal"
              onInnerResize={_.noop}
              onWrapperResize={_.noop}
              nameConfig={{
                show: true,
                name: comp.name,
                pos: index === 0 ? "bottom" : "top",
              }}
              autoHeight={false}
              resizeHandles={[]}
              isSelected={editorState.selectedCompNames.has(comp.name)}
              onClick={() => {
                editorState.setSelectedCompNames(new Set([comp.name]));
              }}
              hidden={comp.hidden}
            >
              {comp.view}
            </CompSelectionWrapper>
          </CompItem>
        );
      })}
    </FlowContainerWrapper>
  );
}

import { EditorContext } from "comps/editorState";
import { EditorContainer } from "pages/common/styledComponent";
import { Profiler, useContext, useRef, useState } from "react";
import styled from "styled-components";
import { profilerCallback } from "util/cacheUtils";
import {
  ContainerBaseProps,
  GridItemsType,
  GridLayoutType,
  InnerGrid,
} from "../containerComp/containerView";
import { CheckSelectFn, DragSelector } from "./dragSelector";
import { useMaxWidth } from "util/hooks";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import { AppTypeEnum } from "constants/applicationConstants";
import { EditorContainerPadding, TopHeaderHeight } from "constants/style";
import { ThemeContext } from "comps/utils/themeContext";
import { defaultTheme } from "comps/controls/styleControlConstants";
import { checkIsMobile } from "util/commonUtils";
import { CanvasContainerID } from "constants/domLocators";
import { CNRootContainer } from "constants/styleSelectors";

const UICompContainer = styled.div<{ maxWidth?: number; readOnly?: boolean; bgColor: string }>`
  height: 100%;
  margin: 0 auto;
  max-width: ${(props) => props.maxWidth || 1600}px;
  background-color: ${(props) => props.bgColor};
`;

// modal/drawer container
export const CanvasContainer = styled.div<{ maxWidth: number }>`
  max-width: ${(props) => props.maxWidth}px;
  min-width: min(${(props) => props.maxWidth}px, 718px);
  margin: 0 auto;
  height: 100%;
  contain: paint;
`;

const DEFAULT_CONTAINER_PADDING = [20, 20] as [number, number];
const DEFAULT_MOBILE_PADDING = [4, 4] as [number, number];
const DEFAULT_EXTRA_HEIGHT = "25vh";

const gridLayoutCanvasProps = {
  autoHeight: true,
  isCanvas: true,
};

function getDragSelectedNames(
  items: GridItemsType,
  layout: GridLayoutType,
  checkSelectFunc?: CheckSelectFn
) {
  const selectedComps = new Set<string>();
  if (checkSelectFunc && selectedComps) {
    Object.values(layout).forEach((layoutItem) => {
      const key = layoutItem.i;
      if (items.hasOwnProperty(key)) {
        const item = items[key];
        const name = item.name;
        checkSelectFunc?.(
          document.getElementById(key) as HTMLDivElement, // fixme use react ref
          (result) => (result ? selectedComps?.add(name) : selectedComps?.delete(name))
        );
      }
    });
  }
  return selectedComps;
}

const EmptySet = new Set<string>();

export function CanvasView(props: ContainerBaseProps) {
  const editorState = useContext(EditorContext);
  const [dragSelectedComps, setDragSelectedComp] = useState(EmptySet);
  const scrollContainerRef = useRef(null);

  const maxWidthFromHook = useMaxWidth();
  const maxWidth = editorState.getAppSettings().maxWidth ?? maxWidthFromHook;
  const isMobile = checkIsMobile(maxWidth);
  const defaultContainerPadding = isMobile ? DEFAULT_MOBILE_PADDING : DEFAULT_CONTAINER_PADDING;

  const externalState = useContext(ExternalEditorContext);
  const {
    readOnly,
    appType,
    rootContainerExtraHeight = DEFAULT_EXTRA_HEIGHT,
    rootContainerPadding = defaultContainerPadding,
    rootContainerOverflow,
  } = externalState;

  const isModule = appType === AppTypeEnum.Module;
  const bgColor = (useContext(ThemeContext)?.theme || defaultTheme).canvas;

  if (readOnly) {
    return (
      <UICompContainer
        maxWidth={maxWidth}
        readOnly={true}
        className={CNRootContainer}
        bgColor={bgColor}
      >
        <div>
          <Profiler id="Panel" onRender={profilerCallback}>
            <InnerGrid
              containerPadding={rootContainerPadding}
              overflow={rootContainerOverflow}
              {...props}
              {...gridLayoutCanvasProps}
              bgColor={bgColor}
              radius="0px"
            />
          </Profiler>
        </div>
      </UICompContainer>
    );
  }

  return (
    <CanvasContainer maxWidth={maxWidth} id={CanvasContainerID}>
      <EditorContainer ref={scrollContainerRef}>
        <UICompContainer maxWidth={maxWidth} className={CNRootContainer} bgColor={bgColor}>
          <DragSelector
            onMouseDown={() => {
              setDragSelectedComp(EmptySet);
            }}
            onMouseUp={() => {
              editorState.setSelectedCompNames(dragSelectedComps);
              setDragSelectedComp(EmptySet);
            }}
            onMouseMove={(checkSelectFunc) => {
              const selectedName = getDragSelectedNames(props.items, props.layout, checkSelectFunc);
              setDragSelectedComp(selectedName);
            }}
          >
            <Profiler id="Panel" onRender={profilerCallback}>
              <InnerGrid
                containerPadding={rootContainerPadding}
                extraHeight={rootContainerExtraHeight}
                overflow={rootContainerOverflow}
                {...props}
                {...gridLayoutCanvasProps}
                dragSelectedComps={dragSelectedComps}
                minHeight={`calc(100vh - ${TopHeaderHeight} - ${EditorContainerPadding} * 2)`}
                scrollContainerRef={scrollContainerRef}
                isDroppable={!isModule}
                isDraggable={!isModule}
                enableGridLines
                bgColor={bgColor}
              />
            </Profiler>
          </DragSelector>
        </UICompContainer>
      </EditorContainer>
    </CanvasContainer>
  );
}

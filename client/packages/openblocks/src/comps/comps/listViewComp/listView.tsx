import { EditorContext } from "comps/editorState";
import { BackgroundColorContext } from "comps/utils/backgroundColorContext";
import _ from "lodash";
import { HintPlaceHolder } from "openblocks-design";
import { useContext, useMemo, useRef } from "react";
import ReactResizeDetector from "react-resize-detector";
import styled from "styled-components";
import { checkIsMobile } from "util/commonUtils";
import { useDelayState } from "util/hooks";
import {
  ContainerBaseProps,
  gridItemCompToGridItems,
  InnerGrid,
} from "../containerComp/containerView";
import { ListViewImplComp } from "./listViewComp";
import { getCurrentItemParams, getData } from "./listViewUtils";

const Wrapper = styled.div`
  overflow: auto;
  overflow: overlay;
`;

const FlexWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContainerInListView = (props: ContainerBaseProps) => {
  return (
    <InnerGrid
      {...props}
      emptyRows={15}
      containerPadding={[4, 4]}
      hintPlaceholder={HintPlaceHolder}
    />
  );
};

type Props = {
  comp: InstanceType<typeof ListViewImplComp>;
};

export function ListView(props: Props) {
  // console.info("<---- listView renders.");
  const { comp } = props;
  const children = comp.children;
  const ref = useRef(null);
  const editorState = useContext(EditorContext);
  const isDragging = editorState.isDragging;
  const [listHeight, setListHeight] = useDelayState(0, isDragging);
  const { data, itemCount } = useMemo(
    () => getData(children.noOfRows.getView()),
    [children.noOfRows]
  );
  const dynamicHeight = useMemo(() => children.dynamicHeight.getView(), [children.dynamicHeight]);
  const heightUnitOfRow = useMemo(
    () => children.heightUnitOfRow.getView(),
    [children.heightUnitOfRow]
  );
  const containerViewFn = useMemo(() => children.container.getView(), [children.container]);
  const autoHeight = useMemo(() => children.autoHeight.getView(), [children.autoHeight]);
  const noOfColumns = useMemo(
    () => Math.max(1, children.noOfColumns.getView()),
    [children.noOfColumns]
  );
  const style = children.style.getView();

  const commonLayout = children.container.getOriginalComp().getComp().children.layout.getView();
  const commonLayoutDispatch = children.container.getOriginalComp().getComp().dispatch;
  const isOneItem = itemCount > 0 && (_.isEmpty(commonLayout) || editorState.isDragging);
  const noOfRows = isOneItem ? 1 : Math.floor((itemCount + noOfColumns - 1) / noOfColumns);
  const rowHeight = isOneItem ? "100%" : dynamicHeight ? "auto" : heightUnitOfRow * 44 + "px";

  // minHeight is used to ensure that the container height will not shrink when dragging, and the current padding needs to be subtracted during calculation
  const minHeight = isDragging && autoHeight ? listHeight + "px" : "100%";
  // log.log("List. listHeight: ", listHeight, " minHeight: ", minHeight);
  const renders = _.range(0, noOfRows).map((rowIdx) => {
    // log.log("renders. i: ", i, "containerProps: ", containerProps, " text: ", Object.values(containerProps.items as Record<string, any>)[0].children.comp.children.text);
    const render = (
      <div
        key={rowIdx}
        style={{
          height: rowHeight,
          // border: "0.5px solid #d9d9d9"
        }}
      >
        <FlexWrapper>
          {_.range(0, noOfColumns).map((colIdx) => {
            const i = rowIdx * noOfColumns + colIdx;
            if (i >= itemCount || (isOneItem && i > 0)) {
              return <div key={i} style={{ flex: "auto" }}></div>;
            }
            const containerProps = containerViewFn(
              { i, currentItem: getCurrentItemParams(data, i) },
              String(i)
            );
            return (
              <ContainerInListView
                key={i}
                layout={containerProps.layout}
                items={gridItemCompToGridItems(containerProps.items)}
                positionParams={containerProps.positionParams}
                // all layout changes should only reflect on the commonContainer
                dispatch={i === 0 ? commonLayoutDispatch : _.noop}
                style={{ height: "100%", backgroundColor: "transparent", flex: "auto" }}
                autoHeight={isDragging || dynamicHeight}
                isDroppable={i === 0}
                isDraggable={i === 0}
                isResizable={i === 0}
                isSelectable={i === 0}
                scrollContainerRef={ref}
                overflow={"hidden"}
                minHeight={minHeight}
                enableGridLines={true}
              />
            );
          })}
        </FlexWrapper>
      </div>
    );
    return render;
  });

  const maxWidth = editorState.getAppSettings().maxWidth;
  const isMobile = checkIsMobile(maxWidth);
  const paddingWidth = isMobile ? "4px" : "16px";
  // log.debug("renders: ", renders);
  return (
    <Wrapper
      ref={ref}
      style={{
        height: "100%",
        backgroundColor: style.background,
        border: `1px solid ${style.border}`,
        borderRadius: style.radius,
        padding: `3px ${paddingWidth}`,
      }}
    >
      <ReactResizeDetector
        onResize={(width?: number, height?: number) => {
          if (height) setListHeight(height);
        }}
        observerOptions={{ box: "border-box" }}
      >
        <BackgroundColorContext.Provider value={style.background}>
          <div style={{ height: autoHeight ? "auto" : "100%" }}>{renders}</div>
        </BackgroundColorContext.Provider>
      </ReactResizeDetector>
    </Wrapper>
  );
}

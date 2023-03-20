import { Pagination } from "antd";
import { EditorContext } from "comps/editorState";
import { BackgroundColorContext } from "comps/utils/backgroundColorContext";
import _ from "lodash";
import { ConstructorToView, deferAction } from "openblocks-core";
import { HintPlaceHolder, pageItemRender } from "openblocks-design";
import { RefObject, useContext, useEffect, useMemo, useRef } from "react";
import ReactResizeDetector from "react-resize-detector";
import styled from "styled-components";
import { checkIsMobile } from "util/commonUtils";
import { useDelayState } from "util/hooks";
import { SimpleContainerComp } from "../containerBase/simpleContainerComp";
import {
  ContainerBaseProps,
  gridItemCompToGridItems,
  InnerGrid,
} from "../containerComp/containerView";
import { ContextContainerComp } from "./contextContainerComp";
import { ListViewImplComp } from "./listViewComp";
import { getCurrentItemParams, getData } from "./listViewUtils";

const ListViewWrapper = styled.div<{ $style: any; $paddingWidth: string }>`
  height: 100%;
  border: 1px solid ${(props) => props.$style.border};
  border-radius: ${(props) => props.$style.radius};
  padding: 3px ${(props) => props.$paddingWidth};
  background-color: ${(props) => props.$style.background};
`;

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
`;

const BodyWrapper = styled.div<{ $autoHeight: boolean }>`
  overflow: auto;
  overflow: overlay;
  height: ${(props) => (props.$autoHeight ? "100%" : "calc(100% - 32px)")};
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

type ListItemProps = {
  itemIdx: number;
  offset: number;
  containerProps: ConstructorToView<typeof SimpleContainerComp>;
  autoHeight: boolean;
  scrollContainerRef?: RefObject<HTMLDivElement>;
  minHeight?: string;
  unMountFn?: () => void;
};

function ListItem(props: ListItemProps) {
  const { itemIdx, offset, containerProps, autoHeight, scrollContainerRef, minHeight } = props;

  // disable the unmount function to save user's state with pagination
  // useEffect(() => {
  //   return () => {
  //     props.unMountFn?.();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <ContainerInListView
      layout={containerProps.layout}
      items={gridItemCompToGridItems(containerProps.items)}
      positionParams={containerProps.positionParams}
      // all layout changes should only reflect on the commonContainer
      dispatch={itemIdx === offset ? containerProps.dispatch : _.noop}
      style={{ height: "100%", backgroundColor: "transparent", flex: "auto" }}
      autoHeight={autoHeight}
      isDroppable={itemIdx === offset}
      isDraggable={itemIdx === offset}
      isResizable={itemIdx === offset}
      isSelectable={itemIdx === offset}
      scrollContainerRef={scrollContainerRef}
      overflow={"hidden"}
      minHeight={minHeight}
      enableGridLines={true}
    />
  );
}

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
  const dynamicHeight = useMemo(() => children.dynamicHeight.getView(), [children.dynamicHeight]);
  const heightUnitOfRow = useMemo(
    () => children.heightUnitOfRow.getView(),
    [children.heightUnitOfRow]
  );
  const containerFn = useMemo(() => children.container.getView(), [children.container]);
  const itemIndexName = useMemo(() => children.itemIndexName.getView(), [children.itemIndexName]);
  const itemDataName = useMemo(() => children.itemDataName.getView(), [children.itemDataName]);
  const { data, itemCount: totalCount } = useMemo(
    () => getData(children.noOfRows.getView()),
    [children.noOfRows]
  );
  const autoHeight = useMemo(() => children.autoHeight.getView(), [children.autoHeight]);
  const noOfColumns = useMemo(
    () => Math.max(1, children.noOfColumns.getView()),
    [children.noOfColumns]
  );
  const pageInfo = useMemo(() => {
    const pagination = children.pagination.getView();
    const total = pagination.total || totalCount;
    let current = pagination.current;
    let offset = (current - 1) * pagination.pageSize;
    const currentPageSize = Math.max(0, Math.min(pagination.pageSize, total - offset));
    return {
      pagination: { ...pagination, current: current, total: total },
      offset,
      currentPageSize,
      total,
    };
  }, [children.pagination, totalCount]);
  const style = children.style.getView();

  const commonLayout = comp.realSimpleContainer()!.children.layout.getView();
  const isOneItem =
    pageInfo.currentPageSize > 0 && (_.isEmpty(commonLayout) || editorState.isDragging);
  const noOfRows = isOneItem
    ? 1
    : Math.floor((pageInfo.currentPageSize + noOfColumns - 1) / noOfColumns);
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
            const itemIdx = rowIdx * noOfColumns + colIdx + pageInfo.offset;
            if (
              itemIdx >= pageInfo.total ||
              itemIdx >= pageInfo.offset + pageInfo.pagination.pageSize ||
              (isOneItem && itemIdx > pageInfo.offset)
            ) {
              return <div key={itemIdx} style={{ flex: "auto" }}></div>;
            }
            const containerProps = containerFn(
              { [itemIndexName]: itemIdx, [itemDataName]: getCurrentItemParams(data, itemIdx) },
              String(itemIdx)
            ).getView();
            const unMountFn = () => {
              comp.children.container.dispatch(
                deferAction(ContextContainerComp.batchDeleteAction([String(itemIdx)]))
              );
            };
            return (
              <ListItem
                key={itemIdx}
                itemIdx={itemIdx}
                offset={pageInfo.offset}
                containerProps={containerProps}
                autoHeight={isDragging || dynamicHeight}
                scrollContainerRef={ref}
                minHeight={minHeight}
                unMountFn={unMountFn}
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
    <BackgroundColorContext.Provider value={style.background}>
      <ListViewWrapper $style={style} $paddingWidth={paddingWidth}>
        <BodyWrapper ref={ref} $autoHeight={autoHeight}>
          <ReactResizeDetector
            onResize={(width?: number, height?: number) => {
              if (height) setListHeight(height);
            }}
            observerOptions={{ box: "border-box" }}
          >
            <div style={{ height: autoHeight ? "auto" : "100%" }}>{renders}</div>
          </ReactResizeDetector>
        </BodyWrapper>
        <FooterWrapper>
          <Pagination size="small" itemRender={pageItemRender} {...pageInfo.pagination} />
        </FooterWrapper>
      </ListViewWrapper>
    </BackgroundColorContext.Provider>
  );
}

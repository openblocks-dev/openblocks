import { EditorContext, EditorState } from "comps/editorState";
import { sameTypeMap, stateComp, valueComp } from "comps/generators";
import { addMapChildAction, addMapCompChildAction } from "comps/generators/sameTypeMap";
import { hookCompCategory, HookCompType } from "comps/hooks/hookCompTypes";
import { UICompLayoutInfo, uiCompRegistry, UICompType } from "comps/uiCompRegistry";
import { genRandomKey } from "comps/utils/idGenerator";
import { parseCompType } from "comps/utils/remote";
import {
  DEFAULT_POSITION_PARAMS,
  draggingUtils,
  ExtraLayout,
  FlyStartInfo,
  FLY_START_INFO,
  IsDroppable,
  Layout,
  LayoutItem,
  PositionParams,
  ReactGridLayout,
} from "layout";
import {
  calcRowCount,
  calcRowHeight,
  DEFAULT_GRID_COLUMNS,
  DEFAULT_ROW_HEIGHT,
} from "layout/calculateUtils";
import _ from "lodash";
import {
  ActionExtraInfo,
  changeChildAction,
  changeValueAction,
  Comp,
  CompAction,
  deferAction,
  deleteCompAction,
  DispatchType,
  multiChangeAction,
  RecordConstructorToView,
  wrapActionExtraInfo,
  wrapChildAction,
} from "openblocks-core";
import React, {
  DragEvent,
  HTMLAttributes,
  MouseEvent,
  ReactElement,
  ReactNode,
  RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useResizeDetector } from "react-resize-detector";
import styled from "styled-components";
import { checkIsMobile } from "util/commonUtils";
import { ExternalEditorContext } from "util/context/ExternalEditorContext";
import { selectCompModifierKeyPressed } from "util/keyUtils";
import { defaultLayout, GridItemComp, GridItemDataType } from "../gridItemComp";

const childrenMap = {
  layout: valueComp<Layout>({}),
  items: sameTypeMap(GridItemComp),
  positionParams: stateComp<PositionParams>(DEFAULT_POSITION_PARAMS),
};

export function gridItemCompToGridItems(items: ViewPropsType["items"]) {
  const gridItems: GridItemsType = _.mapValues(items, (i) => ({
    comp: i,
    view: i.getView(),
    autoHeight: i.autoHeight(),
    name: i.children.name.getView(),
    compType: i.children.compType.getView() as UICompType,
    hidden: i.children.comp.children?.hidden?.getView(),
  }));
  return gridItems;
}

type ViewPropsType = RecordConstructorToView<typeof childrenMap>;

// export type GridItemsType = ViewPropsType["items"];

export type GridItem = {
  comp?: Comp;
  name: string;
  compType: UICompType;
  view: ReactElement;
  autoHeight: boolean;
  hidden: boolean;
};

export type GridItemsType = Record<string, GridItem>;

export type GridLayoutType = ViewPropsType["layout"];

type ExtraProps = {
  className?: string;
  style?: Record<string, any>;
  rowCount?: number;
  isRowCountLocked?: boolean;
  autoHeight?: boolean;
  minHeight?: string;
  emptyRows?: number;
  extraHeight?: string;
  containerPadding?: [number, number];
  bgColor?: string;
  radius?: string;
  hintPlaceholder?: ReactNode;
  scrollContainerRef?: RefObject<HTMLDivElement>;
  isCanvas?: boolean;
  // The space that can display nameDiv up and down
  showName?: { top?: number; bottom?: number };
  isDroppable?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  isSelectable?: boolean;
  overflow?: string;
  enableGridLines?: boolean;
  onRowCountChange?: (rowHeight: number) => void;
};

type DispatchProps = { dispatch: DispatchType };

type ContainerParamProps = {
  layout: Layout;
  items: GridItemsType;
  positionParams: PositionParams;
  onPositionParamsChange?: (params: PositionParams) => void;
  onLayoutChange?: (Layout: Layout) => void;
};

export type ContainerBaseProps = ContainerParamProps & DispatchProps & ExtraProps;

const onLayoutChange = (
  currentLayout: Layout,
  newLayout: Layout,
  dispatch: DispatchType,
  items: GridItemsType,
  onLayoutChange?: (layout: Layout) => void
) => {
  // ignore the dropping event
  const isDropping = newLayout["__dropping-elem__"];
  if (isDropping) return;
  if (_.isEqual(currentLayout, newLayout)) return;

  const compInfos: ActionExtraInfo["compInfos"] = [];
  Object.keys(currentLayout).forEach((key) => {
    if (!newLayout[key]) {
      // deleted
      return;
    } else if (
      !_.isEqual(
        _.omitBy(newLayout[key], _.isUndefined),
        _.omitBy(currentLayout[key], _.isUndefined)
      )
    ) {
      const name = items[key]?.name;
      const type = items[key]?.compType;
      name && compInfos.push({ compName: name, compType: type, type: "layout" });
    }
  });
  onLayoutChange?.(newLayout);
  // Purely changing the layout does not need to eval
  // log.debug("layout: onLayoutChange. currentLayout: ", currentLayout, " newLayout: ", newLayout);
  dispatch(wrapActionExtraInfo(changeChildAction("layout", newLayout, true), { compInfos }));
};

const onFlyDrop = (layout: Layout, items: Layout, dispatch: DispatchType) => {
  const sourceDispatch = draggingUtils.getData<(action: CompAction) => void>("sourceDispatch");
  if (sourceDispatch !== dispatch) {
    const items = draggingUtils.getData<Record<string, GridItem>>("items");
    const keys = Object.keys(items);
    const dragStartInfo = draggingUtils.getData<FlyStartInfo>(FLY_START_INFO);
    const sourceLayoutFn = dragStartInfo.sourceLayoutFn;

    // 1. Delete old Comp
    sourceDispatch(deferAction(changeChildAction("layout", _.omit(sourceLayoutFn(), keys), true)));
    keys.forEach((key) =>
      sourceDispatch(
        deferAction(wrapChildAction("items", wrapChildAction(key, deleteCompAction())))
      )
    );
    // 2. Add a new Comp
    for (const [key, item] of Object.entries(items)) {
      if (item.comp) {
        dispatch(deferAction(wrapChildAction("items", addMapCompChildAction(key, item.comp))));
      }
    }
    dispatch(deferAction(changeChildAction("layout", layout, true)));
  }
};

const onDrop = (
  layout: Layout,
  items: Layout,
  event: DragEvent<HTMLElement>,
  dispatch: DispatchType,
  editorState: EditorState
) => {
  const compType = draggingUtils.getData("compType");
  const compInitialValue = draggingUtils.getData("compInitialValue");
  // log.debug("layout: onDrop start. layout: ", layout, " items: ", items, " compType: ", compType);
  if (hookCompCategory(compType) === "ui") {
    const compName = editorState.getNameGenerator().genItemName(compType);
    editorState
      .getHooksComp()
      .dispatch(
        wrapActionExtraInfo(
          editorState
            .getHooksComp()
            .pushAction({ name: compName, compType: compType as HookCompType }),
          { compInfos: [{ compName: compName, compType: compType, type: "add" }] }
        )
      );
    editorState.setSelectedCompNames(new Set([compName]), "addComp");
  } else if (!!compType) {
    const nameGenerator = editorState.getNameGenerator();
    const compInfo = parseCompType(compType);
    const compName = nameGenerator.genItemName(compInfo.compName);
    const defaultDataFn = uiCompRegistry[compType as UICompType]?.defaultDataFn;
    const widgetValue: GridItemDataType = {
      compType,
      name: compName,
      comp:
        compInitialValue ||
        (defaultDataFn ? defaultDataFn(compName, nameGenerator, editorState) : undefined),
    };
    const key = genRandomKey();
    const layoutItem = Object.values(items)[0];
    // log.debug("layout: onDrop. widgetValue: ", widgetValue, " layoutItem: ", layoutItem);
    dispatch(
      wrapActionExtraInfo(
        multiChangeAction({
          layout: changeValueAction(
            {
              ...layout,
              [key]: { ...layoutItem, i: key, placeholder: undefined },
            },
            true
          ),
          items: addMapChildAction(key, widgetValue),
        }),
        { compInfos: [{ compName: compName, compType: compType, type: "add" }] }
      )
    );
    editorState.setSelectedCompNames(new Set([compName]), "addComp");
  }
  editorState.setDragging(false);
  // log.debug("layout: onDrop end. layout: ", layout, " layoutItem: ", layoutItem);
};

const getExtraLayout = (
  items: GridItemsType,
  layout: GridLayoutType,
  selectedCompNames: Set<string>,
  dragSelectedNames?: Set<string>
): ExtraLayout => {
  const validLayout = _.pickBy(layout, (layoutItem) => items.hasOwnProperty(layoutItem.i));
  return _.mapValues(validLayout, (layoutItem: LayoutItem) => {
    const key = layoutItem.i;
    const item = items[key];
    const autoHeight = item.autoHeight;
    const name = item.name;
    const compType = item.compType;
    const isSelected = selectedCompNames.has(name) || dragSelectedNames?.has?.(name);
    const hidden = item.hidden;
    return { autoHeight, isSelected, name, hidden, compType };
  });
};

/**
 * Too much data transfer, simplify it later
 **/
type ViewPropsWithSelect = ContainerBaseProps & {
  dragSelectedComps?: Set<string>;
};

const ItemWrapper = styled.div<{ disableInteract?: boolean }>`
  height: 100%;
  pointer-events: ${(props) => (props.disableInteract ? "none" : "unset")};
`;

const GridItemWrapper = React.forwardRef(
  (
    props: React.PropsWithChildren<HTMLAttributes<HTMLDivElement>>,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const editorState = useContext(EditorContext);
    const { children, ...divProps } = props;
    return (
      <ItemWrapper ref={ref} disableInteract={editorState.disableInteract} {...divProps}>
        {props.children}
      </ItemWrapper>
    );
  }
);

type GirdItemViewRecord = Record<string, GridItem>;

export function InnerGrid(props: ViewPropsWithSelect) {
  const {
    positionParams,
    rowCount = Infinity,
    onPositionParamsChange,
    onRowCountChange,
    enableGridLines,
    isRowCountLocked,
  } = props;
  const [currentRowCount, setRowCount] = useState(rowCount || Infinity);
  const [currentRowHeight, setRowHeight] = useState(DEFAULT_ROW_HEIGHT);
  const editorState = useContext(EditorContext);
  const { readOnly } = useContext(ExternalEditorContext);

  const isDroppable =
    useContext(IsDroppable) && (_.isNil(props.isDroppable) || props.isDroppable) && !readOnly;
  const isDraggable = !readOnly && (_.isNil(props.isDraggable) || props.isDraggable);
  const isResizable = !readOnly && (_.isNil(props.isResizable) || props.isResizable);
  const isSelectable = !readOnly && (_.isNil(props.isSelectable) || props.isSelectable);
  const extraLayout = useMemo(
    () =>
      getExtraLayout(
        props.items,
        props.layout,
        editorState.selectedCompNames,
        props.dragSelectedComps
      ),
    [props.items, props.layout, editorState.selectedCompNames, props.dragSelectedComps]
  );

  const [containerSelectNames, setContainerSelectNames] = useState<Set<string>>(new Set([]));

  useEffect(() => {
    const selectedNames = new Set<string>(
      Object.values(extraLayout)
        .filter((info) => info.isSelected)
        .map((info) => info.name)
    );
    if (!_.isEqual(selectedNames, containerSelectNames)) {
      setContainerSelectNames(selectedNames);
    }
  }, [extraLayout, containerSelectNames]);

  const canAddSelect = useMemo(
    () => _.size(containerSelectNames) === _.size(editorState.selectedCompNames),
    [containerSelectNames, editorState]
  );

  const dispatchPositionParamsTimerRef = useRef(0);
  const onResize = useCallback(
    (width, height) => {
      if (width !== positionParams.containerWidth) {
        const newPositionParams: PositionParams = {
          margin: [0, 0],
          containerPadding: [0, 0],
          containerWidth: width,
          cols: DEFAULT_GRID_COLUMNS,
          rowHeight: currentRowHeight,
          maxRows: currentRowCount,
        };
        if (!_.isEqual(newPositionParams, positionParams)) {
          // log.log("onResize. position: ", newPositionParams, " lastPosition: ", positionParams);
          window.clearTimeout(dispatchPositionParamsTimerRef.current);
          dispatchPositionParamsTimerRef.current = window.setTimeout(() => {
            props.dispatch(
              deferAction(changeChildAction("positionParams", newPositionParams, false))
            );
            onPositionParamsChange?.(newPositionParams);
          }, 1000);
        }
      }
      if (isRowCountLocked) {
        const bottomAndTopPadding = props.containerPadding?.[1] || 0;
        let rowCount = currentRowCount;
        if (currentRowCount === Infinity) {
          rowCount = calcRowCount(height, bottomAndTopPadding, currentRowHeight);
          setRowCount(rowCount);
          onRowCountChange?.(rowCount);
        }
        const nextRowHeight = calcRowHeight(height, bottomAndTopPadding, rowCount);
        setRowHeight(nextRowHeight);
      }
    },
    [
      currentRowCount,
      currentRowHeight,
      isRowCountLocked,
      onPositionParamsChange,
      onRowCountChange,
      positionParams,
      props,
    ]
  );
  const setSelectedNames = useCallback(
    (names: Set<string>) => {
      editorState.setSelectedCompNames(names);
    },
    [editorState]
  );
  const { width, ref } = useResizeDetector({ onResize, handleHeight: isRowCountLocked });

  const itemViewRef = useRef<GirdItemViewRecord>({});
  const itemViews = useMemo(() => {
    const newView: GirdItemViewRecord = {};
    Object.entries(props.items).forEach(([key, item]) => {
      const refItem = itemViewRef.current[key];
      if (!refItem || !refItem.comp || refItem.comp !== item.comp) {
        newView[key] = {
          ...item,
          view: <GridItemWrapper key={key}>{item.view}</GridItemWrapper>,
        };
      } else {
        newView[key] = itemViewRef.current[key];
      }
    });
    itemViewRef.current = newView;
    return Object.values(newView).map((r) => r.view);
  }, [props.items]);

  const clickItem = useCallback(
    (e, name) => selectItem(e, name, canAddSelect, containerSelectNames, setSelectedNames),
    [canAddSelect, containerSelectNames, setSelectedNames]
  );

  useEffect(() => {
    if (!isRowCountLocked) {
      setRowHeight(DEFAULT_ROW_HEIGHT);
      setRowCount(Infinity);
      onRowCountChange?.(0);
    }
  }, [isRowCountLocked, onRowCountChange]);

  const maxWidth = editorState.getAppSettings().maxWidth;

  // log.info("rowCount:", currentRowCount, "rowHeight:", currentRowHeight);

  return (
    <ReactGridLayout
      innerRef={ref}
      className={props.className}
      style={props.style}
      scrollContainerRef={props.scrollContainerRef}
      width={width ?? 0}
      showGridLines={editorState.showGridLines() && (isDroppable || enableGridLines)}
      isRowCountLocked={isRowCountLocked}
      isDraggable={isDraggable}
      isResizable={isResizable}
      isDroppable={isDroppable}
      isSelectable={isSelectable}
      layout={props.layout}
      extraLayout={extraLayout}
      onDropDragOver={(e) => {
        const compType = draggingUtils.getData<UICompType>("compType");
        const compLayout = draggingUtils.getData<UICompLayoutInfo>("compLayout");
        if (compType) {
          const defaultSize = checkIsMobile(maxWidth)
            ? { ...defaultLayout(compType), w: DEFAULT_GRID_COLUMNS * 2 }
            : defaultLayout(compType);
          return {
            size: compLayout ?? defaultSize,
            positionParams: editorState.canvasPositionParams(),
          };
        }
      }}
      onDrop={(layout, items, _event) => {
        // log.debug("layout: onDrop. style: ", props.type);
        onDrop(layout, items, _event, props.dispatch, editorState);
      }}
      onLayoutChange={(newLayout) => {
        // log.debug("layout: onLayoutChange. currentLayout: ", currentLayout, " newLayout: ", newLayout);
        onLayoutChange(props.layout, newLayout, props.dispatch, props.items, props.onLayoutChange);
      }}
      onFlyStart={(layout: Layout, layoutItems: Layout) => {
        const items = _.pick(props.items, Object.keys(layoutItems));
        draggingUtils.setData("sourceDispatch", props.dispatch);
        draggingUtils.setData<Record<string, GridItem>>("items", items);
        editorState.setDragging(true);
        const names = Object.values(items).map((item) => item.name);
        editorState.setSelectedCompNames(new Set(names));
      }}
      onFlyDrop={(layout, items) => {
        onFlyDrop(layout, items, props.dispatch);
      }}
      onResizeStart={(_a, _b, _c, _d, event) => {
        event.stopPropagation();
        editorState.setDragging(true);
      }}
      onResizeStop={() => editorState.setDragging(false)}
      margin={[0, 0]}
      containerPadding={props.containerPadding}
      emptyRows={props.emptyRows}
      maxRows={currentRowCount}
      rowHeight={currentRowHeight}
      overflow={props.overflow}
      extraHeight={props.extraHeight}
      cols={DEFAULT_GRID_COLUMNS}
      autoHeight={props.autoHeight}
      minHeight={props.minHeight}
      bgColor={props.bgColor}
      radius={props.radius}
      hintPlaceholder={!editorState.isDragging && !readOnly && props.hintPlaceholder}
      selectedSize={_.size(containerSelectNames)}
      clickItem={clickItem}
      isCanvas={props.isCanvas}
      showName={props.showName}
      disableDirectionKey={editorState.isDragging || readOnly}
    >
      {itemViews}
    </ReactGridLayout>
  );
}

function selectItem(
  e: MouseEvent<HTMLDivElement>,
  name: string,
  canAddSelect: boolean,
  selectedNames: Set<string>,
  setSelectedNames: (names: Set<string>) => void
) {
  let curNames = new Set<string>();
  if (!selectCompModifierKeyPressed(e)) {
    curNames.add(name);
  } else if (selectedNames.has(name)) {
    curNames = new Set(selectedNames);
    curNames.delete(name);
  } else if (canAddSelect) {
    curNames = new Set(selectedNames);
    curNames.add(name);
  } else {
    return;
  }
  setSelectedNames(curNames);
  e.stopPropagation();
}

// GridLayoutView.whyDidYouRender = true;

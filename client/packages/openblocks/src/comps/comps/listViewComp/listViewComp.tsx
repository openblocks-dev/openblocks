import { JSONValue } from "util/jsonTypes";
import { CompAction, CompActionTypes, customAction, wrapChildAction } from "openblocks-core";
import { DispatchType, RecordConstructorToView } from "openblocks-core";
import { AutoHeightControl } from "comps/controls/autoHeightControl";
import { BoolControl } from "comps/controls/boolControl";
import { NumberControl, RangeControl } from "comps/controls/codeControl";
import { styleControl } from "comps/controls/styleControl";
import { ListViewStyle } from "comps/controls/styleControlConstants";
import { EditorContext } from "comps/editorState";
import { UICompBuilder, withContext, withDefault } from "comps/generators";
import { NameConfigHidden, withExposingConfigs } from "comps/generators/withExposing";
import { NameGenerator } from "comps/utils";
import { reduceInContext } from "comps/utils/reduceContext";
import { Section, sectionNames } from "openblocks-design";
import { HintPlaceHolder } from "openblocks-design";
import _ from "lodash";
import { useContext, useRef } from "react";
import ReactResizeDetector from "react-resize-detector";
import { useDelayState } from "util/hooks";
import { CompTree, IContainer } from "../containerBase";
import { SimpleContainerComp, toSimpleContainerData } from "../containerBase/simpleContainerComp";
import {
  ContainerBaseProps,
  gridItemCompToGridItems,
  InnerGrid,
} from "../containerComp/containerView";
import { BackgroundColorContext } from "comps/utils/backgroundColorContext";
import { trans } from "i18n";
import { checkIsMobile } from "util/commonUtils";
import styled from "styled-components";

const Wrapper = styled.div`
  overflow: auto;
  overflow: overlay;
`

const ContextContainerComp = withContext(SimpleContainerComp, ["i"] as const);

const childrenMap = {
  noOfRows: withDefault(RangeControl.closed(0, 100), 3),
  dynamicHeight: AutoHeightControl,
  heightUnitOfRow: withDefault(NumberControl, 1),
  container: ContextContainerComp,
  autoHeight: AutoHeightControl,
  showBorder: BoolControl,
  style: styleControl(ListViewStyle),
};

type ViewProps = RecordConstructorToView<typeof childrenMap>;
type Props = ViewProps & { dispatch: DispatchType };

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

const ListView = (props: Props) => {
  const ref = useRef(null);
  const editorState = useContext(EditorContext);
  const isDragging = editorState.isDragging;
  const containerProps = (props.container as any)({ i: 0 });
  const isOneRow =
    props.noOfRows > 0 && (_.size(containerProps.layout) === 0 || editorState.isDragging);
  const noOfRows = isOneRow ? 1 : props.noOfRows;
  // const rowHeight = calcRowHeight( noOfRows, props.dynamicHeight, props.heightUnitOfRow, props.autoHeight);
  const rowHeight = isOneRow
    ? "100%"
    : props.dynamicHeight
    ? "auto"
    : props.heightUnitOfRow * 44 + "px";

  const [listHeight, setListHeight] = useDelayState(0, isDragging);
  // minHeight is used to ensure that the container height will not shrink when dragging, and the current padding needs to be subtracted during calculation
  const minHeight = isDragging && props.autoHeight ? listHeight + "px" : "100%";
  // log.log("List. listHeight: ", listHeight, " minHeight: ", minHeight);
  const renders = _.range(0, noOfRows).map((i) => {
    const containerProps = (props.container as any)({ i });
    // log.log("renders. i: ", i, "containerProps: ", containerProps, " text: ", Object.values(containerProps.items as Record<string, any>)[0].children.comp.children.text);
    const render = (
      <div
        key={i}
        style={{
          height: rowHeight,
          // border: "0.5px solid #d9d9d9"
        }}
      >
        <BackgroundColorContext.Provider value={props.style.background}>
          <ContainerInListView
            layout={containerProps.layout}
            items={gridItemCompToGridItems(containerProps.items)}
            positionParams={containerProps.positionParams}
            dispatch={containerProps.dispatch}
            style={{ height: "100%", backgroundColor: "transparent" }}
            autoHeight={isDragging || props.dynamicHeight}
            isDroppable={i === 0}
            isDraggable={i === 0}
            isResizable={i === 0}
            isSelectable={i === 0}
            scrollContainerRef={ref}
            overflow={"hidden"}
            minHeight={minHeight}
            enableGridLines={true}
          />
        </BackgroundColorContext.Provider>
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
        backgroundColor: props.style.background,
        border: `1px solid ${props.style.border}`,
        borderRadius: props.style.radius,
        padding: `3px ${paddingWidth}`,
      }}
    >
      <ReactResizeDetector
        onResize={(width?: number, height?: number) => {
          if (height) setListHeight(height);
        }}
        observerOptions={{ box: "border-box" }}
      >
        <div style={{ height: props.autoHeight ? "auto" : "100%" }}>{renders}</div>
      </ReactResizeDetector>
    </Wrapper>
  );
};

const ListViewTmpComp = new UICompBuilder(childrenMap, (props, dispatch) => (
  <ListView {...props} dispatch={dispatch}></ListView>
))
  .setPropertyViewFn((children) => (
    <>
      <Section name={sectionNames.basic}>
        {children.noOfRows.propertyView({
          label: trans("listView.numOfRows"),
          tooltip: trans("listView.numOfRowsTooltip"),
        })}
        {/* {children.dynamicHeight.propertyView({ label: "" })}
        {!children.dynamicHeight.getView() &&
          children.heightUnitOfRow.propertyView({
            label: "",
            tooltip: "",
          })} */}
      </Section>
      <Section name={sectionNames.layout}>{children.autoHeight.getPropertyView()}</Section>
      {/* <Section name={sectionNames.style}>{children.showBorder.propertyView({ label: "" })}</Section> */}
      <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
    </>
  ))
  .build();

class ListViewImplComp extends ListViewTmpComp implements IContainer {
  realSimpleContainer(key?: string): SimpleContainerComp | undefined {
    return this.children.container;
  }
  getCompTree(): CompTree {
    return this.children.container.getCompTree();
  }
  findContainer(key: string): IContainer | undefined {
    return this.children.container.findContainer(key);
  }
  getPasteValue(nameGenerator: NameGenerator): JSONValue {
    return this.children.container.getPasteValue(nameGenerator);
  }
  override autoHeight(): boolean {
    return this.children.autoHeight.getView();
  }
  updateContext(i: number): this {
    return this.reduce(
      wrapChildAction("container", ContextContainerComp.changeContextDataAction({ i }))
    );
  }
  override reduce(action: CompAction): this {
    switch (action.type) {
      case CompActionTypes.UPDATE_NODES_V2:
        return this.updateContext(0).reduce(customAction(action));
      case CompActionTypes.CUSTOM:
        const cAction = action.value as CompAction;
        if (cAction.type === CompActionTypes.UPDATE_NODES_V2) {
          return super.reduce(cAction);
        }
    }
    return reduceInContext({ inEventContext: true }, () => super.reduce(action));
  }
}

export const ListViewComp = withExposingConfigs(ListViewImplComp, [NameConfigHidden]);

export function defaultListViewData(compName: string, nameGenerator: NameGenerator) {
  return {
    container: toSimpleContainerData([
      {
        item: {
          compType: "image",
          name: nameGenerator.genItemName("image"),
          comp: {},
        },
        layoutItem: {
          i: "",
          w: 7,
          h: 14,
          x: 0,
          y: 0,
        },
      },
      {
        item: {
          compType: "text",
          name: nameGenerator.genItemName("text"),
          comp: {
            text: "### 00{{i}}",
          },
        },
        layoutItem: {
          i: "",
          w: 8,
          h: 5,
          x: 7,
          y: 0,
        },
      },
    ]),
  };
}

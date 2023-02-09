import { AutoHeightControl } from "comps/controls/autoHeightControl";
import { BoolControl } from "comps/controls/boolControl";
import { NumberControl, RangeControl } from "comps/controls/codeControl";
import { styleControl } from "comps/controls/styleControl";
import { ListViewStyle } from "comps/controls/styleControlConstants";
import { EditorContext } from "comps/editorState";
import { UICompBuilder, withDefault } from "comps/generators";
import {
  CompDepsConfig,
  NameConfigHidden,
  withExposingConfigs,
} from "comps/generators/withExposing";
import { withMultiContext, withMultiContextWithDefault } from "comps/generators/withMultiContext";
import { NameGenerator } from "comps/utils";
import { BackgroundColorContext } from "comps/utils/backgroundColorContext";
import { getReduceContext, reduceInContext } from "comps/utils/reduceContext";
import { trans } from "i18n";
import _ from "lodash";
import {
  CompAction,
  DispatchType,
  fromRecord,
  fromValue,
  Node,
  RecordConstructorToView,
  withFunction,
  WrapContextNodeV2,
} from "openblocks-core";
import { HintPlaceHolder, Section, sectionNames } from "openblocks-design";
import { useContext, useRef } from "react";
import ReactResizeDetector from "react-resize-detector";
import styled from "styled-components";
import { checkIsMobile } from "util/commonUtils";
import { useDelayState } from "util/hooks";
import { JSONValue } from "util/jsonTypes";
import { lastValueIfEqual, shallowEqual } from "util/objectUtils";
import { CompTree, getAllCompItems, IContainer } from "../containerBase";
import { SimpleContainerComp, toSimpleContainerData } from "../containerBase/simpleContainerComp";
import {
  ContainerBaseProps,
  gridItemCompToGridItems,
  InnerGrid,
} from "../containerComp/containerView";

const Wrapper = styled.div`
  overflow: auto;
  overflow: overlay;
`;

const ContextContainerComp = withMultiContextWithDefault(SimpleContainerComp, { i: 0 });

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
  const commonContainerProps = props.container({ i: 0 });
  const isOneRow =
    props.noOfRows > 0 && (_.isEmpty(commonContainerProps.layout) || editorState.isDragging);
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
    const containerProps = props.container({ i }, String(i));
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
            // all layout changes should only reflect on the commonContainer
            dispatch={commonContainerProps.dispatch}
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
      </Section>
      <Section name={sectionNames.layout}>{children.autoHeight.getPropertyView()}</Section>
      {/* <Section name={sectionNames.style}>{children.showBorder.propertyView({ label: "" })}</Section> */}
      <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
    </>
  ))
  .build();

class ListViewImplComp extends ListViewTmpComp implements IContainer {
  private getOriginalContainer() {
    return this.children.container.getOriginalComp().getComp();
  }
  realSimpleContainer(key?: string): SimpleContainerComp | undefined {
    return this.getOriginalContainer().realSimpleContainer(key);
  }
  getCompTree(): CompTree {
    return this.getOriginalContainer().getCompTree();
  }
  findContainer(key: string): IContainer | undefined {
    return this.getOriginalContainer().findContainer(key);
  }
  getPasteValue(nameGenerator: NameGenerator): JSONValue {
    return this.getOriginalContainer().getPasteValue(nameGenerator);
  }
  override autoHeight(): boolean {
    return this.children.autoHeight.getView();
  }
  override reduce(action: CompAction): this {
    // console.info("listView reduce. action: ", action);
    const listViewDepth = getReduceContext().listViewDepth + 1;
    return reduceInContext({ inEventContext: true, listViewDepth }, () => super.reduce(action));
  }
  /** expose the data from inner comps */
  dataNode(): Node<Record<string, unknown>[]> {
    const noOfRows = this.children.noOfRows.getView();
    // for each container expose each comps with params
    const exposingRecord = _(_.range(0, noOfRows))
      .toPairs()
      .fromPairs()
      .mapValues((i) => {
        let hitCache = true;
        let container = this.children.container.getCachedComp(String(i));
        if (!container) {
          hitCache = false;
          container = this.children.container.getOriginalComp();
        }
        // FIXME: replace allComps as non-list-view comps
        const allComps = getAllCompItems(container.getComp().getCompTree());
        const nodeRecord = _(allComps)
          .mapKeys((gridItemComp) => gridItemComp.children.name.getView())
          .mapValues((gridItemComp) => gridItemComp.children.comp.exposingNode())
          .value();
        const resNode = new WrapContextNodeV2(fromRecord(nodeRecord), { i: fromValue(i) });
        // const resNode = hitCache
        //   ? new WrapContextNodeV2(fromRecord(nodeRecord), container.getParamNodes())
        //   : withFunction(wrapContext(fromRecord(nodeRecord)), (fn) => fn({ i }));
        const res = lastValueIfEqual(
          this,
          "exposing_row_" + i,
          [resNode, nodeRecord] as const,
          (a, b) => shallowEqual(a[1], b[1])
        )[0];
        // console.info("listView exposingRecord. i: ", i, " res id: ", getObjectId(res), " container id: ", getObjectId(container), " hitCache: ", hitCache);
        return res;
      })
      .value();
    // transform record to array
    const exposings = withFunction(fromRecord(exposingRecord), (record) => {
      return _.range(0, noOfRows).map((i) => record[i]);
    });

    return lastValueIfEqual(this, "exposing_data", [exposings, exposingRecord] as const, (a, b) =>
      shallowEqual(a[1], b[1])
    )[0];
  }
}

export const ListViewComp = withExposingConfigs(ListViewImplComp, [
  new CompDepsConfig(
    "data",
    (comp) => ({ data: comp.dataNode() }),
    (input) => input.data,
    trans("listView.dataDesc")
  ),
  NameConfigHidden,
]);

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

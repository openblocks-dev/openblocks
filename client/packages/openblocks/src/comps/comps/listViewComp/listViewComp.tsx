import { UICompBuilder, withViewFn } from "comps/generators";
import {
  CompDepsConfig,
  depsConfig,
  NameConfigHidden,
  withExposingConfigs,
} from "comps/generators/withExposing";
import { NameGenerator } from "comps/utils";
import { getReduceContext, reduceInContext } from "comps/utils/reduceContext";
import { trans } from "i18n";
import _ from "lodash";
import {
  CompAction,
  CompActionTypes,
  fromRecord,
  fromValue,
  Node,
  withFunction,
  WrapContextNodeV2,
} from "openblocks-core";
import { Section, sectionNames } from "openblocks-design";
import { JSONValue } from "util/jsonTypes";
import { lastValueIfEqual, shallowEqual } from "util/objectUtils";
import { CompTree, getAllCompItems, IContainer } from "../containerBase";
import { SimpleContainerComp, toSimpleContainerData } from "../containerBase/simpleContainerComp";
import { ListView } from "./listView";
import { childrenMap, ContextContainerComp, getCurrentItemParams, getData } from "./listViewUtils";

const ListViewTmpComp = new UICompBuilder(childrenMap, () => <></>)
  .setPropertyViewFn((children) => {
    return (
      <>
        <Section name={sectionNames.basic}>
          {children.noOfRows.propertyView({
            label: trans("data"),
            tooltip: trans("listView.dataTooltip"),
          })}
        </Section>
        <Section name={sectionNames.layout}>{children.autoHeight.getPropertyView()}</Section>
        {/* <Section name={sectionNames.style}>{children.showBorder.propertyView({ label: "" })}</Section> */}
        <Section name={sectionNames.style}>{children.style.getPropertyView()}</Section>
      </>
    );
  })
  .build();

export class ListViewImplComp extends ListViewTmpComp implements IContainer {
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
    const listViewContext = getReduceContext().listViewContext;
    const { data: thisData } = getData(this.children.noOfRows.getView());
    const comp = reduceInContext(
      {
        inEventContext: true,
        listViewContext: {
          listViewDepth: listViewContext.listViewDepth + 1,
          currentItem: { ...listViewContext.currentItem, ...getCurrentItemParams(thisData) },
        },
      },
      () => super.reduce(action)
    );

    if (action.type === CompActionTypes.UPDATE_NODES_V2) {
      const { data: compData } = getData(comp.children.noOfRows.getView());
      const paramsChanged = !_.isEqual(
        getCurrentItemParams(thisData),
        getCurrentItemParams(compData)
      );
      if (paramsChanged) {
        // keep original comp's params same as the 0-th comp
        setTimeout(() =>
          comp.children.container.dispatch(
            ContextContainerComp.setOriginalParamsAction({
              currentItem: getCurrentItemParams(compData),
            })
          )
        );
      }
    }
    return comp;
  }
  /** expose the data from inner comps */
  itemsNode(): Node<Record<string, unknown>[]> {
    const { noOfRows } = getData(this.children.noOfRows.getView());
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
        const resNode = new WrapContextNodeV2(fromRecord(nodeRecord), {
          i: fromValue(i),
          currentItem: withFunction(this.children.noOfRows.exposingNode(), (value) =>
            typeof value === "number" ? {} : value[i]
          ),
        });
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

const ListViewRenderComp = withViewFn(ListViewImplComp, (comp) => <ListView comp={comp} />);

export const ListViewComp = withExposingConfigs(ListViewRenderComp, [
  new CompDepsConfig(
    "items",
    (comp) => ({ data: comp.itemsNode() }),
    (input) => input.data,
    trans("listView.itemsDesc")
  ),
  depsConfig({
    name: "data",
    desc: trans("listView.dataDesc"),
    depKeys: ["noOfRows"],
    func: (input) => {
      const { data } = getData(input.noOfRows);
      return data;
    },
  }),
  NameConfigHidden,
]);

export function defaultListViewData(compName: string, nameGenerator: NameGenerator) {
  return {
    noOfRows: "3",
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

import { UICompBuilder, withPropertyViewFn, withViewFn } from "comps/generators";
import {
  CompDepsConfig,
  depsConfig,
  NameConfigHidden,
  withExposingConfigs,
} from "comps/generators/withExposing";
import { MAP_KEY } from "comps/generators/withMultiContext";
import { NameGenerator } from "comps/utils";
import { getReduceContext, reduceInContext } from "comps/utils/reduceContext";
import { trans } from "i18n";
import _ from "lodash";
import {
  CompAction,
  CompActionTypes,
  fromRecord,
  fromValue,
  isCustomAction,
  Node,
  withFunction,
  WrapContextNodeV2,
} from "openblocks-core";
import { JSONValue } from "util/jsonTypes";
import { lastValueIfEqual, shallowEqual } from "util/objectUtils";
import { CompTree, getAllCompItems, IContainer } from "../containerBase";
import { SimpleContainerComp, toSimpleContainerData } from "../containerBase/simpleContainerComp";
import { ListView } from "./listView";
import { listPropertyView } from "./listViewPropertyView";
import { childrenMap, ContextContainerComp, getCurrentItemParams, getData } from "./listViewUtils";

const ListViewTmpComp = new UICompBuilder(childrenMap, () => <></>)
  .setPropertyViewFn(() => <></>)
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
    let comp = reduceInContext(
      {
        inEventContext: true,
        listViewContext: {
          listViewDepth: listViewContext.listViewDepth + 1,
          currentItem: { ...listViewContext.currentItem, ...getCurrentItemParams(thisData) },
        },
      },
      () => super.reduce(action)
    );

    if (isCustomAction(action, "moduleReady")) {
      // mirror the 0-th item to the origin
      const thisMapComps = this.children.container.children[MAP_KEY].getView();
      const compMapComps = comp.children.container.children[MAP_KEY].getView();
      const topItemChanged = thisMapComps[0] !== compMapComps[0];
      if (topItemChanged) {
        comp = comp.setChild(
          "container",
          comp.children.container.reduce(ContextContainerComp.mirrorToOriginAction("0"))
        );
      }
    }

    if (action.type === CompActionTypes.UPDATE_NODES_V2) {
      const { data: compData } = getData(comp.children.noOfRows.getView());
      const paramsChanged = !_.isEqual(
        getCurrentItemParams(thisData),
        getCurrentItemParams(compData)
      );
      if (paramsChanged) {
        // keep original comp's params same as the 0-th comp
        comp = comp.setChild(
          "container",
          comp.children.container.reduce(
            ContextContainerComp.setOriginalParamsAction({
              currentItem: getCurrentItemParams(compData),
            })
          )
        );
      }
    }
    // console.info("listView reduce. action: ", action, "\nthis: ", this, "\ncomp: ", comp);
    return comp;
  }
  /** expose the data from inner comps */
  itemsNode(): Node<Record<string, unknown>[]> {
    const { itemCount } = getData(this.children.noOfRows.getView());
    // for each container expose each comps with params
    const exposingRecord = _(_.range(0, itemCount))
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
      return _.range(0, itemCount).map((i) => record[i]);
    });

    return lastValueIfEqual(this, "exposing_data", [exposings, exposingRecord] as const, (a, b) =>
      shallowEqual(a[1], b[1])
    )[0];
  }
}

const ListViewRenderComp = withViewFn(ListViewImplComp, (comp) => <ListView comp={comp} />);
const ListPropertyView = listPropertyView("listView");
const ListViewPropertyComp = withPropertyViewFn(ListViewRenderComp, (comp) => {
  return <ListPropertyView comp={comp} />;
});

export const ListViewComp = withExposingConfigs(ListViewPropertyComp, [
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
    noOfRows:
      '[\n  {\n    "rate": "9.2",\n    "title": "The Shawshank Redemption",\n    "url": "https://www.imdb.com/title/tt0111161/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "9.2",\n    "title": "The Godfather",\n    "url": "https://www.imdb.com/title/tt0068646/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "9.0",\n    "title": "The Dark Knight",\n    "url": "https://www.imdb.com/title/tt0468569/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UY67_CR0,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "9.0",\n    "title": "The Godfather Part II",\n    "url": "https://www.imdb.com/title/tt0071562/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "9.0",\n    "title": "12 Angry Men",\n    "url": "https://www.imdb.com/title/tt0050083/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BMWU4N2FjNzYtNTVkNC00NzQ0LTg0MjAtYTJlMjFhNGUxZDFmXkEyXkFqcGdeQXVyNjc1NTYyMjg@._V1_UX45_CR0,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "8.9",\n    "title": "Schindler\'s List",\n    "url": "https://www.imdb.com/title/tt0108052/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BNDE4OTMxMTctNmRhYy00NWE2LTg3YzItYTk3M2UwOTU5Njg4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_UX45_CR0,0,45,67_AL_.jpg"\n  }\n]',
    container: toSimpleContainerData([
      {
        item: {
          compType: "image",
          name: nameGenerator.genItemName("image"),
          comp: {
            src: "{{currentItem.cover}}",
            autoHeight: "fixed",
          },
        },
        layoutItem: {
          i: "",
          w: 6,
          h: 14,
          x: 0,
          y: 0,
        },
      },
      {
        item: {
          compType: "link",
          name: nameGenerator.genItemName("link"),
          comp: {
            text: "{{i+1}}. {{currentItem.title}}",
            onEvent: [
              {
                name: "click",
                handler: {
                  compType: "goToURL",
                  comp: { url: "{{currentItem.url}}" },
                  condition: "",
                  slowdown: "debounce",
                  delay: "",
                },
              },
            ],
          },
        },
        layoutItem: {
          i: "",
          h: 5,
          w: 17,
          x: 7,
          y: 0,
        },
      },
      {
        item: {
          compType: "rating",
          name: nameGenerator.genItemName("rating"),
          comp: {
            value: "{{currentItem.rate / 2}}",
            max: "5",
            label: {
              text: "",
              width: "33",
              widthUnit: "%",
              position: "row",
              align: "right",
            },
            allowHalf: true,
            disabled: true,
          },
        },
        layoutItem: {
          i: "",
          h: 5,
          w: 17,
          x: 7,
          y: 9,
        },
      },
    ]),
  };
}

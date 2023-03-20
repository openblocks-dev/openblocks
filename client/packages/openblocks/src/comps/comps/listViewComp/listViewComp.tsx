import { AutoHeightControl } from "comps/controls/autoHeightControl";
import { BoolControl } from "comps/controls/boolControl";
import {
  NumberControl,
  NumberOrJSONObjectArrayControl,
  StringControl,
} from "comps/controls/codeControl";
import { styleControl } from "comps/controls/styleControl";
import { ListViewStyle } from "comps/controls/styleControlConstants";
import { UICompBuilder, withDefault, withPropertyViewFn, withViewFn } from "comps/generators";
import {
  CompDepsConfig,
  depsConfig,
  NameConfigHidden,
  withExposingConfigs,
} from "comps/generators/withExposing";
import { withIsLoadingMethod } from "comps/generators/withIsLoading";
import { NameGenerator } from "comps/utils";
import { reduceInContext } from "comps/utils/reduceContext";
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
import { JSONValue } from "util/jsonTypes";
import { depthEqual, lastValueIfEqual, shallowEqual } from "util/objectUtils";
import { CompTree, getAllCompItems, IContainer } from "../containerBase";
import { SimpleContainerComp, toSimpleContainerData } from "../containerBase/simpleContainerComp";
import { PaginationControl } from "../tableComp/paginationControl";
import { ContextContainerComp } from "./contextContainerComp";
import { ListView } from "./listView";
import { listPropertyView } from "./listViewPropertyView";
import { getData } from "./listViewUtils";

const childrenMap = {
  noOfRows: withIsLoadingMethod(NumberOrJSONObjectArrayControl), // FIXME: migrate "noOfRows" to "data"
  noOfColumns: withDefault(NumberControl, 1),
  itemIndexName: withDefault(StringControl, "i"),
  itemDataName: withDefault(StringControl, "currentItem"),
  dynamicHeight: AutoHeightControl,
  heightUnitOfRow: withDefault(NumberControl, 1),
  container: ContextContainerComp,
  autoHeight: AutoHeightControl,
  showBorder: BoolControl,
  pagination: withDefault(PaginationControl, { pageSize: "6" }),
  style: styleControl(ListViewStyle),
};

const ListViewTmpComp = new UICompBuilder(childrenMap, () => <></>)
  .setPropertyViewFn(() => <></>)
  .build();

export class ListViewImplComp extends ListViewTmpComp implements IContainer {
  private getOriginalContainer() {
    return this.children.container.getSelectedComp().getComp();
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
    return {
      ...this.toJsonValue(),
      container: this.getOriginalContainer().getPasteValue(nameGenerator),
    };
  }
  override autoHeight(): boolean {
    return this.children.autoHeight.getView();
  }
  override reduce(action: CompAction): this {
    // console.info("listView reduce. action: ", action);

    let comp = reduceInContext({ inEventContext: true }, () => super.reduce(action));
    if (action.type === CompActionTypes.UPDATE_NODES_V2) {
      const { itemCount } = getData(comp.children.noOfRows.getView());
      const pagination = comp.children.pagination.getView();
      const total = pagination.total || itemCount;
      const offset = (pagination.current - 1) * pagination.pageSize;
      if (offset >= total && pagination.current > 1) {
        // reset pageNo
        setTimeout(() => comp.children.pagination.children.pageNo.dispatchChangeValueAction(1));
      } else if (String(offset) !== this.children.container.getSelection()) {
        // sync selection
        setTimeout(() =>
          comp.children.container.dispatch(ContextContainerComp.setSelectionAction(String(offset)))
        );
      }
    }

    // console.info("listView reduce. action: ", action, "\nthis: ", this, "\ncomp: ", comp);
    return comp;
  }
  /** expose the data from inner comps */
  itemsNode(): Node<Record<string, unknown>[]> {
    const { itemCount } = getData(this.children.noOfRows.getView());
    const itemIndexName = this.children.itemIndexName.getView();
    const itemDataName = this.children.itemDataName.getView();
    const dataExposingNode = this.children.noOfRows.exposingNode();
    const containerComp = this.children.container;
    // for each container expose each comps with params
    const exposingRecord = _(_.range(0, itemCount))
      .toPairs()
      .fromPairs()
      .mapValues((itemIdx) => {
        let container =
          containerComp.getCachedComp(String(itemIdx)) ?? containerComp.getOriginalComp();
        // FIXME: replace allComps as non-list-view comps
        const allComps = getAllCompItems(container.getComp().getCompTree());
        const nodeRecord = _(allComps)
          .mapKeys((gridItemComp) => gridItemComp.children.name.getView())
          .mapValues((gridItemComp) => gridItemComp.children.comp.exposingNode())
          .value();
        const paramsNodes = {
          [itemIndexName]: fromValue(itemIdx),
          [itemDataName]: withFunction(dataExposingNode, (value) =>
            typeof value === "number" ? {} : value[itemIdx]
          ),
        };
        const resNode = new WrapContextNodeV2(fromRecord(nodeRecord), paramsNodes);
        const res = lastValueIfEqual(
          this,
          "exposing_row_" + itemIdx,
          [resNode, dataExposingNode, nodeRecord, itemIndexName, itemDataName] as const,
          (a, b) => a[1] === b[1] && depthEqual(a.slice(2), b.slice(2), 3)
        )[0];
        // console.info("listView exposingRecord. itemIdx: ", itemIdx, " res id: ", getObjectId(res), " container id: ", getObjectId(container));
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
      '[\n  {\n    "rate": "9.2",\n    "title": "The Shawshank Redemption",\n    "url": "https://www.imdb.com/title/tt0111161/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UY67_CR0,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "9.2",\n    "title": "The Godfather",\n    "url": "https://www.imdb.com/title/tt0068646/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UY67_CR1,0,45,67_AL_.jpg"\n  },\n  {\n    "rate": "9.0",\n    "title": "The Dark Knight",\n    "url": "https://www.imdb.com/title/tt0468569/",\n    "cover": "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_UY67_CR0,0,45,67_AL_.jpg"\n  }\n]',
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
                  comp: {
                    url: "{{currentItem.url}}",
                    inNewTab: true,
                  },
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

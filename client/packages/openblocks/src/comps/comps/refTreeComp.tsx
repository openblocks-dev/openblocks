import { MultiCompBuilder, valueComp } from "comps/generators";
import { list, ListDataType } from "comps/generators/list";
import {
  CompAction,
  CompActionTypes,
  CompParams,
  isBroadcastAction,
  MultiCompConstructor,
  RenameAction,
  wrapChildAction,
} from "openblocks-core";

const treeItemComp = (childComp: MultiCompConstructor) => {
  class TreeItemListComp extends list(childComp) {
    constructor(params: CompParams<ListDataType<MultiCompConstructor>>) {
      super({
        ...params,
        value: params.value?.filter((i) => !!i.value) || [],
      });
    }
  }
  return class TreeItemComp extends new MultiCompBuilder(
    {
      value: valueComp<string>(""),
      items: TreeItemListComp,
    },
    () => null
  ).build() {
    reduce(action: CompAction) {
      if (isBroadcastAction<RenameAction>(action, CompActionTypes.RENAME)) {
        if (this.children.value.getView() === action.action.oldName) {
          const changeNameAction = this.children.value.changeValueAction(action.action.name);
          const childAction = wrapChildAction("value", changeNameAction);
          return super.reduce(childAction);
        }
      }
      return super.reduce(action);
    }
    hasChildren(parentId: string) {
      const parent = this.getParent(parentId);
      return (parent?.children.items.getView().length ?? 0) > 0;
    }
    getParent(parentId: string): TreeItemComp | null {
      if (!parentId) {
        return this;
      }
      if (this.children.value.getView() === parentId) {
        return this;
      }
      const items = this.children.items.getView();
      for (let i = 0; i < items.length; i++) {
        const item = items[i] as TreeItemComp;
        if (item.getParent) {
          const ret = item.getParent(parentId);
          if (ret) {
            return ret;
          }
        }
      }
      return null;
    }
  };
};

const Level2RefTreeComp = treeItemComp(
  new MultiCompBuilder({ value: valueComp<string>("") }, () => null).build()
);

const Level1RefTreeComp = treeItemComp(Level2RefTreeComp);

class RefTreeComp extends treeItemComp(Level1RefTreeComp) {
  getAllValuesInTree() {
    const walk = (tree: InstanceType<typeof RefTreeComp>) => {
      const ret: string[] = [];
      const value = tree.children.value.getView();
      if (value) {
        ret.push(value);
      }
      if (this.children.items) {
        tree.children.items.getView().forEach((i) => {
          ret.push(...walk(i as InstanceType<typeof RefTreeComp>));
        });
      }
      return ret;
    };
    return walk(this);
  }

  appendRef(parentId: string, ref: string, index?: number) {
    const comp = this.getParent(parentId);
    if (comp && comp.children.items) {
      const isInsert = index !== undefined;
      let action = isInsert
        ? comp.children.items.insertAction(index, { value: ref })
        : comp.children.items.pushAction({ value: ref });
      comp.children.items.dispatch(action);
    }
  }
}

export default RefTreeComp;

import {
  CompAction,
  CompActionTypes,
  isChildAction,
  unwrapChildAction,
  updateNodesV2Action,
  wrapChildAction,
} from "actions";
import { fromRecord, Node } from "eval";
import _ from "lodash";
import log from "loglevel";
import { CACHE_PREFIX } from "util/cacheUtils";
import { JSONValue } from "util/jsonTypes";
import { containFields, setFieldsNoTypeCheck, shallowEqual } from "util/objectUtils";
import {
  AbstractComp,
  Comp,
  CompParams,
  ConstructorToDataType,
  DispatchType,
  OptionalNodeType,
} from "./comp";

/**
 * MultiBaseCompConstructor with abstract function implemented
 */
export type MultiCompConstructor = new (params: CompParams<any>) => MultiBaseComp<any, any, any> &
  Comp<any, any, any>;

/**
 * wrap a dispatch as a child dispatch
 *
 * @param dispatch input dispatch
 * @param childName the key of the child dispatch
 * @returns a wrapped dispatch with the child dispatch
 */
export function wrapDispatch(dispatch: DispatchType | undefined, childName: string): DispatchType {
  return (action: CompAction): void => {
    if (dispatch) {
      dispatch(wrapChildAction(childName, action));
    }
  };
}

export type ExtraNodeType = {
  node: Record<string, Node<any>>;
  updateNodeFields: (value: any) => Record<string, any>;
};

/**
 * the core class of multi function
 * build the tree structure of comps
 * @remarks
 * functions can be cached if needed.
 **/
export abstract class MultiBaseComp<
  ChildrenType extends Record<string, Comp<unknown>> = Record<string, Comp<unknown>>,
  DataType extends JSONValue = JSONValue,
  NodeType extends OptionalNodeType = OptionalNodeType
> extends AbstractComp<any, DataType, NodeType> {
  readonly children: ChildrenType;

  constructor(params: CompParams<DataType>) {
    super(params);
    this.children = this.parseChildrenFromValue(params);
  }

  abstract parseChildrenFromValue(params: CompParams<DataType>): ChildrenType;

  override reduce(action: CompAction): this {
    const comp = this.reduceOrUndefined(action);
    if (!comp) {
      console.warn(
        "not supported action, should not happen, action:",
        action,
        "\ncurrent comp:",
        this
      );
      return this;
    }
    return comp;
  }

  // if the base class can't handle this action, just return undefined
  protected reduceOrUndefined(action: CompAction): this | undefined {
    // log.debug("reduceOrUndefined. action: ", action, " this: ", this);
    // must handle DELETE in the parent level
    if (action.type === CompActionTypes.DELETE_COMP && action.path.length === 1) {
      return this.setChildren(_.omit(this.children, action.path[0]));
    }
    if (action.type === CompActionTypes.REPLACE_COMP && action.path.length === 1) {
      const NextComp = action.compFactory;
      if (!NextComp) {
        return this;
      }

      const compName = action.path[0];
      const currentComp = this.children[compName];
      const value = currentComp.toJsonValue();
      const nextComp = new NextComp({
        value,
        dispatch: wrapDispatch(this.dispatch, compName),
      });
      return this.setChildren({
        ...this.children,
        [compName]: nextComp,
      });
    }
    if (isChildAction(action)) {
      const [childName, childAction] = unwrapChildAction(action);
      const child = this.children[childName];
      if (!child) {
        log.error("found bad action path ", childName);
        return this;
      }
      const newChild = child.reduce(childAction);
      return this.setChild(childName, newChild);
    }
    // key, value
    switch (action.type) {
      case CompActionTypes.MULTI_CHANGE: {
        const { changes } = action;
        // handle DELETE in the parent level
        let mcChildren = _.omitBy(this.children, (comp, childName) => {
          const innerAction = changes[childName];
          return (
            innerAction &&
            innerAction.type === CompActionTypes.DELETE_COMP &&
            innerAction.path.length === 0
          );
        });
        // CHANGE
        mcChildren = _.mapValues(mcChildren, (comp, childName) => {
          const innerAction = changes[childName];
          if (innerAction) {
            return comp.reduce(innerAction);
          }
          return comp;
        });
        return this.setChildren(mcChildren);
      }
      case CompActionTypes.UPDATE_NODES_V2: {
        const { value } = action;
        if (value === undefined) {
          return this;
        }
        const cacheKey = CACHE_PREFIX + "REDUCE_UPDATE_NODE";
        // if constructed by the value, just return
        if ((this as any)[cacheKey] === value) {
          // console.info("inside: UPDATE_NODE_V2 cache hit. action: ", action, "\nvalue: ", value, "\nthis: ", this);
          return this;
        }
        const children = _.mapValues(this.children, (comp, childName) => {
          if (value.hasOwnProperty(childName)) {
            return comp.reduce(updateNodesV2Action(value[childName]));
          }
          return comp;
        });
        const extraFields = this.extraNode()?.updateNodeFields(value);
        if (shallowEqual(children, this.children) && containFields(this, extraFields)) {
          return this;
        }
        return setFieldsNoTypeCheck(
          this,
          {
            children: children,
            [cacheKey]: value,
            ...extraFields,
          },
          { keepCacheKeys: ["node"] }
        );
      }
      case CompActionTypes.CHANGE_VALUE: {
        return this.setChildren(
          this.parseChildrenFromValue({
            dispatch: this.dispatch,
            value: action.value as DataType,
          })
        );
      }
      case CompActionTypes.BROADCAST: {
        return this.setChildren(
          _.mapValues(this.children, (comp) => {
            return comp.reduce(action);
          })
        );
      }
      case CompActionTypes.ONLY_EVAL: {
        return this;
      }
    }
  }

  setChild(childName: keyof ChildrenType, newChild: Comp): this {
    if (this.children[childName] === newChild) {
      return this;
    }
    return this.setChildren({
      ...this.children,
      [childName]: newChild,
    });
  }

  protected setChildren(
    children: Record<string, Comp>,
    params?: { keepCacheKeys?: string[] }
  ): this {
    if (shallowEqual(children, this.children)) {
      return this;
    }
    return setFieldsNoTypeCheck(this, { children: children }, params);
  }

  /**
   * extended interface.
   *
   * @return node for additional node, updateNodeFields for handling UPDATE_NODE event
   * FIXME: make type safe
   */
  protected extraNode(): ExtraNodeType | undefined {
    return undefined;
  }

  protected childrenNode() {
    const result: { [key: string]: Node<unknown> } = {};
    Object.keys(this.children).forEach((key) => {
      const node = this.children[key].node();
      if (node !== undefined) {
        result[key] = node;
      }
    });
    return result;
  }

  override nodeWithoutCache(): NodeType {
    return fromRecord({
      ...this.childrenNode(),
      ...this.extraNode()?.node,
    }) as unknown as NodeType;
  }

  override changeDispatch(dispatch: DispatchType): this {
    const newChildren = _.mapValues(this.children, (comp, childName) => {
      return comp.changeDispatch(wrapDispatch(dispatch, childName));
    });
    return super.changeDispatch(dispatch).setChildren(newChildren, { keepCacheKeys: ["node"] });
  }

  protected ignoreChildDefaultValue() {
    return false;
  }

  readonly IGNORABLE_DEFAULT_VALUE = {};
  override toJsonValue(): DataType {
    const result: Record<string, any> = {};
    const ignore = this.ignoreChildDefaultValue();
    Object.keys(this.children).forEach((key) => {
      const comp = this.children[key];
      // FIXME: this implementation is a little tricky, better choose a encapsulated implementation
      if (comp.hasOwnProperty("NO_PERSISTENCE")) {
        return;
      }
      const value = comp.toJsonValue();
      if (ignore && _.isEqual(value, (comp as any)["IGNORABLE_DEFAULT_VALUE"])) {
        return;
      }
      result[key] = value;
    });
    return result as DataType;
  }

  // FIXME: autoHeight should be encapsulated in UIComp/UICompBuilder
  autoHeight(): boolean {
    return true;
  }

  changeChildAction(
    childName: string & keyof ChildrenType,
    value: ConstructorToDataType<new (...params: any) => ChildrenType[typeof childName]>
  ) {
    return wrapChildAction(childName, this.children[childName].changeValueAction(value));
  }
}

export function mergeExtra(e1: ExtraNodeType | undefined, e2: ExtraNodeType): ExtraNodeType {
  if (e1 === undefined) {
    return e2;
  }
  return {
    node: {
      ...e1.node,
      ...e2.node,
    },
    updateNodeFields: (value: any) => {
      return {
        ...e1.updateNodeFields(value),
        ...e2.updateNodeFields(value),
      };
    },
  };
}

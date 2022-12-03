import {
  Comp,
  CompConstructor,
  CompParams,
  ConstructorToComp,
  ConstructorToDataType,
  ConstructorToView,
  MultiBaseComp,
  wrapDispatch,
} from "openblocks-core";
import {
  parseChildrenFromValueAndChildrenMap,
  ToConstructor,
  ToDataType,
} from "comps/generators/multi";
import _ from "lodash";
import { stateComp, stateInstance, valueComp } from "./simpleGenerators";
import { trans } from "i18n";
import log from "loglevel";
import { parseCompType } from "comps/utils/remote";
import { remoteComp } from "comps/comps/remoteComp/remoteComp";

type Keys<T> = Extract<keyof T, string>;
type CompMapBaseType = Record<string, CompConstructor>;
export type COMP_CHILDREN_TYPE<T extends CompMapBaseType, K extends string, V extends string> = {
  [key in Keys<T>]: {
    [x in K]: Comp<key>;
  } & {
    [v in V]: ConstructorToComp<T[key]>;
  };
}[Keys<T>];
export type COMP_DATA_TYPE<
  T extends CompMapBaseType,
  K extends string = "compType",
  V extends string = "comp"
> = {
  [key in Keys<T>]: {
    [x in K]: key;
  } & {
    [v in V]?: ConstructorToDataType<T[key]>;
  };
}[Keys<T>];
export type COMP_VIEW_TYPE<T extends CompMapBaseType> = {
  [key in Keys<T>]: ConstructorToView<T[key]>;
}[Keys<T>];
type COMP_TYPE_AND_COMP_VIEW_TYPE<T extends CompMapBaseType, K extends string, V extends string> = {
  [key in Keys<T>]: {
    [x in K]: key;
  } & {
    [v in V]: ConstructorToView<T[key]>;
  };
}[Keys<T>];

class CustomError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export function parseChildrenFromValue<
  T extends CompMapBaseType,
  K extends string,
  V extends string
>(
  compMap: T,
  params: CompParams<COMP_DATA_TYPE<T, K, V>>,
  defaultCompType: Keys<T>,
  keyName: K,
  valueName: V
) {
  const { dispatch, value } = params;
  let compType = defaultCompType;
  if (value && value[keyName]) {
    compType = value[keyName];
  }
  const compValue: { value?: any } = {};
  // If pass undefined directly, the default value will be cleared.
  if (value && value[valueName] !== undefined) {
    compValue.value = value[valueName];
  }
  if (_.isEmpty(compMap)) {
    log.trace(compType, compMap);
  }
  try {
    const children: any = {};
    const CompTypeComp = valueComp(compType);
    children[keyName] = new CompTypeComp({
      value: compType,
      dispatch: wrapDispatch(dispatch, keyName),
    });
    const compInfo = parseCompType(compType);

    let Comp;
    if (compInfo.isRemote) {
      Comp = remoteComp(compInfo);
    } else {
      Comp = compMap[compType];
    }
    children[valueName] = new Comp({
      dispatch: wrapDispatch(dispatch, valueName),
      ...compValue,
    } as any);
    return children as COMP_CHILDREN_TYPE<T, K, V>;
  } catch (e) {
    if (e instanceof CustomError) {
      // Currently display the innermost message first
      throw e;
    }
    log.info("compType:", compType, compMap[compType], compMap);
    log.error(e);
    throw new CustomError(trans("globalErrorMessage.createCompFail", { comp: compType }));
  }
}

/**
 * input some comp, packaged as {compType: string, comp: Comp}.
 */
export function withType<T extends CompMapBaseType>(compMap: T, defaultCompType: Keys<T>) {
  return withTypeAndChildren(compMap, defaultCompType, {});
}

/**
 * FIXME: I directly imported the implementation of multi, the type name is a bit messy, and it will be unified in the future
 */
export function withTypeAndChildrenAbstract<
  T extends CompMapBaseType,
  ChildrenCompMap extends Record<string, Comp<unknown>>,
  K extends string = "compType",
  V extends string = "comp"
>(
  compMapOrGetter: T | (() => T),
  defaultCompType: Keys<T>,
  childrenMap: ToConstructor<ChildrenCompMap>,
  keyName: K = "compType" as K,
  valueName: V = "comp" as V
) {
  type ChildrenType = COMP_CHILDREN_TYPE<T, K, V> &
    ChildrenCompMap & {
      __PREV_VALUE: ReturnType<typeof stateInstance<Record<string, DataType[V]>>>;
    };
  type DataType = COMP_DATA_TYPE<T, K, V> & ToDataType<ChildrenCompMap>;

  const childrenWithPrev = {
    ...childrenMap,
    __PREV_VALUE: stateComp({}),
  };

  abstract class WITH_TYPE_AND_CHILDREN_COMP extends MultiBaseComp<ChildrenType, DataType> {
    override parseChildrenFromValue(params: CompParams<DataType>): ChildrenType {
      const compMap = typeof compMapOrGetter === "function" ? compMapOrGetter() : compMapOrGetter;
      return {
        ...parseChildrenFromValue(compMap, params, defaultCompType, keyName, valueName),
        ...parseChildrenFromValueAndChildrenMap(params, childrenWithPrev),
      } as ChildrenType;
    }

    /**
     * different from {@see dispatchChangeValueAction}.
     * this function will preserve the value of previous type
     */
    dispatchChangeAndPreserveAction(value: DataType) {
      const prevValues = { ...this.children.__PREV_VALUE.getView() };
      prevValues[this.children[keyName].getView()] = this.children[
        valueName
      ].toJsonValue() as DataType[V];

      const paramsValue: DataType = { ...value, __PREV_VALUE: prevValues };
      const prev = this.children?.__PREV_VALUE.getView()[value[keyName]];
      if (prev && !value[valueName]) {
        paramsValue[valueName] = prev;
      }

      this.dispatchChangeValueAction(paramsValue);
    }

    /**
     * The type of getView is "any" for historical reasons, here is one more typesafe view.
     */
    getTypeSafeView(): COMP_VIEW_TYPE<T> {
      return this.children[valueName].getView() as COMP_VIEW_TYPE<T>;
    }

    /**
     * Returns the view of type and comp, type-safe
     */
    protected getTypeAndCompView(): COMP_TYPE_AND_COMP_VIEW_TYPE<T, K, V> {
      const view: any = {};
      view[keyName] = this.children[keyName].getView();
      view[valueName] = this.children[valueName].getView();
      return view;
    }

    override getPropertyView() {
      return this.children.comp.getPropertyView();
    }
  }

  return WITH_TYPE_AND_CHILDREN_COMP;
}

/**
 * Historical method.
 * recommend to use the abstract version, which will not pollute the type of view
 */
export function withTypeAndChildren<
  T extends CompMapBaseType,
  ChildrenCompMap extends Record<string, Comp<unknown>>
>(compMap: T | (() => T), defaultCompType: Keys<T>, childrenMap: ToConstructor<ChildrenCompMap>) {
  const TypeComp = withTypeAndChildrenAbstract(compMap, defaultCompType, childrenMap);

  class TmpTypeComp extends TypeComp {
    getView() {
      return this.children.comp.getView();
    }
  }

  return TmpTypeComp;
}

import { JSONValue } from "util/jsonTypes";
import { Comp, ConstructorToComp, ConstructorToDataType } from "openblocks-core";
import { ToType } from "comps/utils";
import React from "react";
import { CompAction, CompActionTypes, customAction, CustomAction } from "openblocks-core";
import { CompConstructor, CompParams, MultiBaseComp, wrapDispatch } from "openblocks-core";
import _ from "lodash";

type MapAction<ChildDataType extends JSONValue = JSONValue> =
  | {
      type: "add";
      key: string;
      value: ChildDataType;
    }
  | {
      type: "addComp";
      key: string;
      value: Comp;
    }
  | {
      type: "multi";
      actions: Array<ToType<CustomAction>>;
    };

// add action without type checking
export function addMapChildAction(key: string, value: JSONValue) {
  return customAction<MapAction>(
    {
      type: "add",
      key: key,
      value: value,
    },
    true
  );
}

export function addMapCompChildAction(key: string, value: Comp) {
  return customAction<MapAction>(
    {
      type: "addComp",
      key: key,
      value: value,
    },
    true
  );
}

export function multiMapAction(actions: Array<CustomAction>) {
  const editDSL = actions.some((action) => !!action.editDSL);
  console.assert(
    actions.every((action) => !_.isNil(action.editDSL) && action.editDSL === editDSL),
    `sameTypeMap's multiMapAction: all actions should have the same editDSL. editDSL: ${editDSL} actions:`,
    actions
  );
  return customAction<MapAction>(
    {
      type: "multi",
      actions: actions,
    },
    editDSL
  );
}

/**
 * The child is a map of the same type, which is used to implement the list (because the list of react needs to have a key)
 */
export function sameTypeMap<ChildComp extends CompConstructor<any, any>>(
  childConstructor: ChildComp
) {
  function newChild(
    dispatch: (action: CompAction) => void,
    childName: string,
    childValue: JSONValue
  ) {
    return new childConstructor({
      dispatch: wrapDispatch(dispatch, childName),
      value: childValue,
    }) as ConstructorToComp<ChildComp>;
  }

  class TEMP_CLASS extends MultiBaseComp<Record<string, ConstructorToComp<ChildComp>>> {
    override parseChildrenFromValue(params: CompParams) {
      const value = params.value ?? {};
      return _.mapValues(
        value as Record<string, JSONValue>,
        (childValue: JSONValue, childName: string) => {
          return newChild(this.dispatch, childName, childValue);
        }
      );
    }

    override getView() {
      return this.children;
    }

    override getPropertyView() {
      return <></>;
    }

    override reduce(action: CompAction): this {
      const comp = this.reduceOrUndefined(action);
      if (comp) {
        return comp;
      }
      switch (action.type) {
        case CompActionTypes.CUSTOM:
          return this.reduceCustom(action.value as MapAction<ConstructorToDataType<ChildComp>>);
      }
      return this;
    }

    reduceCustom(action: MapAction<ConstructorToDataType<ChildComp>>) {
      switch (action.type) {
        case "add":
          const newChildren = {
            ...this.children,
            [action.key]: newChild(this.dispatch, action.key, action.value),
          };
          return this.setChildren(newChildren);
        case "addComp":
          return this.setChild(
            action.key,
            action.value.changeDispatch(wrapDispatch(this.dispatch, action.key))
          );
        case "multi":
          let comp = this;
          action.actions.forEach((actionInner) => {
            comp = comp.reduce(actionInner);
          });
          return comp;
      }
    }

    // with type checking
    addAction(key: string, value: ConstructorToDataType<ChildComp>) {
      return customAction<MapAction>(
        {
          type: "add",
          key: key,
          value: value,
        },
        true
      );
    }

    multiAction(actions: Array<CustomAction>) {
      const editDSL = actions.some((action) => !!action.editDSL);
      console.assert(
        actions.every((action) => !_.isNil(action.editDSL) && action.editDSL === editDSL),
        `sameTypeMap's multiMapAction: all actions should have the same editDSL. editDSL: ${editDSL} actions:`,
        actions
      );
      return customAction<MapAction>(
        {
          type: "multi",
          actions: actions,
        },
        editDSL
      );
    }
  }

  return TEMP_CLASS;
}

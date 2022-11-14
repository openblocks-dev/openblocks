import { Node } from "openblocks-core";
import { mapValues } from "lodash";
import { ParamsConfig } from "comps/controls/actionSelector/executeCompTypes";
import { ReactNode } from "react";

export type MethodInfo = {
  description?: string;
  params: ParamsConfig;
  func: Function;
};

export type ExposingInfo = {
  property: Node<unknown>;
  // Consider RootComp to get it from property in the future
  propertyValue: unknown;

  // Exposing property descriptive documentation
  propertyDesc: Record<string, ReactNode>;

  // exposing methods
  methods: Record<string, MethodInfo>;
};

export type NameAndExposingInfo = Record<string, ExposingInfo>;

export function exposingInfoToNodes(nameAndExposingInfo: NameAndExposingInfo) {
  return mapValues(nameAndExposingInfo, (v) => v.property);
}

export function exposingMethods(nameAndExposingInfo: NameAndExposingInfo) {
  return mapValues(nameAndExposingInfo, (v) => mapValues(v.methods, (c) => c.func));
}

export function exposingDataForAutoComplete(info?: NameAndExposingInfo, includeMethods?: boolean) {
  return mapValues(info, (v) => {
    if (!includeMethods || Object.keys(v.methods).length === 0) {
      return v.propertyValue;
    }
    // merge objects and methods
    const ret: Record<string, unknown> = {};
    Object.entries(v.methods).forEach(([k, v]) => {
      ret[k] = v.func;
    });
    if (typeof v.propertyValue === "object") {
      Object.assign(ret, v.propertyValue);
    }
    return ret;
  });
}

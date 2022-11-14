import { JSONValue } from "util/jsonTypes";
import { Comp } from "openblocks-core";
import { NameGenerator } from "comps/utils";
import { SimpleContainerComp } from "./simpleContainerComp";
import { CompTree } from "./utils";

export interface IContainer extends Comp {
  realSimpleContainer(key?: string): SimpleContainerComp | undefined;
  getCompTree(): CompTree;
  findContainer(key: string): IContainer | undefined;
  // When copying and pasting, regenerate a set of unique components
  getPasteValue(nameGenerator: NameGenerator): JSONValue;
}

export function isContainer(comp: Comp | undefined): comp is IContainer {
  return !!comp && !!(comp as any).getCompTree;
}

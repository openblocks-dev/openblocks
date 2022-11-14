import { NavItemComp, navListComp } from "../navItemComp";
import { LayoutMenuItemComp, LayoutMenuItemListComp } from "comps/comps/layout/layoutMenuItemComp";

export type NavCompType = NavItemComp | LayoutMenuItemComp;

export type NavListCompType =
  | InstanceType<ReturnType<typeof navListComp>>
  | InstanceType<typeof LayoutMenuItemListComp>;

export interface NavCompItemType {
  label: string;
  hidden: boolean;
  active: boolean;
  items: NavItemComp[];
  onEvent: (name: string) => void;
}

export interface IDropData {
  targetListSize: number;
  targetPath: number[];
  dropInAsSub: boolean;
}

export interface IDragData {
  item: NavCompType;
  path: number[];
}

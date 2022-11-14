import { LayoutItem } from "./utils";

export enum LayoutOpTypes {
  CHANGE_ITEM = "CHANGE_ITEM",
  STICKY_ITEM = "STICKY_ITEM",
  HIDE_ITEM = "HIDE_ITEM",
  DELETE_ITEM = "DELETE_ITEM",
  RENAME_ITEM = "RENAME_ITEM",
}

export interface CommonLayoutOp {
  type: LayoutOpTypes;
}

export interface ChangeItemOp extends CommonLayoutOp {
  type: LayoutOpTypes.CHANGE_ITEM;
  key: string;
  item: Partial<LayoutItem>;
}

export interface StickyItemOp extends CommonLayoutOp {
  type: LayoutOpTypes.STICKY_ITEM;
  key: string;
  item: Partial<LayoutItem>;
}

export interface HideItemOp extends CommonLayoutOp {
  type: LayoutOpTypes.HIDE_ITEM;
  key: string;
}

export interface DeleteItemOp extends CommonLayoutOp {
  type: LayoutOpTypes.DELETE_ITEM;
  key: string;
}

export interface RenameItemOp extends CommonLayoutOp {
  type: LayoutOpTypes.RENAME_ITEM;
  sourceKey: string;
  targetKey: string;
}

export type LayoutOp = ChangeItemOp | StickyItemOp | HideItemOp | DeleteItemOp | RenameItemOp;

export function changeItemOp(key: string, item: Partial<LayoutItem>): ChangeItemOp {
  return { type: LayoutOpTypes.CHANGE_ITEM, key, item };
}

export function stickyItemOp(key: string, item: Partial<LayoutItem>): StickyItemOp {
  return { type: LayoutOpTypes.STICKY_ITEM, key, item };
}

export function hideItemOp(key: string): HideItemOp {
  return { type: LayoutOpTypes.HIDE_ITEM, key };
}

export function deleteItemOp(key: string): DeleteItemOp {
  return { type: LayoutOpTypes.DELETE_ITEM, key };
}

export function renameItemOp(sourceKey: string, targetKey: string): RenameItemOp {
  return { type: LayoutOpTypes.RENAME_ITEM, sourceKey, targetKey };
}

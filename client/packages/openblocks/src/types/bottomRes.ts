import { Comp } from "openblocks-core";
import { EditorState } from "comps/editorState";
import { ReactNode } from "react";

export enum BottomResTypeEnum {
  Query = "query",
  TempState = "tempState",
  Transformer = "transformer",
  DateResponder = "dataResponder",
  Folder = "folder",
}

export interface BottomResListComp {
  /**
   * weather auto select the new created comp
   */
  autoSelectAfterCreate(): boolean;

  /**
   * generate the new name of this comp
   */
  genNewName(editorState: EditorState): string;

  /**
   * add a comp
   */
  add: (editorState: EditorState, extraInfo?: any) => string;

  /**
   * select a comp
   */
  select: (editorState: EditorState, id: string) => void;

  /**
   * copy item by id
   * param name used to display in history
   */
  copy: (editorState: EditorState, id: string, name?: string) => void;

  /**
   * delete a comp
   */
  delete: (id: string) => void;

  /**
   * list comps
   */
  items: () => BottomResComp[];
}

export type BottomResCompResultDataType = "json" | "function" | "default";

export interface BottomResCompResult {
  success: boolean;
  title?: ReactNode;
  errorMessage?: string;
  data: any;
  dataType: BottomResCompResultDataType;
  runTime?: number;
}

export interface BottomResComp extends Comp<any> {
  id(): string;

  name(): string;

  type(): BottomResTypeEnum;

  icon(): ReactNode;

  result(): BottomResCompResult | null;

  /**
   * change the name of this BottomResComp
   * if success, return the id of it; if failed, return an empty string
   * Note: the id maybe not equal to the name.
   * @param value
   */
  rename?(value: string): string;
  checkName?(value: string): string;
}
